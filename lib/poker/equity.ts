import { Card, createDeck, removeCards, shuffleDeck, parseCard } from './cards';
import { evaluateHand, compareHands } from './evaluator';
import { parseRange } from './ranges';

export interface EquityResult {
  player1: {
    win: number;
    tie: number;
    lose: number;
    equity: number;
  };
  player2: {
    win: number;
    tie: number;
    lose: number;
    equity: number;
  };
  iterations: number;
  elapsed: number;
}

export interface SimulationConfig {
  hand1: string; // Hand notation like "AhKd" or range like "AA,KK,QQ"
  hand2: string;
  board?: string; // Board cards like "AhKd5c"
  iterations?: number;
}

// Expand a hand notation to all specific combos
// e.g., "AA" -> [["Ah","Ad"], ["Ah","Ac"], ["Ah","As"], ["Ad","Ac"], ["Ad","As"], ["Ac","As"]]
function expandHandNotation(notation: string): string[][] {
  const suits = ['h', 'd', 'c', 's'];
  const combos: string[][] = [];

  if (notation.length === 2) {
    // Pair (e.g., "AA")
    const rank = notation[0];
    for (let i = 0; i < suits.length; i++) {
      for (let j = i + 1; j < suits.length; j++) {
        combos.push([`${rank}${suits[i]}`, `${rank}${suits[j]}`]);
      }
    }
  } else if (notation.length === 3) {
    const rank1 = notation[0];
    const rank2 = notation[1];
    const type = notation[2];

    if (type === 's') {
      // Suited (e.g., "AKs")
      for (const suit of suits) {
        combos.push([`${rank1}${suit}`, `${rank2}${suit}`]);
      }
    } else {
      // Offsuit (e.g., "AKo")
      for (const suit1 of suits) {
        for (const suit2 of suits) {
          if (suit1 !== suit2) {
            combos.push([`${rank1}${suit1}`, `${rank2}${suit2}`]);
          }
        }
      }
    }
  }

  return combos;
}

// Get all specific hands from a range notation
export function expandRange(range: string): string[][] {
  const hands: string[][] = [];
  const rangeSet = parseRange(range);

  for (const handNotation of rangeSet) {
    const specificHands = expandHandNotation(handNotation);
    hands.push(...specificHands);
  }

  return hands;
}

// Check if input is a specific hand or a range
function isSpecificHand(input: string): boolean {
  const cleaned = input.replace(/\s/g, '');
  return cleaned.length === 4 && /^[AKQJT2-9][hdcs][AKQJT2-9][hdcs]$/i.test(cleaned);
}

// Parse board cards
function parseBoard(boardStr: string): Card[] {
  if (!boardStr || !boardStr.trim()) return [];

  const cards: Card[] = [];
  const cleaned = boardStr.replace(/\s/g, '');

  for (let i = 0; i < cleaned.length; i += 2) {
    const cardCode = cleaned.slice(i, i + 2);
    const card = parseCard(cardCode);
    if (card) {
      cards.push(card);
    }
  }

  return cards;
}

// Run Monte Carlo simulation
export function calculateEquity(config: SimulationConfig): EquityResult {
  const startTime = performance.now();
  const iterations = config.iterations || 10000;

  let p1Wins = 0;
  let p2Wins = 0;
  let ties = 0;

  const isHand1Specific = isSpecificHand(config.hand1);
  const isHand2Specific = isSpecificHand(config.hand2);

  const hand1Combos = isHand1Specific
    ? [[config.hand1.slice(0, 2), config.hand1.slice(2, 4)]]
    : expandRange(config.hand1);

  const hand2Combos = isHand2Specific
    ? [[config.hand2.slice(0, 2), config.hand2.slice(2, 4)]]
    : expandRange(config.hand2);

  const boardCards = parseBoard(config.board || '');
  const cardsNeeded = 5 - boardCards.length;

  let skips = 0;
  const maxSkips = iterations * 10; // Prevent infinite loops on impossible configs

  for (let i = 0; i < iterations; i++) {
    // Pick random hands from ranges
    const hand1Combo = hand1Combos[Math.floor(Math.random() * hand1Combos.length)];
    const hand2Combo = hand2Combos[Math.floor(Math.random() * hand2Combos.length)];

    const p1Cards = hand1Combo.map(c => parseCard(c)!);
    const p2Cards = hand2Combo.map(c => parseCard(c)!);

    // Check for card conflicts
    const allCodes = [
      ...p1Cards.map(c => c.code),
      ...p2Cards.map(c => c.code),
      ...boardCards.map(c => c.code)
    ];
    const usedCodes = new Set(allCodes);

    if (usedCodes.size < allCodes.length) {
      // Card conflict, skip this iteration
      skips++;
      if (skips > maxSkips) break;
      i--;
      continue;
    }

    // Create deck and remove used cards
    let deck = createDeck();
    deck = removeCards(deck, [...p1Cards, ...p2Cards, ...boardCards]);
    deck = shuffleDeck(deck);

    // Deal remaining board cards
    const fullBoard = [...boardCards, ...deck.slice(0, cardsNeeded)];

    // Evaluate hands
    const p1Result = evaluateHand([...p1Cards, ...fullBoard]);
    const p2Result = evaluateHand([...p2Cards, ...fullBoard]);

    const comparison = compareHands(p1Result, p2Result);

    if (comparison > 0) {
      p1Wins++;
    } else if (comparison < 0) {
      p2Wins++;
    } else {
      ties++;
    }
  }

  const total = p1Wins + p2Wins + ties;
  const elapsed = performance.now() - startTime;

  return {
    player1: {
      win: p1Wins,
      tie: ties,
      lose: p2Wins,
      equity: total > 0 ? ((p1Wins + ties / 2) / total) * 100 : 50
    },
    player2: {
      win: p2Wins,
      tie: ties,
      lose: p1Wins,
      equity: total > 0 ? ((p2Wins + ties / 2) / total) * 100 : 50
    },
    iterations: total,
    elapsed
  };
}

// Common matchups for quick presets
export const COMMON_MATCHUPS = [
  { name: 'AA vs KK', hand1: 'AsAh', hand2: 'KsKh', equity1: 82 },
  { name: 'AA vs AKs', hand1: 'AsAh', hand2: 'AdKd', equity1: 87 },
  { name: 'AA vs QQ', hand1: 'AsAh', hand2: 'QsQh', equity1: 81 },
  { name: 'KK vs AKo', hand1: 'KsKh', hand2: 'AdKc', equity1: 70 },
  { name: 'QQ vs AKs', hand1: 'QsQh', hand2: 'AdKd', equity1: 54 },
  { name: 'JJ vs AKs', hand1: 'JsJh', hand2: 'AdKd', equity1: 54 },
  { name: 'TT vs AKo', hand1: 'TsTh', hand2: 'AdKc', equity1: 57 },
  { name: 'AKs vs 22', hand1: 'AdKd', hand2: '2s2h', equity1: 48 },
  { name: 'AKs vs QJs', hand1: 'AdKd', hand2: 'QsJs', equity1: 63 },
  { name: 'AQo vs KQo', hand1: 'AdQc', hand2: 'KsQh', equity1: 70 },
];
