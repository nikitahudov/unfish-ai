import type { QuizData } from '@/types/quiz';

export const motivationQuiz: QuizData = {
  moduleInfo: {
    id: "6.3",
    title: "Motivation & Discipline",
    category: "Mental Game",
    phase: 2,
    level: "Intermediate",
    passingScore: 80,
    estimatedTime: "25-35 minutes",
    timedModeMinutes: 25,
    speedModeMinutes: 12,
    learningOutcomes: [
      "Set effective poker goals",
      "Build sustainable study habits",
      "Maintain motivation during downswings",
      "Create and follow a poker schedule",
      "Develop long-term discipline systems"
    ],
    nextModule: {
      id: "6.4",
      title: "Growth Mindset"
    }
  },
  sections: [
    {
      id: "conceptual",
      title: "Section A: Conceptual Understanding",
      description: "Test your understanding of motivation and discipline principles",
      weight: 20,
      questions: [
        {
          id: "6.3-c1",
          type: "multiple-choice",
          topic: "6.3.1 Goal Setting for Poker",
          question: "What's the difference between process goals and outcome goals?",
          options: [
            "No difference - goals are goals",
            "Process goals focus on actions you control; outcome goals focus on results you don't fully control",
            "Process goals are for beginners only",
            "Outcome goals are better"
          ],
          correctAnswer: 1,
          explanation: "PROCESS goals = actions you control ('play 10k hands this month', 'study 1hr daily', 'make correct folds'). OUTCOME goals = results you don't fully control ('win $5k', 'reach high stakes', 'cash in tournament'). Process goals are better because: (1) You can actually control them, (2) They lead to outcomes long-term, (3) They don't depend on variance. Focus on process.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "6.3-c2",
          type: "multiple-choice",
          topic: "6.3.1 Goal Setting for Poker",
          question: "What does SMART stand for in goal-setting?",
          options: [
            "Specific, Measurable, Achievable, Relevant, Time-bound",
            "Strong, Motivated, Aggressive, Ready, Tough",
            "Simple, Minor, Automatic, Random, Timed",
            "Study, Master, Apply, Review, Test"
          ],
          correctAnswer: 0,
          explanation: "SMART = Specific, Measurable, Achievable, Relevant, Time-bound. Good goal: 'Play 50,000 hands at 25NL by end of month, maintaining 5bb/100 winrate' (specific, measurable, achievable, relevant to growth, time-bound). Bad goal: 'Get better at poker' (vague, not measurable, no timeline). SMART goals are trackable and motivating.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "6.3-c3",
          type: "true-false",
          topic: "6.3.2 Building Habits",
          question: "It takes exactly 21 days to form a new habit.",
          correctAnswer: false,
          explanation: "False! The '21 days' is a myth. Research shows habit formation takes 18-254 days, averaging ~66 days, depending on complexity. Simple habits (drinking water) form faster than complex ones (daily study routine). Don't expect instant habit formation. Be patient, stay consistent, and understand real habits take 2-3 months to solidify. Keep going past 21 days!",
          difficulty: "medium",
          points: 1
        },
        {
          id: "6.3-c4",
          type: "multiple-choice",
          topic: "6.3.4 Motivation Management",
          question: "What's the difference between intrinsic and extrinsic motivation?",
          options: [
            "No difference",
            "Intrinsic = internal enjoyment; extrinsic = external rewards/pressure",
            "Intrinsic = beginner; extrinsic = pro",
            "They're opposite and can't coexist"
          ],
          correctAnswer: 1,
          explanation: "INTRINSIC = doing something for internal reasons (love of game, challenge, growth, mastery). EXTRINSIC = doing for external reasons (money, status, others' approval). Intrinsic motivation is more sustainable long-term. Extrinsic can work short-term but burns out. Best: cultivate intrinsic love of improvement while acknowledging extrinsic benefits. Find genuine interest in getting better.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "6.3-c5",
          type: "true-false",
          topic: "6.3.5 Discipline Systems",
          question: "Discipline means forcing yourself to do things you hate through pure willpower.",
          correctAnswer: false,
          explanation: "False! Discipline isn't about willpower alone - willpower is a limited resource. Real discipline comes from: (1) SYSTEMS (schedules, routines, accountability), (2) ENVIRONMENT (remove temptations), (3) HABITS (automatic behaviors), (4) COMMITMENT DEVICES (stakes, public commitments). Don't rely on willpower - build systems that make the right actions easier than wrong ones.",
          difficulty: "medium",
          points: 1
        },
        {
          id: "6.3-c6",
          type: "multiple-choice",
          topic: "6.3.6 Long-Term Sustainability",
          question: "What's the main cause of poker burnout?",
          options: [
            "Playing too little",
            "Imbalance: all poker and no life, or unsustainable grinding without recovery",
            "Winning too much",
            "Not studying enough"
          ],
          correctAnswer: 1,
          explanation: "Burnout comes from IMBALANCE and UNSUSTAINABLE pace: all poker with no other life activities, grinding through downswings without breaks, ignoring physical/mental health, no recovery time, treating poker like a soul-crushing job. Prevention: balanced life, regular breaks, hobbies outside poker, social connections, physical activity. Poker should enhance your life, not consume it.",
          difficulty: "medium",
          points: 1
        }
      ]
    },
    {
      id: "application",
      title: "Section B: Goal-Setting & Habits",
      description: "Apply motivation principles to build effective poker habits",
      weight: 35,
      questions: [
        {
          id: "6.3-a1",
          type: "scenario",
          topic: "6.3.1 Goal Setting for Poker",
          scenario: "Which is a better poker goal?",
          question: "Choose the better goal:",
          options: [
            "'Win $10,000 this year'",
            "'Play 200,000 hands and study 100 hours this year'",
            "'Become a great player'",
            "'Never lose'"
          ],
          correctAnswer: 1,
          explanation: "Goal B is better! It's a PROCESS goal (focus on actions you control: hands played, study hours) vs outcome goal (win $10k depends on variance). Goal B is also SMART: Specific (200k hands, 100hrs), Measurable (can track), Achievable (reasonable volume), Relevant (improves skill), Time-bound (this year). Goal A depends on variance. Goals C and D are vague.",
          difficulty: "easy",
          points: 2
        },
        {
          id: "6.3-a2",
          type: "multiple-choice",
          topic: "6.3.2 Building Habits",
          question: "What's the best way to build a daily poker study habit?",
          options: [
            "Study whenever you feel motivated",
            "Start with 15 minutes daily at same time, gradually increase, track consistency",
            "Study 5 hours once per month",
            "Only study after losing sessions"
          ],
          correctAnswer: 1,
          explanation: "Start SMALL and CONSISTENT: 15 minutes daily at the SAME TIME (builds cue). Gradually increase. Track consistency (builds accountability). Small daily habit > sporadic marathon sessions. Same time each day builds automatic routine. Track with calendar X's - don't break the chain. After 2-3 months, it becomes automatic. Consistency beats intensity for habit formation.",
          difficulty: "easy",
          points: 2
        },
        {
          id: "6.3-a3",
          type: "scenario",
          topic: "6.3.3 Schedule Creation",
          scenario: "You want to improve at poker while working full-time. You have 2 hours free each evening.",
          question: "What's the best schedule approach?",
          options: [
            "Play 2 hours every single night",
            "Structured split: Mon/Wed/Fri play 1.5hrs, Tue/Thu study 1hr, weekends flexible",
            "Random schedule based on motivation",
            "No schedule - just play when you feel like it"
          ],
          correctAnswer: 1,
          explanation: "Structured split is best! (1) Play sessions 3x/week maintains skill, (2) Study sessions 2x/week drives improvement, (3) Specific days build routine, (4) Weekends flexible prevents burnout. Balance play and study. Having structure removes daily decision fatigue ('should I play or study?'). Schedule = commitment. You're more likely to follow a plan than rely on motivation.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "6.3-a4",
          type: "multiple-choice",
          topic: "6.3.4 Motivation Management",
          scenario: "You're in a 30-buy-in downswing. You've lost motivation and don't want to play.",
          question: "What's the best approach?",
          options: [
            "Force yourself to play - discipline over motivation",
            "Take a short break, review hands to confirm you're playing well, set small process goals, return when ready",
            "Quit poker forever",
            "Move up in stakes to win it back"
          ],
          correctAnswer: 1,
          explanation: "Healthy approach: (1) Short BREAK (few days) for emotional reset, (2) REVIEW hands objectively - if playing well, it's variance, (3) Set SMALL process goals ('play 500 hands well'), (4) Return when genuinely ready, not forced. Forcing yourself when demoralized leads to tilt. Quitting is overreaction. Moving up is disaster. Variance is part of poker - manage your response to it.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "6.3-a5",
          type: "scenario",
          topic: "6.3.5 Discipline Systems",
          scenario: "You keep skipping study sessions because 'you don't feel like it.' What system would help?",
          question: "Choose the best discipline system:",
          options: [
            "Just try harder",
            "Accountability: share goals with poker friend, weekly check-ins, stakes if you don't follow through",
            "Wait until you feel motivated",
            "Give up on studying"
          ],
          correctAnswer: 1,
          explanation: "ACCOUNTABILITY system works! (1) Share specific goals with friend ('study 1hr Mon/Wed/Fri'), (2) Weekly check-ins (report completion), (3) Optional stakes ('if I miss 2 sessions, I owe $50'). Public commitment creates external pressure that supports internal goals. Don't rely on motivation or willpower alone - build systems that make success easier. Accountability is a powerful discipline tool.",
          difficulty: "easy",
          points: 2
        },
        {
          id: "6.3-a6",
          type: "multiple-choice",
          topic: "6.3.2 Building Habits",
          question: "What is 'habit stacking'?",
          options: [
            "Playing many tables at once",
            "Linking a new habit to an existing habit (After X, I will Y)",
            "Building many new habits simultaneously",
            "Taking breaks between sessions"
          ],
          correctAnswer: 1,
          explanation: "HABIT STACKING = linking new habit to existing one. Example: 'After I pour morning coffee (existing habit), I will review one poker hand (new habit)'. The existing habit becomes a CUE for the new one. This leverages established neural pathways. Other examples: 'After dinner, I study for 20min' or 'After each session, I journal 5min'. Use existing routines to anchor new behaviors.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "6.3-a7",
          type: "scenario",
          topic: "6.3.6 Long-Term Sustainability",
          scenario: "You've been grinding poker 60 hours/week for 6 months. You feel exhausted, dreading sessions, and playing poorly. What's wrong?",
          question: "Diagnosis and solution:",
          options: [
            "Nothing wrong - keep grinding",
            "Classic burnout - need to reduce volume, add recovery time, rebalance life",
            "You're weak - push harder",
            "Switch games only"
          ],
          correctAnswer: 1,
          explanation: "Clear BURNOUT signs: exhaustion, dread, poor performance. 60hrs/week unsustainable for most players. Solution: (1) REDUCE volume (40hrs/week max), (2) Add RECOVERY (days off, breaks), (3) REBALANCE life (hobbies, exercise, social), (4) Reconnect with intrinsic motivation (why do you play?). Poker is marathon, not sprint. Sustainable pace > unsustainable grinding. Quality beats exhausted quantity.",
          difficulty: "medium",
          points: 2
        }
      ]
    },
    {
      id: "scenarios",
      title: "Section C: Practical Application",
      description: "Apply motivation and discipline to real poker situations",
      weight: 35,
      questions: [
        {
          id: "6.3-s1",
          type: "scenario",
          topic: "6.3.1 Goal Setting for Poker",
          scenario: "Your poker goals for the quarter: (1) Play 50,000 hands, (2) Study 30 hours, (3) Review 100 hands with coach, (4) Maintain 4bb/100 winrate.",
          question: "Which goal is problematic?",
          options: [
            "Goal 1 - too many hands",
            "Goal 2 - too much study",
            "Goal 3 - coach is unnecessary",
            "Goal 4 - winrate is outcome-based, others are process-based"
          ],
          correctAnswer: 3,
          explanation: "Goal 4 is problematic! Goals 1-3 are PROCESS goals (actions you control). Goal 4 is OUTCOME goal (depends on variance). You can play perfectly and still not hit 4bb/100 due to bad run. Better Goal 4: 'Make correct decisions in 90% of hands based on review'. Focus on controllable processes that LEAD to good outcomes. Variance will handle the results over time.",
          difficulty: "hard",
          points: 2
        },
        {
          id: "6.3-s2",
          type: "scenario",
          topic: "6.3.3 Schedule Creation",
          scenario: "You created a schedule: play Mon/Wed/Fri 7-10pm, study Tue/Thu 8-9pm. First week: you followed it perfectly. Second week: you missed Tuesday study and Wednesday play because 'didn't feel like it.'",
          question: "What's the issue and solution?",
          options: [
            "Schedule doesn't work - abandon it",
            "Normal - motivation fluctuates. Solution: recommit, track adherence, investigate barriers",
            "You're lazy - try harder",
            "Schedule too rigid"
          ],
          correctAnswer: 1,
          explanation: "This is NORMAL! Week 1 = honeymoon motivation. Week 2 = real test. Solution: (1) RECOMMIT to schedule, (2) TRACK adherence (calendar X's), (3) INVESTIGATE barriers ('What prevented me?' - tired? conflicting plans?), (4) ADJUST if needed (maybe 8pm is too late?). First slip isn't failure - how you respond matters. Don't abandon plans at first obstacle. Build discipline through consistency.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "6.3-s3",
          type: "scenario",
          topic: "6.3.4 Motivation Management",
          scenario: "You love poker when winning, hate it when losing. Your motivation swings wildly with results.",
          question: "How do you stabilize motivation?",
          options: [
            "Only play when winning",
            "Shift focus from results to process: love of learning, skill development, problem-solving",
            "Quit - you don't really love poker",
            "Play lower stakes only"
          ],
          correctAnswer: 1,
          explanation: "Shift to PROCESS/INTRINSIC motivation! If motivation depends on results, you'll quit during inevitable downswings. Instead, find joy in: (1) LEARNING (each hand is a puzzle), (2) IMPROVEMENT (getting better is rewarding), (3) CHALLENGE (complex game to master), (4) PROCESS (making good decisions). Results follow skill over time. Love the journey, not just the destination. This is how pros sustain long careers.",
          difficulty: "hard",
          points: 2
        },
        {
          id: "6.3-s4",
          type: "scenario",
          topic: "6.3.5 Discipline Systems",
          scenario: "You want to stop revenge-playing after bad sessions. What commitment device could help?",
          question: "Choose the best commitment device:",
          options: [
            "Nothing - just stop doing it",
            "Rule: 'After any session down 2+ BI, mandatory 24hr break before next session'",
            "Play higher stakes to force discipline",
            "Promise yourself you'll stop"
          ],
          correctAnswer: 1,
          explanation: "Pre-set RULE is perfect commitment device! 'After losing 2+ BI, mandatory 24hr break' removes the emotional decision. When tilted, you can't trust your judgment - the rule decides for you. This prevents revenge-playing (most costly form of tilt). Other commitment devices: bankroll limits, poker buddy check-ins, session time limits. Build rules when rational that protect you when emotional.",
          difficulty: "easy",
          points: 2
        },
        {
          id: "6.3-s5",
          type: "scenario",
          topic: "6.3.2 Building Habits",
          scenario: "You want to build a hand review habit. You tried 'review hands whenever' but rarely did it.",
          question: "What specific habit implementation would work better?",
          options: [
            "Keep trying 'whenever'",
            "Specific trigger: 'After every session, before closing laptop, review 3 hands - takes 10 minutes'",
            "Review 100 hands once per month",
            "Only review when you lose"
          ],
          correctAnswer: 1,
          explanation: "Specific TRIGGER and SMALL action! 'After session, before closing laptop, review 3 hands' = (1) Clear CUE (end of session), (2) Small manageable task (3 hands, 10min), (3) Immediate (before closing laptop). 'Whenever' fails because there's no trigger. Small daily habit beats sporadic marathons. After 2-3 months, you'll automatically review - it becomes part of session routine.",
          difficulty: "easy",
          points: 2
        },
        {
          id: "6.3-s6",
          type: "scenario",
          topic: "6.3.6 Long-Term Sustainability",
          scenario: "Successful pro plays 30 hours/week, exercises 5 hours/week, has hobbies, strong relationships, takes 2 weeks off every quarter. Struggling amateur plays 60 hours/week, skips exercise, no hobbies, isolated, never takes breaks.",
          question: "Who has more sustainable long-term success?",
          options: [
            "Amateur - more volume means more profit",
            "Pro - balanced life prevents burnout, maintains performance quality",
            "Both equal",
            "Can't determine from this information"
          ],
          correctAnswer: 1,
          explanation: "PRO's approach is far more sustainable! Balance = (1) Quality play (fresh, focused), (2) Physical health (exercise), (3) Mental health (hobbies, relationships, breaks), (4) Burnout prevention (regular time off). Amateur's approach leads to: burnout, health problems, declining performance, unsustainable lifestyle. Long-term success comes from sustainable practices. Marathon mindset beats sprint mentality.",
          difficulty: "medium",
          points: 2
        }
      ]
    },
    {
      id: "speed",
      title: "Section D: Speed Round",
      description: "Quick motivation and discipline concepts",
      weight: 10,
      timed: true,
      timePerQuestion: 15,
      questions: [
        {
          id: "6.3-sp1",
          type: "quick-calc",
          topic: "6.3.1 Goal Setting for Poker",
          question: "Better: process or outcome goals?",
          correctAnswer: "process",
          acceptableAnswers: ["process", "Process"],
          explanation: "Process goals are better (controllable)",
          difficulty: "easy",
          points: 1
        },
        {
          id: "6.3-sp2",
          type: "quick-calc",
          topic: "6.3.2 Building Habits",
          question: "Habit formation takes ~__ days? (21/66)",
          correctAnswer: "66",
          acceptableAnswers: ["66", "60-70", "2 months"],
          explanation: "Habits take ~66 days to form on average",
          difficulty: "easy",
          points: 1
        },
        {
          id: "6.3-sp3",
          type: "quick-calc",
          topic: "6.3.4 Motivation Management",
          question: "More sustainable: intrinsic or extrinsic motivation?",
          correctAnswer: "intrinsic",
          acceptableAnswers: ["intrinsic", "Intrinsic"],
          explanation: "Intrinsic motivation is more sustainable",
          difficulty: "easy",
          points: 1
        },
        {
          id: "6.3-sp4",
          type: "quick-calc",
          topic: "6.3.5 Discipline Systems",
          question: "Discipline from: willpower alone or systems?",
          correctAnswer: "systems",
          acceptableAnswers: ["systems", "Systems"],
          explanation: "Build systems, don't rely on willpower alone",
          difficulty: "easy",
          points: 1
        },
        {
          id: "6.3-sp5",
          type: "quick-calc",
          topic: "6.3.6 Long-Term Sustainability",
          question: "Prevent burnout: grind 60hrs or balance 30hrs?",
          correctAnswer: "balance",
          acceptableAnswers: ["balance", "Balance", "30hrs", "30"],
          explanation: "Balanced approach prevents burnout",
          difficulty: "easy",
          points: 1
        }
      ]
    }
  ]
};

export default motivationQuiz;
