import type { QuizData } from '@/types/quiz';

export const startingHandsQuiz: QuizData = {
  moduleInfo: {
    id: "2.1",
    title: "Starting Hand Selection",
    category: "Preflop Strategy",
    phase: 2,
    level: "Fundamental",
    passingScore: 80,
    estimatedTime: "25-35 minutes",
    timedModeMinutes: 25,
    speedModeMinutes: 12,
    learningOutcomes: [
      "Categorize all 169 starting hands by playability",
      "Understand hand strength relativity (context-dependent)",
      "Recognize speculative vs. made hand potential",
      "Apply hand selection filters by game type",
      "Avoid common beginner hand selection mistakes"
    ],
    nextModule: {
      id: "2.2",
      title: "Position Awareness"
    }
  },
  sections: [
    {
      id: "conceptual",
      title: "Section A: Conceptual Understanding",
      description: "Test your understanding of starting hand categories and theory",
      weight: 20,
      questions: [
        {
          id: "c1",
          type: "multiple-choice",
          topic: "2.1.1 Hand Categories",
          question: "How many unique starting hands exist in Hold'em (accounting for suits)?",
          options: [
            "52",
            "169",
            "1,326",
            "2,652"
          ],
          correctAnswer: 1,
          explanation: "There are 169 unique starting hands in Texas Hold'em when we consider hand types (like AKs = one type, AKo = another type). There are 1,326 specific combinations when accounting for all suit combinations, but only 169 distinct hand types.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "c2",
          type: "multiple-choice",
          topic: "2.1.2 The 169 Starting Hands",
          question: "What is the primary difference in playability between suited and offsuit hands?",
          options: [
            "Suited hands are always 10% better",
            "Suited hands have flush potential and are worth approximately 2-3% more equity",
            "Offsuit hands play better postflop",
            "There's no real difference, it's mainly psychological"
          ],
          correctAnswer: 1,
          explanation: "Suited hands have flush potential, which adds approximately 2-3% equity compared to their offsuit counterparts. For example, AKs has about 3% more equity than AKo. This seems small but becomes significant in marginal situations.",
          difficulty: "medium",
          points: 1
        },
        {
          id: "c3",
          type: "multiple-choice",
          topic: "2.1.3 Hand Strength Relativity",
          question: "Why is hand strength 'relative' in poker?",
          options: [
            "Hand values change based on the number of players at the table",
            "Hand strength depends on position, stack depth, and opponent tendencies",
            "Some hands play better in tournaments than cash games",
            "All of the above"
          ],
          correctAnswer: 3,
          explanation: "Hand strength is highly contextual. A hand like 55 might be strong heads-up on the button but weak from early position in a 9-handed game. Stack depth affects speculative hands (set mining), and opponent tendencies determine how much value you can extract. All factors matter.",
          difficulty: "medium",
          points: 1
        },
        {
          id: "c4",
          type: "true-false",
          topic: "2.1.5 Trouble Hands",
          question: "Hands like KJ, QJ, and AT are called 'trouble hands' because they look strong but are often dominated.",
          correctAnswer: true,
          explanation: "These are classic trouble hands. They look good (broadway cards, can make straights) but are frequently dominated by better hands that opponents play aggressively (AK, AQ, KQ). When you make top pair, you're often behind or in a dominated situation with reverse implied odds.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "c5",
          type: "multiple-choice",
          topic: "2.1.4 Speculative Hands",
          question: "What conditions are ideal for playing speculative hands like small pocket pairs and suited connectors?",
          options: [
            "Deep stacks, in position, against loose passive opponents",
            "Short stacks, out of position, aggressive table",
            "Any time you're in the blinds",
            "Only in tournament situations"
          ],
          correctAnswer: 0,
          explanation: "Speculative hands need: 1) Deep stacks for implied odds (when you hit, you can win big), 2) Position to control the pot and see cheap cards, 3) Loose passive opponents who will pay you off. Without these conditions, speculative hands lose value significantly.",
          difficulty: "medium",
          points: 1
        },
        {
          id: "c6",
          type: "true-false",
          topic: "2.1.6 Game-Type Adjustments",
          question: "You should play more hands in 6-max games compared to 9-max games.",
          correctAnswer: true,
          explanation: "In 6-max games, you play more hands because: 1) Blinds come around faster, forcing action, 2) There are fewer players, so hand values go up relatively, 3) You're in late position more often. A 6-max opening range might be 20-25% vs. 15-18% in 9-max from the same position.",
          difficulty: "easy",
          points: 1
        }
      ]
    },
    {
      id: "calculation",
      title: "Section B: Hand Classification Skills",
      description: "Demonstrate your ability to classify and rank starting hands",
      weight: 35,
      questions: [
        {
          id: "calc1",
          type: "multiple-choice",
          topic: "2.1.1 Hand Categories",
          question: "Which hand category does K♠J♠ belong to?",
          options: [
            "Premium pairs",
            "Suited Broadway hands",
            "Suited connectors",
            "Trouble hands"
          ],
          correctAnswer: 1,
          explanation: "K♠J♠ is a suited Broadway hand (two cards T or higher, suited). It's also somewhat of a trouble hand because it can be dominated by better Broadway combinations. It's not a suited connector because K and J are one gap apart.",
          difficulty: "easy",
          points: 2
        },
        {
          id: "calc2",
          type: "multiple-choice",
          topic: "2.1.1 Hand Categories",
          question: "Rank these hand categories from strongest to weakest preflop equity:",
          options: [
            "Premium pairs > Suited Broadway > Suited connectors > Small pairs",
            "Premium pairs > Small pairs > Suited Broadway > Suited connectors",
            "Suited Broadway > Premium pairs > Small pairs > Suited connectors",
            "Premium pairs > Suited Broadway > Small pairs > Suited connectors"
          ],
          correctAnswer: 0,
          explanation: "The general ranking by raw preflop equity: Premium pairs (AA-QQ) are strongest, then suited Broadway (AKs, AQs, KQs), then medium suited connectors (JTs, T9s), then small pairs (22-66). However, playability and implied odds can shift this in specific situations.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "calc3",
          type: "multiple-choice",
          topic: "2.1.4 Speculative Hands",
          question: "You have 6♣6♦. To profitably set mine (call a raise hoping to flop a set), you typically need:",
          options: [
            "5-to-1 implied odds",
            "10-to-1 implied odds",
            "15-to-1 implied odds",
            "20-to-1 implied odds"
          ],
          correctAnswer: 2,
          explanation: "The rule of thumb for set mining is 15-to-1 implied odds. You'll flop a set about 1 in 8 times (12.5%), but you won't always win or get paid when you do. 15-to-1 accounts for times you flop a set and lose or don't get paid. Effective stack = 15x the call amount is the guideline.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "calc4",
          type: "multiple-choice",
          topic: "2.1.5 Trouble Hands",
          question: "Which of these is NOT typically considered a trouble hand?",
          options: [
            "KJo (King-Jack offsuit)",
            "QJo (Queen-Jack offsuit)",
            "ATo (Ace-Ten offsuit)",
            "AQs (Ace-Queen suited)"
          ],
          correctAnswer: 3,
          explanation: "AQs is a strong hand, not a trouble hand. It's only dominated by AK and AA. The others (KJo, QJo, ATo) are trouble hands because they're dominated by many hands players raise with (AK, AQ, KQ for KJo; AJ, KJ, QQ+ for QJo; AJ, AQ, AK for ATo).",
          difficulty: "easy",
          points: 2
        },
        {
          id: "calc5",
          type: "multiple-choice",
          topic: "2.1.2 The 169 Starting Hands",
          question: "How many ways can you be dealt pocket aces (A♠A♥, A♠A♦, etc.)?",
          options: [
            "4 combinations",
            "6 combinations",
            "8 combinations",
            "12 combinations"
          ],
          correctAnswer: 1,
          explanation: "There are 6 combinations of any pocket pair. For aces: A♠A♥, A♠A♦, A♠A♣, A♥A♦, A♥A♣, A♦A♣. This is calculated as 4 choose 2 = 6. Understanding combinatorics helps with range construction.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "calc6",
          type: "multiple-choice",
          topic: "2.1.2 The 169 Starting Hands",
          question: "How many combinations of AK exist (suited and offsuit)?",
          options: [
            "8 combinations",
            "12 combinations",
            "16 combinations",
            "20 combinations"
          ],
          correctAnswer: 2,
          explanation: "AK has 16 total combinations: 4 suited combinations (A♠K♠, A♥K♥, A♦K♦, A♣K♣) and 12 offsuit combinations (4 aces × 3 remaining kings for each ace). Suited hands have 4 combos, offsuit unpaired hands have 12 combos.",
          difficulty: "hard",
          points: 2
        },
        {
          id: "calc7",
          type: "multiple-choice",
          topic: "2.1.1 Hand Categories",
          question: "Which statement about suited connectors is TRUE?",
          options: [
            "J9s is a stronger suited connector than JTs",
            "Suited connectors with one gap (like T8s) are called 'suited gappers'",
            "All suited connectors have exactly the same equity preflop",
            "Suited connectors should be played from any position"
          ],
          correctAnswer: 1,
          explanation: "Hands like T8s (one gap), 97s (one gap) are called suited gappers or suited one-gappers. True suited connectors have no gaps (JTs, T9s, 98s, etc.). Suited connectors vary in strength (JTs > 65s), and position matters significantly for these speculative hands.",
          difficulty: "medium",
          points: 2
        }
      ]
    },
    {
      id: "application",
      title: "Section C: Practical Application",
      description: "Apply hand selection concepts to realistic poker scenarios",
      weight: 35,
      questions: [
        {
          id: "app1",
          type: "scenario",
          topic: "2.1.3 Hand Strength Relativity",
          scenario: "$1/$2 cash game, 9-handed, 100bb effective stacks. You have K♠J♦ under the gun (UTG - first position to act).",
          question: "What is the correct play with KJo from UTG?",
          options: [
            "Raise - it's a broadway hand",
            "Limp - see a cheap flop",
            "Fold - too weak for early position",
            "Call and see what others do"
          ],
          correctAnswer: 2,
          explanation: "KJo is a fold from UTG in a 9-max game. It's a classic trouble hand that plays poorly out of position and is dominated by many hands (AK, AQ, AJ, KQ, QQ+). Your UTG range should be much tighter (TT+, AQ+, maybe KQs). Position matters enormously.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "app2",
          type: "scenario",
          topic: "2.1.4 Speculative Hands",
          scenario: "6-max $1/$2 cash game. You have 5♥5♣ on the button. MP raises to $8, you have $200 behind, MP covers you.",
          question: "Should you call to set mine?",
          options: [
            "No - need at least $120 behind to set mine with 15:1 implied odds",
            "Yes - you have enough stack depth",
            "Raise - show strength with a pocket pair",
            "Fold - 55 is too weak"
          ],
          correctAnswer: 0,
          explanation: "To profitably set mine, you need 15x the call amount in effective stacks. Calling $8 requires $120 behind ($8 × 15 = $120). You have $200, but more importantly, does the opponent have enough to pay you off? If MP has $120+, this is a reasonable set mine call in position.",
          difficulty: "hard",
          points: 2
        },
        {
          id: "app3",
          type: "scenario",
          topic: "2.1.5 Trouble Hands",
          scenario: "You have Q♥J♠ in middle position in a 9-max game. Action folds to you.",
          question: "What's the problem with playing QJo from middle position?",
          options: [
            "It can't make a straight",
            "It's dominated by many hands that will continue vs your raise",
            "It has no showdown value",
            "Position doesn't matter with broadway cards"
          ],
          correctAnswer: 1,
          explanation: "QJo is dominated by AQ, AJ, KQ, KJ, and QQ+. When you raise and get called or 3-bet, you're often behind. When you make top pair (Q or J), you're frequently losing to better pairs or better kickers. This creates reverse implied odds - you lose big pots when you hit.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "app4",
          type: "scenario",
          topic: "2.1.6 Game-Type Adjustments",
          scenario: "You typically open 15% of hands from the Cutoff in 9-max cash games. You're now playing 6-max.",
          question: "How should you adjust your Cutoff opening range in 6-max?",
          options: [
            "Keep it the same at 15%",
            "Tighten to 10-12%",
            "Widen to 25-30%",
            "Only play premium pairs"
          ],
          correctAnswer: 2,
          explanation: "In 6-max, you should widen your ranges significantly. The Cutoff in 6-max is relatively stronger positionally, and with fewer players, hand values increase. A typical 6-max Cutoff range might be 25-30% vs. 15-20% in 9-max. You're in position more often and face fewer players.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "app5",
          type: "scenario",
          topic: "2.1.4 Speculative Hands",
          scenario: "You have 8♠7♠ on the button. Two tight players limp, action is on you with 200bb stacks.",
          question: "What's the best play?",
          options: [
            "Fold - too speculative",
            "Limp behind - good implied odds with position",
            "Raise - isolate the limpers",
            "Call if suited, fold if offsuit"
          ],
          correctAnswer: 1,
          explanation: "This is an ideal spot for suited connectors: deep stacks (200bb = great implied odds), in position (button), against multiple opponents who will likely call (limpers). Limping behind with 87s here is fine, or you could raise to isolate. The key is you have position and deep stacks.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "app6",
          type: "scenario",
          topic: "2.1.3 Hand Strength Relativity",
          scenario: "Tournament: You have A♠T♦ in the big blind. Button raises, small blind folds. Effective stack is 15bb.",
          question: "How does short stack depth (15bb) affect playing ATo?",
          options: [
            "ATo becomes stronger - should always 3-bet jam",
            "ATo becomes weaker - should fold more",
            "Stack depth doesn't matter for hand selection",
            "ATo is a reasonable 3-bet jam or call given the short stack"
          ],
          correctAnswer: 3,
          explanation: "At 15bb, ATo increases in value because: 1) You can't play postflop poker effectively with shallow stacks, 2) Showdown value matters more, 3) Fold equity from jamming is significant. ATo is often a 3-bet jam or call vs. a button raise at this stack depth, whereas at 100bb it's more problematic.",
          difficulty: "hard",
          points: 2
        }
      ]
    },
    {
      id: "speed",
      title: "Section D: Speed Round",
      description: "Quick hand classification to test your knowledge",
      weight: 10,
      timed: true,
      timePerQuestion: 15,
      questions: [
        {
          id: "speed1",
          type: "quick-calc",
          topic: "2.1.2 The 169 Starting Hands",
          question: "Total unique starting hand types?",
          correctAnswer: "169",
          acceptableAnswers: ["169", "169 hands", "one hundred sixty nine"],
          explanation: "169 unique starting hands in Hold'em",
          difficulty: "easy",
          points: 1
        },
        {
          id: "speed2",
          type: "quick-calc",
          topic: "2.1.2 The 169 Starting Hands",
          question: "How many combinations of pocket aces?",
          correctAnswer: "6",
          acceptableAnswers: ["6", "six", "6 combos"],
          explanation: "6 combinations of any pocket pair",
          difficulty: "easy",
          points: 1
        },
        {
          id: "speed3",
          type: "quick-calc",
          topic: "2.1.4 Speculative Hands",
          question: "Implied odds needed to set mine?",
          correctAnswer: "15:1",
          acceptableAnswers: ["15", "15:1", "15 to 1", "15-1"],
          explanation: "15-to-1 implied odds for set mining",
          difficulty: "medium",
          points: 1
        },
        {
          id: "speed4",
          type: "quick-calc",
          topic: "2.1.2 The 169 Starting Hands",
          question: "Suited or offsuit better? (S or O)",
          correctAnswer: "S",
          acceptableAnswers: ["S", "suited", "Suited", "s"],
          explanation: "Suited hands are better (+2-3% equity)",
          difficulty: "easy",
          points: 1
        },
        {
          id: "speed5",
          type: "quick-calc",
          topic: "2.1.5 Trouble Hands",
          question: "Is KJo a trouble hand? (Y/N)",
          correctAnswer: "Y",
          acceptableAnswers: ["Y", "yes", "Yes", "YES", "y"],
          explanation: "KJo is a classic trouble hand - often dominated",
          difficulty: "easy",
          points: 1
        }
      ]
    }
  ]
};

export default startingHandsQuiz;
