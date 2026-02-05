import { Card, RANK_VALUES } from './cards';

export type HandRank =
  | 'high-card'
  | 'pair'
  | 'two-pair'
  | 'three-of-a-kind'
  | 'straight'
  | 'flush'
  | 'full-house'
  | 'four-of-a-kind'
  | 'straight-flush'
  | 'royal-flush';

export interface HandResult {
  rank: HandRank;
  rankValue: number; // 1-10 for comparing hand types
  tiebreakers: number[]; // For comparing within same rank
  description: string;
}

const HAND_RANK_VALUES: Record<HandRank, number> = {
  'high-card': 1,
  'pair': 2,
  'two-pair': 3,
  'three-of-a-kind': 4,
  'straight': 5,
  'flush': 6,
  'full-house': 7,
  'four-of-a-kind': 8,
  'straight-flush': 9,
  'royal-flush': 10,
};

// Evaluate best 5-card hand from 7 cards
export function evaluateHand(cards: Card[]): HandResult {
  if (cards.length < 5) {
    throw new Error('Need at least 5 cards to evaluate');
  }

  // Get all 5-card combinations if more than 5 cards
  const combinations = cards.length === 5
    ? [cards]
    : getCombinations(cards, 5);

  let bestResult: HandResult | null = null;

  for (const combo of combinations) {
    const result = evaluate5Cards(combo);
    if (!bestResult || compareHands(result, bestResult) > 0) {
      bestResult = result;
    }
  }

  return bestResult!;
}

function evaluate5Cards(cards: Card[]): HandResult {
  const sortedCards = [...cards].sort((a, b) =>
    RANK_VALUES[b.rank] - RANK_VALUES[a.rank]
  );

  const rankCounts = getRankCounts(sortedCards);
  const isFlush = checkFlush(sortedCards);
  const straightHigh = checkStraight(sortedCards);

  // Check for straight flush / royal flush
  if (isFlush && straightHigh) {
    if (straightHigh === 14) {
      return {
        rank: 'royal-flush',
        rankValue: HAND_RANK_VALUES['royal-flush'],
        tiebreakers: [14],
        description: 'Royal Flush'
      };
    }
    return {
      rank: 'straight-flush',
      rankValue: HAND_RANK_VALUES['straight-flush'],
      tiebreakers: [straightHigh],
      description: `Straight Flush, ${getRankName(straightHigh)} high`
    };
  }

  // Four of a kind
  const quads = findNOfAKind(rankCounts, 4);
  if (quads) {
    const kicker = sortedCards.find(c => RANK_VALUES[c.rank] !== quads)!;
    return {
      rank: 'four-of-a-kind',
      rankValue: HAND_RANK_VALUES['four-of-a-kind'],
      tiebreakers: [quads, RANK_VALUES[kicker.rank]],
      description: `Four of a Kind, ${getRankName(quads)}s`
    };
  }

  // Full house
  const trips = findNOfAKind(rankCounts, 3);
  const pair = findNOfAKind(rankCounts, 2);
  if (trips && pair) {
    return {
      rank: 'full-house',
      rankValue: HAND_RANK_VALUES['full-house'],
      tiebreakers: [trips, pair],
      description: `Full House, ${getRankName(trips)}s full of ${getRankName(pair)}s`
    };
  }

  // Flush
  if (isFlush) {
    const values = sortedCards.map(c => RANK_VALUES[c.rank]);
    return {
      rank: 'flush',
      rankValue: HAND_RANK_VALUES['flush'],
      tiebreakers: values,
      description: `Flush, ${getRankName(values[0])} high`
    };
  }

  // Straight
  if (straightHigh) {
    return {
      rank: 'straight',
      rankValue: HAND_RANK_VALUES['straight'],
      tiebreakers: [straightHigh],
      description: `Straight, ${getRankName(straightHigh)} high`
    };
  }

  // Three of a kind
  if (trips) {
    const kickers = sortedCards
      .filter(c => RANK_VALUES[c.rank] !== trips)
      .slice(0, 2)
      .map(c => RANK_VALUES[c.rank]);
    return {
      rank: 'three-of-a-kind',
      rankValue: HAND_RANK_VALUES['three-of-a-kind'],
      tiebreakers: [trips, ...kickers],
      description: `Three of a Kind, ${getRankName(trips)}s`
    };
  }

  // Two pair
  const pairs = findAllOfAKind(rankCounts, 2);
  if (pairs.length >= 2) {
    const [high, low] = pairs.slice(0, 2).sort((a, b) => b - a);
    const kicker = sortedCards.find(c =>
      RANK_VALUES[c.rank] !== high && RANK_VALUES[c.rank] !== low
    )!;
    return {
      rank: 'two-pair',
      rankValue: HAND_RANK_VALUES['two-pair'],
      tiebreakers: [high, low, RANK_VALUES[kicker.rank]],
      description: `Two Pair, ${getRankName(high)}s and ${getRankName(low)}s`
    };
  }

  // One pair
  if (pair) {
    const kickers = sortedCards
      .filter(c => RANK_VALUES[c.rank] !== pair)
      .slice(0, 3)
      .map(c => RANK_VALUES[c.rank]);
    return {
      rank: 'pair',
      rankValue: HAND_RANK_VALUES['pair'],
      tiebreakers: [pair, ...kickers],
      description: `Pair of ${getRankName(pair)}s`
    };
  }

  // High card
  const values = sortedCards.slice(0, 5).map(c => RANK_VALUES[c.rank]);
  return {
    rank: 'high-card',
    rankValue: HAND_RANK_VALUES['high-card'],
    tiebreakers: values,
    description: `High Card, ${getRankName(values[0])}`
  };
}

