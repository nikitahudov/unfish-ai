import {
  GameFormat,
  PlayerCount,
  StackSize,
  Scenario,
  Position,
  Decision,
  RangeData,
  RANKS,
  POSITIONS_6MAX,
  POSITIONS_9MAX,
} from './types';

// Helper to generate all 169 hand combos
export function generateAllHands(): string[] {
  const hands: string[] = [];
  for (let i = 0; i < 13; i++) {
    for (let j = 0; j < 13; j++) {
      const rank1 = RANKS[i];
      const rank2 = RANKS[j];
      if (i === j) {
        hands.push(`${rank1}${rank2}`);
      } else if (i < j) {
        hands.push(`${rank1}${rank2}s`);
      } else {
        hands.push(`${rank2}${rank1}o`);
      }
    }
  }
  return hands;
}

// Helper to parse hand notation into set
export function parseRange(notation: string): Set<string> {
  const hands = new Set<string>();
  const parts = notation.split(',').map(p => p.trim()).filter(Boolean);

  for (const part of parts) {
    if (part.includes('+')) {
      // Handle range like "77+" or "ATs+"
      const base = part.replace('+', '');
      hands.add(base);

      if (base.length === 2 && base[0] === base[1]) {
        // Pair range: 77+ means 77, 88, 99, TT, JJ, QQ, KK, AA
        const startIdx = RANKS.indexOf(base[0] as typeof RANKS[number]);
        for (let i = startIdx; i >= 0; i--) {
          hands.add(`${RANKS[i]}${RANKS[i]}`);
        }
      } else if (base.length === 3) {
        // Suited/offsuit range: ATs+ means ATs, AJs, AQs, AKs
        const highCard = base[0];
        const lowCard = base[1];
        const suited = base[2];
        const highIdx = RANKS.indexOf(highCard as typeof RANKS[number]);
        const lowIdx = RANKS.indexOf(lowCard as typeof RANKS[number]);

        for (let i = lowIdx; i > highIdx; i--) {
          hands.add(`${highCard}${RANKS[i]}${suited}`);
        }
      }
    } else if (part.includes('-')) {
      // Handle range like "22-66" or "A2s-A5s"
      const [start, end] = part.split('-');

      if (start.length === 2 && start[0] === start[1]) {
        // Pair range
        const startIdx = RANKS.indexOf(start[0] as typeof RANKS[number]);
        const endIdx = RANKS.indexOf(end[0] as typeof RANKS[number]);
        const minIdx = Math.min(startIdx, endIdx);
        const maxIdx = Math.max(startIdx, endIdx);

        for (let i = minIdx; i <= maxIdx; i++) {
          hands.add(`${RANKS[i]}${RANKS[i]}`);
        }
      } else if (start.length === 3) {
        // Suited/offsuit range
        const highCard = start[0];
        const suited = start[2];
        const startIdx = RANKS.indexOf(start[1] as typeof RANKS[number]);
        const endIdx = RANKS.indexOf(end[1] as typeof RANKS[number]);
        const minIdx = Math.min(startIdx, endIdx);
        const maxIdx = Math.max(startIdx, endIdx);

        for (let i = minIdx; i <= maxIdx; i++) {
          hands.add(`${highCard}${RANKS[i]}${suited}`);
        }
      }
    } else {
      // Single hand
      hands.add(part);
    }
  }

  return hands;
}

// Convert range notation to RangeData with decision
function rangeToDecisions(
  raiseRange: string,
  callRange: string = ''
): RangeData {
  const allHands = generateAllHands();
  const raiseHands = parseRange(raiseRange);
  const callHands = parseRange(callRange);

  const data: RangeData = {};

  for (const hand of allHands) {
    if (raiseHands.has(hand)) {
      data[hand] = 'raise';
    } else if (callHands.has(hand)) {
      data[hand] = 'call';
    } else {
      data[hand] = 'fold';
    }
  }

  return data;
}

// ============================================
// OPENING RANGES (RFI - Raise First In)
// ============================================

