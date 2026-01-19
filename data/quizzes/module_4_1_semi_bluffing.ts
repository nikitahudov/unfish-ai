import type { QuizData } from '@/types/quiz';

export const semiBluffingQuiz: QuizData = {
  moduleInfo: {
    id: "4.1",
    title: "Semi-Bluffing",
    category: "Advanced Betting Strategies",
    phase: 2,
    level: "Intermediate",
    passingScore: 80,
    estimatedTime: "30-40 minutes",
    timedModeMinutes: 30,
    speedModeMinutes: 15,
    learningOutcomes: [
      "Define semi-bluffing and its equity components",
      "Identify strong semi-bluff candidates",
      "Calculate semi-bluff profitability",
      "Execute semi-bluffs with correct frequency",
      "Avoid unprofitable semi-bluff situations"
    ],
    nextModule: {
      id: "5.1",
      title: "Board Texture Analysis"
    }
  },
  sections: [
    {
      id: "conceptual",
      title: "Section A: Conceptual Understanding",
      description: "Test your understanding of semi-bluffing theory and principles",
      weight: 20,
      questions: [
        {
          id: "4.1-c1",
          type: "multiple-choice",
          topic: "4.1.1 Semi-Bluff Fundamentals",
          question: "What is a semi-bluff?",
          options: [
            "A bluff with a small bet size",
            "A bet with a drawing hand that can win by fold or by improving",
            "A bet made on the turn only",
            "A bluff made by an intermediate player"
          ],
          correctAnswer: 1,
          explanation: "A semi-bluff is a bet or raise with a drawing hand that has two ways to win: (1) opponent folds immediately, or (2) you improve to the best hand on a later street. This is different from a pure bluff (no equity if called) or a value bet (already ahead).",
          difficulty: "easy",
          points: 1
        },
        {
          id: "4.1-c2",
          type: "multiple-choice",
          topic: "4.1.1 Semi-Bluff Fundamentals",
          question: "What's the key difference between a pure bluff and a semi-bluff?",
          options: [
            "Semi-bluffs are larger bets",
            "Semi-bluffs have equity to improve if called; pure bluffs have no equity",
            "Semi-bluffs are only on the flop",
            "There is no difference"
          ],
          correctAnswer: 1,
          explanation: "The critical difference: SEMI-BLUFFS have equity to improve to the best hand if called (like flush draws, straight draws). PURE BLUFFS have essentially no equity if called (like total air). Semi-bluffs are much safer and more profitable because they have two ways to win.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "4.1-c3",
          type: "multiple-choice",
          topic: "4.1.2 Equity Components",
          question: "What two types of equity make up a semi-bluff's total equity?",
          options: [
            "Pot equity and implied equity",
            "Fold equity and draw equity",
            "Direct equity and indirect equity",
            "Pre-flop equity and post-flop equity"
          ],
          correctAnswer: 1,
          explanation: "Semi-bluff equity comes from: (1) FOLD EQUITY - the chance opponent folds and you win immediately, and (2) DRAW EQUITY - your chances of improving to the best hand if called. Combined, these often make semi-bluffs highly profitable even when pure bluffs would fail.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "4.1-c4",
          type: "true-false",
          topic: "4.1.3 Semi-Bluff Hand Selection",
          question: "A flush draw is generally a better semi-bluff candidate than a gutshot straight draw.",
          correctAnswer: true,
          explanation: "True! Flush draws (typically 9 outs, ~36% equity) are much stronger semi-bluff candidates than gutshots (4 outs, ~16% equity). More outs = more draw equity, which means your semi-bluff needs less fold equity to be profitable. Strong draws make the best semi-bluffs.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "4.1-c5",
          type: "multiple-choice",
          topic: "4.1.6 Semi-Bluff Mistakes",
          question: "What's the biggest mistake when semi-bluffing?",
          options: [
            "Betting too small",
            "Semi-bluffing with no equity or very weak draws",
            "Semi-bluffing in position",
            "Semi-bluffing on the flop"
          ],
          correctAnswer: 1,
          explanation: "The biggest mistake is semi-bluffing with hands that have no equity or very weak equity (like backdoor draws only, or 2-3 outs). Without sufficient draw equity, you're essentially making a pure bluff that needs much more fold equity to succeed. Semi-bluff with strong draws (8+ outs).",
          difficulty: "medium",
          points: 1
        },
        {
          id: "4.1-c6",
          type: "true-false",
          topic: "4.1.5 Semi-Bluff Spots",
          question: "Semi-bluffing is generally more profitable in position than out of position.",
          correctAnswer: true,
          explanation: "True! Semi-bluffing in position (IP) is more profitable because: (1) You have more information (see opponent's action first), (2) You can control pot size and realize equity better, (3) You can effectively apply pressure on multiple streets. OOP semi-bluffs (like check-raises) can work but are riskier.",
          difficulty: "medium",
          points: 1
        }
      ]
    },
    {
      id: "application",
      title: "Section B: Application Skills",
      description: "Demonstrate your ability to identify and execute semi-bluffs",
      weight: 35,
      questions: [
        {
          id: "4.1-a1",
          type: "multiple-choice",
          topic: "4.1.3 Semi-Bluff Hand Selection",
          question: "Which hand is the BEST semi-bluff candidate on a flop of K♥9♥4♠?",
          options: [
            "A♥2♥ (nut flush draw)",
            "72o (no equity)",
            "QJ (gutshot)",
            "88 (underpair)"
          ],
          correctAnswer: 0,
          explanation: "A♥2♥ is the best semi-bluff candidate. You have 9 outs to the nut flush (~36% equity), giving you strong draw equity plus fold equity. This is a classic semi-bluff spot. 72o is a pure bluff (no equity), QJ has weak equity (4 outs), and 88 should check or value bet, not semi-bluff.",
          difficulty: "easy",
          points: 2
        },
        {
          id: "4.1-a2",
          type: "calculation",
          topic: "4.1.2 Equity Components",
          question: "You semi-bluff with a flush draw (9 outs, ~36% equity) by betting $50 into a $100 pot. Opponent folds 40% of the time. What's your total EV if you win $100 when they fold and average $0 when called? (Round to nearest dollar)",
          correctAnswer: 40,
          acceptableRange: [38, 42],
          unit: "$",
          explanation: "EV = (Fold % × Pot) + (Call % × Draw EV). When they fold (40%): you win $100. When called (60%): your equity is 36% of $200 pot = $72, minus your $50 bet = $22. Total EV = (0.40 × $100) + (0.60 × $22) = $40 + $13.20 = ~$53. However, simplified: fold equity alone = $40, making it profitable.",
          difficulty: "hard",
          points: 2,
          showWorkspace: true
        },
        {
          id: "4.1-a3",
          type: "multiple-choice",
          topic: "4.1.4 Semi-Bluff Sizing",
          question: "What's the typical semi-bluff sizing on the flop?",
          options: [
            "Minimum bet (very small)",
            "33-75% pot (standard c-bet sizing)",
            "Pot-sized or larger",
            "All-in only"
          ],
          correctAnswer: 1,
          explanation: "Standard semi-bluff sizing is 33-75% pot, similar to normal c-bet sizing. This size generates decent fold equity while not overcommitting when called. Very small bets don't generate enough folds, and huge bets are inefficient (risk too much for the same folds). Keep it standard and balanced.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "4.1-a4",
          type: "multiple-choice",
          topic: "4.1.3 Semi-Bluff Hand Selection",
          question: "On a board of J♠T♥8♦, which hand should you semi-bluff with?",
          options: [
            "K♠9♠ (open-ended straight draw + flush draw)",
            "A♠2♠ (no immediate draw)",
            "66 (underpair)",
            "KK (overpair)"
          ],
          correctAnswer: 0,
          explanation: "K♠9♠ is a monster semi-bluff candidate - you have an open-ended straight draw (8 outs) PLUS a backdoor flush draw. This is called a 'combo draw' and has massive equity. A♠2♠ has weak backdoor equity, 66 should check or value bet thin, and KK is a value bet, not a semi-bluff.",
          difficulty: "easy",
          points: 2
        },
        {
          id: "4.1-a5",
          type: "multiple-choice",
          topic: "4.1.5 Semi-Bluff Spots",
          question: "When is a check-raise semi-bluff most effective?",
          options: [
            "Always on the flop",
            "When opponent c-bets frequently and you have a strong draw",
            "When you have position",
            "Only with the nuts"
          ],
          correctAnswer: 1,
          explanation: "Check-raise semi-bluffs work best when: (1) Opponent c-bets at a high frequency (gives you fold equity), and (2) You have a strong draw (8+ outs for draw equity). This combination makes the play profitable. Avoid check-raise semi-bluffs against cautious opponents or with weak draws.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "4.1-a6",
          type: "multiple-choice",
          topic: "4.1.6 Semi-Bluff Mistakes",
          question: "You have 7♥6♥ on K♠Q♠J♠. Should you semi-bluff?",
          options: [
            "Yes - you have a straight draw",
            "No - the board is too coordinated and you have no spades",
            "Yes - always semi-bluff draws",
            "Only if you can go all-in"
          ],
          correctAnswer: 1,
          explanation: "No! This is a bad semi-bluff spot. The board is monotone spades - any opponent continuing likely has a spade (flush or flush draw). Your straight draw may be dead or give opponent a flush. Plus you have no fold equity on this wet board. When the board is this scary, check and give up with weak draws.",
          difficulty: "hard",
          points: 2
        },
        {
          id: "4.1-a7",
          type: "calculation",
          topic: "4.1.2 Equity Components",
          question: "You have an OESD (8 outs) on the flop. Opponent is a calling station (folds only 15%). Is a pot-sized semi-bluff profitable if you need 33% equity? (Enter just the number for your draw equity using rule of 4)",
          correctAnswer: 32,
          acceptableRange: [30, 34],
          unit: "%",
          explanation: "With 8 outs on the flop seeing two cards: 8 × 4 = 32% equity. Against a calling station who folds only 15%, you get minimal fold equity and rely on draw equity. 32% equity vs 33% needed is close to breakeven - this is a marginal semi-bluff at best. Against calling stations, you need stronger draws or should just call.",
          difficulty: "medium",
          points: 2,
          showWorkspace: true
        }
      ]
    },
    {
      id: "scenarios",
      title: "Section C: Practical Scenarios",
      description: "Apply semi-bluffing concepts to realistic poker situations",
      weight: 35,
      questions: [
        {
          id: "4.1-s1",
          type: "scenario",
          topic: "4.1.5 Semi-Bluff Spots",
          scenario: "You have A♦J♦ in position. Flop: K♦8♦3♠. Opponent checks. Pot is $40.",
          question: "Should you semi-bluff with your nut flush draw?",
          options: [
            "Yes - bet $20-30 for value and fold equity",
            "No - check behind, you have no pair",
            "Yes - go all-in",
            "Only if opponent is very tight"
          ],
          correctAnswer: 0,
          explanation: "Yes, bet $20-30 (50-75% pot). You have the nut flush draw (9 outs, ~36% equity), you're in position, and opponent showed weakness by checking. This is a textbook semi-bluff: you win immediately when they fold, and have excellent equity when called. Semi-bluffing strong draws in position is highly profitable.",
          difficulty: "easy",
          points: 2
        },
        {
          id: "4.1-s2",
          type: "scenario",
          topic: "4.1.6 Semi-Bluff Mistakes",
          scenario: "You have 5♠4♠ on a flop of A♥K♠9♣. You have a backdoor flush draw only. Opponent bets $30 into $50.",
          question: "Should you semi-bluff raise?",
          options: [
            "Yes - you have potential",
            "No - fold, you have insufficient equity",
            "Yes - raise large to maximize fold equity",
            "Call to see if you improve"
          ],
          correctAnswer: 1,
          explanation: "No, fold! You have essentially no equity - just a backdoor flush draw (~4% equity) on a dry, high board. This isn't a semi-bluff situation; it's a pure bluff with terrible equity. You need strong draws (8+ outs) to semi-bluff. Backdoor draws alone don't qualify. This is a mistake many players make.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "4.1-s3",
          type: "scenario",
          topic: "4.1.4 Semi-Bluff Sizing",
          scenario: "Turn: Board is K♥9♥4♠2♦. You have Q♥J♥ (flush draw). Pot is $80. Opponent checks.",
          question: "What's the best semi-bluff sizing?",
          options: [
            "$20 (25% pot)",
            "$40-60 (50-75% pot)",
            "$120+ (overbet)",
            "Check behind"
          ],
          correctAnswer: 1,
          explanation: "Bet $40-60 (50-75% pot). This sizing generates good fold equity while maintaining reasonable risk/reward. On the turn, you want decent fold equity but also have strong equity (9 outs = ~18% to river). Too small doesn't get folds, too large is inefficient. Standard sizing is best for semi-bluffs.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "4.1-s4",
          type: "scenario",
          topic: "4.1.5 Semi-Bluff Spots",
          scenario: "You're OOP with J♠T♠. Flop: 9♠8♣2♦ (you have OESD). Aggressive opponent c-bets $25 into $40.",
          question: "Is this a good check-raise semi-bluff spot?",
          options: [
            "Yes - you have 8 outs and opponent c-bets wide",
            "No - just call, check-raising is too risky",
            "No - fold, you have nothing",
            "Yes - but only if you can go all-in"
          ],
          correctAnswer: 0,
          explanation: "Yes! This is a strong check-raise semi-bluff spot. You have 8 outs (OESD = ~32% equity all-in), opponent is aggressive and c-bets wide (fold equity), and you can win the pot immediately or improve. Check-raise to ~$70-80. Against aggressive players, check-raise semi-bluffs with strong draws are highly +EV.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "4.1-s5",
          type: "scenario",
          topic: "4.1.3 Semi-Bluff Hand Selection",
          scenario: "Flop: J♥T♥7♠. You have A♥K♥. Pot is $60. Opponent checks.",
          question: "How strong is your semi-bluff?",
          options: [
            "Very strong - nut flush draw + two overcards = ~15 outs",
            "Weak - you have no pair",
            "Medium - flush draw only",
            "Don't semi-bluff here"
          ],
          correctAnswer: 0,
          explanation: "Very strong! You have a 'combo draw': nut flush draw (9 outs) + two overcards that may be good (up to 6 more outs) = potentially ~15 outs (~54% equity). This is a monster semi-bluff. Bet confidently $40-50. You're actually ahead of many made hands. This is why combo draws are so powerful.",
          difficulty: "hard",
          points: 2
        },
        {
          id: "4.1-s6",
          type: "scenario",
          topic: "4.1.2 Equity Components",
          scenario: "You semi-bluff flop with a flush draw. Opponent calls. Turn bricks. They check.",
          question: "Should you continue semi-bluffing (barrel turn)?",
          options: [
            "No - give up, they called once",
            "Yes - if you still have strong equity and fold equity",
            "Always barrel turn",
            "Only if all-in"
          ],
          correctAnswer: 1,
          explanation: "It depends! Continue (barrel turn) if: (1) You still have strong draw equity (9 outs on turn = 18% to river), and (2) You have fold equity (opponent's range is capped, board isn't too scary for them). But if opponent is a calling station or the turn improved their range, check behind and see river. Multi-street semi-bluffing requires fold equity on each street.",
          difficulty: "hard",
          points: 2
        }
      ]
    },
    {
      id: "speed",
      title: "Section D: Speed Round",
      description: "Quick semi-bluff recognition and calculations",
      weight: 10,
      timed: true,
      timePerQuestion: 15,
      questions: [
        {
          id: "4.1-sp1",
          type: "quick-calc",
          topic: "4.1.1 Semi-Bluff Fundamentals",
          question: "Semi-bluff = betting with a ____ hand? (drawing/made)",
          correctAnswer: "drawing",
          acceptableAnswers: ["drawing", "Drawing", "draw", "Draw"],
          explanation: "Semi-bluff = betting with a drawing hand",
          difficulty: "easy",
          points: 1
        },
        {
          id: "4.1-sp2",
          type: "quick-calc",
          topic: "4.1.2 Equity Components",
          question: "Two equity types in semi-bluffs: fold equity and ____?",
          correctAnswer: "draw equity",
          acceptableAnswers: ["draw equity", "Draw equity", "draw", "Draw"],
          explanation: "Fold equity + Draw equity",
          difficulty: "easy",
          points: 1
        },
        {
          id: "4.1-sp3",
          type: "quick-calc",
          topic: "4.1.3 Semi-Bluff Hand Selection",
          question: "Flush draw has how many outs?",
          correctAnswer: "9",
          acceptableAnswers: ["9", "9 outs"],
          explanation: "Flush draws = 9 outs",
          difficulty: "easy",
          points: 1
        },
        {
          id: "4.1-sp4",
          type: "quick-calc",
          topic: "4.1.3 Semi-Bluff Hand Selection",
          question: "OESD has how many outs?",
          correctAnswer: "8",
          acceptableAnswers: ["8", "8 outs"],
          explanation: "Open-ended straight draw = 8 outs",
          difficulty: "easy",
          points: 1
        },
        {
          id: "4.1-sp5",
          type: "quick-calc",
          topic: "4.1.5 Semi-Bluff Spots",
          question: "Better semi-bluff spot: IP or OOP?",
          correctAnswer: "IP",
          acceptableAnswers: ["IP", "in position", "In position"],
          explanation: "IP (in position) is better for semi-bluffing",
          difficulty: "easy",
          points: 1
        }
      ]
    }
  ]
};

export default semiBluffingQuiz;
