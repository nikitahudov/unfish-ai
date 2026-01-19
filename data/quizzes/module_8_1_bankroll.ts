import type { QuizData } from '@/types/quiz';

export const bankrollQuiz: QuizData = {
  moduleInfo: {
    id: "8.1",
    title: "Bankroll Management",
    category: "Financial Strategy",
    phase: 1,
    level: "Fundamental",
    passingScore: 80,
    estimatedTime: "25-35 minutes",
    timedModeMinutes: 25,
    speedModeMinutes: 12,
    learningOutcomes: [
      "Calculate appropriate bankroll requirements",
      "Implement stake selection rules",
      "Know when to move up or down",
      "Understand risk of ruin basics",
      "Separate poker and life finances"
    ],
    nextModule: {
      id: "8.2",
      title: "Game Selection"
    }
  },
  sections: [
    {
      id: "conceptual",
      title: "Section A: Conceptual Understanding",
      description: "Test your understanding of bankroll management principles",
      weight: 20,
      questions: [
        {
          id: "8.1-c1",
          type: "multiple-choice",
          topic: "8.1.1 Bankroll Fundamentals",
          question: "What is the primary purpose of proper bankroll management?",
          options: [
            "To maximize the stakes you can play at",
            "To minimize risk of going broke due to variance",
            "To ensure you always win every session",
            "To impress other players with your bankroll size"
          ],
          correctAnswer: 1,
          explanation: "Bankroll management exists to protect you from the inevitable swings of poker variance. Even winning players experience downswings. Proper BRM ensures you have enough buy-ins to survive these swings without going broke, allowing your skill edge to manifest over the long run. It's about survival, not maximization.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "8.1-c2",
          type: "true-false",
          topic: "8.1.1 Bankroll Fundamentals",
          question: "Your poker bankroll should be completely separate from your living expenses and life savings.",
          correctAnswer: true,
          explanation: "Absolutely critical. Never mix poker money with rent, bills, or emergency funds. Your poker bankroll should be money you can afford to lose without affecting your life. Playing with 'scared money' needed for bills leads to poor decision-making, risk-aversion, and tilt. Separate accounts, separate mental accounting.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "8.1-c3",
          type: "multiple-choice",
          topic: "8.1.3 Stake Selection",
          question: "Which factor is MOST important when selecting which stakes to play?",
          options: [
            "The stakes where the most money can be won",
            "Whatever stakes your friends are playing",
            "Stakes appropriate for your bankroll and skill level",
            "The highest stakes you can afford to buy into once"
          ],
          correctAnswer: 2,
          explanation: "Stake selection must balance bankroll (do you have enough buy-ins?) and skill level (are you winning at this level?). Playing too high risks ruin; playing too low is opportunity cost. Your ego, friends' stakes, and maximum affordability are all terrible selection criteria. Play where you have edge AND sufficient buy-ins.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "8.1-c4",
          type: "multiple-choice",
          topic: "8.1.2 Buy-In Requirements",
          question: "Why do tournaments require much larger bankrolls (100+ buy-ins) than cash games (20-30 buy-ins)?",
          options: [
            "Tournaments cost more to enter",
            "Tournament variance is much higher than cash game variance",
            "Tournaments require more skill",
            "Cash games allow you to rebuy unlimited times"
          ],
          correctAnswer: 1,
          explanation: "Tournament variance is MASSIVE. Even great players can go 50+ tournaments without a significant cash due to field size, payout structure, and all-in variance. Cash games have much smoother variance curves because you can quit when ahead, rebuy when stuck, and outcomes are continuous rather than binary. Higher variance = more buy-ins needed for same risk of ruin.",
          difficulty: "medium",
          points: 1
        },
        {
          id: "8.1-c5",
          type: "true-false",
          topic: "8.1.5 Moving Down Stakes",
          question: "Moving down in stakes is admitting defeat and means you're a failed poker player.",
          correctAnswer: false,
          explanation: "This is a toxic, ego-driven mindset that destroys bankrolls. Moving down is professional bankroll management—it's what winning players do during downswings. Every great player has moved down at some point. It's not failure; it's discipline and variance awareness. The real failure is staying at stakes you can't afford and going broke. Check your ego, protect your bankroll.",
          difficulty: "medium",
          points: 1
        },
        {
          id: "8.1-c6",
          type: "multiple-choice",
          topic: "8.1.1 Bankroll Fundamentals",
          question: "What does 'risk of ruin' measure in poker?",
          options: [
            "The chance you'll lose any single session",
            "The probability of losing your entire bankroll given your edge and variance",
            "How risky your playing style is",
            "The likelihood of being cheated"
          ],
          correctAnswer: 1,
          explanation: "Risk of ruin is a mathematical concept: given your win rate, variance (standard deviation), and current bankroll in buy-ins, what's the probability you go completely broke? Even winning players have some risk of ruin if they don't have enough buy-ins. Proper BRM aims to keep risk of ruin below 5% (ideally 1-2%).",
          difficulty: "hard",
          points: 1
        }
      ]
    },
    {
      id: "calculation",
      title: "Section B: Calculation Skills",
      description: "Calculate bankroll requirements and stake selection",
      weight: 35,
      questions: [
        {
          id: "8.1-calc1",
          type: "calculation",
          topic: "8.1.2 Buy-In Requirements",
          question: "You have a $2,000 bankroll for online cash games. Using conservative 30 buy-in requirements, what is the maximum buy-in you should play?",
          correctAnswer: 66,
          acceptableRange: [65, 67],
          unit: "$",
          explanation: "$2,000 ÷ 30 buy-ins = $66.67 per buy-in. You should play stakes with buy-ins of $66 or less. At 100 BB standard buy-in, this means roughly $0.33/$0.66 stakes or lower. Round down for safety—$0.25/$0.50 would be the conservative choice here.",
          difficulty: "medium",
          showWorkspace: true,
          points: 2
        },
        {
          id: "8.1-calc2",
          type: "calculation",
          topic: "8.1.2 Buy-In Requirements",
          question: "You want to play $1/$2 cash games with $200 buy-ins. Using 25 buy-in requirements, what total bankroll do you need?",
          correctAnswer: 5000,
          acceptableRange: [5000, 5000],
          unit: "$",
          explanation: "$200 buy-in × 25 buy-ins = $5,000 bankroll needed. This is the minimum to safely play $1/$2 with full buy-ins. Many players use 30 buy-ins for extra safety, which would be $6,000.",
          difficulty: "easy",
          showWorkspace: true,
          points: 2
        },
        {
          id: "8.1-calc3",
          type: "calculation",
          topic: "8.1.2 Buy-In Requirements",
          question: "You have $10,000 for MTT tournaments. Using 100 buy-in requirements, what is the maximum tournament buy-in you should play?",
          correctAnswer: 100,
          acceptableRange: [100, 100],
          unit: "$",
          explanation: "$10,000 ÷ 100 buy-ins = $100 maximum buy-in. This accounts for the massive variance in tournaments. Some players use even more conservative 150-200 buy-in rules for MTTs, which would give $50-66 max buy-ins from this bankroll.",
          difficulty: "easy",
          showWorkspace: true,
          points: 2
        },
        {
          id: "8.1-calc4",
          type: "calculation",
          topic: "8.1.4 Moving Up Stakes",
          question: "You're playing $0.50/$1 and want to move up to $1/$2. You have 40 buy-ins for $0.50/$1 ($4,000). You want 30 buy-ins for $1/$2 before moving up. What additional bankroll do you need?",
          correctAnswer: 2000,
          acceptableRange: [2000, 2000],
          unit: "$",
          explanation: "$1/$2 at 100 BB buy-in = $200 per buy-in. 30 buy-ins = $6,000 needed. You have $4,000, so you need $6,000 - $4,000 = $2,000 more. This 'buffer' approach ensures you have proper bankroll for the new stakes before moving up.",
          difficulty: "medium",
          showWorkspace: true,
          points: 2
        },
        {
          id: "8.1-calc5",
          type: "calculation",
          topic: "8.1.5 Moving Down Stakes",
          question: "You started with 30 buy-ins. You've hit a downswing and are now down to 18 buy-ins. What percentage of your original bankroll have you lost?",
          correctAnswer: 40,
          acceptableRange: [40, 40],
          unit: "%",
          explanation: "Lost 12 buy-ins out of 30 original = 12/30 = 0.40 = 40% lost. At 18 buy-ins (down 40%), most disciplined players would move down stakes to rebuild. Some use a 20 buy-in threshold, others use 15. Key is having a RULE and sticking to it.",
          difficulty: "medium",
          showWorkspace: true,
          points: 2
        },
        {
          id: "8.1-calc6",
          type: "calculation",
          topic: "8.1.2 Buy-In Requirements",
          question: "You play Sit & Go tournaments at $50 buy-ins. Using 50 buy-in requirements for SNGs, what bankroll do you need?",
          correctAnswer: 2500,
          acceptableRange: [2500, 2500],
          unit: "$",
          explanation: "$50 × 50 buy-ins = $2,500. SNGs have less variance than MTTs (smaller fields, flatter payouts) but more than cash games, so 50 buy-ins is a common requirement. Some aggressive players use 30-40, while conservative players use 75-100.",
          difficulty: "easy",
          showWorkspace: true,
          points: 2
        },
        {
          id: "8.1-calc7",
          type: "calculation",
          topic: "8.1.4 Moving Up Stakes",
          question: "You're crushing $0.25/$0.50 and want to take a shot at $0.50/$1. Your bankroll is $3,000. How many buy-ins do you have for $0.50/$1 (assuming $100 buy-in)?",
          correctAnswer: 30,
          acceptableRange: [30, 30],
          unit: "buy-ins",
          explanation: "$0.50/$1 buy-in at 100 BB = $100. $3,000 ÷ $100 = 30 buy-ins. This is adequate for taking a shot. Set a stop-loss (e.g., if you drop to 25 buy-ins, move back down) and go for it if game quality is good and you're playing well.",
          difficulty: "medium",
          showWorkspace: true,
          points: 2
        }
      ]
    },
    {
      id: "application",
      title: "Section C: Practical Application",
      description: "Apply bankroll management in realistic situations",
      weight: 35,
      questions: [
        {
          id: "8.1-app1",
          type: "scenario",
          topic: "8.1.3 Stake Selection",
          scenario: "You have $5,000 saved and want to start playing poker seriously. You need $3,000 for rent and expenses over the next 3 months.",
          question: "How much should you allocate as your poker bankroll?",
          options: [
            "$5,000—use your full savings to maximize opportunities",
            "$2,000—keep the $3,000 for expenses completely separate",
            "$4,000—keep $1,000 as emergency, use rest for poker",
            "$3,500—split the difference between poker and expenses"
          ],
          correctAnswer: 1,
          explanation: "NEVER touch money needed for living expenses. The $3,000 for rent/expenses is completely off-limits for poker. Your poker bankroll is the $2,000 only. Mixing life expenses with poker leads to 'scared money' play and potential financial disaster. Start with $2,000, play appropriate stakes for that roll, and rebuild/move up as you profit.",
          difficulty: "easy",
          points: 2
        },
        {
          id: "8.1-app2",
          type: "scenario",
          topic: "8.1.5 Moving Down Stakes",
          scenario: "You've been playing $2/$5 live poker with a $12,000 bankroll (24 buy-ins of $500). You hit a downswing and are now at $7,500 (15 buy-ins). You're playing well but running bad.",
          question: "What should you do?",
          options: [
            "Stay at $2/$5—you're playing well and will bounce back",
            "Move down to $1/$2 until you rebuild to 25+ buy-ins",
            "Take a shot at $5/$10 to win it back faster",
            "Quit poker—you're clearly not good enough"
          ],
          correctAnswer: 1,
          explanation: "Move down immediately. You're below minimum buy-in requirements for $2/$5 (15 BI is risky territory). Playing well doesn't change math—variance can continue downward. Move to $1/$2 where $7,500 gives you 37-50 buy-ins (depending on buy-in size), rebuild properly, then move back up with proper bankroll. This is discipline, not failure.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "8.1-app3",
          type: "scenario",
          topic: "8.1.4 Moving Up Stakes",
          scenario: "You've been crushing $0.25/$0.50 online for 6 months, winning 8 BB/100 over 100k hands. Your $1,500 bankroll is now $4,500 (45 buy-ins for $0.25/$0.50).",
          question: "Should you move up to $0.50/$1?",
          options: [
            "Yes—immediately move all your play to $0.50/$1",
            "No—never move up, stay where you're winning",
            "Yes—mix in some $0.50/$1 while continuing $0.25/$0.50",
            "No—wait until you have $10,000 bankroll"
          ],
          correctAnswer: 2,
          explanation: "Start mixing in $0.50/$1. You've proven yourself a winner (100k hands is solid sample), and have 45 BI for your current stakes OR 22.5 BI for $0.50/$1. A smart approach: play $0.50/$1 when games are good, keep playing $0.25/$0.50 for volume/confidence. If you sustain your win rate, gradually shift more to $0.50/$1. Don't make sudden 100% moves.",
          difficulty: "hard",
          points: 2
        },
        {
          id: "8.1-app4",
          type: "scenario",
          topic: "8.1.2 Buy-In Requirements",
          scenario: "Your friend says he's playing $1/$2 live with a $2,500 bankroll (12.5 buy-ins). He says it's fine because 'the game is so soft' and he's 'way better than everyone.'",
          question: "What is the problem with this approach?",
          options: [
            "Nothing—if he has edge, he's fine",
            "Severe under-bankrolling; even winning players can lose 12.5 buy-ins in a downswing",
            "He should be playing higher stakes with that skill level",
            "$2,500 is too much for $1/$2; he's over-rolled"
          ],
          correctAnswer: 1,
          explanation: "This is classic under-bankrolling that leads to ruin. Even the best players at soft games experience variance. 12.5 buy-ins is dangerously low—a single bad session or short downswing could wipe him out. Game quality doesn't eliminate variance. Minimum 20-25 BI, ideally 30+. His skill edge is irrelevant if he goes broke before it realizes.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "8.1-app5",
          type: "scenario",
          topic: "8.1.6 Practical BRM Systems",
          scenario: "You play part-time and want to build your bankroll from $1,000 to $10,000 to eventually play $2/$5. You're currently rolled for $0.25/$0.50.",
          question: "What is the most realistic and disciplined approach?",
          options: [
            "Deposit $9,000 more and start playing $2/$5 immediately",
            "Grind $0.25/$0.50, move up at proper bankroll levels, never withdraw",
            "Play higher stakes occasionally to 'fast-track' your growth",
            "Enter big tournaments to try to hit a score quickly"
          ],
          correctAnswer: 1,
          explanation: "Slow and steady wins the race. Grind properly rolled stakes, move up when you hit bankroll thresholds (e.g., $2,500 → move to $0.50/$1, $6,000 → $1/$2, etc.), never withdraw until you hit your goal. This is how real bankroll building works. No shortcuts, no under-rolled shots, no tournament gambles. Build it properly through consistent winning play and smart BRM.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "8.1-app6",
          type: "scenario",
          topic: "8.1.1 Bankroll Fundamentals",
          scenario: "You're rolled for $1/$2 with $6,000, but a $2/$5 seat just opened at an incredibly soft game where players are punting off $1,000+ stacks.",
          question: "Should you take the seat?",
          options: [
            "Yes—the game is too good to pass up",
            "No—you're not properly bankrolled for $2/$5",
            "Yes—but only risk one buy-in, then leave if you lose it",
            "No—you should never play outside your bankroll"
          ],
          correctAnswer: 2,
          explanation: "A one-bullet shot is reasonable IF: (1) game is exceptionally soft, (2) you have some roll for the stakes (not completely under-rolled), (3) you have strict stop-loss. Buy in once for $500, and if you lose it, you're done—back to $1/$2. You'll still have 27.5 BI for $1/$2. This balances opportunity with discipline. But no reloading multiple times.",
          difficulty: "hard",
          points: 2
        },
        {
          id: "8.1-app7",
          type: "scenario",
          topic: "8.1.2 Buy-In Requirements",
          scenario: "You primarily play cash games but want to play the Sunday Major tournament ($215 buy-in). Your total bankroll is $6,000.",
          question: "From a BRM perspective, is this tournament within your roll?",
          options: [
            "Yes—you have $6,000, way more than $215",
            "No—you'd need $21,500+ bankroll for $215 tournaments (100 BI)",
            "Yes—as long as it's a one-time recreational entry",
            "No—you should never play tournaments"
          ],
          correctAnswer: 2,
          explanation: "Strict BRM says no ($6,000 isn't 100 BI for $215), BUT occasional recreational tournament entries are OK if: (1) it's infrequent, (2) it's <3-5% of your roll, (3) you understand it's +variance/entertainment. $215 from $6,000 is 3.5%—acceptable for a special event. Just don't make it a habit. Most of your play should be within BRM guidelines.",
          difficulty: "hard",
          points: 2
        }
      ]
    },
    {
      id: "speed",
      title: "Section D: Speed Round",
      description: "Quick bankroll management calculations",
      weight: 10,
      timed: true,
      timePerQuestion: 15,
      questions: [
        {
          id: "8.1-s1",
          type: "quick-calc",
          topic: "8.1.2 Buy-In Requirements",
          question: "Minimum buy-ins for cash games?",
          correctAnswer: "20-30",
          acceptableAnswers: ["20", "25", "30", "20-30", "25-30", "20-25"],
          explanation: "20-30 buy-ins is standard for cash games, with 25-30 being more conservative.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "8.1-s2",
          type: "quick-calc",
          topic: "8.1.2 Buy-In Requirements",
          question: "Minimum buy-ins for MTTs?",
          correctAnswer: "100",
          acceptableAnswers: ["100", "100+", "100-150", "150"],
          explanation: "100+ buy-ins for MTTs due to massive variance.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "8.1-s3",
          type: "quick-calc",
          topic: "8.1.2 Buy-In Requirements",
          question: "You have $3,000. Max buy-in with 30 BI rule?",
          correctAnswer: "$100",
          acceptableAnswers: ["100", "$100", "100$"],
          explanation: "$3,000 ÷ 30 = $100 maximum buy-in.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "8.1-s4",
          type: "quick-calc",
          topic: "8.1.5 Moving Down Stakes",
          question: "You have 17 buy-ins (started with 30). Should you move down? (Yes/No)",
          correctAnswer: "Yes",
          acceptableAnswers: ["Yes", "yes", "Y"],
          explanation: "Yes, 17 BI is below safe minimums. Time to drop down and rebuild.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "8.1-s5",
          type: "quick-calc",
          topic: "8.1.2 Buy-In Requirements",
          question: "Buy-in requirements for SNGs?",
          correctAnswer: "50",
          acceptableAnswers: ["50", "40-50", "50-75", "40", "75"],
          explanation: "50 buy-ins is typical for SNGs (variance between cash and MTTs).",
          difficulty: "medium",
          points: 1
        }
      ]
    }
  ]
};

export default bankrollQuiz;
