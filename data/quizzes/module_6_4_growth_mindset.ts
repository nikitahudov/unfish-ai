import type { QuizData } from '@/types/quiz';

export const growthMindsetQuiz: QuizData = {
  moduleInfo: {
    id: "6.4",
    title: "Growth Mindset",
    category: "Mental Game",
    phase: 2,
    level: "Intermediate",
    passingScore: 80,
    estimatedTime: "25-35 minutes",
    timedModeMinutes: 25,
    speedModeMinutes: 12,
    learningOutcomes: [
      "Embrace mistakes as learning opportunities",
      "View challenges as growth catalysts",
      "Maintain long-term improvement perspective",
      "Seek feedback and constructive criticism",
      "Celebrate process over results"
    ],
    nextModule: {
      id: "7.1",
      title: "Player Profiling"
    }
  },
  sections: [
    {
      id: "conceptual",
      title: "Section A: Conceptual Understanding",
      description: "Test your understanding of growth mindset principles",
      weight: 20,
      questions: [
        {
          id: "6.4-c1",
          type: "multiple-choice",
          topic: "6.4.1 Fixed vs Growth Mindset",
          question: "What is a fixed mindset?",
          options: [
            "Believing your abilities can improve with practice",
            "Believing your abilities are innate and unchangeable",
            "Having a consistent schedule",
            "Never taking risks"
          ],
          correctAnswer: 1,
          explanation: "FIXED MINDSET = belief that abilities are INNATE and UNCHANGEABLE ('I'm either talented or not'). This leads to: avoiding challenges, giving up easily, seeing effort as pointless, feeling threatened by others' success. In poker: 'I don't have a poker brain' or 'I'll never be good at math'. This mindset limits growth.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "6.4-c2",
          type: "multiple-choice",
          topic: "6.4.1 Fixed vs Growth Mindset",
          question: "What is a growth mindset?",
          options: [
            "Believing you can grow taller",
            "Believing abilities can be developed through effort, learning, and persistence",
            "Always being optimistic",
            "Never making mistakes"
          ],
          correctAnswer: 1,
          explanation: "GROWTH MINDSET = belief that abilities can be DEVELOPED through EFFORT, LEARNING, and PERSISTENCE. This leads to: embracing challenges, persisting through setbacks, seeing effort as path to mastery, learning from criticism, finding inspiration in others' success. In poker: 'I can learn this with practice' or 'Mistakes show me what to study'. This mindset enables growth.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "6.4-c3",
          type: "true-false",
          topic: "6.4.2 Reframing Failures",
          question: "From a growth mindset, a big losing session is a failure that proves you're not good enough.",
          correctAnswer: false,
          explanation: "False! Growth mindset reframes it: 'This losing session is DATA. What can I learn? Did I play well (variance)? Did I make mistakes (opportunity to improve)? Did I tilt (chance to strengthen mental game)?' Outcomes aren't judgments of your worth - they're information for improvement. Every session teaches something if you're willing to learn.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "6.4-c4",
          type: "multiple-choice",
          topic: "6.4.3 Embracing Challenges",
          question: "Why should you seek tougher opponents and games?",
          options: [
            "To lose money faster",
            "To prove you're the best",
            "Because challenges accelerate learning and expose weaknesses to fix",
            "You shouldn't - always play the easiest games"
          ],
          correctAnswer: 2,
          explanation: "Playing TOUGH opponents accelerates growth: (1) Exposes weaknesses you didn't know you had, (2) Forces you to improve to compete, (3) Stretches your skills, (4) Provides better learning material. Playing only weak opponents = short-term profit, long-term stagnation. Growth comes from challenges. Balance profit games with challenge games. The discomfort of difficulty is where improvement happens.",
          difficulty: "medium",
          points: 1
        },
        {
          id: "6.4-c5",
          type: "multiple-choice",
          topic: "6.4.5 Feedback Seeking",
          question: "How should you respond to constructive criticism of your poker play?",
          options: [
            "Defend your decisions and argue",
            "Feel personally attacked",
            "Listen openly, consider the merit, thank them for the feedback",
            "Ignore all criticism"
          ],
          correctAnswer: 2,
          explanation: "Growth mindset response: LISTEN OPENLY, CONSIDER THE MERIT, THANK THEM. Criticism is gift - it's a perspective you can't see yourself. Even if you disagree ultimately, considering it makes you think deeper. Fixed mindset defends immediately or takes it personally. Growth mindset asks: 'What can I learn from this perspective?' Seek criticism actively - it's how you find blind spots.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "6.4-c6",
          type: "true-false",
          topic: "6.4.6 Process Orientation",
          question: "You should celebrate good decisions even when they lead to losing outcomes.",
          correctAnswer: true,
          explanation: "True! PROCESS > RESULTS. If you made the correct decision with the information available, that's success - even if you lost the hand. Celebrate: correct folds, good bluffs that got called by nuts, thin value bets, disciplined plays. Don't celebrate: lucky suckouts on bad plays. This mindset reinforces good decision-making and helps you handle variance. Judge yourself by decisions, not results.",
          difficulty: "medium",
          points: 1
        }
      ]
    },
    {
      id: "application",
      title: "Section B: Mindset Application",
      description: "Apply growth mindset principles to poker situations",
      weight: 35,
      questions: [
        {
          id: "6.4-a1",
          type: "scenario",
          topic: "6.4.1 Fixed vs Growth Mindset",
          scenario: "After losing a big pot, you think: 'I'm so stupid, I'll never learn this game. I don't have what it takes.'",
          question: "What mindset is this and how to reframe it?",
          options: [
            "Growth mindset - correctly identifying weakness",
            "Fixed mindset - reframe to 'I made a mistake. What can I learn? What specifically should I study?'",
            "Neutral mindset",
            "Healthy self-awareness"
          ],
          correctAnswer: 1,
          explanation: "This is FIXED MINDSET: 'I'm stupid', 'never learn', 'don't have what it takes' = ability is fixed. REFRAME to growth: 'I made a mistake [specific, not global]. What exactly went wrong? [analysis] What do I need to study? [action plan] This is how I improve [process].' Fixed = 'I am bad'. Growth = 'I did X poorly, I can learn to do X better.' Language matters - it shapes mindset.",
          difficulty: "easy",
          points: 2
        },
        {
          id: "6.4-a2",
          type: "scenario",
          topic: "6.4.2 Reframing Failures",
          scenario: "You busted out of a tournament in 15th place (bubble). You played well all day but ran into aces at a crucial moment.",
          question: "Growth mindset interpretation:",
          options: [
            "'I'm unlucky, poker is rigged'",
            "'I played well, ran into bad luck at bad time. What did I learn today? Would review key hands and be proud of good play.'",
            "'I'm a failure for not cashing'",
            "'Tournaments are stupid'"
          ],
          correctAnswer: 1,
          explanation: "Growth mindset: SEPARATE process from results. You played well (process success), got unlucky (variance). Focus on: (1) Pride in good play, (2) What you learned (experience), (3) Review of key hands (improvement), (4) Acceptance of variance (mature understanding). Fixed mindset focuses only on results (didn't cash = failure). Growth mindset sees value in the journey regardless of outcome.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "6.4-a3",
          type: "multiple-choice",
          topic: "6.4.3 Embracing Challenges",
          scenario: "You're a winning 25NL player. You can either: (A) Stay at 25NL, crushing and winning consistently, or (B) Move to 50NL where you'll struggle initially against better players.",
          question: "What does growth mindset suggest?",
          options: [
            "Stay at 25NL forever - why risk it?",
            "Try 50NL - challenge accelerates growth, struggle is temporary",
            "Never move up - comfort is best",
            "Move to 500NL immediately"
          ],
          correctAnswer: 1,
          explanation: "Growth mindset: EMBRACE the challenge of 50NL! Yes, you'll struggle initially, but: (1) Playing better opponents teaches more, (2) Initial struggle is TEMPORARY, (3) This is how you improve. Staying comfortable = stagnation. Moving up is scary but necessary for growth. Fixed mindset avoids challenge (fear of proving inadequacy). Growth mindset sees challenge as opportunity. Take calculated risks for growth.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "6.4-a4",
          type: "scenario",
          topic: "6.4.4 The Learning Loop",
          scenario: "What's the growth mindset learning loop?",
          question: "Identify the correct learning loop:",
          options: [
            "Play → Win → Play More",
            "Play → Review → Learn → Implement → Play",
            "Play → If win keep playing, if lose study",
            "Study → Play → Quit"
          ],
          correctAnswer: 1,
          explanation: "Growth mindset loop: PLAY (get experience) → REVIEW (analyze hands) → LEARN (identify lessons) → IMPLEMENT (practice new concepts) → PLAY (test implementation) → REPEAT. This is continuous improvement. Fixed mindset plays without review, or only studies after losses. Growth mindset treats every session as learning opportunity. The loop never ends - there's always something to improve.",
          difficulty: "easy",
          points: 2
        },
        {
          id: "6.4-a5",
          type: "scenario",
          topic: "6.4.5 Feedback Seeking",
          scenario: "A better player reviews your hand and says 'That river call was too thin, you're only beating bluffs.' Your first reaction is to feel defensive.",
          question: "Growth mindset response:",
          options: [
            "Argue and defend the call",
            "Pause, consider their point, ask 'What hands do you think I beat? What should I have folded to?'",
            "Feel bad and quit poker",
            "Ignore them - they don't understand your read"
          ],
          correctAnswer: 1,
          explanation: "Growth mindset: PAUSE before defending, CONSIDER the merit, ASK clarifying questions. Even if you disagree ultimately, the process of considering makes you sharper. Questions like 'What hands do I beat?' force deeper analysis. Fixed mindset defends immediately (ego protection). Growth mindset is curious (truth seeking). Welcome feedback - it's free coaching. Ego is the enemy of improvement.",
          difficulty: "easy",
          points: 2
        },
        {
          id: "6.4-a6",
          type: "multiple-choice",
          topic: "6.4.6 Process Orientation",
          scenario: "Hand 1: You made a questionable call and got lucky, winning $200. Hand 2: You made a perfect fold and saved $200. Which is more praiseworthy from growth mindset?",
          question: "Which deserves more celebration?",
          options: [
            "Hand 1 - you won money",
            "Hand 2 - correct decision is praiseworthy regardless of outcome",
            "Both equally",
            "Neither - only celebrate winning sessions"
          ],
          correctAnswer: 1,
          explanation: "Hand 2 deserves MORE praise! PROCESS > RESULTS. The perfect fold demonstrates skill, discipline, and correct decision-making. The lucky call was a mistake that happened to work out - celebrating it reinforces bad play. Growth mindset celebrates: correct decisions, good discipline, skillful plays - regardless of results. This builds long-term success. Results-oriented thinking leads to bad habits.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "6.4-a7",
          type: "scenario",
          topic: "6.4.1 Fixed vs Growth Mindset",
          scenario: "You see a player making advanced plays you don't understand. Fixed mindset thinks: 'They're naturally talented, I could never do that.' What does growth mindset think?",
          question: "Growth mindset interpretation:",
          options: [
            "They're lucky",
            "'They learned those plays - I can learn them too. What resources can teach me this?'",
            "They're better, I should quit",
            "Their play is probably wrong anyway"
          ],
          correctAnswer: 1,
          explanation: "Growth mindset: 'They LEARNED this, I can learn too!' Response: (1) Curiosity (what are they doing?), (2) Inspiration (that's possible for me), (3) Action plan (how do I learn this?). Fixed mindset sees talent (unchangeable). Growth mindset sees learning (achievable through effort). Others' success proves what's possible, not what's impossible for you. Use inspiration as fuel, not evidence of your limits.",
          difficulty: "easy",
          points: 2
        }
      ]
    },
    {
      id: "scenarios",
      title: "Section C: Practical Application",
      description: "Apply growth mindset to complex poker situations",
      weight: 35,
      questions: [
        {
          id: "6.4-s1",
          type: "scenario",
          topic: "6.4.2 Reframing Failures",
          scenario: "You had your worst month ever, down 20 buy-ins despite playing your best. You feel like a failure and question whether you should quit poker.",
          question: "How does growth mindset reframe this?",
          options: [
            "'I'm a failure, I should quit'",
            "'Variance is part of poker. I played well (process success). This month taught me emotional resilience. What can I improve? Long-term results matter.'",
            "'Poker is rigged'",
            "'I'll never win again'"
          ],
          correctAnswer: 1,
          explanation: "Growth reframe: (1) VARIANCE happens to everyone - not a reflection of you, (2) You played well (PROCESS success) - that's what matters, (3) You learned EMOTIONAL RESILIENCE (valuable skill), (4) LONG-TERM perspective matters, (5) Still room to improve (always). Downswings are character-building. Fixed mindset: one bad month = I'm bad. Growth mindset: one bad month = variance + learning opportunity.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "6.4-s2",
          type: "scenario",
          topic: "6.4.3 Embracing Challenges",
          scenario: "You're invited to a weekly home game with much better players. You'll probably lose money initially but learn a lot. Do you play?",
          question: "Growth mindset decision:",
          options: [
            "No - avoid challenge to protect ego and bankroll",
            "Yes - challenge is opportunity to learn from better players, worth the short-term cost",
            "No - never play if you might lose",
            "Yes - but ego-protect by making excuses when losing"
          ],
          correctAnswer: 1,
          explanation: "YES - embrace the challenge! Growth mindset view: (1) Playing better players = rapid learning, (2) Short-term losses are TUITION for education, (3) Stepping out of comfort zone is where growth happens, (4) Can always return to profitable games after learning. Fixed mindset avoids challenge (threat to self-image). Growth mindset seeks challenge (opportunity to improve). The temporary discomfort is worth the permanent improvement.",
          difficulty: "easy",
          points: 2
        },
        {
          id: "6.4-s3",
          type: "scenario",
          topic: "6.4.4 The Learning Loop",
          scenario: "You've been playing for 6 months but never review hands - you just play. Progress has plateaued.",
          question: "What's missing from your learning loop?",
          options: [
            "Nothing - just keep playing",
            "REVIEW and LEARN steps - you're playing without analyzing or improving",
            "You need to play more tables",
            "You're just not talented"
          ],
          correctAnswer: 1,
          explanation: "You're missing REVIEW and LEARN steps! Your loop is: Play → Play → Play. Complete loop: Play (experience) → REVIEW (what happened?) → LEARN (what lessons?) → IMPLEMENT (practice) → Play (test). Without review, you repeat the same mistakes forever. Playing more doesn't help if you're not learning from it. Experience without reflection isn't improvement. Add structured review to break through plateau.",
          difficulty: "easy",
          points: 2
        },
        {
          id: "6.4-s4",
          type: "scenario",
          topic: "6.4.5 Feedback Seeking",
          scenario: "You have a choice: (A) Play poker alone, never discuss hands, avoid criticism. (B) Join study group, post hands for review, hire coach, accept criticism.",
          question: "Which accelerates growth more?",
          options: [
            "A - avoid confusion from others' opinions",
            "B - feedback exposes blind spots you can't see yourself",
            "Both equal",
            "Neither - only your opinion matters"
          ],
          correctAnswer: 1,
          explanation: "B dramatically accelerates growth! Feedback from others: (1) Exposes BLIND SPOTS you can't see, (2) Provides different PERSPECTIVES, (3) Challenges your assumptions, (4) Catches mistakes you'd repeat. Solo learning is slow - you don't know what you don't know. Group learning + coaching provides mirrors to see yourself clearly. Growth mindset actively seeks feedback. Fixed mindset avoids it (feels threatening).",
          difficulty: "easy",
          points: 2
        },
        {
          id: "6.4-s5",
          type: "scenario",
          topic: "6.4.6 Process Orientation",
          scenario: "You tracked your decisions for a month. You made the 'correct' decision 85% of the time but finished the month down. How do you feel?",
          question: "Growth mindset evaluation:",
          options: [
            "Terrible - losing means failure",
            "Good - 85% correct decisions is process success. Results will come. What about the other 15%?",
            "Angry - poker is unfair",
            "Quit - good process should guarantee results"
          ],
          correctAnswer: 1,
          explanation: "Feel GOOD about process! 85% correct decisions = you're playing well. Short-term results don't reflect this due to variance, but long-term results will. Focus on: (1) Pride in 85% (process success), (2) Improving the other 15% (growth opportunity), (3) Trust the process over time. Process orientation allows you to feel successful even when results are bad. This mental resilience is crucial for long-term success.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "6.4-s6",
          type: "scenario",
          topic: "6.4.2 Reframing Failures",
          scenario: "You made a huge blunder that cost you $500. You feel terrible. How do you reframe this to support growth?",
          question: "Growth mindset reframe:",
          options: [
            "'I'm an idiot who can't play poker'",
            "'This $500 was expensive education. What exactly did I learn? How do I prevent this? This mistake will make me $5000+ in the long run.'",
            "'Mistakes mean I should quit'",
            "'I'll pretend it didn't happen'"
          ],
          correctAnswer: 1,
          explanation: "Reframe as EDUCATION: (1) $500 = expensive lesson, but valuable, (2) SPECIFIC learning: what exactly went wrong? (3) PREVENTION: what system prevents this? (4) LONG-TERM: this lesson will save/make much more than $500 over career. Growth mindset sees mistakes as data and learning opportunities. Every great player has made expensive mistakes - they learned from them. The mistake that teaches you something is worth the cost.",
          difficulty: "medium",
          points: 2
        }
      ]
    },
    {
      id: "speed",
      title: "Section D: Speed Round",
      description: "Quick growth mindset identification",
      weight: 10,
      timed: true,
      timePerQuestion: 15,
      questions: [
        {
          id: "6.4-sp1",
          type: "quick-calc",
          topic: "6.4.1 Fixed vs Growth Mindset",
          question: "Abilities: fixed or can be developed?",
          correctAnswer: "developed",
          acceptableAnswers: ["developed", "Developed", "grow", "improve"],
          explanation: "Growth mindset: abilities can be developed",
          difficulty: "easy",
          points: 1
        },
        {
          id: "6.4-sp2",
          type: "quick-calc",
          topic: "6.4.2 Reframing Failures",
          question: "Mistakes are: failures or learning opportunities?",
          correctAnswer: "learning",
          acceptableAnswers: ["learning", "Learning", "opportunities", "learning opportunities"],
          explanation: "Mistakes are learning opportunities",
          difficulty: "easy",
          points: 1
        },
        {
          id: "6.4-sp3",
          type: "quick-calc",
          topic: "6.4.3 Embracing Challenges",
          question: "Challenges: avoid or embrace?",
          correctAnswer: "embrace",
          acceptableAnswers: ["embrace", "Embrace", "seek"],
          explanation: "Embrace challenges for growth",
          difficulty: "easy",
          points: 1
        },
        {
          id: "6.4-sp4",
          type: "quick-calc",
          topic: "6.4.5 Feedback Seeking",
          question: "Criticism: avoid or welcome?",
          correctAnswer: "welcome",
          acceptableAnswers: ["welcome", "Welcome", "seek"],
          explanation: "Welcome criticism as feedback",
          difficulty: "easy",
          points: 1
        },
        {
          id: "6.4-sp5",
          type: "quick-calc",
          topic: "6.4.6 Process Orientation",
          question: "Judge by: process or results only?",
          correctAnswer: "process",
          acceptableAnswers: ["process", "Process"],
          explanation: "Judge by process, not just results",
          difficulty: "easy",
          points: 1
        }
      ]
    }
  ]
};

export default growthMindsetQuiz;
