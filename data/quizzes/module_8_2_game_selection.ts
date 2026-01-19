import type { QuizData } from '@/types/quiz';

export const gameSelectionQuiz: QuizData = {
  moduleInfo: {
    id: "8.2",
    title: "Game Selection",
    category: "Financial Strategy",
    phase: 1,
    level: "Fundamental",
    passingScore: 80,
    estimatedTime: "25-35 minutes",
    timedModeMinutes: 25,
    speedModeMinutes: 12,
    learningOutcomes: [
      "Evaluate different poker formats objectively",
      "Choose formats matching personal strengths",
      "Assess format profitability for individual skill set",
      "Avoid -EV game selection decisions",
      "Create a format specialization plan"
    ],
    nextModule: {
      id: "8.3",
      title: "Record Keeping"
    }
  },
  sections: [
    {
      id: "conceptual",
      title: "Section A: Conceptual Understanding",
      description: "Test your understanding of game format differences",
      weight: 20,
      questions: [
        {
          id: "8.2-c1",
          type: "multiple-choice",
          topic: "8.2.1 Format Overview",
          question: "What is the fundamental difference between cash games and tournaments?",
          options: [
            "Cash games use real money, tournaments use chips",
            "In cash games chips = money, in tournaments chip value changes (ICM)",
            "Tournaments are more skillful than cash games",
            "Cash games are online only, tournaments are live only"
          ],
          correctAnswer: 1,
          explanation: "The core difference is chip value. In cash games, your chips have direct 1:1 money value and you can cash out anytime. In tournaments, chip value changes based on ICM (Independent Chip Model)—having tournament life, pressure, and payout implications. This fundamentally changes optimal strategy between formats.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "8.2-c2",
          type: "multiple-choice",
          topic: "8.2.2 Format Comparison Factors",
          question: "Which poker format typically has the HIGHEST variance?",
          options: [
            "6-max cash games",
            "Full ring cash games",
            "Sit & Go tournaments",
            "Multi-table tournaments (MTTs)"
          ],
          correctAnswer: 3,
          explanation: "MTTs have by far the highest variance. You can play perfectly and bust 50+ tournaments in a row due to field size, payout structure (top-heavy), and inevitable all-in situations. Cash games have the lowest variance (can quit when ahead, no ICM pressure). SNGs and full ring fall in between. High variance = larger bankroll requirements.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "8.2-c3",
          type: "true-false",
          topic: "8.2.5 Specialization Strategy",
          question: "To maximize your poker earnings, you should play every format equally to stay well-rounded.",
          correctAnswer: false,
          explanation: "Specialization is superior for most players. Each format has unique skills, strategies, and study requirements. Spreading yourself across all formats dilutes your focus and limits your skill development. Most successful players specialize in 1-2 formats (e.g., 6-max cash + occasional MTTs). Master one thing before adding another.",
          difficulty: "medium",
          points: 1
        },
        {
          id: "8.2-c4",
          type: "multiple-choice",
          topic: "8.2.2 Format Comparison Factors",
          question: "Which format typically offers the most consistent, predictable income for skilled players?",
          options: [
            "Multi-table tournaments (huge scores possible)",
            "Sit & Go tournaments",
            "Cash games",
            "Heads-up matches"
          ],
          correctAnswer: 2,
          explanation: "Cash games provide the most stable income. Volume + consistent win rate = predictable hourly rate. Tournaments have massive variance and unpredictable income (might not cash for weeks, then hit a big score). For paying bills and stable earnings, cash games are king. Tournaments are better for 'lottery ticket' upside.",
          difficulty: "medium",
          points: 1
        },
        {
          id: "8.2-c5",
          type: "true-false",
          topic: "8.2.6 Common Selection Mistakes",
          question: "If you're a winning cash game player, you'll automatically be winning at tournaments since they're all poker.",
          correctAnswer: false,
          explanation: "Completely false. Cash and tournament skills overlap but are distinctly different games. Tournaments require ICM understanding, stack-to-blind awareness, push/fold charts, bubble dynamics, and adjusting to changing stack depths. Many great cash players are break-even or losing MTT players (and vice versa). Each format requires specific study and skills.",
          difficulty: "medium",
          points: 1
        },
        {
          id: "8.2-c6",
          type: "multiple-choice",
          topic: "8.2.3 Personal Fit Assessment",
          question: "A player with limited time (5-10 hours/week) but strong postflop skills should probably focus on:",
          options: [
            "High-volume 6-max cash grinding",
            "Deep-stacked live cash games",
            "Large-field MTTs that take 8+ hours",
            "Heads-up sit & gos"
          ],
          correctAnswer: 1,
          explanation: "Deep-stacked live cash best fits this profile. Limited time rules out high-volume grinding and long MTTs. Strong postflop skills are maximized in deep-stacked play where there are many decision points. Live cash lets you play a few quality sessions per week, use your postflop edge, and have schedule flexibility. Match format to time/skills.",
          difficulty: "hard",
          points: 1
        }
      ]
    },
    {
      id: "application",
      title: "Section B: Application Skills",
      description: "Apply game selection concepts to player situations",
      weight: 35,
      questions: [
        {
          id: "8.2-a1",
          type: "scenario",
          topic: "8.2.3 Personal Fit Assessment",
          scenario: "You're strong preflop but struggle with complex postflop decisions. You get overwhelmed playing multiple tables and prefer focusing on one table at a time.",
          question: "Which format would likely suit you best?",
          options: [
            "6-max cash games (lots of postflop play)",
            "Heads-up cash (constant postflop decisions)",
            "Tournaments (simplified ranges by stack depth)",
            "Full ring cash (complex, deep-stacked postflop)"
          ],
          correctAnswer: 2,
          explanation: "Tournaments fit this profile well. As blinds increase and stacks get shorter, decisions become more preflop-focused (push/fold, 3-bet/fold) with less complex postflop play. Single-tabling tournaments is also common. You can leverage your preflop strength while avoiding your postflop weakness in many spots due to stack-to-blind dynamics.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "8.2-a2",
          type: "scenario",
          topic: "8.2.4 Profitability Analysis",
          scenario: "You win at 5 BB/100 in 6-max cash games playing 4 tables (500 hands/hour). A friend wins MTTs at 50% ROI playing one $50 tournament per day (averaging $25 profit per tourney, 3 hours per tournament).",
          question: "Who has the higher hourly rate?",
          options: [
            "You ($25/hour at $0.50/$1)",
            "Your friend ($8.33/hour)",
            "Roughly equal",
            "Cannot determine without more information"
          ],
          correctAnswer: 0,
          explanation: "You: 5 BB/100 × 500 hands/hour = 25 BB/hour. At $0.50/$1 (BB = $1), that's $25/hour. Friend: $25 profit ÷ 3 hours = $8.33/hour. Your cash game hourly crushes their tournament hourly despite their great ROI. This shows why hourly rate comparisons matter—MTT percentages can be misleading without considering time invested.",
          difficulty: "hard",
          points: 2
        },
        {
          id: "8.2-a3",
          type: "multiple-choice",
          topic: "8.2.1 Format Overview",
          question: "What is the primary advantage of online poker over live poker?",
          options: [
            "Online players are weaker opponents",
            "Volume—much higher hands per hour",
            "No need to tip dealers",
            "Online poker is easier to beat"
          ],
          correctAnswer: 1,
          explanation: "Volume is online's biggest advantage. Live poker is ~25-30 hands/hour. Online you can play 60-100 hands/hour per table, and multi-table. A skilled online player can see 300-600+ hands/hour vs 25-30 live. This volume multiplies your hourly rate (but also requires more focus and different skills like multi-tabling).",
          difficulty: "easy",
          points: 2
        },
        {
          id: "8.2-a4",
          type: "scenario",
          topic: "8.2.6 Common Selection Mistakes",
          scenario: "You're a consistent cash game winner. A major tournament series is coming to town. You've never played tournaments but don't want to miss out on the action.",
          question: "What is the best approach?",
          options: [
            "Jump into big buy-in events—you're a winner, you'll figure it out",
            "Study tournament strategy first, then play smaller events within bankroll",
            "Skip it entirely—stick to what you know",
            "Play the big events but play your cash game style"
          ],
          correctAnswer: 1,
          explanation: "Study first, then play appropriate stakes. Being a cash game winner doesn't make you a tournament player. Spend 2-4 weeks studying tournament strategy (ICM, push/fold charts, bubble play), then play small buy-in events to gain experience. Don't jump into big buy-ins unprepared. This balances opportunity (playing series) with discipline (proper bankroll and preparation).",
          difficulty: "medium",
          points: 2
        },
        {
          id: "8.2-a5",
          type: "scenario",
          topic: "8.2.3 Personal Fit Assessment",
          scenario: "You love the thrill of big wins and can handle long periods without cashing. You have a stable day job and play poker for upside, not primary income. You enjoy the 'tournament' feeling.",
          question: "Which format best matches your personality and goals?",
          options: [
            "Low-variance full ring cash games",
            "Multi-table tournaments",
            "Heads-up cash games",
            "Small-field SNGs"
          ],
          correctAnswer: 1,
          explanation: "MTTs are perfect for you. You have income stability (can handle variance), seek big scores (MTT payout structure), enjoy the tournament environment, and aren't relying on poker for bills. MTTs offer the 'lottery ticket' upside you want. Cash games would be boring for your goals, and you have the financial/emotional stability to handle MTT swings.",
          difficulty: "easy",
          points: 2
        },
        {
          id: "8.2-a6",
          type: "scenario",
          topic: "8.2.4 Profitability Analysis",
          scenario: "You're winning 7 BB/100 at $0.25/$0.50 online. You're considering switching to live $1/$2, where you estimate you'd win 10 BB/100 but only see 30 hands/hour vs 300 online (multi-tabling).",
          question: "Which format has higher hourly rate?",
          options: [
            "Online—much higher volume overcomes lower stakes",
            "Live—higher stakes and win rate offset lower volume",
            "Roughly equal",
            "Online—live poker is dying anyway"
          ],
          correctAnswer: 0,
          explanation: "Online: 7 BB/100 × 300 hands/hour = 21 BB/hour × $0.50 = $10.50/hour. Live: 10 BB/100 × 30 hands/hour = 3 BB/hour × $2 = $6/hour. Online's volume advantage crushes live hourly despite lower stakes and win rate. However, live offers social aspects, easier games, and potential to move up in stakes. Consider both $ and non-financial factors.",
          difficulty: "hard",
          points: 2
        },
        {
          id: "8.2-a7",
          type: "multiple-choice",
          topic: "8.2.5 Specialization Strategy",
          question: "You've mastered $1/$2 6-max cash games. What should you add as a secondary format?",
          options: [
            "Every other format to be well-rounded",
            "Either higher stakes 6-max or MTTs (complementary skill set)",
            "Heads-up cash games",
            "Stay pure 6-max, never add another format"
          ],
          correctAnswer: 1,
          explanation: "Add ONE complementary format. Moving up stakes in your primary format (6-max) is natural progression. OR add MTTs for variety/upside while maintaining cash game specialization. Avoid spreading too thin across many formats. Some players successfully do cash + tournaments. Very few excel at 4+ formats simultaneously. Depth > breadth.",
          difficulty: "medium",
          points: 2
        }
      ]
    },
    {
      id: "practical",
      title: "Section C: Practical Scenarios",
      description: "Make game selection decisions for realistic player profiles",
      weight: 35,
      questions: [
        {
          id: "8.2-p1",
          type: "scenario",
          topic: "8.2.3 Personal Fit Assessment",
          scenario: "Sarah: Full-time student, plays poker 15-20 hours/week for income. Needs consistent money for rent. Plays well under pressure, strong fundamentals, hates big downswings.",
          question: "What format should Sarah focus on?",
          options: [
            "High-variance MTTs for big score potential",
            "Cash games for consistent, reliable income",
            "Mix of every format for diversification",
            "High-stakes SNGs for quick money"
          ],
          correctAnswer: 1,
          explanation: "Cash games are perfect for Sarah's situation. She needs CONSISTENT income for bills (cash games have lowest variance), has enough weekly volume (15-20 hours), and hates big downswings (MTT variance would stress her out). Reliable income for rent requires reliable game format. Once she's more financially stable, she could add MTTs for upside.",
          difficulty: "easy",
          points: 2
        },
        {
          id: "8.2-p2",
          type: "scenario",
          topic: "8.2.3 Personal Fit Assessment",
          scenario: "Mike: Plays 5 hours/week max, strong hand-reading skills, terrible at multi-tabling, loves deep-stack poker, prefers in-person social interaction.",
          question: "What's Mike's ideal format?",
          options: [
            "High-volume online 6-max cash grinding",
            "Live deep-stacked cash games",
            "Fast-fold online poker",
            "Online MTT grinding"
          ],
          correctAnswer: 1,
          explanation: "Live deep-stacked cash games are PERFECT for Mike. He has limited time (can't grind volume), can't multi-table (live is single-table), loves deep play (100+ BB cash games), has strong hand-reading (maximized live with physical tells), and wants social aspects (live cardroom). This format aligns every preference and strength.",
          difficulty: "easy",
          points: 2
        },
        {
          id: "8.2-p3",
          type: "scenario",
          topic: "8.2.6 Common Selection Mistakes",
          scenario: "You watch a streamer crush high-stakes PLO (Pot Limit Omaha) and it looks exciting. You've only played No-Limit Hold'em but want to try PLO.",
          question: "What's the correct approach?",
          options: [
            "Jump into PLO at your current stakes—poker is poker",
            "Study PLO fundamentals, start at micro-stakes, treat it as learning new game",
            "Play PLO at half your normal stakes",
            "PLO is too complex, stay away entirely"
          ],
          correctAnswer: 1,
          explanation: "PLO is a DIFFERENT GAME requiring extensive study. Even great NLHE players are fish in PLO without studying. Start with fundamentals (PLO hand values, equity, runouts), play micro-stakes to learn, and build bankroll specifically for PLO. Treat it as starting poker from scratch. Don't let NLHE success make you overconfident. Study, start small, work up.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "8.2-p4",
          type: "scenario",
          topic: "8.2.4 Profitability Analysis",
          scenario: "You're deciding between two paths: Path A) Grind $0.50/$1 online at 8 BB/100, playing 30 hours/week. Path B) Play live $2/$5 at 5 BB/100, playing 15 hours/week.",
          question: "Which path has higher monthly earnings? (Assume 250 hands/hour online, 30 hands/hour live, 4 weeks/month)",
          options: [
            "Path A: $2,400/month",
            "Path B: $1,800/month",
            "Roughly equal",
            "Path A: $3,000/month"
          ],
          correctAnswer: 0,
          explanation: "Path A: 8 BB/100 × 250 hands/hr × 30 hrs/week = 600 BB/week × $1 = $600/week × 4 weeks = $2,400/month. Path B: 5 BB/100 × 30 hands/hr × 15 hrs/week = 22.5 BB/week × $5 = $112.50/week × 4 weeks = $450/month. Online volume massively outweighs live's higher stakes. But consider: Path A is 120 hrs/month vs Path B's 60 hrs/month.",
          difficulty: "hard",
          points: 2
        },
        {
          id: "8.2-p5",
          type: "scenario",
          topic: "8.2.5 Specialization Strategy",
          scenario: "You're a winning $1/$2 cash game player. You want to learn tournaments but don't want your cash game to suffer.",
          question: "What's the best specialization strategy?",
          options: [
            "Quit cash entirely and focus 100% on tournaments",
            "50/50 split between cash and tournaments immediately",
            "80% cash, 20% tournaments while learning; adjust as skills develop",
            "Stay pure cash—never dilute your focus"
          ],
          correctAnswer: 2,
          explanation: "Gradual integration is ideal. Maintain your profitable cash game as primary income (80%) while dedicating limited time to tournament study and play (20%). As your tournament skills improve and you determine if you enjoy/profit from them, you can adjust the ratio. This protects your income while exploring new formats. Never go 50/50 immediately—that's too disruptive.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "8.2-p6",
          type: "scenario",
          topic: "8.2.6 Common Selection Mistakes",
          scenario: "You're losing at $1/$2 cash games but heard tournaments have 'weaker players.' You decide to switch to $200 buy-in MTTs.",
          question: "What is wrong with this decision?",
          options: [
            "Nothing—tournaments are easier than cash",
            "You're chasing action instead of fixing leaks; MTTs won't save you",
            "$200 MTTs are too small—should play $500+",
            "Cash games are actually easier, should stay"
          ],
          correctAnswer: 1,
          explanation: "This is results-oriented thinking and avoiding the real problem. If you're losing at cash games, you have fundamental leaks. Switching formats won't fix them—you'll just lose in tournaments too (probably faster due to variance). Fix your leaks first through study/coaching, then consider format changes. 'Grass is greener' thinking destroys bankrolls.",
          difficulty: "hard",
          points: 2
        },
        {
          id: "8.2-p7",
          type: "scenario",
          topic: "8.2.2 Format Comparison Factors",
          scenario: "You have exactly 4 hours to play poker today. You can either play a single $100 MTT or 4 hours of $1/$2 cash games.",
          question: "From a time efficiency perspective, what should you consider?",
          options: [
            "MTT—bigger upside in one event",
            "Cash—guaranteed to use all 4 hours productively",
            "MTT might bust early (wasted time) OR run long (can't finish); cash gives controllable time",
            "They're equivalent time investments"
          ],
          correctAnswer: 2,
          explanation: "Time control is cash games' advantage. You could bust the MTT in 30 minutes (3.5 hours wasted) OR it could run 6+ hours and you can't finish. Cash games let you play exactly 4 hours, quit when you want, and guarantee productive time use. For strict time constraints, cash games are superior. MTTs are better when you have flexible time.",
          difficulty: "medium",
          points: 2
        }
      ]
    },
    {
      id: "speed",
      title: "Section D: Speed Round",
      description: "Quick game format knowledge",
      weight: 10,
      timed: true,
      timePerQuestion: 15,
      questions: [
        {
          id: "8.2-s1",
          type: "quick-calc",
          topic: "8.2.2 Format Comparison Factors",
          question: "Which format has highest variance? (Cash/MTT/SNG)",
          correctAnswer: "MTT",
          acceptableAnswers: ["MTT", "mtt", "Tournament", "Tournaments", "MTTs"],
          explanation: "MTTs have by far the highest variance of all poker formats.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "8.2-s2",
          type: "quick-calc",
          topic: "8.2.2 Format Comparison Factors",
          question: "Which format offers most stable income? (Cash/MTT)",
          correctAnswer: "Cash",
          acceptableAnswers: ["Cash", "cash", "Cash games", "cash games"],
          explanation: "Cash games provide the most stable, predictable income for skilled players.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "8.2-s3",
          type: "quick-calc",
          topic: "8.2.1 Format Overview",
          question: "Online or live poker has higher hands per hour?",
          correctAnswer: "Online",
          acceptableAnswers: ["Online", "online"],
          explanation: "Online poker has much higher volume (60-100+ hands/hour vs ~30 live).",
          difficulty: "easy",
          points: 1
        },
        {
          id: "8.2-s4",
          type: "quick-calc",
          topic: "8.2.5 Specialization Strategy",
          question: "Better to specialize or play all formats? (Specialize/All)",
          correctAnswer: "Specialize",
          acceptableAnswers: ["Specialize", "specialize", "Specialization", "Focus"],
          explanation: "Specialization allows deeper skill development than spreading across all formats.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "8.2-s5",
          type: "quick-calc",
          topic: "8.2.2 Format Comparison Factors",
          question: "Typical live hands per hour?",
          correctAnswer: "30",
          acceptableAnswers: ["25", "30", "25-30", "30-35"],
          explanation: "Live poker typically deals 25-30 hands per hour.",
          difficulty: "medium",
          points: 1
        }
      ]
    }
  ]
};

export default gameSelectionQuiz;
