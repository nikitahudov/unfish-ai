import type { QuizData } from '@/types/quiz';

export const videoStudyQuiz: QuizData = {
  moduleInfo: {
    id: "9.2",
    title: "Video Content Study",
    category: "Study Methods",
    phase: 1,
    level: "Fundamental",
    passingScore: 80,
    estimatedTime: "25-35 minutes",
    timedModeMinutes: 25,
    speedModeMinutes: 12,
    learningOutcomes: [
      "Select appropriate training content for current level",
      "Engage actively with video content",
      "Extract and apply lessons effectively",
      "Evaluate content quality and relevance",
      "Build a structured video study curriculum"
    ],
    nextModule: {
      id: "9.3",
      title: "Book & Article Study"
    }
  },
  sections: [
    {
      id: "conceptual",
      title: "Section A: Conceptual Understanding",
      description: "Test your understanding of video study principles",
      weight: 20,
      questions: [
        {
          id: "9.2-c1",
          type: "multiple-choice",
          topic: "9.2.3 Active Study Methods",
          question: "What is the key difference between active and passive video watching?",
          options: [
            "Active watching means taking notes, passive means not taking notes",
            "Active watching involves pausing to predict actions and think critically; passive is just watching",
            "Active watching requires paid content, passive is free content",
            "There is no meaningful difference"
          ],
          correctAnswer: 1,
          explanation: "Active study means engaging critically: pause before decisions to predict what you'd do, analyze why the instructor made their play, question assumptions, and think through alternatives. Passive watching is entertainment—you watch but don't process deeply. Active study creates learning; passive watching creates an illusion of improvement. Engagement determines retention and application.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "9.2-c2",
          type: "true-false",
          topic: "9.2.2 Content Selection",
          question: "You should always watch the most advanced content available to learn from the best players.",
          correctAnswer: false,
          explanation: "FALSE. Content must match your skill level. Advanced content for micro-stakes players is counterproductive—the concepts are too complex, situations don't apply, and you'll miss fundamentals. A beginner watching high-stakes 3-bet defense theory wastes time. Start with fundamentals for your stakes, master those, then level up content as you level up stakes. Right level > highest level.",
          difficulty: "medium",
          points: 1
        },
        {
          id: "9.2-c3",
          type: "multiple-choice",
          topic: "9.2.1 Content Types",
          question: "Which video content type is generally MOST valuable for beginners?",
          options: [
            "High-stakes play and explain videos",
            "Fundamental strategy series on core concepts",
            "Tournament final table reviews",
            "Advanced solver analysis"
          ],
          correctAnswer: 1,
          explanation: "Fundamental strategy series are goldmines for beginners. They systematically cover core concepts (pot odds, position, bet sizing, hand reading basics) that form your foundation. Play-and-explain at your stakes is also excellent. High-stakes content and solver analysis come later. Build from the ground up—fundamentals first, complexity later. Master the basics before advanced theory.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "9.2-c4",
          type: "true-false",
          topic: "9.2.4 Application Strategies",
          question: "After watching a training video, you should immediately try to apply every concept you learned in your next session.",
          correctAnswer: false,
          explanation: "FALSE. This leads to information overload and mistakes. Pick 1-2 key concepts from each video to implement deliberately. Master those before adding more. Trying to apply 10 new concepts simultaneously creates confusion and tilt. Focused implementation: watch video → select 1-2 takeaways → practice those until automatic → then add more. Quality of application > quantity of concepts.",
          difficulty: "medium",
          points: 1
        },
        {
          id: "9.2-c5",
          type: "multiple-choice",
          topic: "9.2.6 Study Scheduling",
          question: "What is the optimal length for a focused video study session?",
          options: [
            "6+ hours to maximize learning",
            "45-90 minutes with breaks—attention and retention decline after this",
            "10 minutes daily",
            "Whatever fits your schedule, length doesn't matter"
          ],
          correctAnswer: 1,
          explanation: "45-90 minutes is the sweet spot for deep learning. Your attention and critical thinking decline after 90 minutes. Better to do focused 60-minute sessions than unfocused 3-hour marathons. Take breaks, process information, and return fresh. Quality study time > quantity. Marathon sessions create diminishing returns and burnout. Schedule sustainable, focused blocks.",
          difficulty: "medium",
          points: 1
        },
        {
          id: "9.2-c6",
          type: "multiple-choice",
          topic: "9.2.5 Recommended Resources",
          question: "What is the most important factor when evaluating whether to invest in paid training content?",
          options: [
            "The production quality and editing",
            "Whether your friends use the same site",
            "The instructor's credentials and whether content matches your level/format",
            "The price—cheapest is best"
          ],
          correctAnswer: 2,
          explanation: "Instructor quality + content relevance are paramount. Is the instructor a proven winner at your format/stakes? Does the content match your level? Is it for your game type? Production quality is nice but secondary. Price matters, but great content at $200 beats mediocre content at $50. Free content can be excellent (or terrible). Evaluate: instructor credibility, relevance to you, content quality.",
          difficulty: "hard",
          points: 1
        }
      ]
    },
    {
      id: "application",
      title: "Section B: Application Skills",
      description: "Apply video study techniques effectively",
      weight: 35,
      questions: [
        {
          id: "9.2-a1",
          type: "scenario",
          topic: "9.2.3 Active Study Methods",
          scenario: "You're watching a play-and-explain video. The instructor is on the turn facing a bet with a flush draw.",
          question: "What is the BEST active study approach in this moment?",
          options: [
            "Watch to see what they do, then continue",
            "Pause, decide what you would do and why, then compare to instructor's reasoning",
            "Skip ahead to see the river result",
            "Take notes on what happened"
          ],
          correctAnswer: 1,
          explanation: "PAUSE and think first. Decide your action and reasoning BEFORE seeing the instructor's decision. This forces critical thinking and reveals gaps between your strategy and theirs. Then watch their explanation and compare. This active engagement embeds learning. Passive watching (just seeing their action) creates minimal retention. The pause-and-predict method is the gold standard for video study.",
          difficulty: "easy",
          points: 2
        },
        {
          id: "9.2-a2",
          type: "scenario",
          topic: "9.2.2 Content Selection",
          scenario: "You're a $0.50/$1 cash game player. You find a video series: Option A) $5/$10 6-max advanced theory. Option B) $1/$2 fundamental strategy with hand examples.",
          question: "Which should you choose?",
          options: [
            "Option A—learn from higher-stakes thinking",
            "Option B—closer to your stakes and level-appropriate",
            "Both are equally useful",
            "Neither—only watch free content"
          ],
          correctAnswer: 1,
          explanation: "Option B is far superior for you. It matches your stakes (similar opponents/dynamics) and skill level (fundamentals you can actually apply). $5/$10 content assumes knowledge you don't have and addresses dynamics you won't face at $0.50/$1. Content relevance to your actual games matters more than 'learning from the best.' Match content to your reality.",
          difficulty: "easy",
          points: 2
        },
        {
          id: "9.2-a3",
          type: "scenario",
          topic: "9.2.4 Application Strategies",
          scenario: "You watched a video about c-betting strategy that covered 5 different concepts: board texture, opponent type, position, sizing, and frequency.",
          question: "How should you implement these concepts?",
          options: [
            "Try to apply all 5 concepts starting in your next session",
            "Pick 1-2 concepts to focus on for the next week, then add others gradually",
            "Don't implement anything—just keep watching more videos",
            "Only implement the easiest concept and ignore the rest"
          ],
          correctAnswer: 1,
          explanation: "Focused implementation beats information overload. Pick 1-2 concepts (e.g., 'adjust c-bet sizing to board texture' + 'c-bet less vs calling stations'). Focus on those for a week until they're automatic. Then add the next concept. Trying to implement everything creates confusion and mistakes. Deliberate practice: learn concept → focus on it → master it → add next. Slow down to speed up.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "9.2-a4",
          type: "scenario",
          topic: "9.2.5 Recommended Resources",
          scenario: "A new poker training site launches with amazing marketing. They have slick videos but instructors with no verifiable results. A less polished site has proven winners teaching but basic production.",
          question: "Which site is likely more valuable?",
          options: [
            "The new site—production quality shows professionalism",
            "The proven winners site—instructor credibility matters most",
            "Both are equally good",
            "Neither—only learn from free YouTube"
          ],
          correctAnswer: 1,
          explanation: "Instructor credibility >> production quality. You're learning strategy from people who can prove they win, not from marketers with cameras. Plenty of 'professional looking' content is created by break-even players or marketing teams. Prioritize: Does the instructor have proven results? Can they explain concepts clearly? Production is nice but secondary. Learn from winners, not videographers.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "9.2-a5",
          type: "scenario",
          topic: "9.2.6 Study Scheduling",
          scenario: "You have 3 hours available for poker improvement. How should you split your time between video study and playing?",
          question: "What is a balanced approach?",
          options: [
            "3 hours of video study—learning is most important",
            "3 hours of playing—can't learn without playing",
            "1-1.5 hours of focused video study, 1.5-2 hours of playing to apply concepts",
            "15 minutes study, rest playing"
          ],
          correctAnswer: 2,
          explanation: "Balance study and application. Video study (1-1.5 hours) provides concepts and frameworks. Playing (1.5-2 hours) embeds those concepts through practice. Study without play is theory without application; play without study is repetition without improvement. The ratio varies by needs, but roughly 1:2 study-to-play is sustainable and effective for most players. Learn, then apply.",
          difficulty: "hard",
          points: 2
        },
        {
          id: "9.2-a6",
          type: "scenario",
          topic: "9.2.3 Active Study Methods",
          scenario: "After watching a video, you want to ensure maximum retention and application of what you learned.",
          question: "What is the most effective post-video routine?",
          options: [
            "Immediately watch another video to learn more",
            "Write a summary of key points and action items, then test in next session",
            "Do nothing—the concepts will naturally stick",
            "Rewatch the same video 5 times"
          ],
          correctAnswer: 1,
          explanation: "Post-video summary + action items = retention. Summarizing forces you to process and articulate what you learned. Action items create a plan: 'I will focus on X in my next session.' Then test those concepts in play. This closes the learning loop: watch → summarize → plan → apply → review. Passive watching without follow-up creates the illusion of learning without actual improvement.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "9.2-a7",
          type: "multiple-choice",
          topic: "9.2.1 Content Types",
          question: "You're struggling with tilt and mental game issues. Which content type would be most beneficial?",
          options: [
            "Advanced GTO solver videos",
            "Mental game and psychology-focused content",
            "High-stakes hand review sessions",
            "General strategy videos"
          ],
          correctAnswer: 1,
          explanation: "Match content to your needs. If tilt is your problem, technical strategy videos won't help. You need mental game content: tilt triggers, emotional control, bankroll psychology, mindset. Jared Tendler's content, poker psychology coaches, mental game books. Fix the mental game to unlock your technical skills. Sometimes the best poker study isn't about poker—it's about the mind playing poker.",
          difficulty: "easy",
          points: 2
        }
      ]
    },
    {
      id: "practical",
      title: "Section C: Practical Scenarios",
      description: "Build effective video study routines and habits",
      weight: 35,
      questions: [
        {
          id: "9.2-p1",
          type: "scenario",
          topic: "9.2.6 Study Scheduling",
          scenario: "You work full-time and have limited poker time. You can either: A) Watch 2 training videos per week (2 hours) OR B) Watch 1 video weekly (1 hour) and spend that extra hour in focused hand review.",
          question: "Which approach is likely more beneficial?",
          options: [
            "Option A—more content means more learning",
            "Option B—depth (applying 1 video + hand review) beats breadth (2 videos with no practice)",
            "Both are equally effective",
            "Neither—you need at least 10 hours/week to improve"
          ],
          correctAnswer: 1,
          explanation: "Depth > breadth for time-limited players. One video fully absorbed, applied, and reinforced through hand review creates more improvement than two videos passively consumed. You have limited time—make every hour count through deep engagement. Learn less, but learn it well. Better to master 50 concepts thoroughly than superficially know 200. Quality of study > quantity.",
          difficulty: "hard",
          points: 2
        },
        {
          id: "9.2-p2",
          type: "scenario",
          topic: "9.2.2 Content Selection",
          scenario: "You're building a video study curriculum. You have 20 hours to invest in content. You're a beginner cash game player.",
          question: "How should you prioritize content topics?",
          options: [
            "All 20 hours on advanced solver work and GTO theory",
            "15 hours on fundamentals (preflop, position, pot odds), 5 hours on next-level concepts",
            "20 hours on mental game and psychology",
            "Spread evenly across all topics for well-rounded knowledge"
          ],
          correctAnswer: 1,
          explanation: "Foundation-heavy approach wins for beginners. Invest 75% in fundamentals that directly impact every hand: preflop ranges, position, pot odds, basic postflop concepts, bet sizing. Then 25% on next-level concepts. Solid fundamentals > scattered advanced knowledge. You can't build advanced concepts on shaky foundations. Master the core before expanding to edges.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "9.2-p3",
          type: "scenario",
          topic: "9.2.4 Application Strategies",
          scenario: "You watched a video about 3-bet ranges. You tried to implement it immediately and lost 3 buy-ins in one session while experimenting with wider 3-bets.",
          question: "What should you conclude?",
          options: [
            "The video's advice was wrong—go back to old strategy",
            "Learning curves include short-term variance and mistakes; persist with deliberate practice",
            "Never change your strategy based on videos",
            "You're not talented enough for advanced concepts"
          ],
          correctAnswer: 1,
          explanation: "Implementation has a learning curve. When adding new concepts, you'll make mistakes and face variance. 3 buy-ins in one session is noise, not signal. Persist: was your 3-betting conceptually correct? Did you understand why? Refine execution through practice and review. Don't abandon correct strategy due to short-term results. Improvement requires patience through the awkward learning phase.",
          difficulty: "hard",
          points: 2
        },
        {
          id: "9.2-p4",
          type: "scenario",
          topic: "9.2.5 Recommended Resources",
          scenario: "You're deciding between: Subscription Site A ($99/month, hundreds of videos) vs. Subscription Site B ($30/month, smaller library but videos directly address your leaks).",
          question: "Which is the better investment?",
          options: [
            "Site A—more content means better value",
            "Site B—targeted content addressing your specific needs is more valuable",
            "Both are equally good",
            "Neither—only use free content"
          ],
          correctAnswer: 1,
          explanation: "Relevance > volume. Site B's targeted content addressing your actual leaks will drive more improvement than Site A's vast library where 90% doesn't apply to you. You don't have time for hundreds of videos—you need the RIGHT videos. 10 videos solving your problems > 1000 videos covering everything. Evaluate content by how well it addresses YOUR needs, not by sheer quantity.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "9.2-p5",
          type: "scenario",
          topic: "9.2.3 Active Study Methods",
          scenario: "You're watching a 45-minute strategy video. Halfway through, you realize your mind is wandering and you can't recall what was covered in the last 10 minutes.",
          question: "What should you do?",
          options: [
            "Push through to finish the video",
            "Pause, take a break, rewind to where you lost focus, then continue actively",
            "Quit and never watch videos again",
            "Keep watching but faster (1.5x speed) to finish sooner"
          ],
          correctAnswer: 1,
          explanation: "Recognize mental fatigue and reset. Pushing through while unfocused wastes time—you're not learning. Pause, take a 5-10 minute break, rewind to your last point of engagement, and resume with active focus. Better to study 30 focused minutes than 45 distracted minutes. Quality of attention determines learning. Don't power through diminishing returns.",
          difficulty: "easy",
          points: 2
        },
        {
          id: "9.2-p6",
          type: "scenario",
          topic: "9.2.1 Content Types",
          scenario: "You want to learn about river play. You find: A) Live-stream VOD where streamer plays and talks casually. B) Structured video series specifically on river decision-making theory.",
          question: "Which is better for systematic learning about river play?",
          options: [
            "Option A—authentic real-game decision-making",
            "Option B—structured, focused teaching on specific topic",
            "Both equally valuable",
            "Neither—river play can't be learned from videos"
          ],
          correctAnswer: 1,
          explanation: "Structured content > streams for systematic learning. Option B focuses entirely on river theory, providing frameworks and principles. Streams are scattered—occasionally good river spots, but mixed with everything else. For learning specific concepts, choose targeted content. Streams are great for entertainment or seeing how good players think in real-time, but structured content teaches more efficiently.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "9.2-p7",
          type: "scenario",
          topic: "9.2.6 Study Scheduling",
          scenario: "You're creating a sustainable long-term video study routine. Which schedule is most likely to be maintained for 6+ months?",
          question: "What is the most sustainable approach?",
          options: [
            "10 hours of video study every weekend",
            "3-4 focused one-hour sessions per week with application time",
            "Daily 30-minute video consumption",
            "Binge 20 hours of content once per month"
          ],
          correctAnswer: 1,
          explanation: "Consistency + recovery = sustainability. 3-4 weekly sessions (1 hour each) with application time is sustainable long-term: not overwhelming, allows integration into schedule, includes application/practice. Weekend binges or monthly marathons lead to burnout and poor retention. Daily 30-min is OK but may feel like grinding. Build habits you can maintain, not heroic efforts you abandon in 2 months.",
          difficulty: "hard",
          points: 2
        }
      ]
    },
    {
      id: "speed",
      title: "Section D: Speed Round",
      description: "Quick video study principles",
      weight: 10,
      timed: true,
      timePerQuestion: 15,
      questions: [
        {
          id: "9.2-s1",
          type: "quick-calc",
          topic: "9.2.3 Active Study Methods",
          question: "Active or passive video watching is better?",
          correctAnswer: "Active",
          acceptableAnswers: ["Active", "active"],
          explanation: "Active watching (pausing, predicting, thinking critically) creates learning.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "9.2-s2",
          type: "quick-calc",
          topic: "9.2.6 Study Scheduling",
          question: "Optimal focused study session length (minutes)?",
          correctAnswer: "45-90",
          acceptableAnswers: ["45-90", "60", "45", "90", "60-90", "1 hour"],
          explanation: "45-90 minutes is optimal for focused study before attention declines.",
          difficulty: "medium",
          points: 1
        },
        {
          id: "9.2-s3",
          type: "quick-calc",
          topic: "9.2.2 Content Selection",
          question: "Select content at your level or highest available? (Your level/Highest)",
          correctAnswer: "Your level",
          acceptableAnswers: ["Your level", "your level", "My level", "Appropriate level"],
          explanation: "Content must match your skill level for effective learning.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "9.2-s4",
          type: "quick-calc",
          topic: "9.2.4 Application Strategies",
          question: "How many concepts to implement per video?",
          correctAnswer: "1-2",
          acceptableAnswers: ["1-2", "1", "2", "one", "two", "1 or 2"],
          explanation: "Focus on 1-2 concepts per video to avoid overload and ensure mastery.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "9.2-s5",
          type: "quick-calc",
          topic: "9.2.5 Recommended Resources",
          question: "Most important factor in training site? (Price/Instructor quality)",
          correctAnswer: "Instructor quality",
          acceptableAnswers: ["Instructor quality", "Instructor", "Quality", "Credibility"],
          explanation: "Instructor credibility and content relevance matter more than price or production.",
          difficulty: "easy",
          points: 1
        }
      ]
    }
  ]
};

export default videoStudyQuiz;
