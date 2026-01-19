import type { QuizData } from '@/types/quiz';

export const openRaisingQuiz: QuizData = {
  moduleInfo: {
    id: "2.3",
    title: "Open Raising Ranges",
    category: "Preflop Strategy",
    phase: 2,
    level: "Fundamental",
    passingScore: 80,
    estimatedTime: "25-35 minutes",
    timedModeMinutes: 25,
    speedModeMinutes: 12,
    learningOutcomes: [
      "Construct RFI (Raise First In) ranges for all positions",
      "Apply consistent open raise sizing",
      "Adjust ranges based on table dynamics",
      "Avoid limping in most situations",
      "Balance ranges for unexploitability"
    ],
    nextModule: {
      id: "3.1",
      title: "Continuation Betting"
    }
  },
  sections: [
    {
      id: "conceptual",
      title: "Section A: Conceptual Understanding",
      description: "Test your understanding of RFI theory and principles",
      weight: 20,
      questions: [
        {
          id: "c1",
          type: "multiple-choice",
          topic: "2.3.1 RFI Philosophy",
          question: "What does RFI stand for in poker?",
          options: [
            "Raise For Initiative",
            "Raise First In",
            "Range Finding Information",
            "Responsive Flop Initiative"
          ],
          correctAnswer: 1,
          explanation: "RFI stands for Raise First In - when you're the first player to enter the pot with a raise (no one has raised before you). This is different from calling, limping, or 3-betting someone else's raise.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "c2",
          type: "multiple-choice",
          topic: "2.3.1 RFI Philosophy",
          question: "Why is raising (not limping) the default first-in action in modern poker?",
          options: [
            "Raising shows strength and scares opponents",
            "Raising gives you initiative, fold equity, and builds a pot with your strong hands",
            "You should always raise regardless of your cards",
            "Limping is illegal in most poker rooms"
          ],
          correctAnswer: 1,
          explanation: "Raising is superior to limping because: 1) You take the initiative (aggressor advantage), 2) You have fold equity (can win without showdown), 3) You build a pot with your good hands, 4) You're harder to play against. Limping is weak, passive, and allows opponents to see cheap flops with any hand.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "c3",
          type: "true-false",
          topic: "2.3.6 Range Balance Concepts",
          question: "A balanced opening range means you should open the same hands from every position.",
          correctAnswer: false,
          explanation: "No! A balanced range means within each position, your range contains both strong hands and bluffs/semi-bluffs so you're not exploitable. But your ranges should be DIFFERENT by position - much tighter from early position, wider from late position. Balance is within a position, not across positions.",
          difficulty: "medium",
          points: 1
        },
        {
          id: "c4",
          type: "multiple-choice",
          topic: "2.3.3 Open Raise Sizing",
          question: "What is the standard open raise sizing in cash games?",
          options: [
            "Min-raise (2bb)",
            "2.5-3bb",
            "4-5bb",
            "Pot-sized"
          ],
          correctAnswer: 1,
          explanation: "The standard open raise is 2.5-3bb in cash games (some games trend toward 2.5bb, others 3bb depending on the game). This sizing accomplishes our goals: fold out weak hands, build a pot, while not over-committing. Tournaments often use larger sizes (2.5-3.5bb) due to antes.",
          difficulty: "medium",
          points: 1
        },
        {
          id: "c5",
          type: "multiple-choice",
          topic: "2.3.2 Position-Based RFI Ranges",
          question: "Which position has the widest RFI range?",
          options: [
            "UTG (Under the Gun)",
            "MP (Middle Position)",
            "CO (Cutoff)",
            "BTN (Button)"
          ],
          correctAnswer: 3,
          explanation: "The button has the widest RFI range (40-50%+ of hands). You have position on everyone, only 2 players left to act (blinds), and you're attempting to steal blinds frequently. BTN is the most profitable position in poker largely due to this ability to play many hands profitably.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "c6",
          type: "true-false",
          topic: "2.3.1 RFI Philosophy",
          question: "You should never open-limp in a 6-max or 9-max cash game.",
          correctAnswer: false,
          explanation: "While open-limping is generally weak and should be avoided in most situations, there are exceptions: 1) Small blind limping (only 0.5bb more to enter), 2) Against extremely aggressive players who will punish raises, 3) Specific exploitative strategies. However, as a default strategy, you should raise first in, not limp.",
          difficulty: "medium",
          points: 1
        }
      ]
    },
    {
      id: "calculation",
      title: "Section B: Range Construction Skills",
      description: "Demonstrate your ability to construct proper RFI ranges",
      weight: 35,
      questions: [
        {
          id: "calc1",
          type: "multiple-choice",
          topic: "2.3.2 Position-Based RFI Ranges",
          question: "Approximately what percentage of hands should you RFI from UTG in a 9-max game?",
          options: [
            "5-8%",
            "12-15%",
            "20-25%",
            "30-35%"
          ],
          correctAnswer: 1,
          explanation: "UTG in 9-max should RFI approximately 12-15% of hands. This typically includes hands like 77+, ATs+, KJs+, QJs, AJo+, KQo. You need a tight range because: 1) 8 players act behind you, 2) You'll be out of position postflop, 3) Higher chance of facing a 3-bet.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "calc2",
          type: "multiple-choice",
          topic: "2.3.2 Position-Based RFI Ranges",
          question: "Approximately what percentage of hands should you RFI from the Cutoff?",
          options: [
            "15-18%",
            "25-30%",
            "35-40%",
            "45-50%"
          ],
          correctAnswer: 1,
          explanation: "From the Cutoff (CO), you should RFI approximately 25-30% of hands. This is much wider than early position because only 3 players act behind you (BTN, SB, BB), and you'll have position postflop unless the button continues. CO is one of the most profitable positions.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "calc3",
          type: "multiple-choice",
          topic: "2.3.2 Position-Based RFI Ranges",
          question: "Approximately what percentage of hands should you RFI from the Button?",
          options: [
            "25-30%",
            "35-40%",
            "45-50%",
            "60-65%"
          ],
          correctAnswer: 2,
          explanation: "From the Button, you can RFI 45-50% of hands (aggressive players go even wider, 50-60%). You have maximum positional advantage, only 2 players to act (blinds), and you're stealing dead money. This wide range is profitable because of position + fold equity.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "calc4",
          type: "multiple-choice",
          topic: "2.3.3 Open Raise Sizing",
          question: "You're on the button in a $1/$2 game. What should your standard open raise size be?",
          options: [
            "$2 (min-raise)",
            "$4 (2bb)",
            "$6 (3bb)",
            "$10 (5bb)"
          ],
          correctAnswer: 2,
          explanation: "Standard open raise is $6 (3bb) or sometimes $5 (2.5bb) depending on the game. From the button, you use the same sizing as other positions in cash games - sizing doesn't typically change by position (though some players do use smaller sizes from the button). Consistent sizing prevents giving away information.",
          difficulty: "easy",
          points: 2
        },
        {
          id: "calc5",
          type: "multiple-choice",
          topic: "2.3.2 Position-Based RFI Ranges",
          question: "Which of these hands is in a standard UTG RFI range but NOT a button RFI range?",
          options: [
            "This is a trick question - button's range is wider than UTG",
            "72o (seven-deuce offsuit)",
            "AA (pocket aces)",
            "None - they're the same"
          ],
          correctAnswer: 0,
          explanation: "This is a trick question to test understanding. The button's range is WIDER (includes more hands) than UTG. Every hand you open from UTG, you also open from the button, PLUS many more hands. There's no hand you'd open UTG but fold from the button (button is strictly wider).",
          difficulty: "hard",
          points: 2
        },
        {
          id: "calc6",
          type: "multiple-choice",
          topic: "2.3.4 Range Visualization & Memorization",
          question: "In a standard RFI range chart, what does 'ATo+' mean?",
          options: [
            "Only ATo (ace-ten offsuit)",
            "ATo and all better offsuit aces (AJo, AQo, AKo)",
            "All aces ten or higher including suited",
            "Ace-ten and pocket tens"
          ],
          correctAnswer: 1,
          explanation: "The '+' symbol means 'and better.' So ATo+ means ATo, AJo, AQo, AKo (all offsuit aces with ten or higher). Similarly, 77+ means 77, 88, 99, TT, JJ, QQ, KK, AA. This shorthand is commonly used in range notation.",
          difficulty: "easy",
          points: 2
        },
        {
          id: "calc7",
          type: "multiple-choice",
          topic: "2.3.5 Dynamic Adjustments",
          question: "You're at a very tight table where players fold to raises over 80% of the time. How should you adjust your RFI ranges?",
          options: [
            "Tighten up - only open premium hands",
            "Keep ranges the same",
            "Widen ranges - you're getting great fold equity",
            "Stop raising and start limping"
          ],
          correctAnswer: 2,
          explanation: "Against tight opponents who fold too much, you should WIDEN your ranges and raise more hands. You're printing money with fold equity. From the button against tight blinds, you might open 60-70% of hands profitably. Exploit their weakness by raising more, not less.",
          difficulty: "medium",
          points: 2
        }
      ]
    },
    {
      id: "application",
      title: "Section C: Practical Application",
      description: "Apply RFI concepts to realistic poker scenarios",
      weight: 35,
      questions: [
        {
          id: "app1",
          type: "scenario",
          topic: "2.3.2 Position-Based RFI Ranges",
          scenario: "9-max $1/$2 game. You're UTG with Q♠J♠. Action folds to you.",
          question: "Should QJs be in your UTG RFI range?",
          options: [
            "Yes - it's a suited Broadway hand, always raise",
            "No - QJs is too weak from UTG, fold",
            "Limp - see a cheap flop",
            "It depends on table dynamics"
          ],
          correctAnswer: 1,
          explanation: "QJs is a fold from UTG in 9-max. While it's a decent hand, it's too weak for UTG because: 1) You're out of position, 2) 8 players behind, 3) Dominated by AQ, KQ, QQ+ that opponents will continue with. A tight UTG range is typically: 77+, ATs+, KQs, AJo+, KQo. Save QJs for middle position or later.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "app2",
          type: "scenario",
          topic: "2.3.3 Open Raise Sizing",
          scenario: "You're on the button with A♠K♦. Folds to you. You want to raise. Blinds are $1/$2.",
          question: "What should you raise to, and why?",
          options: [
            "$10 (5bb) - show strength with AK",
            "$6 (3bb) - standard sizing, don't give away hand strength",
            "$4 (2bb) - smaller size since you have position",
            "$2 (min-raise) - build pot cheaply"
          ],
          correctAnswer: 1,
          explanation: "Raise to $6 (3bb) - your standard opening size. You should use the same sizing with all your opening hands (whether AA or 72s) to avoid giving away information. Varying your sizing based on hand strength is exploitable. Some games use $5 (2.5bb), but consistency is key.",
          difficulty: "easy",
          points: 2
        },
        {
          id: "app3",
          type: "scenario",
          topic: "2.3.5 Dynamic Adjustments",
          scenario: "You've been playing tight for 2 hours. An observant opponent says 'You only raise with good hands.' You're on the button with 8♥6♥.",
          question: "How should you adjust?",
          options: [
            "Fold - they're onto you, play tight",
            "Raise - show you can play other hands and regain fold equity",
            "Limp - disguise hand strength",
            "Wait for a premium hand to prove them wrong"
          ],
          correctAnswer: 1,
          explanation: "You should raise. You've developed a tight image which has DECREASED your fold equity (opponents think you always have it when you raise). By raising some weaker hands, you: 1) Get action on your strong hands later, 2) Can steal more pots, 3) Balance your range. From the button, 86s is a fine raise to mix into your range.",
          difficulty: "hard",
          points: 2
        },
        {
          id: "app4",
          type: "scenario",
          topic: "2.3.1 RFI Philosophy",
          scenario: "You have 9♠9♥ in middle position. Two players have limped in front of you.",
          question: "What should you do?",
          options: [
            "Limp behind - keep pot small with medium pair",
            "Fold - too many players already in",
            "Raise (isolation raise) - build pot and take initiative",
            "Call and see the flop"
          ],
          correctAnswer: 2,
          explanation: "Raise (isolation raise). With 99 you want to: 1) Thin the field (fewer opponents = higher chance your pair wins), 2) Take initiative (c-bet when you miss), 3) Build a pot (you likely have the best hand). Limping allows everyone in cheaply and you lose control. Standard size: 3bb + 1bb per limper = 5bb.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "app5",
          type: "scenario",
          topic: "2.3.6 Range Balance Concepts",
          scenario: "You only raise from UTG with AA, KK, QQ, and AK. An opponent notices and only continues against you with premium hands.",
          question: "What's wrong with this strategy?",
          options: [
            "Nothing - you should only play premium hands from UTG",
            "Your range is too narrow and unbalanced - you're exploitable",
            "You should add more hands but only bluffs",
            "You need to limp your strong hands"
          ],
          correctAnswer: 1,
          explanation: "Your range is exploitably tight. Problems: 1) You get no action on your premium hands (opponents only call with QQ+/AK), 2) You never win pots when you don't wake up with premiums, 3) Opponents can profitably fold everything. You need a wider, balanced range including hands like 77+, AQ, KQs, etc.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "app6",
          type: "scenario",
          topic: "2.3.2 Position-Based RFI Ranges",
          scenario: "6-max game. You're UTG with A♥5♥. Standard UTG range in 6-max is wider than 9-max UTG.",
          question: "Is A5s a raise from UTG in 6-max?",
          options: [
            "Yes - it's suited and you can open wider in 6-max",
            "No - A5s is still too weak, even for 6-max UTG",
            "Only raise if it's hearts or spades",
            "Limp instead"
          ],
          correctAnswer: 1,
          explanation: "A5s is a fold from UTG even in 6-max. While 6-max UTG is wider than 9-max UTG (15-18% vs 12-15%), A5s is still too weak. A typical 6-max UTG range includes 77+, A9s+, KTs+, QJs, AJo+, KQo. A5s plays better from CO/BTN where you have position and can realize its equity better.",
          difficulty: "hard",
          points: 2
        }
      ]
    },
    {
      id: "speed",
      title: "Section D: Speed Round",
      description: "Quick RFI range recall",
      weight: 10,
      timed: true,
      timePerQuestion: 15,
      questions: [
        {
          id: "speed1",
          type: "quick-calc",
          topic: "2.3.2 Position-Based RFI Ranges",
          question: "UTG RFI % in 9-max? (approx)",
          correctAnswer: "15%",
          acceptableAnswers: ["15", "15%", "12", "12%", "13", "13%", "14", "14%"],
          explanation: "UTG 9-max ≈ 12-15%",
          difficulty: "medium",
          points: 1
        },
        {
          id: "speed2",
          type: "quick-calc",
          topic: "2.3.2 Position-Based RFI Ranges",
          question: "CO RFI % in 6-max? (approx)",
          correctAnswer: "27%",
          acceptableAnswers: ["27", "27%", "25", "25%", "28", "28%", "30", "30%"],
          explanation: "CO ≈ 25-30%",
          difficulty: "medium",
          points: 1
        },
        {
          id: "speed3",
          type: "quick-calc",
          topic: "2.3.2 Position-Based RFI Ranges",
          question: "BTN RFI % in 6-max? (approx)",
          correctAnswer: "45%",
          acceptableAnswers: ["45", "45%", "48", "48%", "50", "50%", "40", "40%"],
          explanation: "BTN ≈ 45-50%",
          difficulty: "medium",
          points: 1
        },
        {
          id: "speed4",
          type: "quick-calc",
          topic: "2.3.3 Open Raise Sizing",
          question: "Standard open raise in bb?",
          correctAnswer: "2.5-3bb",
          acceptableAnswers: ["2.5", "3", "2.5bb", "3bb", "2.5-3", "2.5-3bb"],
          explanation: "Standard open = 2.5-3bb",
          difficulty: "easy",
          points: 1
        },
        {
          id: "speed5",
          type: "quick-calc",
          topic: "2.3.1 RFI Philosophy",
          question: "What does RFI stand for?",
          correctAnswer: "Raise First In",
          acceptableAnswers: ["Raise First In", "raise first in", "RFI"],
          explanation: "RFI = Raise First In",
          difficulty: "easy",
          points: 1
        }
      ]
    }
  ]
};

export default openRaisingQuiz;