const OPEN_RANGES_CASH_6MAX_100BB: Record<string, { raise: string }> = {
  'UTG': {
    raise: 'AA,KK,QQ,JJ,TT,99,88,77,AKs,AQs,AJs,ATs,A5s,A4s,KQs,KJs,KTs,QJs,QTs,JTs,T9s,98s,87s,76s,65s,AKo,AQo,AJo,KQo'
  },
  'HJ': {
    raise: 'AA,KK,QQ,JJ,TT,99,88,77,66,AKs,AQs,AJs,ATs,A9s,A5s,A4s,A3s,KQs,KJs,KTs,K9s,QJs,QTs,Q9s,JTs,J9s,T9s,98s,87s,76s,65s,54s,AKo,AQo,AJo,ATo,KQo,KJo,QJo'
  },
  'CO': {
    raise: 'AA,KK,QQ,JJ,TT,99,88,77,66,55,44,AKs,AQs,AJs,ATs,A9s,A8s,A7s,A6s,A5s,A4s,A3s,A2s,KQs,KJs,KTs,K9s,K8s,K7s,QJs,QTs,Q9s,Q8s,JTs,J9s,J8s,T9s,T8s,98s,97s,87s,86s,76s,75s,65s,64s,54s,53s,43s,AKo,AQo,AJo,ATo,A9o,KQo,KJo,KTo,QJo,QTo,JTo'
  },
  'BTN': {
    raise: 'AA,KK,QQ,JJ,TT,99,88,77,66,55,44,33,22,AKs,AQs,AJs,ATs,A9s,A8s,A7s,A6s,A5s,A4s,A3s,A2s,KQs,KJs,KTs,K9s,K8s,K7s,K6s,K5s,K4s,K3s,K2s,QJs,QTs,Q9s,Q8s,Q7s,Q6s,Q5s,JTs,J9s,J8s,J7s,J6s,T9s,T8s,T7s,98s,97s,96s,87s,86s,85s,76s,75s,74s,65s,64s,54s,53s,43s,32s,AKo,AQo,AJo,ATo,A9o,A8o,A7o,A6o,A5o,A4o,A3o,A2o,KQo,KJo,KTo,K9o,K8o,QJo,QTo,Q9o,JTo,J9o,T9o,98o,87o,76o,65o'
  },
  'SB': {
    raise: 'AA,KK,QQ,JJ,TT,99,88,77,66,55,44,33,22,AKs,AQs,AJs,ATs,A9s,A8s,A7s,A6s,A5s,A4s,A3s,A2s,KQs,KJs,KTs,K9s,K8s,K7s,K6s,K5s,K4s,K3s,K2s,QJs,QTs,Q9s,Q8s,Q7s,Q6s,Q5s,Q4s,Q3s,Q2s,JTs,J9s,J8s,J7s,J6s,J5s,T9s,T8s,T7s,T6s,98s,97s,96s,87s,86s,85s,76s,75s,74s,65s,64s,63s,54s,53s,43s,AKo,AQo,AJo,ATo,A9o,A8o,A7o,A6o,A5o,A4o,A3o,A2o,KQo,KJo,KTo,K9o,K8o,K7o,K6o,K5o,QJo,QTo,Q9o,Q8o,JTo,J9o,J8o,T9o,T8o,98o,97o,87o,76o,65o,54o'
  },
};

