import type { QuizData } from '@/types/quiz';

export const valueBettingQuiz: QuizData = {
  moduleInfo: {
    id: "3.2",
    title: "Value Betting",
    category: "Postflop Strategy",
    phase: 3,
    level: "Fundamental",
    passingScore: 80,
    estimatedTime: "30-40 minutes",
    timedModeMinutes: 30,
    speedModeMinutes: 15,
    learningOutcomes: [
      "Define value betting and identify opportunities",
      "Assess hand strength relative to opponent's calling range",
      "Size value bets for maximum extraction",
      "Identify thin value opportunities",
      "Avoid value-owning with medium strength hands"
    ],
    nextModule: {
      id: "4.1",
      title: "Bluffing Fundamentals"
    }
  },
  sections: [
    {
      id: "conceptual",
      title: "Section A: Conceptual Understanding",
      description: "Test your understanding of value betting theory and principles",
      weight: 20,
      questions: [
        {
          id: "c1",
          type: "multiple-choice",
          topic: "3.2.1 Value Bet Definition",
          question: "What is a value bet?",
          options: [
            "Any bet you make when you think you're ahead",
            "A bet where you expect to be called by worse hands more often than better hands",
            "A bet that represents good value for money",
            "A bet made on the river with the nuts"
          ],
          correctAnswer: 1,
          explanation: "A value bet is a bet where you expect to be called by worse hands more often than better hands. You're betting for value - to extract chips from worse hands. This is different from betting because you think you're ahead; you need to be ahead of the range that CALLS, not the range that folds.",
          difficulty: "medium",
          points: 1
        },
        {
          id: "c2",
          type: "multiple-choice",
          topic: "3.2.1 Value Bet Definition",
          question: "What's the key difference between value betting and bluffing?",
          options: [
            "Value bets are larger",
            "Value betting wins from worse hands calling; bluffing wins from better hands folding",
            "Value bets are only on the river",
            "There's no difference"
          ],
          correctAnswer: 1,
          explanation: "The fundamental difference: VALUE BETTING profits when worse hands call. BLUFFING profits when better hands fold. Sometimes you bet for both reasons (semi-bluff), but pure value bets want calls from worse, pure bluffs want folds from better.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "c3",
          type: "true-false",
          topic: "3.2.4 Thin Value Betting",
          question: "A thin value bet is when you bet a marginal hand that's only slightly ahead of your opponent's calling range.",
          correctAnswer: true,
          explanation: "Correct! Thin value betting is betting marginal hands that are only slightly ahead of opponent's calling range - think second pair, weak top pair, or even ace-high sometimes. It's a crucial skill for maximizing value but requires good hand reading to avoid value-owning yourself.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "c4",
          type: "multiple-choice",
          topic: "3.2.2 Hand Strength Assessment",
          question: "When deciding to value bet, what matters most?",
          options: [
            "Your absolute hand strength (two pair, flush, etc.)",
            "Your hand strength relative to opponent's calling range",
            "How much money is in the pot",
            "Whether you raised preflop"
          ],
          correctAnswer: 1,
          explanation: "Your hand strength relative to opponent's CALLING range is what matters. Top pair may be a monster on K♠7♦2♣ but mediocre on K♠Q♥J♦. Ask: 'What worse hands will call my bet?' Not: 'Do I have a good hand?' Hand strength is always relative to range.",
          difficulty: "medium",
          points: 1
        },
        {
          id: "c5",
          type: "multiple-choice",
          topic: "3.2.6 Common Value Bet Mistakes",
          question: "What is 'value-owning' yourself?",
          options: [
            "Betting so much that you win all the money",
            "Betting a medium-strength hand that only gets called by better",
            "Getting maximum value from the nuts",
            "Owning your opponent with a large bet"
          ],
          correctAnswer: 1,
          explanation: "Value-owning (or 'value-cutting') yourself is betting a medium-strength hand that only gets called by better hands and folds out worse hands. Example: Betting second pair on a scary board - better hands call, worse hands fold. You're actually bluffing when you think you're value betting. Checking is better.",
          difficulty: "medium",
          points: 1
        },
        {
          id: "c6",
          type: "true-false",
          topic: "3.2.3 Value Bet Sizing",
          question: "You should always bet pot-sized or larger with your strongest hands for maximum value.",
          correctAnswer: false,
          explanation: "Not necessarily! Optimal value bet sizing depends on: 1) Opponent's calling range and tendencies, 2) Stack depth, 3) Board texture. Sometimes smaller bets get called by more hands and earn more total value. Against calling stations, bet huge. Against nitty players, bet smaller. Size should be opponent-dependent.",
          difficulty: "medium",
          points: 1
        }
      ]
    },
    {
      id: "calculation",
      title: "Section B: Value Assessment Skills",
      description: "Demonstrate your ability to identify value betting opportunities",
      weight: 35,
      questions: [
        {
          id: "calc1",
          type: "multiple-choice",
          topic: "3.2.2 Hand Strength Assessment",
          question: "You have K♠Q♥ on K♦7♣3♠. Your opponent is tight-passive. River: 2♥. Should you value bet top pair, decent kicker?",
          options: [
            "Yes - top pair is strong, always bet",
            "No - check, your kicker isn't good enough",
            "Yes - bet small, you're ahead of some Kx and maybe some 7x",
            "Fold - board is too scary"
          ],
          correctAnswer: 2,
          explanation: "Yes, bet small for thin value. Against a tight-passive player on K♦7♣3♠2♥ (very dry board), your KQ is ahead of KJ, KT, K9, and maybe some 7x that check-called. They're not bluff-raising rivers. Bet small (30-40% pot) to get called by worse kings and some sevens. Check loses value.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "calc2",
          type: "multiple-choice",
          topic: "3.2.6 Common Value Bet Mistakes",
          question: "You have J♠J♥ on K♠Q♥J♦T♠9♣. Opponent has been aggressive. Should you value bet your straight?",
          options: [
            "Yes - you have a straight, always bet",
            "No - any ace beats you, this is a check-call",
            "Bet pot - charge the draws",
            "Go all-in for maximum value"
          ],
          correctAnswer: 1,
          explanation: "Check-call. With JJ you have the ignorant end of the straight (any ace makes a better straight). Against an aggressive opponent on this runout (KQJT9), their calling range is heavily weighted to Ax (the nuts). Betting = value-owning yourself. Check and call reasonable bets, fold to large bets/raises.",
          difficulty: "hard",
          points: 2
        },
        {
          id: "calc3",
          type: "multiple-choice",
          topic: "3.2.3 Value Bet Sizing",
          question: "River, pot is $100. You have the nuts. Opponent is a calling station (calls too much). What's the best bet size?",
          options: [
            "$30 (small, to get called more often)",
            "$50 (half pot)",
            "$80 (large, they call too much anyway)",
            "$100+ (pot or overbet)"
          ],
          correctAnswer: 3,
          explanation: "Overbet or bet pot ($100+) against calling stations. Since they call too much with weak hands, you can use huge sizings for maximum value. They'll call $100 with hands that should fold to $50, so bet big. Against calling stations, size up. Against nits, size down.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "calc4",
          type: "multiple-choice",
          topic: "3.2.5 Value Betting by Street",
          question: "What's different about value betting the river vs. earlier streets?",
          options: [
            "Nothing - betting is betting",
            "River betting ends the hand; there's no card coming to beat you or save opponent",
            "River bets should always be larger",
            "You can only value bet the river"
          ],
          correctAnswer: 1,
          explanation: "River value betting is unique because: 1) No more cards to come (your hand won't get outdrawn), 2) Opponent's range is capped (they'd have raised stronger hands earlier), 3) Opponent can't 'play their draw' - they either have it or don't. This allows for thin value bets you couldn't make earlier.",
          difficulty: "easy",
          points: 2
        },
        {
          id: "calc5",
          type: "multiple-choice",
          topic: "3.2.4 Thin Value Betting",
          question: "River: A♠7♣3♦8♥2♣. You have A♥6♥ (top pair, bad kicker). Passive opponent checks. Pot $40. Should you bet?",
          options: [
            "Check back - kicker too weak",
            "Bet small ($15) - thin value from worse aces and pairs",
            "Bet large ($40) - you have top pair",
            "Fold - you're probably behind"
          ],
          correctAnswer: 1,
          explanation: "Bet small ($15, ~37% pot) for thin value against a passive player. On this dry, ace-high board, they can check-call with A5, A4, A3, A2, and maybe some 7x or 8x. Your A6 is ahead of those hands. Against aggressive opponents, checking is safer (they might check-raise bluff). Context matters!",
          difficulty: "hard",
          points: 2
        },
        {
          id: "calc6",
          type: "multiple-choice",
          topic: "3.2.3 Value Bet Sizing",
          question: "You have A♠A♦ on A♥K♣Q♦ flop. You bet flop and turn. River: 2♣ (brick). Pot is $200. Best sizing?",
          options: [
            "$50 (25% pot) - keep them in",
            "$100 (50% pot) - balanced sizing",
            "$150-200 (75%-pot) - charge them maximum",
            "Check - hope they bluff"
          ],
          correctAnswer: 2,
          explanation: "Bet large ($150-200, 75%-pot or pot-sized). You have the nuts (top set), the pot is already big, and opponent has called flop and turn so they have SOMETHING. They're pot-committed to call river with hands like KQ, AQ, AK, KK, QQ. Extract maximum value with large sizing. They're not folding now.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "calc7",
          type: "multiple-choice",
          topic: "3.2.2 Hand Strength Assessment",
          question: "Which river scenario is the BEST thin value bet spot?",
          options: [
            "You have second pair on a wet board vs an aggressive opponent",
            "You have top pair weak kicker on a dry board vs a passive opponent",
            "You have the nuts vs any opponent",
            "You have a flush draw that missed vs a tight opponent"
          ],
          correctAnswer: 1,
          explanation: "Top pair weak kicker on a dry board vs passive opponent is ideal for thin value. Dry board = fewer scare cards, passive opponent = won't check-raise bluff, weak kicker = still beats their calling range of weaker top pairs and second pairs. The other scenarios aren't thin value: nuts is thick value, second pair likely value-owns, missed draw is a bluff.",
          difficulty: "medium",
          points: 2
        }
      ]
    },
    {
      id: "application",
      title: "Section C: Practical Application",
      description: "Apply value betting concepts to realistic poker scenarios",
      weight: 35,
      questions: [
        {
          id: "app1",
          type: "scenario",
          topic: "3.2.5 Value Betting by Street",
          scenario: "Flop: You have A♠K♠ on A♥9♦4♣ and bet. Opponent calls. Turn: 2♣. You bet again, opponent calls. River: 7♥. Pot is $150.",
          question: "You have top pair, top kicker. What should you do?",
          options: [
            "Check - you might be behind by now",
            "Bet small ($50) - extract value from worse aces",
            "Bet large ($150) - you have the best hand",
            "Check-fold if they bet"
          ],
          correctAnswer: 1,
          explanation: "Bet small-to-medium ($50-75) for value. Your AK is ahead of A9, A4, A2, and maybe some 9x. Opponent called twice, so they have something. River brick (7♥) changes nothing. Size moderately because opponent might have better (AA, 99, 44) or two pair, but there are enough worse hands to bet. Classic value bet spot.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "app2",
          type: "scenario",
          topic: "3.2.6 Common Value Bet Mistakes",
          scenario: "River: K♠Q♥J♠T♦8♣. You have Q♠J♥ (two pair). Opponent has been calling your bets. Pot is $80.",
          question: "Should you value bet your two pair?",
          options: [
            "Yes - bet large, two pair is strong",
            "Yes - bet small for thin value",
            "No - check-call, too many straights beat you",
            "No - check-fold, you're beat"
          ],
          correctAnswer: 2,
          explanation: "Check-call, don't value bet. On KQJT8, any ace makes a straight, any nine makes a straight. Your two pair is a bluff-catcher. If you bet, only better hands call (straights, sets). Worse hands fold. This is value-owning. Check and call reasonable bets, fold to very large bets.",
          difficulty: "hard",
          points: 2
        },
        {
          id: "app3",
          type: "scenario",
          topic: "3.2.4 Thin Value Betting",
          scenario: "River: 9♠6♣3♦K♥2♠. You have 9♦8♦ (pair of nines). Passive opponent checks. Pot is $30. You've been checking behind.",
          question: "Is this a thin value bet spot?",
          options: [
            "Yes - bet $10-12, opponent could have worse pairs or ace-high",
            "No - check back, second pair is too weak",
            "Yes - bet $30, you probably have the best hand",
            "Fold to any bet"
          ],
          correctAnswer: 0,
          explanation: "Yes, bet small ($10-12) for thin value against a passive player. On this dry board (9♠6♣3♦K♥2♠), your 9♦8♦ beats 8x, 7x, 6x, 3x, 2x, and ace-high. Passive opponents check-call with weak pairs and even ace-high. You're ahead of enough calling range to bet. This is expert-level thin value betting.",
          difficulty: "hard",
          points: 2
        },
        {
          id: "app4",
          type: "scenario",
          topic: "3.2.3 Value Bet Sizing",
          scenario: "You're playing against a very tight player. River, you have the nuts. Pot is $50. You estimate they'll call $20 with their range, but fold to $40.",
          question: "What should you bet?",
          options: [
            "$40 - maximize when you have the nuts",
            "$20 - get called and win $20",
            "$50 - bet pot",
            "$10 - very small to induce calls"
          ],
          correctAnswer: 1,
          explanation: "Bet $20. You want to bet the MAXIMUM amount opponent will call, not the maximum amount possible. If they fold to $40 but call $20, betting $40 wins $0 (they fold), but betting $20 wins $20. Against tight players, use smaller value bet sizes. Sometimes less is more.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "app5",
          type: "scenario",
          topic: "3.2.5 Value Betting by Street",
          scenario: "You have 8♠8♥. Flop: 8♦5♣2♥ (you flopped a set). Turn: K♠. River: A♣. Board: 8♦5♣2♥K♠A♣. Opponent called flop and turn bets. Pot: $120.",
          question: "How should you approach the river with your set?",
          options: [
            "Check - the ace is scary, hope they bluff",
            "Bet small ($40) - for thin value",
            "Bet large ($100+) - you have a set, they're committed",
            "Check-fold - you might be beat"
          ],
          correctAnswer: 2,
          explanation: "Bet large ($100-120). Opponent called flop and turn, so they have a hand (pair, draw, etc.). The ace and king likely improved them (Ax, Kx). Your set is still very strong. They're pot-committed with top pair or better. Extract maximum value. Don't get scared of scare cards when you have a monster.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "app6",
          type: "scenario",
          topic: "3.2.1 Value Bet Definition",
          scenario: "You bet river with middle pair. All worse hands fold, all better hands call. You win 30% of the time when called.",
          question: "Was your bet a value bet?",
          options: [
            "Yes - you won sometimes",
            "No - you only got called by better hands, this was a mistake",
            "Yes - betting is always good",
            "It depends on the pot size"
          ],
          correctAnswer: 1,
          explanation: "No, this was NOT a value bet - it was a mistake (value-owning yourself). A value bet gets called by worse hands more often than better hands. If you only get called by better (30% win rate when called), you should have checked. Your bet had negative expected value.",
          difficulty: "easy",
          points: 2
        }
      ]
    },
    {
      id: "speed",
      title: "Section D: Speed Round",
      description: "Quick value betting recognition",
      weight: 10,
      timed: true,
      timePerQuestion: 15,
      questions: [
        {
          id: "speed1",
          type: "quick-calc",
          topic: "3.2.1 Value Bet Definition",
          question: "Value bet wants calls from? (better/worse)",
          correctAnswer: "worse",
          acceptableAnswers: ["worse", "Worse", "worse hands", "Worse hands"],
          explanation: "Value bets want calls from worse hands",
          difficulty: "easy",
          points: 1
        },
        {
          id: "speed2",
          type: "quick-calc",
          topic: "3.2.1 Value Bet Definition",
          question: "Bluff wants folds from? (better/worse)",
          correctAnswer: "better",
          acceptableAnswers: ["better", "Better", "better hands", "Better hands"],
          explanation: "Bluffs want folds from better hands",
          difficulty: "easy",
          points: 1
        },
        {
          id: "speed3",
          type: "quick-calc",
          topic: "3.2.3 Value Bet Sizing",
          question: "Vs calling station: bet big or small?",
          correctAnswer: "big",
          acceptableAnswers: ["big", "Big", "large", "Large", "bigger"],
          explanation: "Bet big vs calling stations for max value",
          difficulty: "easy",
          points: 1
        },
        {
          id: "speed4",
          type: "quick-calc",
          topic: "3.2.3 Value Bet Sizing",
          question: "Vs tight player: bet big or small?",
          correctAnswer: "small",
          acceptableAnswers: ["small", "Small", "smaller", "Smaller"],
          explanation: "Bet small vs tight players to get called",
          difficulty: "easy",
          points: 1
        },
        {
          id: "speed5",
          type: "quick-calc",
          topic: "3.2.4 Thin Value Betting",
          question: "Thin value = marginal hand? (Y/N)",
          correctAnswer: "Y",
          acceptableAnswers: ["Y", "y", "yes", "Yes", "YES"],
          explanation: "Thin value = betting marginal/slightly-ahead hands",
          difficulty: "easy",
          points: 1
        }
      ]
    }
  ]
};

export default valueBettingQuiz;
