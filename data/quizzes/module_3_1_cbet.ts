import type { QuizData } from '@/types/quiz';

export const cbetQuiz: QuizData = {
  moduleInfo: {
    id: "3.1",
    title: "Continuation Betting",
    category: "Postflop Strategy",
    phase: 3,
    level: "Fundamental",
    passingScore: 80,
    estimatedTime: "30-40 minutes",
    timedModeMinutes: 30,
    speedModeMinutes: 15,
    learningOutcomes: [
      "Define continuation betting and its purposes",
      "Analyze board textures for c-bet decisions",
      "Select appropriate c-bet sizing by texture",
      "Determine c-bet frequency by situation",
      "Avoid common c-bet mistakes"
    ],
    nextModule: {
      id: "3.2",
      title: "Value Betting"
    }
  },
  sections: [
    {
      id: "conceptual",
      title: "Section A: Conceptual Understanding",
      description: "Test your understanding of c-bet theory and principles",
      weight: 20,
      questions: [
        {
          id: "c1",
          type: "multiple-choice",
          topic: "3.1.1 C-Bet Fundamentals",
          question: "What is a continuation bet (c-bet)?",
          options: [
            "Any bet made on the flop",
            "A bet made by the preflop aggressor on the flop",
            "A bet that continues from flop to turn",
            "A bet made after checking the flop"
          ],
          correctAnswer: 1,
          explanation: "A continuation bet (c-bet) is when the preflop raiser bets again on the flop, 'continuing' their aggression. This is one of the most common and fundamental plays in poker. You're representing that the flop helped your hand.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "c2",
          type: "multiple-choice",
          topic: "3.1.1 C-Bet Fundamentals",
          question: "Why does continuation betting work so effectively?",
          options: [
            "You always have the best hand when you raised preflop",
            "Most flops miss most ranges, and the aggressor is credible",
            "Opponents are scared of any bet",
            "It only works in tournaments"
          ],
          correctAnswer: 1,
          explanation: "C-betting works because: 1) Most flops miss most hands (you'll miss ~2/3 of flops), 2) The preflop raiser's range is perceived as strong, 3) You have range advantage on many boards, 4) You have the initiative. Opponents often have weak hands and must fold to aggression.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "c3",
          type: "multiple-choice",
          topic: "3.1.2 Board Texture Categories",
          question: "What is a 'dry' board texture?",
          options: [
            "A board with no flush draws",
            "A board with disconnected cards and few draws",
            "A board with three cards of different suits",
            "Any paired board"
          ],
          correctAnswer: 1,
          explanation: "A dry board has disconnected cards with few drawing possibilities. Examples: K♠7♦2♣, A♥9♣4♦, Q♦6♠2♥. These boards favor the preflop raiser because: 1) Few draws exist, 2) Caller's range has difficulty connecting, 3) Overpairs/top pairs are very strong. C-bet frequently on dry boards.",
          difficulty: "medium",
          points: 1
        },
        {
          id: "c4",
          type: "multiple-choice",
          topic: "3.1.2 Board Texture Categories",
          question: "What is a 'wet' board texture?",
          options: [
            "A board with three cards of the same suit",
            "A board with many connected cards and possible draws",
            "Any flop with two hearts",
            "A board after it rains"
          ],
          correctAnswer: 1,
          explanation: "A wet board has many connected cards, straight/flush draws, and possible made hands. Examples: J♥T♥8♦, 9♠8♠7♣, Q♥J♦T♠. These boards favor the caller's range (more suited connectors, speculative hands). You should c-bet less frequently and often use smaller sizes on wet boards.",
          difficulty: "medium",
          points: 1
        },
        {
          id: "c5",
          type: "true-false",
          topic: "3.1.4 C-Bet Frequency by Board Type",
          question: "You should c-bet close to 100% of the time regardless of board texture.",
          correctAnswer: false,
          explanation: "This is completely wrong and a major leak. C-bet frequency should vary dramatically by board texture: ~75-100% on dry boards (K72r), ~40-60% on wet boards (JT8ss), ~60-80% on paired boards. Over-cbetting wet boards is burning money - many boards favor the caller's range.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "c6",
          type: "multiple-choice",
          topic: "3.1.3 C-Bet Sizing Strategy",
          question: "What c-bet sizing principle is generally correct?",
          options: [
            "Always bet pot-sized for maximum fold equity",
            "Smaller bets on dry boards, larger bets on wet boards",
            "Smaller bets on wet boards, larger bets on dry boards when you want protection",
            "Always bet 1/3 pot"
          ],
          correctAnswer: 2,
          explanation: "Modern c-bet theory: Use SMALLER sizes (25-40% pot) on dry boards where you have range advantage and need less equity to make betting profitable. Use LARGER sizes (60-75% pot) when you need protection (wet boards with strong hands) or when polarizing your range.",
          difficulty: "hard",
          points: 1
        }
      ]
    },
    {
      id: "calculation",
      title: "Section B: Board Analysis Skills",
      description: "Demonstrate your ability to analyze boards for c-bet decisions",
      weight: 35,
      questions: [
        {
          id: "calc1",
          type: "multiple-choice",
          topic: "3.1.2 Board Texture Categories",
          question: "Which board is the DRIEST?",
          options: [
            "J♥T♥8♦",
            "K♠7♣2♦",
            "9♠8♠7♣",
            "A♦K♦Q♠"
          ],
          correctAnswer: 1,
          explanation: "K♠7♣2♦ (rainbow, disconnected) is the driest board. It has: 1) No flush draws, 2) No straight draws, 3) Disconnected cards (no coordination). Compare to the wet boards: JT8 (many straights), 987 (coordinated), AKQ (premium cards, many combinations). Dry boards = high c-bet frequency.",
          difficulty: "easy",
          points: 2
        },
        {
          id: "calc2",
          type: "multiple-choice",
          topic: "3.1.2 Board Texture Categories",
          question: "Classify this board: Q♠8♠4♠ (three spades)",
          options: [
            "Dry board",
            "Wet board",
            "Monotone board (also wet)",
            "Paired board"
          ],
          correctAnswer: 2,
          explanation: "This is a monotone board (three cards of same suit) and is also very wet. Monotone boards are tricky because: 1) Many flush possibilities exist, 2) Caller's range has more suited hands, 3) Check-raising is common. C-bet with care - often check back weak hands or use small sizing.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "calc3",
          type: "multiple-choice",
          topic: "3.1.3 C-Bet Sizing Strategy",
          question: "You raised preflop and flop comes K♠7♦2♣ (dry). Pot is $20. What's the best c-bet size?",
          options: [
            "$5 (25% pot) - small size on dry board",
            "$10 (50% pot) - half pot",
            "$15 (75% pot) - large size for protection",
            "$20 (pot-sized) - maximum fold equity"
          ],
          correctAnswer: 0,
          explanation: "On dry boards like K72r, use SMALL c-bet sizes (25-33% pot). You have range advantage, opponent's weak hands must fold regardless of sizing, and small bets are more profitable. Here, betting $5-7 accomplishes the same as betting $20 but risks less. Modern strategy favors small c-bets on dry boards.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "calc4",
          type: "multiple-choice",
          topic: "3.1.3 C-Bet Sizing Strategy",
          question: "You raised preflop with A♠A♦ and flop comes J♥T♥8♦ (wet, coordinated). Pot is $30. Best c-bet size?",
          options: [
            "$8 (25% pot) - small size",
            "$15 (50% pot) - half pot",
            "$20-23 (66-75% pot) - large size for protection",
            "Check - too dangerous to bet"
          ],
          correctAnswer: 2,
          explanation: "With a strong hand (overpair) on a wet board, use a LARGER c-bet (66-75% pot) for protection. You want to: 1) Charge draws the maximum, 2) Build a pot, 3) Get value. Many draws exist (any Q, 9, K for straights, hearts for flush). Bet big to protect your equity and get folds/value.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "calc5",
          type: "multiple-choice",
          topic: "3.1.4 C-Bet Frequency by Board Type",
          question: "Which board should you c-bet most frequently on?",
          options: [
            "A♠K♥Q♦ (high cards, connected)",
            "K♠7♦2♣ (dry, rainbow)",
            "8♠7♠6♦ (wet, coordinated)",
            "9♣9♦4♥ (paired)"
          ],
          correctAnswer: 1,
          explanation: "K72 rainbow is the highest frequency c-bet board. It's dry, disconnected, favors the raiser's range heavily, and caller's range struggles to connect. You should c-bet 75-100% of your range here. The other boards require lower frequency: AKQ (caller has more broadway), 876 (very wet), 994 (medium frequency).",
          difficulty: "easy",
          points: 2
        },
        {
          id: "calc6",
          type: "multiple-choice",
          topic: "3.1.2 Board Texture Categories",
          question: "Classify: 9♣9♦3♥ (paired board)",
          options: [
            "Dry board - no draws",
            "Paired board - generally favors preflop raiser",
            "Wet board - many possible hands",
            "Monotone board"
          ],
          correctAnswer: 1,
          explanation: "This is a paired board with a low pair. Paired boards generally favor the preflop raiser because: 1) Trips are rare, 2) Overpairs are very strong, 3) Bluffing is credible (you could have the 9). However, paired boards allow more checking as well. This specific board (low pair) is high c-bet frequency.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "calc7",
          type: "multiple-choice",
          topic: "3.1.5 C-Bet by Position",
          question: "How does being IN POSITION affect your c-betting strategy?",
          options: [
            "You should c-bet less in position",
            "Position doesn't affect c-betting",
            "You can c-bet wider ranges and use more varied sizing in position",
            "You should always check in position"
          ],
          correctAnswer: 2,
          explanation: "In position, you can: 1) C-bet a wider range (you can control pot on later streets), 2) Use smaller bets profitably (you see opponent's action on turn/river), 3) Give up more easily when called (positional advantage remains). Out of position, you need to be more selective and use larger sizes.",
          difficulty: "medium",
          points: 2
        }
      ]
    },
    {
      id: "application",
      title: "Section C: Practical Application",
      description: "Apply c-bet concepts to realistic poker scenarios",
      weight: 35,
      questions: [
        {
          id: "app1",
          type: "scenario",
          topic: "3.1.4 C-Bet Frequency by Board Type",
          scenario: "You raised from the button with A♠5♠. BB calls. Flop: K♠7♦2♣. Pot is $15. You completely missed.",
          question: "Should you c-bet?",
          options: [
            "Check - you missed completely",
            "C-bet small ($5) - dry board, high fold equity",
            "C-bet large ($15) - show strength",
            "Give up - king is too scary"
          ],
          correctAnswer: 1,
          explanation: "C-bet small ($5, about 33% pot) on this dry K72 rainbow board. You have: 1) Range advantage (more kings in your range), 2) Positional advantage, 3) A gutshot and backdoor flush draw, 4) High fold equity on dry boards. This is a standard profitable c-bet bluff even with ace-high.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "app2",
          type: "scenario",
          topic: "3.1.6 C-Bet Mistakes to Avoid",
          scenario: "You raised UTG with 7♠7♥. Two players call. Flop: J♥T♥8♦ (wet, connected). You're out of position.",
          question: "What's the best play?",
          options: [
            "C-bet large - protect your hand",
            "C-bet small - just for information",
            "Check - you're multi-way and out of position on a terrible board",
            "Bet pot - represent a strong hand"
          ],
          correctAnswer: 2,
          explanation: "Check and likely give up. This is a disaster: 1) Wet, coordinated board (JT8 two-tone), 2) Multi-way pot (lower fold equity), 3) Out of position, 4) Your 77 has little equity vs callers' ranges. This board hits callers' ranges hard. C-betting here is burning money - check and fold to aggression.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "app3",
          type: "scenario",
          topic: "3.1.3 C-Bet Sizing Strategy",
          scenario: "You raised CO with Q♠Q♥. BTN calls. Flop: A♥9♣4♦. Pot is $20.",
          question: "You have an underpair to the ace. What's the best play?",
          options: [
            "Check - you're behind any ace",
            "C-bet small ($6-7, 30-35%) - represent the ace with range advantage",
            "C-bet large ($15, 75%) - protect against draws",
            "Give up the pot"
          ],
          correctAnswer: 1,
          explanation: "C-bet small ($6-7) on this A94 rainbow board. You have range advantage (more aces as the raiser), and this dry board is high c-bet frequency. Your actual hand (QQ) is almost irrelevant - you're representing your range. If called, you can check-fold turn. Small sizing gets similar folds to large sizing.",
          difficulty: "hard",
          points: 2
        },
        {
          id: "app4",
          type: "scenario",
          topic: "3.1.5 C-Bet by Position",
          scenario: "You raised BTN with 6♠5♠. SB folds, BB calls. Flop: K♠8♥3♠ (you have flush draw + gutshot). Pot is $14.",
          question: "What's your plan?",
          options: [
            "Check back - you missed",
            "C-bet small ($5) - semi-bluff with position and equity",
            "C-bet large ($14) - represent the king",
            "Fold to any action"
          ],
          correctAnswer: 1,
          explanation: "C-bet small ($5, ~35% pot) with your strong draw. You have: 1) Flush draw (9 outs), 2) Gutshot (3 more outs), 3) Position, 4) Fold equity. This is a profitable semi-bluff. If called, you have 12 outs. Small sizing gets folds and sets up turn barreling. Perfect c-bet spot in position.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "app5",
          type: "scenario",
          topic: "3.1.2 Board Texture Categories",
          scenario: "You raised MP with A♠K♦. CO calls. Flop: 2♠2♥2♣ (trip deuces on board).",
          question: "How should you approach this extremely dry paired board?",
          options: [
            "Always c-bet - you could have a deuce",
            "Check - no one has anything",
            "C-bet with a mixed strategy - sometimes bet, sometimes check",
            "Only bet if you have pocket aces"
          ],
          correctAnswer: 2,
          explanation: "On 222 boards, use a mixed strategy. Neither player has trips almost ever. Both can credibly represent it. Some considerations: 1) Check sometimes with everything (including AA) because checking is underbluffed, 2) Bet sometimes with air for when opponent checks back weak hands, 3) Bet is more credible in position. No clear-cut answer - mix your play.",
          difficulty: "hard",
          points: 2
        },
        {
          id: "app6",
          type: "scenario",
          topic: "3.1.6 C-Bet Mistakes to Avoid",
          scenario: "You notice you've been c-betting 95% of flops for the past hour, regardless of texture.",
          question: "What's the problem with this strategy?",
          options: [
            "Nothing - aggression wins",
            "You're over-cbetting and burning money on boards that favor the caller",
            "You should be c-betting 100%",
            "C-bet frequency doesn't matter"
          ],
          correctAnswer: 1,
          explanation: "You're over-cbetting, a common leak. Problems: 1) Some boards favor the caller (wet, connected boards), 2) You're betting with no fold equity on bad boards, 3) Opponents can exploit by check-raising, 4) You're losing money on -EV c-bets. Adjust frequency by texture: high on dry, low on wet.",
          difficulty: "easy",
          points: 2
        }
      ]
    },
    {
      id: "speed",
      title: "Section D: Speed Round",
      description: "Quick board texture and c-bet recognition",
      weight: 10,
      timed: true,
      timePerQuestion: 15,
      questions: [
        {
          id: "speed1",
          type: "quick-calc",
          topic: "3.1.1 C-Bet Fundamentals",
          question: "Who makes a c-bet?",
          correctAnswer: "Preflop raiser",
          acceptableAnswers: ["preflop raiser", "Preflop raiser", "raiser", "Raiser", "aggressor", "Aggressor"],
          explanation: "Preflop raiser makes the c-bet",
          difficulty: "easy",
          points: 1
        },
        {
          id: "speed2",
          type: "quick-calc",
          topic: "3.1.2 Board Texture Categories",
          question: "K72 rainbow - dry or wet?",
          correctAnswer: "Dry",
          acceptableAnswers: ["dry", "Dry", "d", "D"],
          explanation: "K72 rainbow is a dry board",
          difficulty: "easy",
          points: 1
        },
        {
          id: "speed3",
          type: "quick-calc",
          topic: "3.1.2 Board Texture Categories",
          question: "JT8 two-tone - dry or wet?",
          correctAnswer: "Wet",
          acceptableAnswers: ["wet", "Wet", "w", "W"],
          explanation: "JT8 is a wet, coordinated board",
          difficulty: "easy",
          points: 1
        },
        {
          id: "speed4",
          type: "quick-calc",
          topic: "3.1.3 C-Bet Sizing Strategy",
          question: "Dry board bet size? (S/M/L)",
          correctAnswer: "S",
          acceptableAnswers: ["S", "s", "small", "Small"],
          explanation: "Small sizing (25-35%) on dry boards",
          difficulty: "medium",
          points: 1
        },
        {
          id: "speed5",
          type: "quick-calc",
          topic: "3.1.4 C-Bet Frequency by Board Type",
          question: "C-bet more on dry or wet boards?",
          correctAnswer: "Dry",
          acceptableAnswers: ["dry", "Dry", "d", "D"],
          explanation: "C-bet more frequently on dry boards",
          difficulty: "easy",
          points: 1
        }
      ]
    }
  ]
};

export default cbetQuiz;