// 9-max has tighter early positions
const OPEN_RANGES_CASH_9MAX_100BB: Record<string, { raise: string }> = {
  'UTG': {
    raise: 'AA,KK,QQ,JJ,TT,99,AKs,AQs,AJs,ATs,KQs,KJs,AKo,AQo'
  },
  'UTG1': {
    raise: 'AA,KK,QQ,JJ,TT,99,88,AKs,AQs,AJs,ATs,A5s,KQs,KJs,KTs,QJs,AKo,AQo,AJo'
  },
  'UTG2': {
    raise: 'AA,KK,QQ,JJ,TT,99,88,77,AKs,AQs,AJs,ATs,A5s,A4s,KQs,KJs,KTs,QJs,QTs,JTs,AKo,AQo,AJo,KQo'
  },
  'LJ': {
    raise: 'AA,KK,QQ,JJ,TT,99,88,77,66,AKs,AQs,AJs,ATs,A9s,A5s,A4s,A3s,KQs,KJs,KTs,K9s,QJs,QTs,JTs,T9s,98s,87s,76s,AKo,AQo,AJo,ATo,KQo,KJo'
  },
  'HJ': {
    raise: 'AA,KK,QQ,JJ,TT,99,88,77,66,55,AKs,AQs,AJs,ATs,A9s,A8s,A5s,A4s,A3s,A2s,KQs,KJs,KTs,K9s,K8s,QJs,QTs,Q9s,JTs,J9s,T9s,98s,87s,76s,65s,54s,AKo,AQo,AJo,ATo,KQo,KJo,QJo'
  },
  'CO': {
    raise: 'AA,KK,QQ,JJ,TT,99,88,77,66,55,44,33,AKs,AQs,AJs,ATs,A9s,A8s,A7s,A6s,A5s,A4s,A3s,A2s,KQs,KJs,KTs,K9s,K8s,K7s,K6s,QJs,QTs,Q9s,Q8s,JTs,J9s,J8s,T9s,T8s,98s,97s,87s,86s,76s,75s,65s,64s,54s,53s,43s,AKo,AQo,AJo,ATo,A9o,A8o,KQo,KJo,KTo,QJo,QTo,JTo'
  },
  'BTN': {
    raise: 'AA,KK,QQ,JJ,TT,99,88,77,66,55,44,33,22,AKs,AQs,AJs,ATs,A9s,A8s,A7s,A6s,A5s,A4s,A3s,A2s,KQs,KJs,KTs,K9s,K8s,K7s,K6s,K5s,K4s,K3s,K2s,QJs,QTs,Q9s,Q8s,Q7s,Q6s,Q5s,JTs,J9s,J8s,J7s,J6s,T9s,T8s,T7s,98s,97s,96s,87s,86s,85s,76s,75s,74s,65s,64s,54s,53s,43s,32s,AKo,AQo,AJo,ATo,A9o,A8o,A7o,A6o,A5o,A4o,A3o,A2o,KQo,KJo,KTo,K9o,K8o,QJo,QTo,Q9o,JTo,J9o,T9o,98o,87o,76o,65o'
  },
  'SB': {
    raise: 'AA,KK,QQ,JJ,TT,99,88,77,66,55,44,33,22,AKs,AQs,AJs,ATs,A9s,A8s,A7s,A6s,A5s,A4s,A3s,A2s,KQs,KJs,KTs,K9s,K8s,K7s,K6s,K5s,K4s,K3s,K2s,QJs,QTs,Q9s,Q8s,Q7s,Q6s,Q5s,Q4s,Q3s,Q2s,JTs,J9s,J8s,J7s,J6s,J5s,T9s,T8s,T7s,T6s,98s,97s,96s,87s,86s,85s,76s,75s,74s,65s,64s,63s,54s,53s,43s,AKo,AQo,AJo,ATo,A9o,A8o,A7o,A6o,A5o,A4o,A3o,A2o,KQo,KJo,KTo,K9o,K8o,K7o,K6o,K5o,QJo,QTo,Q9o,Q8o,JTo,J9o,J8o,T9o,T8o,98o,97o,87o,76o,65o,54o'
  },
};

// ============================================
// VS RAISE RANGES (Facing Open)
// ============================================

