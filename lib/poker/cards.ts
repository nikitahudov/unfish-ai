export const SUITS = ['h', 'd', 'c', 's'] as const; // hearts, diamonds, clubs, spades
export const RANKS = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'] as const;
export const RANK_VALUES: Record<string, number> = {
  'A': 14, 'K': 13, 'Q': 12, 'J': 11, 'T': 10,
  '9': 9, '8': 8, '7': 7, '6': 6, '5': 5, '4': 4, '3': 3, '2': 2
};

export type Suit = typeof SUITS[number];
export type Rank = typeof RANKS[number];

export interface Card {
  rank: Rank;
  suit: Suit;
  code: string; // e.g., "Ah", "Kd"
}

export function createCard(rank: Rank, suit: Suit): Card {
  return { rank, suit, code: `${rank}${suit}` };
}

export function parseCard(code: string): Card | null {
  if (code.length !== 2) return null;
  const rank = code[0].toUpperCase() as Rank;
  const suit = code[1].toLowerCase() as Suit;

  if (!RANKS.includes(rank) || !SUITS.includes(suit)) return null;
  return createCard(rank, suit);
}

export function createDeck(): Card[] {
  const deck: Card[] = [];
  for (const rank of RANKS) {
    for (const suit of SUITS) {
      deck.push(createCard(rank, suit));
    }
  }
  return deck;
}

export function shuffleDeck(deck: Card[]): Card[] {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Remove specific cards from deck
export function removeCards(deck: Card[], toRemove: Card[]): Card[] {
  const removeCodes = new Set(toRemove.map(c => c.code));
  return deck.filter(c => !removeCodes.has(c.code));
}

// Parse hand notation like "AhKd" or "AsAd"
export function parseHand(notation: string): Card[] | null {
  const cards: Card[] = [];
  const cleaned = notation.replace(/\s/g, '');

  for (let i = 0; i < cleaned.length; i += 2) {
    const cardCode = cleaned.slice(i, i + 2);
    const card = parseCard(cardCode);
    if (!card) return null;
    cards.push(card);
  }

  return cards.length === 2 ? cards : null;
}

// Get suit symbol for display
export function getSuitSymbol(suit: Suit): string {
  const symbols: Record<Suit, string> = {
    'h': '\u2665',
    'd': '\u2666',
    'c': '\u2663',
    's': '\u2660'
  };
  return symbols[suit];
}

// Get suit color
export function getSuitColor(suit: Suit): string {
  return suit === 'h' || suit === 'd' ? 'text-red-500' : 'text-slate-300';
}
