import type { QuizData } from '@/types/quiz';

export const equityCalculationQuiz: QuizData = {
  moduleInfo: {
    id: "1.2",
    title: "Equity Calculation",
    category: "Mathematical Foundations",
    phase: 1,
    level: "Fundamental",
    passingScore: 80,
    estimatedTime: "25-35 minutes",
    timedModeMinutes: 25,
    speedModeMinutes: 12,
    learningOutcomes: [
      "Define and explain equity in poker context",
      "Calculate hand vs. hand equity for common matchups",
      "Estimate hand vs. range equity",
      "Use equity calculation software effectively",
      "Apply equity concepts to calling and betting decisions"
    ],
    nextModule: {
      id: "2.1",
      title: "Starting Hand Selection"
    }
  },
  sections: [
    {
      id: "conceptual",
      title: "Section A: Conceptual Understanding",
      description: "Test your understanding of equity theory and principles",
      weight: 20,
      questions: [
        {
          id: "c1",
          type: "multiple-choice",
          topic: "1.2.1 Understanding Equity",
          question: "What does 'equity' mean in poker?",
          options: [
            "The amount of money you have invested in the pot",
            "Your percentage share of the pot based on your chance of winning",
            "The expected value of your hand in big blinds",
            "The odds you're getting on a call"
          ],
          correctAnswer: 1,
          explanation: "Equity is your percentage share of the pot based on your likelihood of winning the hand. If you have 60% equity in a $100 pot, you 'own' $60 of that pot on average over many repetitions.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "c2",
          type: "multiple-choice",
          topic: "1.2.1 Understanding Equity",
          question: "What is the difference between realized and unrealized equity?",
          options: [
            "Realized equity is what you actually win, unrealized is theoretical",
            "Realized equity accounts for future betting, unrealized doesn't",
            "They're the same thing, just different terms",
            "Realized equity is higher because it includes implied odds"
          ],
          correctAnswer: 1,
          explanation: "Unrealized equity is your raw percentage to win if all cards are dealt out. Realized equity is what you actually capture after accounting for position, future betting streets, and your ability to extract value or minimize losses. Out of position players typically realize less of their equity.",
          difficulty: "medium",
          points: 1
        },
        {
          id: "c3",
          type: "true-false",
          topic: "1.2.1 Understanding Equity",
          question: "Equity and pot odds are the same concept, just expressed differently.",
          correctAnswer: false,
          explanation: "Equity and pot odds are related but different. Equity is your percentage chance to win. Pot odds are the price you're getting on a call. To make a profitable call, your equity must exceed the percentage implied by your pot odds.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "c4",
          type: "multiple-choice",
          topic: "1.2.3 Memorizing Key Matchups",
          question: "Which statement about premium pair vs. premium pair matchups is TRUE?",
          options: [
            "AA vs KK is closer to 70-30 than 80-20",
            "AA vs KK is approximately 82-18 preflop",
            "KK has more than 25% equity vs AA",
            "The equity changes dramatically by suit"
          ],
          correctAnswer: 1,
          explanation: "AA vs KK is one of the most important matchups to memorize: approximately 82% vs 18% preflop. This is a dominating but not crushing advantage. The pocket kings need to flop a set to win in most cases.",
          difficulty: "medium",
          points: 1
        },
        {
          id: "c5",
          type: "multiple-choice",
          topic: "1.2.4 Hand vs. Range Equity",
          question: "When calculating hand vs. range equity, what is a 'range'?",
          options: [
            "The spread between best and worst possible hands",
            "A set of possible hands your opponent could have",
            "The distance in chip stacks between players",
            "The number of outs you have to improve"
          ],
          correctAnswer: 1,
          explanation: "A range is the collection of possible hands your opponent could have based on their actions. For example, if they 3-bet preflop from early position, their range might include hands like JJ+, AK, AQs - not just one specific hand.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "c6",
          type: "true-false",
          topic: "1.2.2 Hand vs. Hand Equity",
          question: "In a 'coin flip' situation, both hands have exactly 50% equity.",
          correctAnswer: false,
          explanation: "While called 'coin flips,' most pocket pair vs. two overcards matchups are not exactly 50-50. They're typically around 55-45 in favor of the pocket pair (e.g., 77 vs AK is about 53-47). The term 'coin flip' refers to them being close to even, not exactly even.",
          difficulty: "medium",
          points: 1
        }
      ]
    },
    {
      id: "calculation",
      title: "Section B: Calculation Skills",
      description: "Demonstrate your ability to calculate and estimate equity",
      weight: 35,
      questions: [
        {
          id: "calc1",
          type: "calculation",
          topic: "1.2.6 Applying Equity in Decisions",
          question: "The pot is $100 and you need to call $40. What minimum equity do you need for a profitable call? (Round to nearest whole number)",
          correctAnswer: 29,
          acceptableRange: [28, 30],
          unit: "%",
          explanation: "Equity needed = Call / (Pot + Call) = $40 / ($100 + $40) = $40 / $140 = 28.6%, approximately 29%. You need at least 29% equity to make calling profitable.",
          difficulty: "medium",
          showWorkspace: true,
          points: 2
        },
        {
          id: "calc2",
          type: "calculation",
          topic: "1.2.3 Memorizing Key Matchups",
          question: "You have AA and face an all-in from a player who you know has KK. The pot is $500. What is your equity share of this pot in dollars?",
          correctAnswer: 410,
          acceptableRange: [405, 415],
          unit: "$",
          explanation: "AA vs KK is approximately 82% equity for the aces. 82% of $500 = $410. This is your expected value share of the pot based on your equity.",
          difficulty: "medium",
          showWorkspace: true,
          points: 2
        },
        {
          id: "calc3",
          type: "calculation",
          topic: "1.2.2 Hand vs. Hand Equity",
          question: "You have AKo vs opponent's 22 all-in preflop. Using the approximate 48-52 equity split, if the pot is $200, what is your equity share?",
          correctAnswer: 96,
          acceptableRange: [94, 98],
          unit: "$",
          explanation: "AKo vs 22 is approximately 48% equity for the overcards. 48% of $200 = $96. This is a coin flip situation where you're slightly behind.",
          difficulty: "medium",
          showWorkspace: true,
          points: 2
        },
        {
          id: "calc4",
          type: "multiple-choice",
          topic: "1.2.3 Memorizing Key Matchups",
          question: "Which matchup gives the dominated hand the MOST equity?",
          options: [
            "AA vs KK (~18% for KK)",
            "KK vs AKs (~32% for AK)",
            "AK vs QQ (~46% for AK)",
            "77 vs AKo (~47% for AK)"
          ],
          correctAnswer: 3,
          explanation: "In the 77 vs AKo matchup, the AK has approximately 47% equity, making it the closest to even money. The order from most equity for the 'underdog' is: AK vs small pair (47%), AK vs QQ (46%), AK vs KK (32%), KK vs AA (18%).",
          difficulty: "medium",
          points: 2
        },
        {
          id: "calc5",
          type: "calculation",
          topic: "1.2.6 Applying Equity in Decisions",
          question: "You estimate you have 35% equity in a hand. Your opponent bets $60 into a $100 pot. Is this call profitable based on equity? Enter 1 for yes, 0 for no.",
          correctAnswer: 1,
          acceptableRange: [1, 1],
          unit: "",
          explanation: "Pot odds: $160:$60 = 2.67:1, which requires 27.3% equity to call (60/220 = 27.3%). You have 35% equity, which exceeds the required 27.3%, so this is a profitable call. Answer: 1 (yes).",
          difficulty: "hard",
          showWorkspace: true,
          points: 2
        },
        {
          id: "calc6",
          type: "multiple-choice",
          topic: "1.2.3 Memorizing Key Matchups",
          question: "Approximately what equity does AKs have against AA?",
          options: [
            "7%",
            "13%",
            "18%",
            "24%"
          ],
          correctAnswer: 1,
          explanation: "AKs vs AA is approximately 13% equity for the AK suited. This is one of the most dominated matchups in poker. The suited helps slightly (AKo would be ~11%), but you're still a massive underdog and need to spike an ace or make a straight/flush.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "calc7",
          type: "multiple-choice",
          topic: "1.2.2 Hand vs. Hand Equity",
          question: "What is the approximate equity for a pocket pair against two overcards (e.g., 88 vs AK)?",
          options: [
            "45-55 (slight underdog)",
            "50-50 (even)",
            "55-45 (slight favorite)",
            "60-40 (strong favorite)"
          ],
          correctAnswer: 2,
          explanation: "A pocket pair vs two overcards is approximately 55-45 in favor of the pair. For example, 88 vs AK is about 53-47 for the eights. The pair is a small favorite because it's ahead now and the overcards need to hit to win.",
          difficulty: "easy",
          points: 2
        }
      ]
    },
    {
      id: "application",
      title: "Section C: Practical Application",
      description: "Apply equity concepts to realistic poker scenarios",
      weight: 35,
      questions: [
        {
          id: "app1",
          type: "scenario",
          topic: "1.2.6 Applying Equity in Decisions",
          scenario: "You have Q♥Q♦ and 3-bet preflop. Opponent 4-bets all-in. Based on their range, you estimate they have AA/KK 60% of the time and AK 40% of the time. Pot is $300 total if you call.",
          question: "Should you call based on equity?",
          options: [
            "Yes - you have enough equity vs their range",
            "No - you're too dominated by their range",
            "It's exactly break-even",
            "Need more information about stack sizes"
          ],
          correctAnswer: 1,
          explanation: "Let's calculate: vs AA/KK you have ~18% equity (60% of the time), vs AK you have ~54% equity (40% of the time). Weighted equity: (0.6 × 18%) + (0.4 × 54%) = 10.8% + 21.6% = 32.4%. You need ~33% to call for $100 into $300 pot. This is borderline, and given you're always flipping at best, folding is usually correct.",
          difficulty: "hard",
          points: 2
        },
        {
          id: "app2",
          type: "scenario",
          topic: "1.2.6 Applying Equity in Decisions",
          scenario: "You have A♠K♠ on the button. UTG raises, you 3-bet, UTG 4-bets all-in for 100bb. Pot is 45bb if you call (you'd be calling 70bb more). You estimate UTG's range is QQ+.",
          question: "Based on equity, what should you do?",
          options: [
            "Call - getting good pot odds",
            "Fold - not enough equity vs QQ+",
            "Raise - show strength",
            "It depends on tournament vs cash game"
          ],
          correctAnswer: 1,
          explanation: "Against QQ+ (QQ, KK, AA), AKs has roughly: vs QQ ~46%, vs KK ~32%, vs AA ~13%. If we assume even distribution, average equity is ~30%. You need 70/115 = 61% equity to call. Even if they have QQ half the time, you don't have enough equity. This is a clear fold.",
          difficulty: "hard",
          points: 2
        },
        {
          id: "app3",
          type: "scenario",
          topic: "1.2.2 Hand vs. Hand Equity",
          scenario: "You're watching a televised poker hand. Player A has 7♦7♣ and Player B has A♥K♥. They're all-in preflop for $50,000 each. The pot is $100,000.",
          question: "Approximately how much of the pot does the 77 'own' based on equity?",
          options: [
            "$45,000 (45%)",
            "$50,000 (50%)",
            "$53,000 (53%)",
            "$60,000 (60%)"
          ],
          correctAnswer: 2,
          explanation: "Pocket pair vs two overcards is approximately 53-47 in favor of the pair (especially when the overcards are suited, it's even closer). The 77 has approximately 53% equity, meaning they 'own' about $53,000 of the $100,000 pot.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "app4",
          type: "scenario",
          topic: "1.2.4 Hand vs. Range Equity",
          scenario: "You have 9♠9♥ in the big blind. A tight player raises from UTG. You estimate their UTG raising range is 99+, AK, AQs (about 4% of hands).",
          question: "What is your approximate equity against this range?",
          options: [
            "15-20% (big underdog)",
            "30-35% (moderate underdog)",
            "45-50% (slight underdog/coin flip)",
            "55-60% (slight favorite)"
          ],
          correctAnswer: 1,
          explanation: "Against 99+, AK, AQs, your 99 is behind everything except chopping with 99 and being ahead of AK/AQs. You're crushed by TT-AA. Your equity is approximately 30-35%. This is typically a fold or flat call situation, not a 3-bet.",
          difficulty: "hard",
          points: 2
        },
        {
          id: "app5",
          type: "scenario",
          topic: "1.2.6 Applying Equity in Decisions",
          scenario: "You hold J♠T♠ and flop an open-ended straight draw on 9♥8♣2♦. Pot is $80, opponent bets $40. You estimate you're behind but have 8 clean outs (any 7 or Q).",
          question: "Do you have the equity to call?",
          options: [
            "Yes - 8 outs gives you enough equity",
            "No - need more equity to call",
            "Exactly break-even",
            "Should raise instead of calling"
          ],
          correctAnswer: 1,
          explanation: "Pot odds: $120:$40 = 3:1 (25% needed). With 8 outs on the flop seeing one card: 8 × 2 = 16% equity. 16% < 25%, so you don't have enough equity to call based on pot odds alone. You'd need implied odds to justify the call.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "app6",
          type: "multiple-choice",
          topic: "1.2.5 Equity Calculation Tools",
          question: "Which tool/software is commonly used for calculating hand vs. range equity?",
          options: [
            "PokerStars calculator",
            "Equilab or Flopzilla",
            "Microsoft Excel",
            "Google Poker Odds"
          ],
          correctAnswer: 1,
          explanation: "Equilab and Flopzilla are industry-standard tools for equity calculation. They allow you to input hand ranges, calculate equity vs. ranges, and analyze different board textures. These are essential study tools for serious players.",
          difficulty: "easy",
          points: 1
        }
      ]
    },
    {
      id: "speed",
      title: "Section D: Speed Round",
      description: "Quick equity recall to test your knowledge",
      weight: 10,
      timed: true,
      timePerQuestion: 15,
      questions: [
        {
          id: "speed1",
          type: "quick-calc",
          topic: "1.2.3 Memorizing Key Matchups",
          question: "AA vs KK equity for the aces?",
          correctAnswer: "82%",
          acceptableAnswers: ["82", "82%", "80", "80%", "81", "81%", "83", "83%"],
          explanation: "AA vs KK is approximately 82-18",
          difficulty: "easy",
          points: 1
        },
        {
          id: "speed2",
          type: "quick-calc",
          topic: "1.2.3 Memorizing Key Matchups",
          question: "AKs vs AA equity for the AK?",
          correctAnswer: "13%",
          acceptableAnswers: ["13", "13%", "12", "12%", "11", "11%"],
          explanation: "AKs vs AA is approximately 13% for AK",
          difficulty: "medium",
          points: 1
        },
        {
          id: "speed3",
          type: "quick-calc",
          topic: "1.2.2 Hand vs. Hand Equity",
          question: "Pair vs two overcards (e.g., 88 vs AK). Pair equity?",
          correctAnswer: "55%",
          acceptableAnswers: ["55", "55%", "53", "53%", "54", "54%"],
          explanation: "Pocket pair vs two overcards is approximately 55-45",
          difficulty: "easy",
          points: 1
        },
        {
          id: "speed4",
          type: "quick-calc",
          topic: "1.2.6 Applying Equity in Decisions",
          question: "Pot $200, call $50. Minimum equity needed? (%)",
          correctAnswer: "20%",
          acceptableAnswers: ["20", "20%", "19", "19%", "21", "21%"],
          explanation: "50 / (200 + 50) = 20%",
          difficulty: "medium",
          points: 1
        },
        {
          id: "speed5",
          type: "quick-calc",
          topic: "1.2.3 Memorizing Key Matchups",
          question: "AK vs QQ equity for the AK?",
          correctAnswer: "46%",
          acceptableAnswers: ["46", "46%", "45", "45%", "47", "47%"],
          explanation: "AK vs QQ is approximately 46-54",
          difficulty: "medium",
          points: 1
        }
      ]
    }
  ]
};

export default equityCalculationQuiz;
