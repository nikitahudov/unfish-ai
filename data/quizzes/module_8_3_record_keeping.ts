import type { QuizData } from '@/types/quiz';

export const recordKeepingQuiz: QuizData = {
  moduleInfo: {
    id: "8.3",
    title: "Record Keeping",
    category: "Financial Strategy",
    phase: 1,
    level: "Fundamental",
    passingScore: 80,
    estimatedTime: "25-35 minutes",
    timedModeMinutes: 25,
    speedModeMinutes: 12,
    learningOutcomes: [
      "Track all relevant poker data accurately",
      "Use tracking software effectively",
      "Analyze performance from records",
      "Identify trends and patterns",
      "Maintain consistent tracking habits"
    ],
    nextModule: {
      id: "9.1",
      title: "Hand History Review"
    }
  },
  sections: [
    {
      id: "conceptual",
      title: "Section A: Conceptual Understanding",
      description: "Test your understanding of record keeping principles",
      weight: 20,
      questions: [
        {
          id: "8.3-c1",
          type: "multiple-choice",
          topic: "8.3.1 What to Track",
          question: "What is the MOST important reason to keep detailed poker records?",
          options: [
            "To brag about winning sessions to friends",
            "To objectively measure performance and identify leaks",
            "It's required by the IRS",
            "To remember every hand you've played"
          ],
          correctAnswer: 1,
          explanation: "Objective performance measurement is critical. Without data, you're guessing. Records show: Are you actually winning? What's your real win rate? Which sessions/conditions are most profitable? Where are your leaks? Memory is unreliable and biased. Data doesn't lie. Track everything to make informed decisions.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "8.3-c2",
          type: "true-false",
          topic: "8.3.4 Data Analysis",
          question: "A sample size of 1,000 hands is sufficient to know if you're a winning player in cash games.",
          correctAnswer: false,
          explanation: "1,000 hands is nowhere near enough! Variance dominates over small samples. You need 50,000-100,000+ hands minimum to have confidence in your win rate. Even 10,000 hands can be heavily influenced by a few big pots. Sample size awareness is crucial—don't draw conclusions from insufficient data. Be patient, track everything, analyze over large samples.",
          difficulty: "medium",
          points: 1
        },
        {
          id: "8.3-c3",
          type: "multiple-choice",
          topic: "8.3.3 Essential Statistics",
          question: "What do the stats VPIP and PFR measure?",
          options: [
            "VPIP = how often you win, PFR = how often you lose",
            "VPIP = voluntarily put money in pot %, PFR = preflop raise %",
            "VPIP = variance per hand, PFR = profit from raises",
            "They measure your bluffing frequency"
          ],
          correctAnswer: 1,
          explanation: "VPIP (Voluntarily Put money In Pot) = % of hands you play. PFR (Preflop Raise) = % of hands you raise preflop. These are the two most fundamental stats. Typical good player: VPIP 18-25%, PFR 15-22% (varies by format). VPIP much higher than PFR suggests passive play (calling too much). These stats instantly categorize player types.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "8.3-c4",
          type: "multiple-choice",
          topic: "8.3.1 What to Track",
          question: "Besides financial results, what else should you track in your poker records?",
          options: [
            "Only track money won/lost—nothing else matters",
            "Mental state, table conditions, session length, notable hands",
            "Just the stakes you played",
            "Your lunch order each session"
          ],
          correctAnswer: 1,
          explanation: "Track CONTEXT beyond just money. Mental state (were you tilting?), table quality (soft/tough game?), session length (fatigue factor?), and notable hands help you identify patterns. You might discover you lose when tired, win more on Friday nights, or play poorly after losses. Contextual data reveals what money alone cannot.",
          difficulty: "medium",
          points: 1
        },
        {
          id: "8.3-c5",
          type: "true-false",
          topic: "8.3.5 Review Schedules",
          question: "You should analyze your poker data only when you're on a downswing to figure out what's wrong.",
          correctAnswer: false,
          explanation: "You should review regularly regardless of results—daily quick reviews, weekly analysis, monthly deep dives. Reviewing only during downswings is reactive and emotionally-driven. You might miss leaks during upswings (running hot masks mistakes) and tilt-review during downswings (variance looks like leaks). Consistent review builds good habits and objective analysis.",
          difficulty: "medium",
          points: 1
        },
        {
          id: "8.3-c6",
          type: "multiple-choice",
          topic: "8.3.3 Essential Statistics",
          question: "A player with VPIP 45% and PFR 8% is most likely:",
          options: [
            "A tight, aggressive regular",
            "A loose, passive recreational player (calling station)",
            "A professional poker player",
            "Playing optimally for their format"
          ],
          correctAnswer: 1,
          explanation: "This is a classic 'calling station' profile. VPIP 45% means they're playing way too many hands (recreational players overplay). PFR 8% means they're rarely raising—mostly limping and calling. The huge gap between VPIP and PFR indicates passive play. This is your dream opponent: loose, passive, predictable. Exploit with aggressive value betting.",
          difficulty: "hard",
          points: 1
        }
      ]
    },
    {
      id: "application",
      title: "Section B: Application Skills",
      description: "Apply record keeping concepts to analyze poker performance",
      weight: 35,
      questions: [
        {
          id: "8.3-a1",
          type: "scenario",
          topic: "8.3.4 Data Analysis",
          scenario: "You review your stats and notice: Monday-Thursday sessions average +5 BB/100 over 40,000 hands. Friday-Sunday sessions average -3 BB/100 over 25,000 hands.",
          question: "What does this pattern likely indicate?",
          options: [
            "Weekends have tougher games—avoid playing then",
            "Weekends have softer games but you're probably playing worse (tired/drinking/tilting)",
            "You're unlucky on weekends—keep playing, variance will even out",
            "No meaningful pattern—not enough hands"
          ],
          correctAnswer: 1,
          explanation: "Weekend games are typically SOFTER (recreational players), so losing on weekends while winning on weekdays suggests YOU are the problem, not the games. Likely causes: fatigue from work week, alcohol consumption, social distractions, or tilting from bad beats with more money/fun on the line. Fix your weekend preparation/mindset or avoid playing when not at your best.",
          difficulty: "hard",
          points: 2
        },
        {
          id: "8.3-a2",
          type: "scenario",
          topic: "8.3.3 Essential Statistics",
          scenario: "Your HUD shows a player with: VPIP 22%, PFR 19%, 3-bet 8%, Aggression Factor 2.8.",
          question: "What type of player is this?",
          options: [
            "Loose, passive recreational player",
            "Tight, aggressive regular/strong player",
            "Maniac (overly aggressive)",
            "Ultra-tight nit"
          ],
          correctAnswer: 1,
          explanation: "This is a textbook strong regular. VPIP 22%/PFR 19% is tight-aggressive with a small gap (raises most hands they play). 3-bet 8% is solid and aggressive. AF 2.8 shows aggression (>2 is aggressive). This player is well-balanced, likely studies, and will be tough to exploit. Avoid tangling without premium hands; find softer opponents.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "8.3-a3",
          type: "multiple-choice",
          topic: "8.3.6 Using Data for Improvement",
          question: "You notice your win rate from the button is +15 BB/100, but from early position it's -2 BB/100. What should you do?",
          options: [
            "Stop playing early position entirely",
            "Review and tighten your early position opening range",
            "It's normal—keep playing the same way",
            "Open looser from early position to increase win rate"
          ],
          correctAnswer: 1,
          explanation: "Losing from early position suggests you're playing too loose or making postflop errors out of position. Review your opening range (are you opening suited connectors from UTG? Bad.), study EP strategy, and tighten up. Some loss from EP is normal (positional disadvantage), but -2 BB/100 is fixable. Use data to identify specific positional leaks, then study and adjust.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "8.3-a4",
          type: "scenario",
          topic: "8.3.4 Data Analysis",
          scenario: "After 5,000 hands you're winning at 12 BB/100. You feel like a crusher and consider moving up stakes immediately.",
          question: "What is the problem with this decision?",
          options: [
            "Nothing—12 BB/100 is great, move up!",
            "5,000 hands is tiny sample; could be variance/run-good. Need 50k+ hands.",
            "12 BB/100 is too high—you must be cheating",
            "You should move up even faster"
          ],
          correctAnswer: 1,
          explanation: "5,000 hands is NOTHING. You could be crushing due to run-good, a few big pots, or weak opposition in those specific sessions. 12 BB/100 is unsustainably high long-term (even great players win 5-8 BB/100). Wait until you have 50,000+ hands showing consistent 5+ BB/100 before considering moving up. Sample size awareness prevents costly mistakes.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "8.3-a5",
          type: "scenario",
          topic: "8.3.2 Tracking Tools",
          scenario: "You're playing online cash games and want to track your performance and use a HUD to display opponent stats during play.",
          question: "Which type of tool do you need?",
          options: [
            "Spreadsheet software like Excel",
            "Poker tracking software like PokerTracker or Hold'em Manager",
            "A physical notebook",
            "Memory—just remember everything"
          ],
          correctAnswer: 1,
          explanation: "Poker tracking software (PokerTracker, Hold'em Manager, etc.) is essential for online play. It automatically imports hand histories, tracks your stats and results, and displays real-time HUD stats on opponents. This is standard equipment for serious online players. Spreadsheets work for live play or basic tracking, but can't provide real-time HUD functionality.",
          difficulty: "easy",
          points: 2
        },
        {
          id: "8.3-a6",
          type: "scenario",
          topic: "8.3.5 Review Schedules",
          scenario: "You play poker 5 days per week. How often should you review your performance data?",
          question: "What is the optimal review schedule?",
          options: [
            "Once per year is enough",
            "Only when losing",
            "Quick review after each session, detailed weekly review, deep monthly analysis",
            "Every single hand must be reviewed immediately"
          ],
          correctAnswer: 2,
          explanation: "Layered review is optimal: (1) Quick post-session review (5-10 min: win/loss, any tilt?, interesting hands to save), (2) Weekly detailed review (1-2 hours: analyze stats, spot trends, review saved hands), (3) Monthly deep dive (2-4 hours: big-picture patterns, goal-setting, leak identification). This balances immediacy with depth.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "8.3-a7",
          type: "multiple-choice",
          topic: "8.3.1 What to Track",
          question: "What is the minimum information you should track for every poker session?",
          options: [
            "Just total profit/loss",
            "Date, stakes, hours played, buy-in, cash-out, location/site, mental state",
            "Only winning sessions need tracking",
            "Date and profit/loss"
          ],
          correctAnswer: 1,
          explanation: "Track comprehensive session data: Date (for timeline analysis), stakes (BR management), hours played (hourly rate), buy-in and cash-out (accurate P&L), location/site (game quality comparison), mental state (tilt correlation). This data reveals patterns invisible from just tracking profit/loss. More data = better analysis = more profit.",
          difficulty: "easy",
          points: 2
        }
      ]
    },
    {
      id: "practical",
      title: "Section C: Practical Scenarios",
      description: "Use record keeping to make informed poker decisions",
      weight: 35,
      questions: [
        {
          id: "8.3-p1",
          type: "scenario",
          topic: "8.3.6 Using Data for Improvement",
          scenario: "Your records show over 80,000 hands: Overall win rate +6 BB/100. When villain has >50% VPIP: +15 BB/100. When villain has <25% VPIP: -1 BB/100.",
          question: "What should you learn from this data?",
          options: [
            "You're a winning player overall—no changes needed",
            "You crush recreational players but struggle against regulars; prioritize table selection",
            "You should play looser to balance your range",
            "Stop playing against anyone with <25% VPIP"
          ],
          correctAnswer: 1,
          explanation: "This data screams: TABLE SELECTION MATTERS. You crush fish (>50% VPIP) but are barely break-even vs regs (<25% VPIP). Your biggest EV increase comes from finding fishy tables, not slight technical improvements. Spend more time table selecting, waiting for soft games, and avoiding reg-heavy tables. One decision (table selection) can boost win rate more than 100 hours of technical study.",
          difficulty: "hard",
          points: 2
        },
        {
          id: "8.3-p2",
          type: "scenario",
          topic: "8.3.4 Data Analysis",
          scenario: "You track your live poker sessions meticulously. Your records show you win 75% of sessions but are down $2,000 overall after 50 sessions.",
          question: "What does this tell you?",
          options: [
            "You're running bad—keep playing the same way",
            "You win small amounts frequently but lose massive amounts in losing sessions (tilt/poor loss management)",
            "The records must be wrong",
            "75% win rate means you're a great player"
          ],
          correctAnswer: 1,
          explanation: "This is a classic tilt/loss-chasing pattern. You're winning small amounts in 75% of sessions (quit when slightly ahead?), but the 25% of losing sessions are MASSIVE (tilt, chasing losses, playing too long when stuck?). This is -EV behavior. You need strict stop-loss rules, tilt control, and honest assessment of mental state. Win rate % is meaningless—total $ is what matters.",
          difficulty: "hard",
          points: 2
        },
        {
          id: "8.3-p3",
          type: "scenario",
          topic: "8.3.3 Essential Statistics",
          scenario: "You're analyzing a regular opponent. After 2,000 hands, their stats show: VPIP 24%, PFR 21%, C-bet flop 72%, fold to 3-bet 68%.",
          question: "What is this player's most exploitable tendency?",
          options: [
            "They're too loose preflop",
            "Their c-bet frequency is too high",
            "They fold too much to 3-bets—3-bet them liberally",
            "They're unexploitable"
          ],
          correctAnswer: 2,
          explanation: "Folding 68% to 3-bets is VERY exploitable. This player is opening reasonably (24/21) but giving up too easily to aggression. 3-bet them frequently in position with a wide range—they'll fold and you'll print money. Their c-bet frequency is high but not crazy. Their opening stats are solid. The 3-bet fold % is the major leak. Exploit it.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "8.3-p4",
          type: "scenario",
          topic: "8.3.2 Tracking Tools",
          scenario: "You play live poker exclusively. What is the best way to track your sessions?",
          question: "Which tracking method is most appropriate for live play?",
          options: [
            "PokerTracker HUD at the table",
            "Mobile poker tracking app or spreadsheet immediately after sessions",
            "Memory—just remember your results",
            "Live poker doesn't need tracking"
          ],
          correctAnswer: 1,
          explanation: "Mobile apps (like Poker Analytics, Poker Income) or spreadsheets are perfect for live play. Enter data immediately after the session while it's fresh. You can't use HUDs in live poker (no hand histories), and memory is unreliable. Track: date, location, stakes, buy-in, cash-out, hours, notes. Simple, effective, and takes 2 minutes per session. Consistency is key.",
          difficulty: "easy",
          points: 2
        },
        {
          id: "8.3-p5",
          type: "scenario",
          topic: "8.3.5 Review Schedules",
          scenario: "You just finished a brutal session, down 5 buy-ins, and feel like you played terribly. You want to review every hand immediately to figure out what went wrong.",
          question: "What should you actually do?",
          options: [
            "Review immediately while hands are fresh",
            "Wait 24 hours until emotions settle, then review objectively",
            "Never review losing sessions—too depressing",
            "Review only your winning hands for confidence"
          ],
          correctAnswer: 1,
          explanation: "WAIT before reviewing after tilting/big losses. Immediate review while emotional leads to results-oriented, tilt-influenced analysis ('I should have folded AA!'). Wait 24 hours to calm down, then review objectively. You'll often find you played fine and ran bad, OR you'll spot genuine mistakes without emotional bias. Separate sessions and reviews with time buffer.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "8.3-p6",
          type: "scenario",
          topic: "8.3.4 Data Analysis",
          scenario: "Your standard deviation (variance measure) over 100,000 hands is 95 BB/100, with a win rate of 6 BB/100.",
          question: "What does this tell you about your results?",
          options: [
            "You have low variance and should play higher stakes",
            "You have high variance; expect large swings even with your win rate",
            "Your win rate is unsustainable",
            "Standard deviation doesn't matter if you're winning"
          ],
          correctAnswer: 1,
          explanation: "SD of 95 BB/100 is VERY high variance. Even with 6 BB/100 win rate, you'll experience massive swings—10-20 buy-in downswings are normal. This requires excellent BRM (30+ buy-ins) and mental fortitude. Understanding your variance helps set realistic expectations and avoid tilting during normal downswings. High variance = need bigger bankroll and stronger mental game.",
          difficulty: "hard",
          points: 2
        },
        {
          id: "8.3-p7",
          type: "scenario",
          topic: "8.3.6 Using Data for Improvement",
          scenario: "You notice in your records that your longest winning streak was 12 sessions, and your longest losing streak was 9 sessions. You're currently on a 6-session losing streak.",
          question: "What is the correct interpretation?",
          options: [
            "You're due for a win—keep playing",
            "This is within normal variance; focus on playing well, not results",
            "6 losing sessions means you're terrible—quit poker",
            "You should change your entire strategy"
          ],
          correctAnswer: 1,
          explanation: "Six losing sessions is completely normal variance (you've had 9 before!). The 'due for a win' thinking is gambler's fallacy—each session is independent. Don't change strategy based on short-term results. Focus on: Are you playing your A-game? Are games good quality? Is your mental state solid? Results will follow over time. Trust process, not outcomes.",
          difficulty: "medium",
          points: 2
        }
      ]
    },
    {
      id: "speed",
      title: "Section D: Speed Round",
      description: "Quick record keeping knowledge",
      weight: 10,
      timed: true,
      timePerQuestion: 15,
      questions: [
        {
          id: "8.3-s1",
          type: "quick-calc",
          topic: "8.3.3 Essential Statistics",
          question: "What does VPIP measure?",
          correctAnswer: "Voluntarily Put money In Pot %",
          acceptableAnswers: ["Voluntarily put in pot", "Voluntarily put money in pot", "How often you play hands", "Hand playing frequency", "% hands played"],
          explanation: "VPIP = Voluntarily Put money In Pot, measuring how often you play hands.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "8.3-s2",
          type: "quick-calc",
          topic: "8.3.4 Data Analysis",
          question: "Minimum hands for reliable cash game win rate?",
          correctAnswer: "50000",
          acceptableAnswers: ["50000", "50k", "50,000", "100000", "100k"],
          explanation: "Need 50,000-100,000+ hands for reliable win rate assessment.",
          difficulty: "medium",
          points: 1
        },
        {
          id: "8.3-s3",
          type: "quick-calc",
          topic: "8.3.3 Essential Statistics",
          question: "Player with VPIP 45% / PFR 8% is likely? (Tight/Loose)",
          correctAnswer: "Loose",
          acceptableAnswers: ["Loose", "loose", "Loose passive", "Fish", "Recreational"],
          explanation: "VPIP 45% / PFR 8% indicates a loose, passive player (calling station).",
          difficulty: "easy",
          points: 1
        },
        {
          id: "8.3-s4",
          type: "quick-calc",
          topic: "8.3.2 Tracking Tools",
          question: "Name one popular online poker tracking software.",
          correctAnswer: "PokerTracker",
          acceptableAnswers: ["PokerTracker", "Hold'em Manager", "HM", "PT", "PT4", "HEM", "Hand2Note"],
          explanation: "PokerTracker and Hold'em Manager are the most popular tracking tools.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "8.3-s5",
          type: "quick-calc",
          topic: "8.3.5 Review Schedules",
          question: "How long to wait before reviewing tilted session?",
          correctAnswer: "24 hours",
          acceptableAnswers: ["24 hours", "24hrs", "1 day", "next day", "24"],
          explanation: "Wait 24 hours after emotional sessions for objective review.",
          difficulty: "easy",
          points: 1
        }
      ]
    }
  ]
};

export default recordKeepingQuiz;
