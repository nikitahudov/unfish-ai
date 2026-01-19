import type { QuizData } from '@/types/quiz';

export const tiltControlQuiz: QuizData = {
  moduleInfo: {
    id: "6.1",
    title: "Tilt Control",
    category: "Mental Game",
    phase: 2,
    level: "Intermediate",
    passingScore: 80,
    estimatedTime: "25-35 minutes",
    timedModeMinutes: 25,
    speedModeMinutes: 12,
    learningOutcomes: [
      "Identify personal tilt triggers",
      "Recognize early warning signs of tilt",
      "Implement tilt prevention strategies",
      "Execute recovery protocols when tilted",
      "Reduce tilt-related losses significantly"
    ],
    nextModule: {
      id: "6.2",
      title: "Focus & Concentration"
    }
  },
  sections: [
    {
      id: "conceptual",
      title: "Section A: Conceptual Understanding",
      description: "Test your understanding of tilt types and mechanisms",
      weight: 20,
      questions: [
        {
          id: "6.1-c1",
          type: "multiple-choice",
          topic: "6.1.1 Understanding Tilt",
          question: "What is tilt in poker?",
          options: [
            "Playing tired",
            "An emotional state that causes you to make -EV decisions",
            "Going all-in frequently",
            "Playing too many hands"
          ],
          correctAnswer: 1,
          explanation: "Tilt is an EMOTIONAL STATE (frustration, anger, desperation) that causes you to make NEGATIVE EV decisions you wouldn't normally make. You know the right play, but emotions override logic. Tilt isn't just playing bad - it's playing bad because you're emotionally compromised. Everyone tilts; the key is recognizing and managing it.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "6.1-c2",
          type: "multiple-choice",
          topic: "6.1.1 Understanding Tilt",
          question: "What type of tilt occurs after winning a big pot and playing too loose afterward?",
          options: [
            "Bad beat tilt",
            "Winner's tilt",
            "Mistake tilt",
            "Entitlement tilt"
          ],
          correctAnswer: 1,
          explanation: "This is WINNER'S TILT (also called 'fancy play syndrome'). After winning big, players feel invincible and play too many hands, bluff too much, or make hero calls. The mindset: 'I'm up, so losses don't matter' or 'I'm running hot, I can't lose'. Winner's tilt is subtle but costly - many players give back their wins quickly.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "6.1-c3",
          type: "multiple-choice",
          topic: "6.1.1 Understanding Tilt",
          question: "What type of tilt involves feeling like you 'deserve' to win after running bad?",
          options: [
            "Bad beat tilt",
            "Winner's tilt",
            "Entitlement tilt",
            "Mistake tilt"
          ],
          correctAnswer: 2,
          explanation: "ENTITLEMENT TILT happens when you feel the universe 'owes you' after a downswing. Thoughts like: 'I've run so bad, I DESERVE to win this flip' or 'This guy has sucked out twice, I'm calling him down light'. You make -EV plays hoping for justice. Poker doesn't care about fairness - every hand is independent.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "6.1-c4",
          type: "multiple-choice",
          topic: "6.1.2 Personal Tilt Triggers",
          question: "What's the difference between external and internal tilt triggers?",
          options: [
            "External = online, internal = live",
            "External = other players/events, internal = your own thoughts/expectations",
            "They're the same thing",
            "External = loud noises, internal = stomach pain"
          ],
          correctAnswer: 1,
          explanation: "EXTERNAL triggers come from outside: bad beats, annoying opponents, dealer mistakes, ambient noise. INTERNAL triggers come from within: perfectionism, high expectations, comparing yourself to others, fear of looking foolish. Knowing YOUR specific triggers (both types) is the first step to managing tilt.",
          difficulty: "medium",
          points: 1
        },
        {
          id: "6.1-c5",
          type: "true-false",
          topic: "6.1.6 Long-Term Tilt Management",
          question: "The goal of tilt management is to never tilt again.",
          correctAnswer: false,
          explanation: "False! The goal is NOT to never tilt - that's unrealistic. Everyone tilts. The goal is to: (1) Tilt LESS OFTEN, (2) Tilt LESS SEVERELY, (3) RECOGNIZE tilt faster, and (4) RECOVER quicker. Accept that tilt will happen, but build systems to minimize its damage. Progress, not perfection.",
          difficulty: "medium",
          points: 1
        },
        {
          id: "6.1-c6",
          type: "true-false",
          topic: "6.1.3 Early Warning Signs",
          question: "Physical symptoms like increased heart rate or muscle tension can be early warning signs of tilt.",
          correctAnswer: true,
          explanation: "True! Physical symptoms are often the EARLIEST warning signs: increased heart rate, shallow breathing, muscle tension, flushed face, sweating. Your body reacts to emotional stress before you consciously recognize you're tilting. Learning to notice these physical cues gives you time to intervene before making costly mistakes.",
          difficulty: "easy",
          points: 1
        }
      ]
    },
    {
      id: "application",
      title: "Section B: Tilt Recognition & Prevention",
      description: "Identify tilt situations and apply prevention strategies",
      weight: 35,
      questions: [
        {
          id: "6.1-a1",
          type: "scenario",
          topic: "6.1.1 Understanding Tilt",
          scenario: "You lose a big pot when your opponent hits a 2-outer on the river. Next hand, you get Q9o in early position. You normally fold this, but you raise because 'I need to get my money back quickly.'",
          question: "What type of tilt is this?",
          options: [
            "Winner's tilt",
            "Bad beat tilt",
            "Mistake tilt",
            "No tilt - just adapting"
          ],
          correctAnswer: 1,
          explanation: "This is classic BAD BEAT TILT. You experienced an unlucky loss (opponent hit 2-outer) and immediately made a -EV decision (raising Q9o early) you wouldn't normally make. The thinking 'I need to get my money back quickly' is the tilt talking. The correct response to a bad beat is: take a breath, maybe take a break, and continue making +EV decisions.",
          difficulty: "easy",
          points: 2
        },
        {
          id: "6.1-a2",
          type: "scenario",
          topic: "6.1.2 Personal Tilt Triggers",
          scenario: "You notice you tilt most when: (1) You make a mistake and feel stupid, (2) Someone comments on your play, (3) You feel like you're playing worse than others at the table.",
          question: "What type of triggers are these?",
          options: [
            "External triggers",
            "Internal triggers (perfectionism, ego, comparison)",
            "Physical triggers",
            "Not actually triggers"
          ],
          correctAnswer: 1,
          explanation: "These are INTERNAL triggers driven by: perfectionism (can't accept mistakes), ego (others' opinions matter too much), and comparison (measuring yourself against others). Internal triggers are often harder to manage than external ones because they're about your self-perception. Solution: accept that mistakes are part of learning, focus on process over results.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "6.1-a3",
          type: "multiple-choice",
          topic: "6.1.3 Early Warning Signs",
          question: "Which is an early behavioral warning sign of tilt?",
          options: [
            "Winning a big pot",
            "Checking your phone between hands",
            "Playing hands faster, making snap decisions, or getting impatient",
            "Taking notes on opponents"
          ],
          correctAnswer: 2,
          explanation: "Playing FASTER, SNAP decisions, and IMPATIENCE are behavioral warning signs. When tilting, players often: rush decisions, stop thinking through hands, feel impatient waiting for good hands, or play too many hands in quick succession. If you notice yourself speeding up or getting impatient, PAUSE. This is your brain saying 'I'm not in optimal decision-making mode'.",
          difficulty: "easy",
          points: 2
        },
        {
          id: "6.1-a4",
          type: "multiple-choice",
          topic: "6.1.4 Prevention Strategies",
          question: "What's the most effective pre-session tilt prevention strategy?",
          options: [
            "Promise yourself you won't tilt",
            "Set clear stop-loss rules BEFORE the session",
            "Play longer sessions to avoid tilt",
            "Ignore tilt completely"
          ],
          correctAnswer: 1,
          explanation: "Setting STOP-LOSS RULES before the session is highly effective. Decide in advance: 'If I lose X buy-ins, I quit' or 'If I feel myself tilting, I take a 30-min break'. Make these rules when you're rational, not emotional. When you're tilting, you can't think clearly - having pre-set rules removes the decision-making burden.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "6.1-a5",
          type: "scenario",
          topic: "6.1.5 Recovery Protocols",
          scenario: "You realize you're tilting. You've already lost 2 buy-ins playing poorly. Your heart is racing and you're thinking 'I NEED to win this back now.'",
          question: "What should you do IMMEDIATELY?",
          options: [
            "Keep playing but try to focus",
            "Go all-in next hand to get even",
            "Stop playing immediately - stand up, leave table, take a break",
            "Play one more orbit to see if you can turn it around"
          ],
          correctAnswer: 2,
          explanation: "QUIT IMMEDIATELY! Once you recognize tilt AND have lost multiple buy-ins, continuing is -EV. Your thought 'I NEED to win it back' is tilt talking. Take a break: walk away, get fresh air, do something else. The money is gone - accept it. Continuing while tilted will only make it worse. 'One more orbit' becomes 'one more hour' and more losses.",
          difficulty: "easy",
          points: 2
        },
        {
          id: "6.1-a6",
          type: "multiple-choice",
          topic: "6.1.4 Prevention Strategies",
          question: "Which environmental control helps prevent tilt?",
          options: [
            "Playing in a noisy, chaotic environment",
            "Playing when tired or hungry",
            "Creating a calm, comfortable playing space with good lighting and temperature",
            "Checking poker results constantly"
          ],
          correctAnswer: 2,
          explanation: "A CALM, COMFORTABLE environment prevents tilt. Control what you can: good lighting (reduce eye strain), comfortable temperature (not too hot/cold), quiet space (minimize distractions), comfortable chair, water nearby. Physical discomfort (hungry, tired, uncomfortable) lowers your tilt threshold. If you're physically comfortable, you're less likely to tilt emotionally.",
          difficulty: "easy",
          points: 2
        },
        {
          id: "6.1-a7",
          type: "scenario",
          topic: "6.1.6 Long-Term Tilt Management",
          scenario: "You've been working on tilt control for 2 months. You still tilt occasionally, but you recognize it faster, take breaks sooner, and lose less money when tilted.",
          question: "Is this success or failure?",
          options: [
            "Failure - you still tilt",
            "Success - you've improved all the key metrics",
            "Neutral - no progress",
            "Need more time to evaluate"
          ],
          correctAnswer: 1,
          explanation: "This is SUCCESS! Tilt management isn't about NEVER tilting - that's unrealistic. Success means: (1) Recognizing tilt FASTER (you do), (2) Taking action SOONER (you do), (3) Losing LESS when tilted (you do). You've improved all three metrics. Keep reinforcing these habits. Tilt management is a skill that improves with practice.",
          difficulty: "medium",
          points: 2
        }
      ]
    },
    {
      id: "scenarios",
      title: "Section C: Practical Scenarios",
      description: "Apply tilt control strategies to realistic situations",
      weight: 35,
      questions: [
        {
          id: "6.1-s1",
          type: "scenario",
          topic: "6.1.1 Understanding Tilt",
          scenario: "You won 5 buy-ins in your session. You're feeling great, 'running hot', and invincible. You start playing more hands, making loose calls, and 3-betting light because 'I can't lose today.'",
          question: "What's happening and what should you do?",
          options: [
            "This is fine - you should play more when running hot",
            "This is winner's tilt - take a break or tighten up",
            "This is good aggression - keep going",
            "Cash out immediately"
          ],
          correctAnswer: 1,
          explanation: "This is WINNER'S TILT! Feeling invincible and playing too loose because you're up is dangerous. Many players give back their entire win (plus more) due to winner's tilt. Solution: (1) Recognize you're up due to cards, not invincibility, (2) Stick to your strategy, (3) Maybe quit while ahead, or (4) Take a break to reset. Don't give it back!",
          difficulty: "medium",
          points: 2
        },
        {
          id: "6.1-s2",
          type: "scenario",
          topic: "6.1.5 Recovery Protocols",
          scenario: "You're on tilt. You stand up, take a 10-minute break, walk around. You come back feeling slightly better but still frustrated.",
          question: "Should you continue playing?",
          options: [
            "Yes - the break helped",
            "No - if you're still frustrated, take longer break or quit",
            "Yes - but play only premium hands",
            "It doesn't matter"
          ],
          correctAnswer: 1,
          explanation: "NO! If you're STILL frustrated after a break, you're still tilted - just less severely. Don't play. The frustration will resurface quickly once cards go badly. Take a longer break (30+ minutes) or end the session. The test: if you can't honestly say 'I'm calm and ready to play my A-game,' don't play. Slightly better isn't good enough.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "6.1-s3",
          type: "scenario",
          topic: "6.1.2 Personal Tilt Triggers",
          scenario: "You notice you tilt most when playing against a specific aggressive opponent who keeps 3-betting you. Even when you fold correctly, you feel angry.",
          question: "What's the best response?",
          options: [
            "Avoid tables with this player",
            "3-bet them back every time",
            "Recognize this as a trigger, focus on making +EV decisions regardless of who's at the table",
            "Berate them in chat"
          ],
          correctAnswer: 2,
          explanation: "RECOGNIZE the trigger and commit to +EV play regardless. Avoiding them is short-term fix but you'll face many aggressive players. Revenge-3-betting is tilt. The solution: (1) Acknowledge this player triggers you, (2) Remind yourself their aggression is exploitable (not personal), (3) Adjust strategy rationally, (4) Focus on making +EV decisions. Don't let them live rent-free in your head.",
          difficulty: "hard",
          points: 2
        },
        {
          id: "6.1-s4",
          type: "scenario",
          topic: "6.1.4 Prevention Strategies",
          scenario: "Before your session, you write down: 'Stop-loss: 3 buy-ins. If I lose 3 BI, I quit immediately no matter what.' During your session, you lose 3 buy-ins but feel fine and want to keep playing.",
          question: "What should you do?",
          options: [
            "Keep playing - you feel fine",
            "Quit - honor your pre-set rule",
            "Adjust the rule to 4 buy-ins",
            "Play one more buy-in to test"
          ],
          correctAnswer: 1,
          explanation: "QUIT and honor your rule! Stop-loss rules protect you from yourself. Even if you 'feel fine', you set this rule when you were rational. Feeling fine after losing 3 BI might be denial or early-stage tilt. The rule exists for this exact moment. If you break it once, it becomes meaningless. Build trust with yourself by honoring pre-set rules.",
          difficulty: "hard",
          points: 2
        },
        {
          id: "6.1-s5",
          type: "scenario",
          topic: "6.1.3 Early Warning Signs",
          scenario: "You notice: tight chest, faster breathing, feeling of urgency, thinking 'hurry up' between hands, and mild irritation at everything.",
          question: "What's happening?",
          options: [
            "Nothing unusual",
            "Early warning signs of tilt - take action now",
            "Just normal poker stress",
            "You need coffee"
          ],
          correctAnswer: 1,
          explanation: "These are EARLY WARNING SIGNS of tilt! Physical symptoms (tight chest, fast breathing), emotional symptoms (irritation, urgency), and behavioral changes (impatience) indicate you're entering tilt. This is the BEST time to intervene - before you make costly mistakes. Take a break NOW, do breathing exercises, or quit. Catching tilt early prevents massive losses.",
          difficulty: "easy",
          points: 2
        },
        {
          id: "6.1-s6",
          type: "scenario",
          topic: "6.1.6 Long-Term Tilt Management",
          scenario: "After every session, you write in your journal: (1) Did I tilt? (2) What triggered it? (3) How did I respond? (4) What can I do better next time?",
          question: "Is this useful for long-term tilt management?",
          options: [
            "No - waste of time",
            "Yes - systematic self-reflection builds awareness and improvement",
            "Only if you show it to a therapist",
            "Only for professionals"
          ],
          correctAnswer: 1,
          explanation: "YES, extremely useful! Journaling builds AWARENESS (what are MY specific triggers?), ACCOUNTABILITY (honest assessment of your response), and IMPROVEMENT (what to do differently). Over time, you'll see patterns, track progress, and build emotional resilience. Tilt management is a skill - deliberate practice through reflection makes you better. This is elite-level mental game work.",
          difficulty: "medium",
          points: 2
        }
      ]
    },
    {
      id: "speed",
      title: "Section D: Speed Round",
      description: "Quick tilt recognition and response",
      weight: 10,
      timed: true,
      timePerQuestion: 15,
      questions: [
        {
          id: "6.1-sp1",
          type: "quick-calc",
          topic: "6.1.1 Understanding Tilt",
          question: "Tilt after bad beat? (Y/N)",
          correctAnswer: "Y",
          acceptableAnswers: ["Y", "y", "yes", "Yes"],
          explanation: "Bad beats cause tilt",
          difficulty: "easy",
          points: 1
        },
        {
          id: "6.1-sp2",
          type: "quick-calc",
          topic: "6.1.1 Understanding Tilt",
          question: "Playing loose after winning big? (winner's/bad beat) tilt",
          correctAnswer: "winner's",
          acceptableAnswers: ["winner's", "winners", "Winners", "winner"],
          explanation: "Winner's tilt = loose play after winning",
          difficulty: "easy",
          points: 1
        },
        {
          id: "6.1-sp3",
          type: "quick-calc",
          topic: "6.1.4 Prevention Strategies",
          question: "Set stop-loss before or during session?",
          correctAnswer: "before",
          acceptableAnswers: ["before", "Before"],
          explanation: "Set stop-loss BEFORE session starts",
          difficulty: "easy",
          points: 1
        },
        {
          id: "6.1-sp4",
          type: "quick-calc",
          topic: "6.1.5 Recovery Protocols",
          question: "Recognized tilt: quit or continue?",
          correctAnswer: "quit",
          acceptableAnswers: ["quit", "Quit", "stop", "Stop", "leave"],
          explanation: "Quit when you recognize tilt",
          difficulty: "easy",
          points: 1
        },
        {
          id: "6.1-sp5",
          type: "quick-calc",
          topic: "6.1.6 Long-Term Tilt Management",
          question: "Goal: never tilt or manage tilt better?",
          correctAnswer: "manage",
          acceptableAnswers: ["manage", "Manage", "manage better", "manage tilt better"],
          explanation: "Goal is to manage tilt better, not eliminate it",
          difficulty: "easy",
          points: 1
        }
      ]
    }
  ]
};

export default tiltControlQuiz;
