import type { QuizData } from '@/types/quiz';

export const focusQuiz: QuizData = {
  moduleInfo: {
    id: "6.2",
    title: "Focus & Concentration",
    category: "Mental Game",
    phase: 2,
    level: "Intermediate",
    passingScore: 80,
    estimatedTime: "25-35 minutes",
    timedModeMinutes: 25,
    speedModeMinutes: 12,
    learningOutcomes: [
      "Maintain attention during long sessions",
      "Eliminate common distractions",
      "Optimize playing environment",
      "Structure sessions for peak performance",
      "Recognize and respond to focus degradation"
    ],
    nextModule: {
      id: "6.3",
      title: "Motivation & Discipline"
    }
  },
  sections: [
    {
      id: "conceptual",
      title: "Section A: Conceptual Understanding",
      description: "Test your understanding of focus and concentration principles",
      weight: 20,
      questions: [
        {
          id: "6.2-c1",
          type: "multiple-choice",
          topic: "6.2.1 Understanding Focus",
          question: "What's the main cost of playing poker while distracted?",
          options: [
            "It makes poker less fun",
            "You miss information and make suboptimal decisions",
            "Your opponents will notice",
            "You play faster"
          ],
          correctAnswer: 1,
          explanation: "The cost is MISSED INFORMATION and SUBOPTIMAL DECISIONS. When distracted, you miss opponent tells, betting patterns, board texture changes, and position dynamics. Each distraction costs you EV. Even if you 'know' the right play, lack of focus means you won't execute it consistently. Full attention is a massive edge.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "6.2-c2",
          type: "true-false",
          topic: "6.2.1 Understanding Focus",
          question: "Multitabling many tables at once always improves your hourly win rate.",
          correctAnswer: false,
          explanation: "False! More tables can increase VOLUME but often DECREASE win rate per table. There's a sweet spot - play enough tables to stay engaged, but not so many you miss information or make mistakes. Quality > quantity. Most players are more profitable playing 2-4 tables with full focus than 8+ tables distracted.",
          difficulty: "medium",
          points: 1
        },
        {
          id: "6.2-c3",
          type: "multiple-choice",
          topic: "6.2.3 Session Structure",
          question: "What's the optimal session length for maintaining peak focus?",
          options: [
            "As long as possible - play until you're tired",
            "60-90 minutes with breaks, total session 2-4 hours",
            "24 hours straight",
            "15 minutes only"
          ],
          correctAnswer: 1,
          explanation: "Optimal is 60-90 MINUTE blocks with short breaks, total session 2-4 hours max for most players. After 90 minutes, focus degrades. After 4 hours total, even with breaks, decision quality drops significantly. Marathon sessions feel productive but are often -EV. Quality focused hours beat long distracted hours.",
          difficulty: "medium",
          points: 1
        },
        {
          id: "6.2-c4",
          type: "multiple-choice",
          topic: "6.2.4 Physical Factors",
          question: "Which physical factor has the MOST impact on poker focus?",
          options: [
            "Sleep quality and quantity",
            "The color of your poker chips",
            "Room temperature",
            "Your chair brand"
          ],
          correctAnswer: 0,
          explanation: "SLEEP has the most impact. Poor sleep (< 7 hours) dramatically reduces: decision-making quality, emotional regulation, pattern recognition, and tilt resistance. You can't focus your way out of sleep deprivation. All other factors (nutrition, exercise, environment) matter, but sleep is foundational. Never play a serious session when sleep-deprived.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "6.2-c5",
          type: "true-false",
          topic: "6.2.2 Environment Optimization",
          question: "Checking your phone briefly between hands has minimal impact on focus.",
          correctAnswer: false,
          explanation: "False! Phone checking is HIGHLY disruptive. Each check: (1) Pulls you out of poker mindset, (2) Takes 20-30 seconds to fully refocus, (3) Makes you miss pre-flop action or table dynamics, (4) Creates habit of distraction. Over a session, phone checking costs significant EV. Turn phone off or put it in another room during sessions.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "6.2-c6",
          type: "multiple-choice",
          topic: "6.2.6 Focus Recovery",
          question: "When should you end a poker session due to focus degradation?",
          options: [
            "Never - always finish",
            "When you notice yourself making basic mistakes or missing obvious information",
            "Only when you've lost all your money",
            "After exactly 3 hours"
          ],
          correctAnswer: 1,
          explanation: "End when you notice BASIC MISTAKES or MISS OBVIOUS information: forgetting position, missing obvious draws, not noticing opponent patterns, autopiloting, feeling mentally foggy. These are signs your focus is gone. Playing with poor focus is -EV. Better to quit early and come back fresh than grind through fatigue and make costly errors.",
          difficulty: "medium",
          points: 1
        }
      ]
    },
    {
      id: "application",
      title: "Section B: Focus Optimization",
      description: "Apply focus principles to optimize your poker performance",
      weight: 35,
      questions: [
        {
          id: "6.2-a1",
          type: "scenario",
          topic: "6.2.2 Environment Optimization",
          scenario: "You're setting up your poker playing space. You have a choice between: (A) Playing at kitchen table with family nearby, TV on, phone next to you, or (B) Quiet room, closed door, phone off, good lighting, comfortable chair, water nearby.",
          question: "Which setup will lead to better results?",
          options: [
            "A - family keeps you relaxed",
            "B - distraction-free environment enables focus",
            "Both are equal",
            "It doesn't matter"
          ],
          correctAnswer: 1,
          explanation: "Setup B dramatically outperforms A. ENVIRONMENT MATTERS: quiet space (no interruptions), closed door (signals 'I'm working'), phone off (no temptation), good lighting (reduces eye strain), comfortable setup (no physical discomfort), water (hydration). Each distraction costs EV. Treat poker like professional work - create a professional environment.",
          difficulty: "easy",
          points: 2
        },
        {
          id: "6.2-a2",
          type: "multiple-choice",
          topic: "6.2.3 Session Structure",
          question: "What's the best use of a 10-minute break between poker sessions?",
          options: [
            "Check social media and emails",
            "Physical movement (walk, stretch), hydrate, fresh air",
            "Start another poker session immediately",
            "Watch TV"
          ],
          correctAnswer: 1,
          explanation: "PHYSICAL MOVEMENT is best: stand, walk, stretch, get fresh air, hydrate. This: (1) Restores blood flow, (2) Resets mental state, (3) Gives eyes a break from screen, (4) Reduces physical tension. Avoid screens during breaks (no phone/TV) - your brain needs rest from stimulation. Brief physical activity prepares you for the next focused session.",
          difficulty: "easy",
          points: 2
        },
        {
          id: "6.2-a3",
          type: "scenario",
          topic: "6.2.4 Physical Factors",
          scenario: "You have an important poker session tonight. You got 5 hours of sleep last night. You've had 4 cups of coffee today and haven't eaten much.",
          question: "What's your expected performance?",
          options: [
            "Great - caffeine will help",
            "Poor - sleep-deprived, over-caffeinated, poor nutrition all impair focus",
            "Normal - you can power through",
            "Better than usual - you're wired"
          ],
          correctAnswer: 1,
          explanation: "Expect POOR performance. You have three strikes: (1) Sleep-deprived (5 hrs < 7-9 needed), (2) Over-caffeinated (leads to jitters, anxiety, crash), (3) Poor nutrition (brain needs fuel). Caffeine can't fix sleep deprivation - it masks symptoms briefly then you crash. Best decision: skip session, or play very short session at low stakes. Don't play serious poker in this state.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "6.2-a4",
          type: "multiple-choice",
          topic: "6.2.5 Focus Maintenance Techniques",
          question: "What's a good technique for maintaining focus during long sessions?",
          options: [
            "Play as many tables as possible",
            "Active engagement: talk through decisions out loud, take notes, set hand goals",
            "Watch TV simultaneously",
            "Play on autopilot"
          ],
          correctAnswer: 1,
          explanation: "ACTIVE ENGAGEMENT maintains focus: (1) Talk through decisions out loud (forces conscious thinking), (2) Take notes on opponents (keeps you observant), (3) Set mini-goals ('I'll make the best decision these next 10 hands'), (4) Ask yourself questions ('What does this bet size mean?'). Active engagement prevents autopilot and keeps mind engaged.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "6.2-a5",
          type: "scenario",
          topic: "6.2.1 Understanding Focus",
          scenario: "You're playing online and have: poker tables, YouTube video playing, Twitter open, text conversation active, and thinking about work problems.",
          question: "How does this affect your poker EV?",
          options: [
            "No effect - you can multitask",
            "Massive -EV: divided attention means you miss information and make mistakes",
            "Slight +EV - you're more relaxed",
            "Only affects if you lose"
          ],
          correctAnswer: 1,
          explanation: "MASSIVE -EV! Your attention is split 5+ ways. You'll miss: opponent timing tells, betting patterns, position dynamics, board texture changes, optimal bet sizing. Each distraction costs EV. 'Multitasking' is a myth - you're rapidly switching attention, doing everything poorly. Single-task poker > multitask poker. Close everything except poker tables.",
          difficulty: "easy",
          points: 2
        },
        {
          id: "6.2-a6",
          type: "multiple-choice",
          topic: "6.2.3 Session Structure",
          question: "You've been playing for 3 hours. You notice: making basic mistakes, feeling foggy, checking phone more, autopiloting hands. What should you do?",
          options: [
            "Keep playing - you need to finish",
            "End the session - focus has degraded",
            "Take a caffeine pill and continue",
            "Switch to higher stakes for excitement"
          ],
          correctAnswer: 1,
          explanation: "END THE SESSION! These are classic signs of focus degradation: basic mistakes, mental fog, increased distractions, autopilot. Continuing is -EV - you'll make costly errors. Your brain is telling you it's done. Respect that signal. End now, come back fresh tomorrow. The games will still be there. Protecting your focus is protecting your winrate.",
          difficulty: "easy",
          points: 2
        },
        {
          id: "6.2-a7",
          type: "scenario",
          topic: "6.2.4 Physical Factors",
          scenario: "You're preparing for an important tournament. The night before, you: get 8 hours of sleep, eat a balanced breakfast, exercise for 30 minutes, stay hydrated, and avoid excessive caffeine.",
          question: "How will this preparation affect your tournament performance?",
          options: [
            "No difference - only poker skill matters",
            "Significant positive impact on focus, decision-making, and stamina",
            "Negative - you'll be too relaxed",
            "Only matters for casual players"
          ],
          correctAnswer: 1,
          explanation: "HUGE POSITIVE impact! You've optimized all physical factors: (1) Sleep restores cognitive function, (2) Balanced nutrition provides sustained energy, (3) Exercise improves blood flow and mental clarity, (4) Hydration maintains brain performance, (5) Moderate caffeine avoids jitters. Physical preparation is mental preparation. This is how pros approach big tournaments.",
          difficulty: "medium",
          points: 2
        }
      ]
    },
    {
      id: "scenarios",
      title: "Section C: Practical Application",
      description: "Apply focus strategies to realistic poker situations",
      weight: 35,
      questions: [
        {
          id: "6.2-s1",
          type: "scenario",
          topic: "6.2.6 Focus Recovery",
          scenario: "You're in the middle of a session. You notice you just auto-folded a marginal hand without thinking, then realized you had position and pot odds to call. This is the third 'autopilot' mistake in 20 minutes.",
          question: "What should you do?",
          options: [
            "Keep playing - everyone makes mistakes",
            "Immediate 15-minute break or end session - you've lost focus",
            "Play more tables to stay engaged",
            "Switch games to regain interest"
          ],
          correctAnswer: 1,
          explanation: "Take IMMEDIATE action - break or quit. Three autopilot mistakes in 20 minutes signals severe focus degradation. You're no longer playing poker - you're clicking buttons. Every hand you play in this state is -EV. Take a 15+ minute break: walk, breathe, refocus. If that doesn't restore focus, end session. Never grind through lost focus.",
          difficulty: "easy",
          points: 2
        },
        {
          id: "6.2-s2",
          type: "scenario",
          topic: "6.2.2 Environment Optimization",
          scenario: "You're a winning online player at home. Your family frequently interrupts you during sessions with questions and requests.",
          question: "How should you handle this?",
          options: [
            "Ignore your family completely",
            "Multitask - play and talk",
            "Set boundaries: closed door = do not disturb, schedule poker time, explain you're working",
            "Only play when everyone is asleep (3am)"
          ],
          correctAnswer: 2,
          explanation: "SET CLEAR BOUNDARIES professionally: (1) Establish poker time = work time, (2) Closed door = do not disturb (except emergencies), (3) Explain poker requires focus like any job, (4) Schedule around family time when possible. Respect works both ways - respect their needs, ask them to respect yours. This lets you fully focus on poker AND fully focus on family during appropriate times.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "6.2-s3",
          type: "scenario",
          topic: "6.2.5 Focus Maintenance Techniques",
          scenario: "During a 2-hour session, you find yourself getting bored and starting to zone out between hands.",
          question: "What focus technique should you use?",
          options: [
            "Open your phone to stay entertained",
            "Active observation: study opponents when not in hand, take notes, predict their actions",
            "Play more tables",
            "Watch TV"
          ],
          correctAnswer: 1,
          explanation: "Use ACTIVE OBSERVATION: study opponents when you're not in hands - what are their patterns? Predict their actions before they act. Take notes. Ask yourself: 'What would I do in their spot?' This keeps your mind engaged on poker, builds reads, and prevents boredom. Hands you're not in are still valuable for information gathering. Stay in poker mindset.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "6.2-s4",
          type: "scenario",
          topic: "6.2.3 Session Structure",
          scenario: "You typically play 4-hour sessions with no breaks. By hour 3, you're tired but push through to hour 4, often making mistakes in the final hour.",
          question: "How should you restructure your sessions?",
          options: [
            "Keep the same structure - more volume is better",
            "Play 90-min blocks with 10-min breaks, or end at 3 hours when fresh",
            "Play 6 hours to build stamina",
            "Take breaks only if losing"
          ],
          correctAnswer: 1,
          explanation: "RESTRUCTURE to maintain quality: (1) 90-minute blocks with 10-minute breaks, OR (2) Stop at 3 hours while still sharp. That final hour where you make mistakes is COSTING you money - it's -EV volume. Better to play 3 hours at your best than 4 hours with a losing final hour. Quality > quantity. Protect your peak performance window.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "6.2-s5",
          type: "scenario",
          topic: "6.2.4 Physical Factors",
          scenario: "You play poker most evenings after work. You arrive home tired, skip dinner, and sit down to play while exhausted and hungry.",
          question: "What's the impact and solution?",
          options: [
            "No impact - you can push through",
            "Major negative impact - solution: eat proper meal, rest 30min, then play shorter focused session",
            "Positive - hunger sharpens focus",
            "Only matters if you're professional"
          ],
          correctAnswer: 1,
          explanation: "MAJOR -EV setup! Physical depletion (tired, hungry) destroys focus and decision-making. Solution: (1) Eat a proper meal (brain needs fuel), (2) Rest 30 minutes (mental reset), (3) THEN play a shorter session (1-2 hrs max). Or skip poker that day. Playing while depleted trains bad habits and loses money. Taking care of physical needs IS taking care of your poker game.",
          difficulty: "easy",
          points: 2
        },
        {
          id: "6.2-s6",
          type: "scenario",
          topic: "6.2.1 Understanding Focus",
          scenario: "Player A: plays 4 tables with full focus, tracks opponents, makes exploitative adjustments. Player B: plays 8 tables while watching Netflix, makes standard plays on autopilot. Both are competent players.",
          question: "Who likely has higher overall winrate?",
          options: [
            "Player B - more volume",
            "Player A - quality focus on fewer tables with adjustments beats autopilot volume",
            "Equal winrates",
            "Depends only on luck"
          ],
          correctAnswer: 1,
          explanation: "Player A wins more overall! While B plays more hands, A's focused approach: (1) Makes better decisions per hand, (2) Exploits opponents actively, (3) Makes fewer mistakes, (4) Has higher $/hand winrate. A might play 50% the hands but wins 2x per hand = same or better overall. Quality beats quantity. Focus is your edge.",
          difficulty: "hard",
          points: 2
        }
      ]
    },
    {
      id: "speed",
      title: "Section D: Speed Round",
      description: "Quick focus concepts",
      weight: 10,
      timed: true,
      timePerQuestion: 15,
      questions: [
        {
          id: "6.2-sp1",
          type: "quick-calc",
          topic: "6.2.3 Session Structure",
          question: "Optimal session length? (2-4hrs or 8+hrs)",
          correctAnswer: "2-4hrs",
          acceptableAnswers: ["2-4hrs", "2-4", "2-4 hours", "2-4 hrs"],
          explanation: "2-4 hours is optimal for focus",
          difficulty: "easy",
          points: 1
        },
        {
          id: "6.2-sp2",
          type: "quick-calc",
          topic: "6.2.4 Physical Factors",
          question: "Most important physical factor? (sleep/temperature)",
          correctAnswer: "sleep",
          acceptableAnswers: ["sleep", "Sleep"],
          explanation: "Sleep is most critical",
          difficulty: "easy",
          points: 1
        },
        {
          id: "6.2-sp3",
          type: "quick-calc",
          topic: "6.2.2 Environment Optimization",
          question: "Phone during session: on or off?",
          correctAnswer: "off",
          acceptableAnswers: ["off", "Off", "OFF"],
          explanation: "Turn phone off during sessions",
          difficulty: "easy",
          points: 1
        },
        {
          id: "6.2-sp4",
          type: "quick-calc",
          topic: "6.2.6 Focus Recovery",
          question: "Making basic mistakes: continue or quit?",
          correctAnswer: "quit",
          acceptableAnswers: ["quit", "Quit", "stop", "Stop", "end"],
          explanation: "Quit when making basic mistakes",
          difficulty: "easy",
          points: 1
        },
        {
          id: "6.2-sp5",
          type: "quick-calc",
          topic: "6.2.1 Understanding Focus",
          question: "Quality or quantity of tables?",
          correctAnswer: "quality",
          acceptableAnswers: ["quality", "Quality"],
          explanation: "Quality focus beats quantity of tables",
          difficulty: "easy",
          points: 1
        }
      ]
    }
  ]
};

export default focusQuiz;
