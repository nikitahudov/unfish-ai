import type { QuizData } from '@/types/quiz';

export const boardTextureQuiz: QuizData = {
  moduleInfo: {
    id: "5.1",
    title: "Board Texture Analysis",
    category: "Hand Reading & Board Analysis",
    phase: 2,
    level: "Intermediate",
    passingScore: 80,
    estimatedTime: "25-35 minutes",
    timedModeMinutes: 25,
    speedModeMinutes: 12,
    learningOutcomes: [
      "Instantly categorize any board texture",
      "Identify which ranges connect with boards",
      "Recognize draw possibilities on any board",
      "Predict opponent's likely holdings based on board",
      "Adjust strategy based on texture dynamics"
    ],
    nextModule: {
      id: "5.2",
      title: "Showdown Analysis"
    }
  },
  sections: [
    {
      id: "conceptual",
      title: "Section A: Conceptual Understanding",
      description: "Test your understanding of board texture concepts",
      weight: 20,
      questions: [
        {
          id: "5.1-c1",
          type: "multiple-choice",
          topic: "5.1.1 Board Texture Dimensions",
          question: "What are the main dimensions used to categorize board texture?",
          options: [
            "Wet vs dry only",
            "Connectedness, suitedness, card ranks, and pairing",
            "High vs low only",
            "Number of face cards"
          ],
          correctAnswer: 1,
          explanation: "Board texture is evaluated across multiple dimensions: (1) Connectedness (how cards connect for straights), (2) Suitedness (rainbow, two-tone, monotone), (3) Card ranks (high, medium, low), and (4) Pairing (paired vs unpaired). Understanding all dimensions helps you assess the board accurately.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "5.1-c2",
          type: "multiple-choice",
          topic: "5.1.2 Dry Board Analysis",
          question: "What characterizes a dry board?",
          options: [
            "Many possible straights and flushes",
            "Low connectivity, few draw possibilities, often rainbow",
            "All cards above ten",
            "A paired board"
          ],
          correctAnswer: 1,
          explanation: "Dry boards have LOW connectivity (few straight possibilities), are often RAINBOW (no flush draws), and have FEW draw possibilities. Examples: K♠7♦2♣ or A♥9♣4♠. On dry boards, ranges are more defined - either you hit or you didn't. There's less to draw to.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "5.1-c3",
          type: "multiple-choice",
          topic: "5.1.3 Wet Board Analysis",
          question: "What characterizes a wet board?",
          options: [
            "The board has three spades",
            "High connectivity, many draw possibilities, often suited",
            "The board is unpaired",
            "All low cards"
          ],
          correctAnswer: 1,
          explanation: "Wet boards have HIGH connectivity (many straight possibilities), multiple draw combos, and are often TWO-TONE or MONOTONE. Examples: J♥T♥8♦ or 9♠8♠5♣. On wet boards, ranges are wider and less defined - many hands have equity through draws. Action is more frequent.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "5.1-c4",
          type: "true-false",
          topic: "5.1.4 Special Board Types",
          question: "A monotone board (all three cards same suit) generally favors the preflop aggressor's range.",
          correctAnswer: false,
          explanation: "False! Monotone boards actually favor the CALLER'S range more. While the preflop raiser has more unpaired high cards, suited connectors and suited hands are more common in calling ranges. The caller has more flush possibilities. However, the raiser can still c-bet, but with lower frequency.",
          difficulty: "medium",
          points: 1
        },
        {
          id: "5.1-c5",
          type: "multiple-choice",
          topic: "5.1.5 Range-Board Interaction",
          question: "On a board of A♠K♣Q♦ (broadway-heavy), whose range is stronger?",
          options: [
            "The caller's range",
            "The preflop raiser's range",
            "Both ranges are equal",
            "It depends on position only"
          ],
          correctAnswer: 1,
          explanation: "The preflop RAISER's range is much stronger on broadway-heavy boards like AKQ. Raisers have more AK, AQ, KK, AA, etc. Callers rarely have these premium hands (they would have raised). This is a high c-bet frequency board for the raiser - they connect hard and the caller struggles.",
          difficulty: "medium",
          points: 1
        },
        {
          id: "5.1-c6",
          type: "true-false",
          topic: "5.1.6 Board Texture and Strategy",
          question: "You should c-bet more frequently on dry boards than wet boards.",
          correctAnswer: true,
          explanation: "True! On dry boards, you should c-bet at higher frequency because: (1) Opponent missed more often (less connectivity), (2) They have fewer draws to continue with, (3) Your range advantage is clearer. On wet boards, opponent has more equity and reasons to continue, so you should check more and be more selective with c-bets.",
          difficulty: "medium",
          points: 1
        }
      ]
    },
    {
      id: "application",
      title: "Section B: Board Classification",
      description: "Demonstrate your ability to categorize and analyze board textures",
      weight: 35,
      questions: [
        {
          id: "5.1-a1",
          type: "multiple-choice",
          topic: "5.1.2 Dry Board Analysis",
          question: "Categorize this board: K♠7♦2♣",
          options: [
            "Wet - many draws possible",
            "Dry - low connectivity, rainbow, few draws",
            "Monotone - all same suit",
            "Paired - has a pair"
          ],
          correctAnswer: 1,
          explanation: "This is a DRY board. K♠7♦2♣ is rainbow (no flush draws), has very low connectivity (no straight draws), and is unpaired. This is one of the driest possible textures. The raiser should c-bet frequently here, and the caller needs to have hit a K, 7, or 2 to continue.",
          difficulty: "easy",
          points: 2
        },
        {
          id: "5.1-a2",
          type: "multiple-choice",
          topic: "5.1.3 Wet Board Analysis",
          question: "Categorize this board: J♥T♥8♦",
          options: [
            "Dry - no draws",
            "Wet - high connectivity, flush draw, straight draws",
            "Static - nothing changes",
            "Paired board"
          ],
          correctAnswer: 1,
          explanation: "This is a WET board. J♥T♥8♦ is two-tone (heart flush draw), highly connected (multiple straight draws: Q9, 97, A9K, etc.), and in the medium rank range where many hands connect. Both ranges have lots of equity here. This is a check more, bet less, play carefully type of board.",
          difficulty: "easy",
          points: 2
        },
        {
          id: "5.1-a3",
          type: "multiple-choice",
          topic: "5.1.4 Special Board Types",
          question: "Categorize this board: 9♠9♥5♣",
          options: [
            "Dry unpaired board",
            "Paired board - favors preflop raiser",
            "Wet board - many draws",
            "Monotone board"
          ],
          correctAnswer: 1,
          explanation: "This is a PAIRED board (9♠9♥5♣). Paired boards generally favor the preflop raiser because: (1) It's hard for either player to have the trips, so the raiser's range advantage matters more, (2) Raiser can represent the 9 credibly. However, when someone actually has the 9, it's extremely strong. C-bet frequency should be high here.",
          difficulty: "easy",
          points: 2
        },
        {
          id: "5.1-a4",
          type: "multiple-choice",
          topic: "5.1.1 Board Texture Dimensions",
          question: "Board: 6♠5♠4♠. What's the dominant texture characteristic?",
          options: [
            "Low card ranks",
            "High connectivity",
            "Monotone (all spades)",
            "Paired"
          ],
          correctAnswer: 2,
          explanation: "The dominant characteristic is MONOTONE (all spades). While this board is also connected and low, the monotone nature dominates strategy - anyone without a spade is in trouble. This actually favors the caller's range (more suited hands) and the raiser should c-bet less frequently. When analyzing boards, identify the most impactful dimension.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "5.1-a5",
          type: "multiple-choice",
          topic: "5.1.5 Range-Board Interaction",
          question: "Board: 6♣4♦2♠. Whose range connects better?",
          options: [
            "Preflop raiser - they have more high cards",
            "Preflop caller - they have more suited connectors and small pairs",
            "Both equally",
            "Neither - no one has anything"
          ],
          correctAnswer: 1,
          explanation: "The CALLER's range connects better on low, connected boards like 6♣4♦2♠. Callers have more suited connectors (75s, 54s), small pairs (22-66), and hands that hit this texture. Raisers have more high cards that completely miss. This is a lower c-bet frequency board - the raiser should check more often.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "5.1-a6",
          type: "multiple-choice",
          topic: "5.1.4 Special Board Types",
          question: "Board: Q♥Q♦Q♠. How should you approach this extremely paired board?",
          options: [
            "C-bet 100% - you represent the Q",
            "Check 100% - someone has the Q",
            "Bet small with entire range - neither player has it",
            "Only bet if you have the Q"
          ],
          correctAnswer: 2,
          explanation: "On boards with trip cards on the flop (Q♥Q♦Q♠), both players almost never have it. The optimal strategy is to bet SMALL with your ENTIRE RANGE frequently. Since neither player can credibly have it, and the pot is there for the taking, the raiser can bet small with everything. Board coverage matters more than hand strength here.",
          difficulty: "hard",
          points: 2
        },
        {
          id: "5.1-a7",
          type: "multiple-choice",
          topic: "5.1.6 Board Texture and Strategy",
          question: "On which board should you check-raise MOST frequently as the preflop caller?",
          options: [
            "K♠7♦2♣ (dry)",
            "A♥K♣Q♦ (high broadway)",
            "9♠8♠5♣ (wet, two-tone)",
            "A♠A♥2♦ (paired aces)"
          ],
          correctAnswer: 2,
          explanation: "Check-raise most on WET, COORDINATED boards like 9♠8♠5♣. These boards favor the caller's range (suited connectors, middle pairs), give you many semibluff opportunities (flush draws, straight draws), and the raiser will c-bet frequently. Dry boards and high broadway boards strongly favor the raiser, making check-raises less effective.",
          difficulty: "hard",
          points: 2
        }
      ]
    },
    {
      id: "scenarios",
      title: "Section C: Practical Application",
      description: "Apply board texture analysis to realistic situations",
      weight: 35,
      questions: [
        {
          id: "5.1-s1",
          type: "scenario",
          topic: "5.1.2 Dry Board Analysis",
          scenario: "You raise preflop with A♠Q♦. Opponent calls. Flop: K♠8♣3♥. Opponent checks.",
          question: "How should board texture influence your c-bet decision?",
          options: [
            "Don't c-bet - you missed",
            "C-bet frequently - dry board favors your range",
            "Only c-bet if you have exactly AK",
            "Check - too scary"
          ],
          correctAnswer: 1,
          explanation: "C-bet frequently! K♠8♣3♥ is a dry, rainbow board that strongly favors the raiser's range. You have more Kx combos, and opponent missed most hands. Even though YOU missed with AQ, your range is strong here and opponent folds often. Dry boards = high c-bet frequency for the raiser, regardless of your specific hand.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "5.1-s2",
          type: "scenario",
          topic: "5.1.3 Wet Board Analysis",
          scenario: "You raise with A♠K♠. Opponent calls. Flop: T♥9♥8♣. You have nothing. Opponent checks.",
          question: "Should you c-bet on this wet board?",
          options: [
            "Always c-bet - you're the raiser",
            "Check frequently - wet board favors caller, you have no equity",
            "C-bet large - charge the draws",
            "Go all-in"
          ],
          correctAnswer: 1,
          explanation: "Check frequently with air on this wet board. T♥9♥8♣ is highly connected and two-tone - the caller has many hands with equity (draws, pairs, two pairs). Your AK high has very poor equity here (gutshot only). On wet boards, be selective with c-bets and check more. You can c-bet your actual strong hands and draws, but check back air.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "5.1-s3",
          type: "scenario",
          topic: "5.1.5 Range-Board Interaction",
          scenario: "You call a raise with 7♠6♠. Flop: A♥K♦Q♣. Opponent bets.",
          question: "How does board texture affect your decision?",
          options: [
            "Call - you have backdoor equity",
            "Fold quickly - this board crushes you",
            "Raise - represent a strong hand",
            "Call and see what happens"
          ],
          correctAnswer: 1,
          explanation: "Fold immediately! A♥K♦Q♣ is the worst possible board for your range. The raiser has all the AK, AQ, KK, AA, QQ combos. You have 76s which completely misses. This board hits their range extremely hard and misses yours completely. Don't try to bluff here - they actually have it. Board texture determines how often you can continue.",
          difficulty: "easy",
          points: 2
        },
        {
          id: "5.1-s4",
          type: "scenario",
          topic: "5.1.6 Board Texture and Strategy",
          scenario: "You raised preflop. Flop: 4♠4♥4♣. Opponent checks. Pot is $20.",
          question: "What's your strategy on this extremely paired board?",
          options: [
            "Check - someone might have the 4",
            "Bet small ($5-7) with your entire range",
            "Bet large ($15+) to protect",
            "Only bet premium hands"
          ],
          correctAnswer: 1,
          explanation: "Bet small ($5-7) with your entire range! On trip boards like 4♠4♥4♣, neither player has a 4 almost ever. This means the pot is up for grabs. Optimal strategy is to bet SMALL (25-33% pot) with your ENTIRE RANGE at high frequency. Opponent can't defend profitably. This is a GTO exploit of the texture.",
          difficulty: "hard",
          points: 2
        },
        {
          id: "5.1-s5",
          type: "scenario",
          topic: "5.1.4 Special Board Types",
          scenario: "Flop: J♠J♥7♠. You're the preflop caller with 9♣8♣. Opponent c-bets.",
          question: "How should the paired board texture inform your defense?",
          options: [
            "Fold - paired boards favor the raiser",
            "Call - you have backdoor equity",
            "Raise - represent the J",
            "Go all-in"
          ],
          correctAnswer: 0,
          explanation: "Fold with air on paired boards. J♠J♥7♠ favors the raiser's range (they can credibly have JJ, AJ, KJ), and your 98o has almost no equity (no draw, no pair). Paired boards allow the raiser to c-bet frequently, and you need to defend tightly. You can defend with pairs, draws, and some high cards, but not complete air like 98.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "5.1-s6",
          type: "scenario",
          topic: "5.1.1 Board Texture Dimensions",
          scenario: "Turn: K♥9♥5♣ comes T♥ (board now K♥9♥5♣T♥). You're the preflop caller facing a turn bet.",
          question: "How did the board texture change?",
          options: [
            "No change in texture",
            "Now monotone hearts - flush is possible, more draws",
            "Became drier - less draws",
            "Became paired"
          ],
          correctAnswer: 1,
          explanation: "The board became MONOTONE hearts and MORE WET. K♥9♥5♣T♥ means anyone with a single heart has a flush, and the T adds more straight possibilities (QJ). This dramatically changes the equity distribution. If you don't have a heart, you're in trouble. Monotone turns require careful play - the caller's range often has more flush combos.",
          difficulty: "medium",
          points: 2
        }
      ]
    },
    {
      id: "speed",
      title: "Section D: Speed Round",
      description: "Quick board texture identification",
      weight: 10,
      timed: true,
      timePerQuestion: 15,
      questions: [
        {
          id: "5.1-sp1",
          type: "quick-calc",
          topic: "5.1.2 Dry Board Analysis",
          question: "K♠7♦2♣: Wet or Dry?",
          correctAnswer: "dry",
          acceptableAnswers: ["dry", "Dry", "DRY"],
          explanation: "K♠7♦2♣ is a dry board",
          difficulty: "easy",
          points: 1
        },
        {
          id: "5.1-sp2",
          type: "quick-calc",
          topic: "5.1.3 Wet Board Analysis",
          question: "J♥T♥8♦: Wet or Dry?",
          correctAnswer: "wet",
          acceptableAnswers: ["wet", "Wet", "WET"],
          explanation: "J♥T♥8♦ is a wet board",
          difficulty: "easy",
          points: 1
        },
        {
          id: "5.1-sp3",
          type: "quick-calc",
          topic: "5.1.4 Special Board Types",
          question: "7♠7♥7♣: How many 7s?",
          correctAnswer: "3",
          acceptableAnswers: ["3", "three", "Three"],
          explanation: "Trip sevens on the flop",
          difficulty: "easy",
          points: 1
        },
        {
          id: "5.1-sp4",
          type: "quick-calc",
          topic: "5.1.5 Range-Board Interaction",
          question: "A♥K♣Q♦ favors raiser or caller?",
          correctAnswer: "raiser",
          acceptableAnswers: ["raiser", "Raiser", "pfr", "PFR"],
          explanation: "High broadway boards favor the raiser",
          difficulty: "easy",
          points: 1
        },
        {
          id: "5.1-sp5",
          type: "quick-calc",
          topic: "5.1.6 Board Texture and Strategy",
          question: "C-bet more on dry or wet boards?",
          correctAnswer: "dry",
          acceptableAnswers: ["dry", "Dry", "DRY"],
          explanation: "C-bet more frequently on dry boards",
          difficulty: "easy",
          points: 1
        }
      ]
    }
  ]
};

export default boardTextureQuiz;
