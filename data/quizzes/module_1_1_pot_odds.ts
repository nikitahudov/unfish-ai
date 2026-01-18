import type { QuizData } from '@/types/quiz';

export const potOddsQuiz: QuizData = {
  moduleInfo: {
    id: "1.1",
    title: "Pot Odds",
    category: "Mathematical Foundations",
    phase: 1,
    level: "Fundamental",
    passingScore: 80,
    estimatedTime: "20-30 minutes",
    timedModeMinutes: 20,
    speedModeMinutes: 10,
    learningOutcomes: [
      "Calculate pot odds instantly in any game situation",
      "Convert between ratios, percentages, and fractions fluently",
      "Apply the 2/4 rule for counting outs",
      "Make mathematically correct calling decisions",
      "Identify when pot odds alone justify a call"
    ],
    nextModule: {
      id: "1.2",
      title: "Equity Calculation"
    }
  },
  sections: [
    {
      id: "conceptual",
      title: "Section A: Conceptual Understanding",
      description: "Test your understanding of pot odds theory and principles",
      weight: 20,
      questions: [
        {
          id: "c1",
          type: "multiple-choice",
          topic: "1.1.1 Understanding Pot Odds Concept",
          question: "What do pot odds represent in poker?",
          options: [
            "The probability that you will win the hand",
            "The ratio between the current pot and the cost of a call",
            "The expected value of your hand",
            "The percentage of hands you should play"
          ],
          correctAnswer: 1,
          explanation: "Pot odds represent the ratio between the current pot size and the amount you need to call. This ratio helps you determine if calling is mathematically profitable based on your chances of winning.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "c2",
          type: "multiple-choice",
          topic: "1.1.1 Understanding Pot Odds Concept",
          question: "Why are pot odds important for long-term profitability?",
          options: [
            "They guarantee you will win every hand you play",
            "They help you make decisions that are profitable over many repetitions",
            "They tell you exactly what cards your opponent has",
            "They eliminate variance from poker"
          ],
          correctAnswer: 1,
          explanation: "Pot odds help you make mathematically sound decisions. While you may lose individual hands, consistently making +EV calls based on pot odds leads to long-term profitability.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "c3",
          type: "multiple-choice",
          topic: "1.1.2 Calculation Methods",
          question: "If the pot is $100 and you need to call $25, what are your pot odds as a ratio?",
          options: [
            "4:1",
            "5:1",
            "3:1",
            "100:25"
          ],
          correctAnswer: 0,
          explanation: "Pot odds = Pot : Call amount = $100 : $25 = 4:1. You're risking $25 to win $100, which means for every $1 you risk, you stand to win $4.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "c4",
          type: "multiple-choice",
          topic: "1.1.4 The 2/4 Rule",
          question: "When should you use the 'Rule of 4' instead of the 'Rule of 2'?",
          options: [
            "When you have more than 10 outs",
            "When you're on the turn facing a river bet",
            "When you're on the flop and expect to see both turn and river",
            "When playing in a tournament"
          ],
          correctAnswer: 2,
          explanation: "Use the Rule of 4 when you're on the flop AND you expect to see both the turn and river (usually when facing an all-in or a small bet). Use the Rule of 2 when you're only seeing one more card.",
          difficulty: "medium",
          points: 1
        },
        {
          id: "c5",
          type: "true-false",
          topic: "1.1.1 Understanding Pot Odds Concept",
          question: "If you have the correct pot odds to call, you should always call regardless of other factors.",
          correctAnswer: false,
          explanation: "While pot odds are crucial, other factors matter too: implied odds, reverse implied odds, your opponent's tendencies, tournament situations (ICM), and your position. Pot odds are one piece of the decision-making puzzle.",
          difficulty: "medium",
          points: 1
        },
        {
          id: "c6",
          type: "true-false",
          topic: "1.1.3 Converting Formats",
          question: "Pot odds of 3:1 mean you need to win 33% of the time to break even.",
          correctAnswer: false,
          explanation: "With 3:1 pot odds, you need to win 1/(3+1) = 1/4 = 25% of the time, not 33%. The denominator includes both the pot odds AND your call.",
          difficulty: "medium",
          points: 1
        }
      ]
    },
    {
      id: "calculation",
      title: "Section B: Calculation Skills",
      description: "Demonstrate your ability to calculate pot odds accurately",
      weight: 35,
      questions: [
        {
          id: "calc1",
          type: "calculation",
          topic: "1.1.2 Calculation Methods",
          question: "The pot is $75. Your opponent bets $25. What percentage of the time do you need to win to break even? (Round to nearest whole number)",
          correctAnswer: 20,
          acceptableRange: [19, 21],
          unit: "%",
          explanation: "After opponent bets, pot = $75 + $25 = $100. You need to call $25. Pot odds % = Call / (Pot + Call) = $25 / ($100 + $25) = $25 / $125 = 20%.",
          difficulty: "medium",
          showWorkspace: true,
          points: 2
        },
        {
          id: "calc2",
          type: "calculation",
          topic: "1.1.3 Converting Formats",
          question: "Convert 3:1 pot odds to a percentage. What percentage of the time do you need to win?",
          correctAnswer: 25,
          acceptableRange: [24, 26],
          unit: "%",
          explanation: "To convert ratio to percentage: 1 / (3+1) × 100 = 1/4 × 100 = 25%. At 3:1 pot odds, you need to win 25% of the time to break even.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "calc3",
          type: "calculation",
          topic: "1.1.4 The 2/4 Rule",
          question: "You have a flush draw (9 outs) on the flop. Using the Rule of 4, what is your approximate equity to hit by the river?",
          correctAnswer: 36,
          acceptableRange: [35, 37],
          unit: "%",
          explanation: "Rule of 4: Outs × 4 = Equity% (flop to river). 9 outs × 4 = 36%. The actual equity is about 35%, so the Rule of 4 is a good approximation.",
          difficulty: "easy",
          points: 2
        },
        {
          id: "calc4",
          type: "calculation",
          topic: "1.1.4 The 2/4 Rule",
          question: "You have an open-ended straight draw (8 outs) on the turn. Using the Rule of 2, what is your approximate equity to hit on the river?",
          correctAnswer: 16,
          acceptableRange: [15, 17],
          unit: "%",
          explanation: "Rule of 2: Outs × 2 = Equity% (one card to come). 8 outs × 2 = 16%. The actual equity is about 17.4%, so this is a reasonable approximation.",
          difficulty: "easy",
          points: 2
        },
        {
          id: "calc5",
          type: "calculation",
          topic: "1.1.2 Calculation Methods",
          question: "Pot is $200. Opponent bets $100. What pot odds ratio are you getting? (Express as X:1, enter just the X value)",
          correctAnswer: 3,
          acceptableRange: [3, 3],
          unit: ":1",
          explanation: "Pot after bet = $200 + $100 = $300. Call = $100. Ratio = $300 : $100 = 3:1. You're getting 3:1 on your call.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "calc6",
          type: "calculation",
          topic: "1.1.3 Converting Formats",
          question: "Your opponent bets half-pot. What pot odds percentage are you getting? (Round to nearest whole number)",
          correctAnswer: 25,
          acceptableRange: [24, 26],
          unit: "%",
          explanation: "If pot = P and opponent bets P/2, new pot = P + P/2 = 1.5P. You call P/2. Percentage = (P/2) / (1.5P + P/2) = (P/2) / (2P) = 1/4 = 25%. Half-pot bets give you 3:1 or 25%.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "calc7",
          type: "calculation",
          topic: "1.1.4 The 2/4 Rule",
          question: "You have a gutshot straight draw (4 outs) on the flop facing an all-in. Using the Rule of 4, what is your approximate equity?",
          correctAnswer: 16,
          acceptableRange: [15, 17],
          unit: "%",
          explanation: "Rule of 4 (all-in on flop, seeing both cards): 4 outs × 4 = 16%. This approximates your chances of hitting by the river.",
          difficulty: "easy",
          points: 2
        }
      ]
    },
    {
      id: "application",
      title: "Section C: Practical Application",
      description: "Apply pot odds concepts to realistic poker scenarios",
      weight: 35,
      questions: [
        {
          id: "app1",
          type: "scenario",
          topic: "1.1.6 Applying Pot Odds in Real-Time",
          scenario: "You're playing $1/$2 No-Limit Hold'em. You have 7♥6♥ on a board of K♥9♥2♣. The pot is $50 and your opponent goes all-in for $25.",
          question: "You have a flush draw with 9 outs. Should you call based on pot odds?",
          options: [
            "Yes - you're getting the right price",
            "No - you don't have enough equity",
            "It's exactly break-even",
            "Cannot determine from given information"
          ],
          correctAnswer: 0,
          explanation: "Pot odds: You're calling $25 to win $75 (pot + bet), so 75:25 = 3:1 or 25%. Since opponent is all-in, use Rule of 4: 9 outs × 4 = 36% equity. 36% > 25%, so this is a profitable call.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "app2",
          type: "scenario",
          topic: "1.1.5 Common Scenarios",
          scenario: "You hold A♠K♠ on a board of Q♥7♣2♦. You have 6 outs (3 Aces + 3 Kings) to make top pair. The pot is $100 and you face a $50 bet on the turn.",
          question: "Using pot odds alone, should you call?",
          options: [
            "Yes - you're getting the right price",
            "No - you don't have enough equity",
            "It depends on your opponent's range",
            "You should raise instead"
          ],
          correctAnswer: 1,
          explanation: "Pot odds: $150 : $50 = 3:1 (25% needed). Your equity with 6 outs (Rule of 2 on turn): 6 × 2 = 12%. 12% < 25%, so pot odds alone don't justify the call.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "app3",
          type: "scenario",
          topic: "1.1.6 Applying Pot Odds in Real-Time",
          scenario: "Tournament situation: Pot is $10,000. Short-stacked opponent goes all-in for $2,000. You have an open-ended straight draw (8 outs).",
          question: "What is the correct play based on pot odds?",
          options: [
            "Fold - not enough equity",
            "Call - getting great pot odds",
            "It's a close decision, could go either way",
            "Need to consider ICM before deciding"
          ],
          correctAnswer: 1,
          explanation: "Pot odds: $12,000 : $2,000 = 6:1 (about 14% needed). OESD equity (Rule of 4 since all-in): 8 × 4 = 32%. 32% >> 14%, this is a clear call based on pot odds.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "app4",
          type: "scenario",
          topic: "1.1.5 Common Scenarios",
          scenario: "Cash game: You have J♦T♦ on a board of 9♦8♣2♥. You have an open-ended straight draw. Pot is $80, opponent bets $80 (pot-sized bet).",
          question: "What pot odds are you getting, and is calling correct with just pot odds?",
          options: [
            "2:1 (33% needed) - Call is correct",
            "2:1 (33% needed) - Call is incorrect",
            "3:1 (25% needed) - Call is correct",
            "1:1 (50% needed) - Call is incorrect"
          ],
          correctAnswer: 1,
          explanation: "Pot-sized bet gives you 2:1 odds ($160:$80). You need 33% equity. With 8 outs on flop to turn: 8 × 2 = 16%. 16% < 33%, so pot odds alone don't justify calling. You'd need implied odds.",
          difficulty: "hard",
          points: 2
        },
        {
          id: "app5",
          type: "scenario",
          topic: "1.1.6 Applying Pot Odds in Real-Time",
          scenario: "You have 5♠5♥ and the board is A♦K♣J♥7♠. Pot is $200, opponent bets $50. You believe you need to hit a 5 (2 outs) to win.",
          question: "Should you call based on pot odds?",
          options: [
            "Yes - getting 5:1 with approximately 4% equity",
            "No - need about 17% but only have 4%",
            "Yes - any pair is good enough here",
            "Fold - you're drawing dead"
          ],
          correctAnswer: 1,
          explanation: "Pot odds: $250:$50 = 5:1 (about 17% needed). With 2 outs on the river: 2 × 2 = 4% equity. 4% << 17%, so this is a clear fold based on pot odds.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "app6",
          type: "multiple-choice",
          topic: "1.1.5 Common Scenarios",
          question: "Which of the following bet sizes gives you the BEST pot odds?",
          options: [
            "Opponent bets 1/4 pot",
            "Opponent bets 1/2 pot",
            "Opponent bets 3/4 pot",
            "Opponent bets full pot"
          ],
          correctAnswer: 0,
          explanation: "Smaller bets give better pot odds. 1/4 pot bet gives 5:1 (17%), 1/2 pot gives 3:1 (25%), 3/4 pot gives 2.3:1 (30%), full pot gives 2:1 (33%). The smaller the bet, the better your price to call.",
          difficulty: "easy",
          points: 1
        }
      ]
    },
    {
      id: "speed",
      title: "Section D: Speed Round",
      description: "Quick calculations to test your mental math",
      weight: 10,
      timed: true,
      timePerQuestion: 15,
      questions: [
        {
          id: "speed1",
          type: "quick-calc",
          topic: "1.1.3 Converting Formats",
          question: "Quick! What percentage equity do you need with 4:1 pot odds?",
          correctAnswer: "20%",
          acceptableAnswers: ["20", "20%", "0.20", ".20"],
          explanation: "4:1 odds = 1/(4+1) = 1/5 = 20%",
          difficulty: "easy",
          points: 1
        },
        {
          id: "speed2",
          type: "quick-calc",
          topic: "1.1.4 The 2/4 Rule",
          question: "Flush draw on flop (9 outs), all-in situation. Equity?",
          correctAnswer: "36%",
          acceptableAnswers: ["36", "36%", "35", "35%", "37", "37%"],
          explanation: "9 × 4 = 36%",
          difficulty: "easy",
          points: 1
        },
        {
          id: "speed3",
          type: "quick-calc",
          topic: "1.1.4 The 2/4 Rule",
          question: "OESD on turn (8 outs), one card to come. Equity?",
          correctAnswer: "16%",
          acceptableAnswers: ["16", "16%", "17", "17%"],
          explanation: "8 × 2 = 16%",
          difficulty: "easy",
          points: 1
        },
        {
          id: "speed4",
          type: "quick-calc",
          topic: "1.1.2 Calculation Methods",
          question: "Pot $100, bet $50. Your pot odds ratio? (X:1)",
          correctAnswer: "3:1",
          acceptableAnswers: ["3:1", "3", "3 to 1"],
          explanation: "$150 : $50 = 3:1",
          difficulty: "medium",
          points: 1
        },
        {
          id: "speed5",
          type: "quick-calc",
          topic: "1.1.4 The 2/4 Rule",
          question: "Gutshot on turn (4 outs). Equity?",
          correctAnswer: "8%",
          acceptableAnswers: ["8", "8%", "9", "9%"],
          explanation: "4 × 2 = 8%",
          difficulty: "easy",
          points: 1
        }
      ]
    }
  ]
};

export default potOddsQuiz;