const VS_RAISE_RANGES_CASH_6MAX_100BB: Record<string, Record<string, { raise: string; call: string }>> = {
  // Hero in HJ, facing UTG open
  'HJ': {
    'UTG': {
      raise: 'AA,KK,QQ,AKs,AKo',
      call: 'JJ,TT,99,AQs,AJs,ATs,KQs,KJs,QJs,JTs,T9s,98s'
    },
  },
  // Hero in CO, facing opens
  'CO': {
    'UTG': {
      raise: 'AA,KK,QQ,JJ,AKs,AKo,AQs',
      call: 'TT,99,88,AJs,ATs,KQs,KJs,QJs,JTs,T9s,98s,87s'
    },
    'HJ': {
      raise: 'AA,KK,QQ,JJ,TT,AKs,AKo,AQs,AJs,KQs',
      call: '99,88,77,ATs,A5s,KJs,KTs,QJs,QTs,JTs,T9s,98s,87s,76s'
    },
  },
  // Hero on BTN, facing opens
  'BTN': {
    'UTG': {
      raise: 'AA,KK,QQ,JJ,TT,AKs,AKo,AQs,AJs,A5s',
      call: '99,88,77,66,ATs,A4s,KQs,KJs,KTs,QJs,QTs,JTs,T9s,98s,87s,76s,65s'
    },
    'HJ': {
      raise: 'AA,KK,QQ,JJ,TT,99,AKs,AKo,AQs,AJs,ATs,A5s,A4s,KQs',
      call: '88,77,66,55,A9s,A8s,A3s,A2s,KJs,KTs,K9s,QJs,QTs,Q9s,JTs,J9s,T9s,T8s,98s,97s,87s,86s,76s,75s,65s,54s'
    },
    'CO': {
      raise: 'AA,KK,QQ,JJ,TT,99,88,AKs,AKo,AQs,AJs,ATs,A9s,A5s,A4s,A3s,KQs,KJs,KQo',
      call: '77,66,55,44,A8s,A7s,A6s,A2s,KTs,K9s,K8s,QJs,QTs,Q9s,Q8s,JTs,J9s,J8s,T9s,T8s,98s,97s,87s,86s,76s,75s,65s,64s,54s,53s'
    },
  },
  // Hero in SB, facing opens
  'SB': {
    'UTG': {
      raise: 'AA,KK,QQ,JJ,AKs,AKo,AQs',
      call: 'TT,99,AJs,ATs,KQs,KJs,QJs'
    },
    'HJ': {
      raise: 'AA,KK,QQ,JJ,TT,AKs,AKo,AQs,AJs,A5s',
      call: '99,88,ATs,A4s,KQs,KJs,KTs,QJs,QTs,JTs'
    },
    'CO': {
      raise: 'AA,KK,QQ,JJ,TT,99,AKs,AKo,AQs,AJs,ATs,A5s,A4s,KQs,KJs',
      call: '88,77,A9s,A3s,A2s,KTs,K9s,QJs,QTs,Q9s,JTs,J9s,T9s,98s,87s'
    },
    'BTN': {
      raise: 'AA,KK,QQ,JJ,TT,99,88,77,AKs,AKo,AQs,AQo,AJs,ATs,A9s,A8s,A5s,A4s,A3s,A2s,KQs,KJs,KTs,K9s,KQo,QJs,QTs',
      call: '66,55,44,A7s,A6s,K8s,K7s,K6s,Q9s,Q8s,JTs,J9s,J8s,T9s,T8s,98s,97s,87s,86s,76s,75s,65s,64s,54s'
    },
  },
  // Hero in BB, facing opens
  'BB': {
    'UTG': {
      raise: 'AA,KK,QQ,JJ,AKs,AKo',
      call: 'TT,99,88,77,66,55,44,33,22,AQs,AJs,ATs,A9s,A8s,A7s,A6s,A5s,A4s,A3s,A2s,KQs,KJs,KTs,K9s,K8s,K7s,QJs,QTs,Q9s,JTs,J9s,T9s,T8s,98s,97s,87s,86s,76s,75s,65s,54s'
    },
    'HJ': {
      raise: 'AA,KK,QQ,JJ,TT,AKs,AKo,AQs,A5s',
      call: '99,88,77,66,55,44,33,22,AJs,ATs,A9s,A8s,A7s,A6s,A4s,A3s,A2s,KQs,KJs,KTs,K9s,K8s,K7s,K6s,QJs,QTs,Q9s,Q8s,JTs,J9s,J8s,T9s,T8s,T7s,98s,97s,96s,87s,86s,76s,75s,65s,64s,54s,53s,43s'
    },
    'CO': {
      raise: 'AA,KK,QQ,JJ,TT,99,AKs,AKo,AQs,AJs,A5s,A4s',
      call: '88,77,66,55,44,33,22,ATs,A9s,A8s,A7s,A6s,A3s,A2s,KQs,KJs,KTs,K9s,K8s,K7s,K6s,K5s,QJs,QTs,Q9s,Q8s,Q7s,JTs,J9s,J8s,J7s,T9s,T8s,T7s,98s,97s,96s,87s,86s,85s,76s,75s,74s,65s,64s,54s,53s,43s'
    },
    'BTN': {
      raise: 'AA,KK,QQ,JJ,TT,99,88,AKs,AKo,AQs,AQo,AJs,ATs,A9s,A5s,A4s,A3s,KQs,KJs,KQo',
      call: '77,66,55,44,33,22,A8s,A7s,A6s,A2s,KTs,K9s,K8s,K7s,K6s,K5s,K4s,K3s,K2s,QJs,QTs,Q9s,Q8s,Q7s,Q6s,Q5s,JTs,J9s,J8s,J7s,J6s,T9s,T8s,T7s,T6s,98s,97s,96s,87s,86s,85s,76s,75s,74s,65s,64s,63s,54s,53s,52s,43s,42s,32s,AJo,ATo,A9o,A8o,A7o,A6o,A5o,A4o,A3o,A2o,KJo,KTo,K9o,K8o,QJo,QTo,Q9o,JTo,J9o,T9o,98o,87o,76o,65o'
    },
    'SB': {
      raise: 'AA,KK,QQ,JJ,TT,99,88,77,AKs,AKo,AQs,AQo,AJs,AJo,ATs,A9s,A8s,A5s,A4s,A3s,A2s,KQs,KJs,KTs,K9s,KQo,KJo,QJs,QTs,Q9s,JTs',
      call: '66,55,44,33,22,A7s,A6s,K8s,K7s,K6s,K5s,K4s,K3s,K2s,Q8s,Q7s,Q6s,Q5s,Q4s,Q3s,Q2s,J9s,J8s,J7s,J6s,J5s,T9s,T8s,T7s,T6s,98s,97s,96s,95s,87s,86s,85s,84s,76s,75s,74s,73s,65s,64s,63s,54s,53s,52s,43s,42s,32s,ATo,A9o,A8o,A7o,A6o,A5o,A4o,A3o,A2o,KTo,K9o,K8o,K7o,K6o,K5o,K4o,QJo,QTo,Q9o,Q8o,Q7o,JTo,J9o,J8o,T9o,T8o,98o,97o,87o,86o,76o,75o,65o,54o'
    },
  },
};