function getRankCounts(cards: Card[]): Map<number, number> {
  const counts = new Map<number, number>();
  for (const card of cards) {
    const value = RANK_VALUES[card.rank];
    counts.set(value, (counts.get(value) || 0) + 1);
  }
  return counts;
}

function checkFlush(cards: Card[]): boolean {
  const suit = cards[0].suit;
  return cards.every(c => c.suit === suit);
}

function checkStraight(cards: Card[]): number | null {
  const values = [...new Set(cards.map(c => RANK_VALUES[c.rank]))].sort((a, b) => b - a);

  // Check for A-2-3-4-5 (wheel)
  if (values.includes(14) && values.includes(2) && values.includes(3) &&
      values.includes(4) && values.includes(5)) {
    return 5; // 5-high straight
  }

  // Check for regular straight
  for (let i = 0; i <= values.length - 5; i++) {
    let isStraight = true;
    for (let j = 0; j < 4; j++) {
      if (values[i + j] - values[i + j + 1] !== 1) {
        isStraight = false;
        break;
      }
    }
    if (isStraight) {
      return values[i]; // Return high card of straight
    }
  }

  return null;
}

function findNOfAKind(counts: Map<number, number>, n: number): number | null {
  for (const [value, count] of counts) {
    if (count === n) return value;
  }
  return null;
}

function findAllOfAKind(counts: Map<number, number>, n: number): number[] {
  const result: number[] = [];
  for (const [value, count] of counts) {
    if (count === n) result.push(value);
  }
  return result.sort((a, b) => b - a);
}

function getRankName(value: number): string {
  const names: Record<number, string> = {
    14: 'Ace', 13: 'King', 12: 'Queen', 11: 'Jack', 10: 'Ten',
    9: 'Nine', 8: 'Eight', 7: 'Seven', 6: 'Six', 5: 'Five',
    4: 'Four', 3: 'Three', 2: 'Two'
  };
  return names[value] || value.toString();
}

function getCombinations<T>(arr: T[], k: number): T[][] {
  if (k === 0) return [[]];
  if (arr.length < k) return [];

  const [first, ...rest] = arr;
  const withFirst = getCombinations(rest, k - 1).map(combo => [first, ...combo]);
  const withoutFirst = getCombinations(rest, k);

  return [...withFirst, ...withoutFirst];
}

// Compare two hands: returns positive if a wins, negative if b wins, 0 if tie
export function compareHands(a: HandResult, b: HandResult): number {
  if (a.rankValue !== b.rankValue) {
    return a.rankValue - b.rankValue;
  }

  for (let i = 0; i < Math.min(a.tiebreakers.length, b.tiebreakers.length); i++) {
    if (a.tiebreakers[i] !== b.tiebreakers[i]) {
      return a.tiebreakers[i] - b.tiebreakers[i];
    }
  }

  return 0;
}
