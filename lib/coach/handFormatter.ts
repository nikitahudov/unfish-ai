import type { HandData } from '@/components/coach/HandInputForm';
import type { Action } from '@/components/coach/ActionEntry';

/**
 * Formats hand data into a detailed, structured format for AI analysis
 */
export function formatHandForAnalysis(hand: HandData): string {
  const lines: string[] = [];

  // Header
  lines.push('## Hand for Analysis');
  lines.push('');

  // Game Info
  lines.push('### Game Setup');
  lines.push(`- **Game Type:** ${hand.gameType === 'cash' ? 'Cash Game' : 'Tournament'}`);
  lines.push(`- **Stakes:** ${hand.stakes}`);
  lines.push(`- **Position:** ${hand.position}`);
  lines.push(`- **Effective Stack:** ${hand.effectiveStack} BB`);
  lines.push('');

  // Hole Cards
  lines.push('### Hero\'s Hand');
  lines.push(`**${formatCards(hand.holeCards)}**`);
  lines.push('');

  // Preflop Action
  if (hand.preflopActions.length > 0) {
    lines.push('### Preflop Action');
    lines.push(formatActions(hand.preflopActions));
    lines.push('');
  }

  // Flop
  if (hand.flop.length === 3) {
    lines.push('### Flop');
    lines.push(`**Board:** ${formatCards(hand.flop)}`);
    if (hand.flopActions.length > 0) {
      lines.push('');
      lines.push('**Action:**');
      lines.push(formatActions(hand.flopActions));
    }
    lines.push('');
  }

  // Turn
  if (hand.turn.length === 1) {
    lines.push('### Turn');
    lines.push(`**Board:** ${formatCards([...hand.flop, ...hand.turn])}`);
    if (hand.turnActions.length > 0) {
      lines.push('');
      lines.push('**Action:**');
      lines.push(formatActions(hand.turnActions));
    }
    lines.push('');
  }

  // River
  if (hand.river.length === 1) {
    lines.push('### River');
    lines.push(`**Board:** ${formatCards([...hand.flop, ...hand.turn, ...hand.river])}`);
    if (hand.riverActions.length > 0) {
      lines.push('');
      lines.push('**Action:**');
      lines.push(formatActions(hand.riverActions));
    }
    lines.push('');
  }

  // Villain Notes
  if (hand.villainNotes.trim()) {
    lines.push('### Villain Notes');
    lines.push(hand.villainNotes);
    lines.push('');
  }

  // Question
  lines.push('### Question');
  lines.push(hand.question);

  return lines.join('\n');
}

/**
 * Formats hand data into a simple, compact format for display
 */
export function formatHandSimple(hand: HandData): string {
  const parts: string[] = [];

  // Stakes and position
  parts.push(`${hand.stakes} ${hand.gameType}`);
  parts.push(`${hand.position}, ${hand.effectiveStack}bb effective`);

  // Hole cards
  parts.push(`Hand: ${formatCards(hand.holeCards)}`);

  // Board
  if (hand.flop.length === 3) {
    const board = [...hand.flop, ...hand.turn, ...hand.river];
    parts.push(`Board: ${formatCards(board)}`);
  }

  return parts.join(' | ');
}

/**
 * Formats cards from internal format (e.g., "A♠") to display format
 */
function formatCards(cards: string[]): string {
  if (cards.length === 0) return 'None';
  return cards.join(' ');
}

/**
 * Formats a list of actions into readable text
 */
function formatActions(actions: Action[]): string {
  return actions.map(action => {
    let text = `${action.position} ${action.action}`;
    if (action.amount) {
      text += ` $${action.amount}`;
    }
    return `- ${text}`;
  }).join('\n');
}

/**
 * Determines the current street based on hand data
 */
export function getCurrentStreet(hand: HandData): 'preflop' | 'flop' | 'turn' | 'river' {
  if (hand.river.length === 1) return 'river';
  if (hand.turn.length === 1) return 'turn';
  if (hand.flop.length === 3) return 'flop';
  return 'preflop';
}

/**
 * Validates that the hand has minimum required data for analysis
 */
export function validateHand(hand: HandData): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (hand.holeCards.length !== 2) {
    errors.push('Please select exactly 2 hole cards');
  }

  if (hand.preflopActions.length === 0) {
    errors.push('Please enter at least one preflop action');
  }

  if (!hand.question.trim()) {
    errors.push('Please enter a question about the hand');
  }

  if (hand.effectiveStack <= 0) {
    errors.push('Please enter a valid effective stack');
  }

  // Validate board cards sequence
  if (hand.turn.length > 0 && hand.flop.length !== 3) {
    errors.push('Cannot have turn without complete flop');
  }

  if (hand.river.length > 0 && hand.turn.length !== 1) {
    errors.push('Cannot have river without turn');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