// ============================================
// VS 3BET RANGES (Facing 3-bet after opening)
// ============================================

const VS_3BET_RANGES_CASH_6MAX_100BB: Record<string, Record<string, { raise: string; call: string }>> = {
  // Hero opened UTG, facing 3bet
  'UTG': {
    'HJ': { raise: 'AA,KK,QQ,AKs', call: 'JJ,TT,AKo,AQs' },
    'CO': { raise: 'AA,KK,QQ,AKs', call: 'JJ,TT,AKo,AQs' },
    'BTN': { raise: 'AA,KK,QQ,AKs', call: 'JJ,TT,99,AKo,AQs,AJs' },
    'SB': { raise: 'AA,KK,QQ,AKs', call: 'JJ,TT,AKo,AQs' },
    'BB': { raise: 'AA,KK,QQ,AKs', call: 'JJ,TT,AKo,AQs' },
  },
  // Hero opened HJ, facing 3bet
  'HJ': {
    'CO': { raise: 'AA,KK,QQ,JJ,AKs,AKo', call: 'TT,99,AQs,AJs,ATs,KQs' },
    'BTN': { raise: 'AA,KK,QQ,JJ,AKs,AKo', call: 'TT,99,88,AQs,AJs,ATs,KQs,KJs' },
    'SB': { raise: 'AA,KK,QQ,JJ,AKs,AKo', call: 'TT,99,AQs,AJs,ATs,KQs' },
    'BB': { raise: 'AA,KK,QQ,JJ,AKs,AKo', call: 'TT,99,88,AQs,AJs,ATs,KQs,KJs' },
  },
  // Hero opened CO, facing 3bet
  'CO': {
    'BTN': { raise: 'AA,KK,QQ,JJ,TT,AKs,AKo,AQs,A5s', call: '99,88,77,AJs,ATs,A4s,KQs,KJs,KTs,QJs,JTs,T9s,98s' },
    'SB': { raise: 'AA,KK,QQ,JJ,TT,AKs,AKo,AQs', call: '99,88,AJs,ATs,KQs,KJs,QJs' },
    'BB': { raise: 'AA,KK,QQ,JJ,TT,AKs,AKo,AQs,A5s', call: '99,88,77,AJs,ATs,A4s,KQs,KJs,KTs,QJs,JTs,T9s' },
  },
  // Hero opened BTN, facing 3bet
  'BTN': {
    'SB': { raise: 'AA,KK,QQ,JJ,TT,99,AKs,AKo,AQs,AJs,A5s,A4s', call: '88,77,66,ATs,A9s,A3s,A2s,KQs,KJs,KTs,K9s,QJs,QTs,JTs,T9s,98s,87s,76s' },
    'BB': { raise: 'AA,KK,QQ,JJ,TT,99,AKs,AKo,AQs,AJs,ATs,A5s,A4s,A3s,KQs', call: '88,77,66,55,A9s,A8s,A2s,KJs,KTs,K9s,K8s,QJs,QTs,Q9s,JTs,J9s,T9s,T8s,98s,97s,87s,86s,76s,65s,54s' },
  },
  // Hero opened SB, facing 3bet from BB
  'SB': {
    'BB': { raise: 'AA,KK,QQ,JJ,TT,99,88,AKs,AKo,AQs,AQo,AJs,ATs,A5s,A4s,KQs,KJs', call: '77,66,55,A9s,A8s,A7s,A6s,A3s,A2s,KTs,K9s,K8s,QJs,QTs,Q9s,JTs,J9s,T9s,T8s,98s,97s,87s,76s,65s,54s' },
  },
};

