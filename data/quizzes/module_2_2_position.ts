import type { QuizData } from '@/types/quiz';

export const positionQuiz: QuizData = {
  moduleInfo: {
    id: "2.2",
    title: "Position Awareness",
    category: "Preflop Strategy",
    phase: 2,
    level: "Fundamental",
    passingScore: 80,
    estimatedTime: "25-30 minutes",
    timedModeMinutes: 22,
    speedModeMinutes: 11,
    learningOutcomes: [
      "Name and identify all table positions",
      "Explain why position provides advantage",
      "Adjust strategy based on position",
      "Recognize relative position concepts",
      "Exploit positional advantages against opponents"
    ],
    nextModule: {
      id: "2.3",
      title: "Open Raising Ranges"
    }
  },
  sections: [
    {
      id: "conceptual",
      title: "Section A: Conceptual Understanding",
      description: "Test your understanding of position theory and principles",
      weight: 20,
      questions: [
        {
          id: "c1",
          type: "multiple-choice",
          topic: "2.2.1 Table Position Fundamentals",
          question: "In a 9-handed game, what are the three main position categories in order?",
          options: [
            "Early, Middle, Late",
            "UTG, MP, BTN",
            "Front, Center, Back",
            "Blinds, Early, Late"
          ],
          correctAnswer: 0,
          explanation: "The three main position categories are: Early Position (UTG, UTG+1, UTG+2), Middle Position (MP, MP+1/Hijack), and Late Position (Cutoff, Button). The blinds are sometimes considered separately as 'out of position' postflop.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "c2",
          type: "multiple-choice",
          topic: "2.2.2 Why Position Matters",
          question: "What is the PRIMARY advantage of having position on your opponent?",
          options: [
            "You can see their cards before acting",
            "You act after them on all postflop streets, giving you information advantage",
            "You automatically win more pots",
            "Your hand equity increases by 10%"
          ],
          correctAnswer: 1,
          explanation: "Position gives you an information advantage - you see your opponent's action before you have to act. This allows you to make better decisions, control pot size, bluff more effectively, and extract more value. Position doesn't change your hand equity but greatly affects your ability to realize that equity.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "c3",
          type: "multiple-choice",
          topic: "2.2.2 Why Position Matters",
          question: "Why is position sometimes called 'the most important factor in poker' after your cards?",
          options: [
            "Because you can play any two cards from late position",
            "Because position affects every decision on every postflop street",
            "Because the button always wins the most money",
            "Because early position players should always fold"
          ],
          correctAnswer: 1,
          explanation: "Position affects EVERY postflop decision: bet sizing, bluffing, pot control, value extraction. While your cards matter for initial hand strength, position determines how effectively you can play those cards. This is why we play 3x more hands from the button than UTG.",
          difficulty: "medium",
          points: 1
        },
        {
          id: "c4",
          type: "true-false",
          topic: "2.2.1 Table Position Fundamentals",
          question: "In a 6-max game, there is no UTG position.",
          correctAnswer: false,
          explanation: "In 6-max, there IS a UTG position - it's just the first person to act. The positions in 6-max are: UTG, MP (or Hijack), CO (Cutoff), BTN (Button), SB, BB. UTG in 6-max is equivalent to UTG+3 or Hijack in 9-max.",
          difficulty: "medium",
          points: 1
        },
        {
          id: "c5",
          type: "multiple-choice",
          topic: "2.2.4 Relative Position",
          question: "What is 'relative position' in poker?",
          options: [
            "Your position relative to the dealer button",
            "Your position relative to the preflop aggressor",
            "How many seats away you are from an opponent",
            "Your chip stack position in a tournament"
          ],
          correctAnswer: 1,
          explanation: "Relative position refers to your position relative to the preflop raiser/aggressor. If you're in position on the raiser (acting after them postflop), you have the positional advantage. Even if you're in the BB, if the button raised and you called, you're out of position to them.",
          difficulty: "medium",
          points: 1
        },
        {
          id: "c6",
          type: "true-false",
          topic: "2.2.6 Common Positional Mistakes",
          question: "It's correct to play the same range of hands from UTG and from the button.",
          correctAnswer: false,
          explanation: "This is completely wrong and a major leak. Your range should be MUCH tighter from UTG (typically 15% of hands) than from the button (40-50% of hands). Early position has to act first all hand and faces many players behind, while button has position on everyone. Position dramatically affects hand selection.",
          difficulty: "easy",
          points: 1
        }
      ]
    },
    {
      id: "calculation",
      title: "Section B: Position Application Skills",
      description: "Demonstrate your ability to apply positional concepts",
      weight: 35,
      questions: [
        {
          id: "calc1",
          type: "multiple-choice",
          topic: "2.2.1 Table Position Fundamentals",
          question: "In a 9-max game, which position acts FIRST preflop?",
          options: [
            "Small Blind",
            "Big Blind",
            "Under the Gun (UTG)",
            "Dealer/Button"
          ],
          correctAnswer: 2,
          explanation: "Under the Gun (UTG) acts first preflop in a 9-max game. The blinds act last preflop but first on all postflop streets. This is why UTG is the worst position - you act first preflop with many players behind, and if called, you're usually out of position postflop.",
          difficulty: "easy",
          points: 2
        },
        {
          id: "calc2",
          type: "multiple-choice",
          topic: "2.2.1 Table Position Fundamentals",
          question: "In a 6-max game, arrange these positions from earliest to latest preflop action:",
          options: [
            "SB, BB, UTG, HJ, CO, BTN",
            "UTG, HJ, CO, BTN, SB, BB",
            "BB, SB, UTG, HJ, CO, BTN",
            "BTN, CO, HJ, UTG, SB, BB"
          ],
          correctAnswer: 1,
          explanation: "Preflop action order in 6-max: UTG (first to act), HJ (Hijack/MP), CO (Cutoff), BTN (Button), SB (Small Blind), BB (Big Blind acts last preflop). Remember: blinds act last preflop but first postflop.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "calc3",
          type: "multiple-choice",
          topic: "2.2.3 Position-Based Adjustments",
          question: "If you should open-raise 15% of hands from UTG in 9-max, approximately what percentage should you open from the button?",
          options: [
            "15% (same as UTG)",
            "25% (slightly wider)",
            "40-50% (much wider)",
            "100% (any two cards)"
          ],
          correctAnswer: 2,
          explanation: "From the button, you can profitably open 40-50% of hands (some aggressive players even more). This is 3x wider than UTG because: 1) You have position on everyone, 2) Only 2 players left to act (vs 8 from UTG), 3) You can steal blinds profitably. Position allows much wider ranges.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "calc4",
          type: "multiple-choice",
          topic: "2.2.2 Why Position Matters",
          question: "You're on the button with position. What advantage does this give you for pot control?",
          options: [
            "You can check back to see free cards",
            "You can bet to deny free cards",
            "You can make smaller bets knowing opponent checked",
            "All of the above"
          ],
          correctAnswer: 3,
          explanation: "Position gives you complete pot control: You can check back for free cards when you're weak, bet for value/protection when strong, and size your bets optimally based on opponent's action. Out of position, you might check-fold to a bet or check and face a bet you didn't want to call.",
          difficulty: "easy",
          points: 2
        },
        {
          id: "calc5",
          type: "multiple-choice",
          topic: "2.2.5 Positional Exploitation",
          question: "The cutoff opens, you're on the button. What positional advantage do you have?",
          options: [
            "You close the action - if you call/raise, blinds are getting bad odds",
            "You'll have position postflop",
            "You can 3-bet wider because you have position",
            "All of the above"
          ],
          correctAnswer: 3,
          explanation: "Button vs Cutoff is ideal: You have position postflop, you close the action (blinds getting squeezed), and you can profitably 3-bet wider with the positional advantage. This is why button 3-bets CO more than any other position.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "calc6",
          type: "multiple-choice",
          topic: "2.2.4 Relative Position",
          question: "CO raises, you call on the button, blinds fold. Who has the positional advantage postflop?",
          options: [
            "CO has position (they raised)",
            "Button has position (acts last)",
            "Neither - it's heads up",
            "Whoever has the stronger hand"
          ],
          correctAnswer: 1,
          explanation: "Button has the positional advantage - you will act LAST on every postflop street. Even though CO was the preflop raiser (aggressor), position is determined by who acts last postflop, not who raised. You're 'in position' on the CO player.",
          difficulty: "easy",
          points: 2
        },
        {
          id: "calc7",
          type: "multiple-choice",
          topic: "2.2.3 Position-Based Adjustments",
          question: "Which position should have the TIGHTEST opening range?",
          options: [
            "UTG in 9-max",
            "UTG in 6-max",
            "Middle Position in 9-max",
            "Cutoff in 6-max"
          ],
          correctAnswer: 0,
          explanation: "UTG in 9-max is the tightest opening position. You have: 1) The worst position (8 players acting after you), 2) Out of position postflop against most callers, 3) Highest likelihood of facing a 3-bet. Typical UTG 9-max range: 10-15% of hands (TT+, AQ+, KQs, etc.).",
          difficulty: "medium",
          points: 2
        }
      ]
    },
    {
      id: "application",
      title: "Section C: Practical Application",
      description: "Apply positional concepts to realistic poker scenarios",
      weight: 35,
      questions: [
        {
          id: "app1",
          type: "scenario",
          topic: "2.2.5 Positional Exploitation",
          scenario: "9-max $1/$2 game. Folds to you on the button with 9♠8♠. Both blinds are tight passive players.",
          question: "What should you do and why?",
          options: [
            "Fold - 98s is too weak",
            "Limp - see a cheap flop",
            "Raise - good stealing opportunity with position",
            "Wait for a better hand"
          ],
          correctAnswer: 2,
          explanation: "This is a clear raise (steal attempt). You have: 1) The best position (button), 2) Weak/tight opponents in the blinds, 3) A decent hand that plays well if called (suited connector). Even if called, you have position. Against tight blinds, you're winning this pot immediately a high percentage of the time.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "app2",
          type: "scenario",
          topic: "2.2.6 Common Positional Mistakes",
          scenario: "You have K♣Q♦ under the gun in a 9-max game. You think 'KQ is a strong hand, I should raise.'",
          question: "What's wrong with this thinking?",
          options: [
            "Nothing - KQ is strong enough for any position",
            "You're not considering position - KQ is too weak from UTG",
            "You should limp instead of raising",
            "You should only play KQ in tournaments"
          ],
          correctAnswer: 1,
          explanation: "This is a classic positional mistake. KQo might seem strong, but from UTG in 9-max it's a fold. You're out of position with 8 players behind, often dominated by AK/AQ that will call/3-bet, and you'll struggle postflop out of position. The same hand is a clear raise from the cutoff or button.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "app3",
          type: "scenario",
          topic: "2.2.2 Why Position Matters",
          scenario: "You raise from MP with A♦K♠, button calls. Flop: K♥7♣3♦. You have top pair. Why is being out of position difficult here?",
          question: "What's the main challenge of playing this hand out of position?",
          options: [
            "You have to act first without knowing if opponent has a strong hand",
            "You can't check back for pot control",
            "If you check, opponent might bet and you face a tough decision",
            "All of the above"
          ],
          correctAnswer: 3,
          explanation: "All are challenges of being OOP: If you bet and get raised, is it a bluff or better hand? If you check, you face a bet without information. You can't check back for pot control. In position, you'd see opponent's action first on every street, making decisions much easier.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "app4",
          type: "scenario",
          topic: "2.2.4 Relative Position",
          scenario: "6-max: UTG raises, you're in BB with 9♠9♥. You call. Flop comes A♥K♣Q♦. You check, UTG bets.",
          question: "Why is this situation particularly difficult without position?",
          options: [
            "You can't ever have AKQ from the BB",
            "You have to act first on every street and face bets without information",
            "Position doesn't matter when you have a pair",
            "You should have 3-bet preflop"
          ],
          correctAnswer: 1,
          explanation: "Being OOP on a scary board (AKQ) with a medium pair is extremely difficult. UTG could have any ace, king, or queen in their range. You check (don't know what to do), they bet (could be anything), now you face a decision with no information. In position, you'd see their action first and could make better decisions.",
          difficulty: "hard",
          points: 2
        },
        {
          id: "app5",
          type: "scenario",
          topic: "2.2.5 Positional Exploitation",
          scenario: "You're in the cutoff. A weak-tight player raises from middle position. You have A♠5♠.",
          question: "How should position influence your decision?",
          options: [
            "Fold - A5s is too weak regardless of position",
            "3-bet - you have position and can apply pressure",
            "Call - you need a stronger hand to 3-bet",
            "Position doesn't matter against tight players"
          ],
          correctAnswer: 1,
          explanation: "Against a tight player from the cutoff, A5s is a good 3-bet candidate. You have: 1) Position if they call, 2) Fold equity (tight players fold often), 3) A decent hand with equity if called. Your position allows you to apply pressure and play profitably even with marginal holdings.",
          difficulty: "hard",
          points: 2
        },
        {
          id: "app6",
          type: "scenario",
          topic: "2.2.3 Position-Based Adjustments",
          scenario: "You play regularly from the button and win money consistently. You decide to play the same range from UTG.",
          question: "What will happen?",
          options: [
            "You'll win even more from UTG since you're first to act",
            "You'll start losing money - the range is too wide for UTG",
            "Position doesn't affect win rate",
            "It depends on the cards you're dealt"
          ],
          correctAnswer: 1,
          explanation: "This is a disaster. A profitable button range (40-50% of hands) is way too wide for UTG (should be 12-15%). From UTG you're out of position, face 8 players, and will get 3-bet more. Hands like Q9s, K8s, 66, A7s are profitable from button but losers from UTG. Position matters enormously.",
          difficulty: "easy",
          points: 2
        }
      ]
    },
    {
      id: "speed",
      title: "Section D: Speed Round",
      description: "Quick position identification and concepts",
      weight: 10,
      timed: true,
      timePerQuestion: 12,
      questions: [
        {
          id: "speed1",
          type: "quick-calc",
          topic: "2.2.1 Table Position Fundamentals",
          question: "Best position in poker?",
          correctAnswer: "Button",
          acceptableAnswers: ["Button", "BTN", "button", "btn", "dealer"],
          explanation: "Button is the best position",
          difficulty: "easy",
          points: 1
        },
        {
          id: "speed2",
          type: "quick-calc",
          topic: "2.2.1 Table Position Fundamentals",
          question: "First to act preflop 9-max?",
          correctAnswer: "UTG",
          acceptableAnswers: ["UTG", "utg", "Under the gun", "under the gun"],
          explanation: "UTG acts first preflop",
          difficulty: "easy",
          points: 1
        },
        {
          id: "speed3",
          type: "quick-calc",
          topic: "2.2.1 Table Position Fundamentals",
          question: "What does CO stand for?",
          correctAnswer: "Cutoff",
          acceptableAnswers: ["Cutoff", "cutoff", "cut off", "Cut off"],
          explanation: "CO = Cutoff position",
          difficulty: "easy",
          points: 1
        },
        {
          id: "speed4",
          type: "quick-calc",
          topic: "2.2.3 Position-Based Adjustments",
          question: "Wider range: UTG or Button? (UTG/BTN)",
          correctAnswer: "BTN",
          acceptableAnswers: ["BTN", "Button", "button", "btn"],
          explanation: "Button plays much wider range than UTG",
          difficulty: "easy",
          points: 1
        },
        {
          id: "speed5",
          type: "quick-calc",
          topic: "2.2.1 Table Position Fundamentals",
          question: "Last to act postflop?",
          correctAnswer: "Button",
          acceptableAnswers: ["Button", "BTN", "button", "btn", "dealer"],
          explanation: "Button acts last on all postflop streets",
          difficulty: "easy",
          points: 1
        }
      ]
    }
  ]
};

export default positionQuiz;
