export type GameFormat = 'cash' | 'mtt';
export type PlayerCount = 6 | 9;
export type StackSize = 100 | 40 | 20 | 10 | 5;
export type Scenario = 'open' | 'vs-raise' | 'vs-3bet' | 'vs-4bet' | 'vs-5bet';
export type Decision = 'raise' | 'call' | 'fold' | 'raise-call' | 'raise-fold';

// Positions for 6-max
export type Position6Max = 'UTG' | 'HJ' | 'CO' | 'BTN' | 'SB' | 'BB';

// Positions for 9-max
export type Position9Max = 'UTG' | 'UTG1' | 'UTG2' | 'LJ' | 'HJ' | 'CO' | 'BTN' | 'SB' | 'BB';

export type Position = Position6Max | Position9Max;

export const POSITIONS_6MAX: Position6Max[] = ['UTG', 'HJ', 'CO', 'BTN', 'SB', 'BB'];
export const POSITIONS_9MAX: Position9Max[] = ['UTG', 'UTG1', 'UTG2', 'LJ', 'HJ', 'CO', 'BTN', 'SB', 'BB'];

export const RANKS = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'] as const;
export type Rank = typeof RANKS[number];

export interface HandDecision {
  hand: string;
  decision: Decision;
  frequency?: number; // For mixed strategies (0-100)
}

export interface RangeData {
  [hand: string]: Decision | { decision: Decision; frequency: number };
}

export interface ChartConfig {
  format: GameFormat;
  players: PlayerCount;
  stackSize: StackSize;
  scenario: Scenario;
  heroPosition: Position;
  villainPosition?: Position;
}