// ============================================
// VS 4BET RANGES
// ============================================

const VS_4BET_RANGES_CASH_6MAX_100BB: Record<string, Record<string, { raise: string; call: string }>> = {
  // Generic vs 4bet - very tight
  'default': {
    'default': { raise: 'AA,KK', call: 'QQ,JJ,AKs,AKo' },
  },
  'BTN': {
    'BB': { raise: 'AA,KK,QQ,AKs', call: 'JJ,TT,AKo,AQs' },
    'SB': { raise: 'AA,KK,QQ,AKs', call: 'JJ,TT,AKo,AQs' },
  },
  'SB': {
    'BB': { raise: 'AA,KK,QQ,AKs,A5s', call: 'JJ,TT,AKo,AQs,AJs' },
  },
};

// ============================================
// VS 5BET RANGES
// ============================================

const VS_5BET_RANGES_CASH_6MAX_100BB: Record<string, { raise: string; call: string }> = {
  'default': { raise: 'AA,KK', call: 'QQ,AKs' },
};

// ============================================
// STACK SIZE ADJUSTMENTS
// ============================================

// Shorter stacks = tighter ranges, less calling, more all-in or fold
function adjustRangeForStack(range: string, stackSize: StackSize, _scenario: Scenario): string {
  if (stackSize === 100) return range;

  const hands = parseRange(range);
  const allHands = generateAllHands();

  // Tightening factor based on stack size
  const tightenFactor = {
    40: 0.85,
    20: 0.7,
    10: 0.5,
    5: 0.35,
  }[stackSize] || 1;

  // Sort hands by strength (approximate)
  const handStrength: Record<string, number> = {};
  allHands.forEach((hand, idx) => {
    // Higher index = weaker hand in our grid iteration
    handStrength[hand] = 169 - idx;
  });

  // Premium hands that stay regardless
  const premiums = new Set(['AA', 'KK', 'QQ', 'JJ', 'AKs', 'AKo']);

  const sortedHands = Array.from(hands).sort((a, b) =>
    (handStrength[b] || 0) - (handStrength[a] || 0)
  );

  const keepCount = Math.ceil(sortedHands.length * tightenFactor);
  const keptHands = new Set(sortedHands.slice(0, keepCount));

  // Always keep premiums
  premiums.forEach(h => {
    if (hands.has(h)) keptHands.add(h);
  });

  return Array.from(keptHands).join(',');
}

// ============================================
// MTT ADJUSTMENTS
// ============================================

function adjustRangeForMTT(range: string, stackSize: StackSize): string {
  // MTT is generally tighter due to ICM, especially at shorter stacks
  const hands = parseRange(range);
  const allHands = generateAllHands();

  const tightenFactor = {
    100: 0.95,
    40: 0.85,
    20: 0.7,
    10: 0.55,
    5: 0.4,
  }[stackSize] || 0.9;

  const handStrength: Record<string, number> = {};
  allHands.forEach((hand, idx) => {
    handStrength[hand] = 169 - idx;
  });

  const premiums = new Set(['AA', 'KK', 'QQ', 'JJ', 'TT', 'AKs', 'AKo', 'AQs']);

  const sortedHands = Array.from(hands).sort((a, b) =>
    (handStrength[b] || 0) - (handStrength[a] || 0)
  );

  const keepCount = Math.ceil(sortedHands.length * tightenFactor);
  const keptHands = new Set(sortedHands.slice(0, keepCount));

  premiums.forEach(h => {
    if (hands.has(h)) keptHands.add(h);
  });

  return Array.from(keptHands).join(',');
}

// ============================================
// MAIN FUNCTION TO GET RANGE
// ============================================

export function getRange(
  format: GameFormat,
  players: PlayerCount,
  stackSize: StackSize,
  scenario: Scenario,
  heroPosition: Position,
  villainPosition?: Position
): RangeData {
  let raiseRange = '';
  let callRange = '';

  // Get base ranges (defaulting to 6-max for now)
  if (scenario === 'open') {
    const openRanges = players === 9
      ? OPEN_RANGES_CASH_9MAX_100BB
      : OPEN_RANGES_CASH_6MAX_100BB;

    const positionRanges = openRanges[heroPosition as string];
    if (positionRanges) {
      raiseRange = positionRanges.raise;
      callRange = ''; // Can't call when opening
    }
  } else if (scenario === 'vs-raise' && villainPosition) {
    const vsRaiseRanges = VS_RAISE_RANGES_CASH_6MAX_100BB;
    const heroRanges = vsRaiseRanges[heroPosition as string];
    if (heroRanges) {
      const vsVillain = heroRanges[villainPosition as string];
      if (vsVillain) {
        raiseRange = vsVillain.raise;
        callRange = vsVillain.call;
      }
    }
  } else if (scenario === 'vs-3bet' && villainPosition) {
    const vs3betRanges = VS_3BET_RANGES_CASH_6MAX_100BB;
    const heroRanges = vs3betRanges[heroPosition as string];
    if (heroRanges) {
      const vsVillain = heroRanges[villainPosition as string];
      if (vsVillain) {
        raiseRange = vsVillain.raise;
        callRange = vsVillain.call;
      }
    }
  } else if (scenario === 'vs-4bet' && villainPosition) {
    const vs4betRanges = VS_4BET_RANGES_CASH_6MAX_100BB;
    const heroRanges = vs4betRanges[heroPosition as string] || vs4betRanges['default'];
    if (heroRanges) {
      const vsVillain = heroRanges[villainPosition as string] || heroRanges['default'];
      if (vsVillain) {
        raiseRange = vsVillain.raise;
        callRange = vsVillain.call;
      }
    }
  } else if (scenario === 'vs-5bet') {
    const vs5betRanges = VS_5BET_RANGES_CASH_6MAX_100BB['default'];
    raiseRange = vs5betRanges.raise;
    callRange = vs5betRanges.call;
  }

  // Adjust for stack size
  if (stackSize !== 100) {
    raiseRange = adjustRangeForStack(raiseRange, stackSize, scenario);
    // At short stacks, calling ranges shrink dramatically
    if (stackSize <= 20) {
      callRange = adjustRangeForStack(callRange, stackSize, scenario);
    }
    if (stackSize <= 10) {
      // Very short stacks: mostly all-in or fold
      callRange = '';
    }
  }

  // Adjust for MTT
  if (format === 'mtt') {
    raiseRange = adjustRangeForMTT(raiseRange, stackSize);
    if (callRange) {
      callRange = adjustRangeForMTT(callRange, stackSize);
    }
  }

  return rangeToDecisions(raiseRange, callRange);
}

// Get valid positions for scenario
export function getValidHeroPositions(
  players: PlayerCount,
  scenario: Scenario
): Position[] {
  const positions: Position[] = players === 9 ? [...POSITIONS_9MAX] : [...POSITIONS_6MAX];

  if (scenario === 'open') {
    // Can't open from BB
    return positions.filter(p => p !== 'BB');
  }

  return positions;
}

export function getValidVillainPositions(
  players: PlayerCount,
  scenario: Scenario,
  heroPosition: Position
): Position[] {
  const positions: Position[] = players === 9 ? [...POSITIONS_9MAX] : [...POSITIONS_6MAX];
  const heroIdx = positions.indexOf(heroPosition);

  if (scenario === 'vs-raise') {
    // Villain must be in earlier position than hero
    return positions.slice(0, heroIdx);
  }

  if (scenario === 'vs-3bet') {
    // Villain must be in later position than hero (they 3bet our open)
    return positions.slice(heroIdx + 1);
  }

  if (scenario === 'vs-4bet') {
    // Villain 4bet us after we 3bet, so villain was original opener
    return positions.slice(0, heroIdx);
  }

  if (scenario === 'vs-5bet') {
    // Villain 5bet us after we 4bet
    return positions.slice(heroIdx + 1);
  }

  return positions.filter(p => p !== heroPosition);
}
