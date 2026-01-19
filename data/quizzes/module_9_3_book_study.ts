import type { QuizData } from '@/types/quiz';

export const bookStudyQuiz: QuizData = {
  moduleInfo: {
    id: "9.3",
    title: "Book & Article Study",
    category: "Study Methods",
    phase: 1,
    level: "Fundamental",
    passingScore: 80,
    estimatedTime: "25-35 minutes",
    timedModeMinutes: 25,
    speedModeMinutes: 12,
    learningOutcomes: [
      "Build a comprehensive poker reading list",
      "Read poker books effectively",
      "Extract and apply concepts from literature",
      "Evaluate poker book quality",
      "Maintain a reading habit"
    ],
    nextModule: {
      id: "10.1",
      title: "Cash Game Strategy"
    }
  },
  sections: [
    {
      id: "conceptual",
      title: "Section A: Conceptual Understanding",
      description: "Test your understanding of effective reading strategies",
      weight: 20,
      questions: [
        {
          id: "9.3-c1",
          type: "multiple-choice",
          topic: "9.3.2 Active Reading Methods",
          question: "What is the key difference between active reading and passive reading of poker books?",
          options: [
            "Active reading means reading faster",
            "Active reading involves highlighting, note-taking, and pausing to think critically about concepts",
            "Active reading requires expensive books, passive uses free content",
            "There's no meaningful difference"
          ],
          correctAnswer: 1,
          explanation: "Active reading is engaged reading: highlight key points, take notes in margins, pause to consider how concepts apply to your game, question assumptions, and summarize chapters. Passive reading is like watching TV—words pass through without deep processing. Active reading creates retention and application; passive reading creates the illusion of learning without real improvement.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "9.3-c2",
          type: "true-false",
          topic: "9.3.1 Essential Reading List",
          question: "You should read every poker book available to get well-rounded knowledge.",
          correctAnswer: false,
          explanation: "FALSE. Curated reading > comprehensive reading. Hundreds of poker books exist—many are outdated, wrong, or redundant. Better to read 10 excellent books deeply than 50 mediocre books superficially. Focus on classics, books addressing your format/stakes, and books targeting your specific leaks. Quality over quantity. Deliberate selection over completionism.",
          difficulty: "medium",
          points: 1
        },
        {
          id: "9.3-c3",
          type: "multiple-choice",
          topic: "9.3.5 Evaluating Content",
          question: "A poker book was published in 2010. What should you consider when deciding whether to read it?",
          options: [
            "Automatically skip it—it's too old",
            "Evaluate if core concepts are timeless vs. game-dependent tactics",
            "Read it only if you can't find newer books",
            "Old books are always better than new ones"
          ],
          correctAnswer: 1,
          explanation: "Age matters differently for different content. Timeless concepts (pot odds, position, psychology, bankroll management) remain valuable regardless of publication date. Game-specific tactics (optimal preflop ranges, ICM charts) may be outdated as the game evolves. Classic books like 'The Theory of Poker' (1987) are still essential; old books on specific cash game strategies may be obsolete. Evaluate content type, not just date.",
          difficulty: "hard",
          points: 1
        },
        {
          id: "9.3-c4",
          type: "true-false",
          topic: "9.3.3 Application Strategies",
          question: "You should finish reading an entire poker book before trying to apply any concepts from it.",
          correctAnswer: false,
          explanation: "FALSE. Apply concepts as you learn them. Read a chapter on c-betting? Implement those ideas in your next session. This creates immediate feedback loops and embeds learning. Reading the whole book first creates information overload and delays application. Progressive implementation: read → apply → review → continue reading. Connect theory to practice continuously, not after finishing the book.",
          difficulty: "medium",
          points: 1
        },
        {
          id: "9.3-c5",
          type: "multiple-choice",
          topic: "9.3.3 Application Strategies",
          question: "What is the primary value of re-reading poker books you've already studied?",
          options: [
            "No value—you already learned the content",
            "You understand concepts deeper at different skill levels and notice things you missed",
            "Just a waste of time—only read new books",
            "Only re-read if you forgot everything"
          ],
          correctAnswer: 1,
          explanation: "Re-reading at higher skill levels reveals new depth. As a beginner, you grasp surface concepts. As an intermediate player, you understand nuances and applications. Advanced players see the strategic frameworks. The same book teaches different lessons based on your level. Re-reading classics annually is common among top players. Your understanding evolves; the book reveals more each time.",
          difficulty: "medium",
          points: 1
        },
        {
          id: "9.3-c6",
          type: "multiple-choice",
          topic: "9.3.4 Article Sources",
          question: "When reading poker strategy articles online, what is the most important evaluation criterion?",
          options: [
            "The website design and layout quality",
            "Author credibility and verifiable poker credentials",
            "How recently it was published",
            "Number of comments and likes"
          ],
          correctAnswer: 1,
          explanation: "Author credibility is paramount. Anyone can publish poker articles online—are they a proven winner? Do they have verifiable results? Are they known in the poker community? Beautiful websites and high engagement don't indicate quality strategy. Recency matters for some topics, but credibility matters for all. Verify the author is qualified before trusting their strategy advice.",
          difficulty: "easy",
          points: 1
        }
      ]
    },
    {
      id: "application",
      title: "Section B: Application Skills",
      description: "Apply effective reading strategies to poker literature",
      weight: 35,
      questions: [
        {
          id: "9.3-a1",
          type: "scenario",
          topic: "9.3.1 Essential Reading List",
          scenario: "You're a beginner cash game player building a reading list. You have time for 3 books. Which combination provides the best foundation?",
          question: "Choose the optimal 3-book combination:",
          options: [
            "3 advanced tournament strategy books",
            "1 fundamental strategy book, 1 mental game book, 1 format-specific (cash games) book",
            "3 books all on the same topic for deep knowledge",
            "The 3 newest poker books available"
          ],
          correctAnswer: 1,
          explanation: "Balanced foundation beats narrow depth or random selection. Fundamental strategy (core concepts for all poker), mental game (universal tilt/bankroll/psychology), and format-specific (cash game tactics). This covers technical, mental, and format-specific needs. Three tournament books waste time if you play cash. Three books on c-betting ignore other crucial areas. Build breadth first, depth later.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "9.3-a2",
          type: "scenario",
          topic: "9.3.2 Active Reading Methods",
          scenario: "You're reading a chapter about hand ranges. You highlight important passages. What else should you do to maximize learning?",
          question: "Which additional active reading technique is most valuable?",
          options: [
            "Read it again immediately",
            "Summarize key points in your own words and create application examples",
            "Skip to the next chapter quickly",
            "Just highlighting is sufficient"
          ],
          correctAnswer: 1,
          explanation: "Summarizing in your own words forces deep processing and reveals whether you truly understand. Creating application examples ('How does this apply to my $1/$2 game?') connects theory to practice. Highlighting alone is passive—you're just marking, not processing. Active reading: read → highlight → summarize → create examples → apply. Each step deepens understanding.",
          difficulty: "easy",
          points: 2
        },
        {
          id: "9.3-a3",
          type: "scenario",
          topic: "9.3.3 Application Strategies",
          scenario: "You read a book chapter recommending tighter preflop ranges. You immediately implement this in your next session and lose 2 buy-ins.",
          question: "What should you conclude?",
          options: [
            "The book is wrong—go back to old ranges",
            "Evaluate: Did you implement correctly? Is 1 session enough sample? Was it variance?",
            "Books are useless—only trust experience",
            "Immediately try the opposite strategy"
          ],
          correctAnswer: 1,
          explanation: "One session proves nothing. Ask: Did I implement the strategy correctly? Did I understand the context and conditions? Two buy-ins is variance, not a trend. Give new strategies proper sample sizes and review your application. Maybe you over-tightened. Maybe you ran bad. Maybe it's right but requires adjustments. Analyze implementation quality and give it time before abandoning sound advice.",
          difficulty: "hard",
          points: 2
        },
        {
          id: "9.3-a4",
          type: "scenario",
          topic: "9.3.5 Evaluating Content",
          scenario: "You're considering a poker book. The author claims 'secret strategies the pros don't want you to know' and promises you'll double your win rate in a week.",
          question: "What do these claims suggest about the book's quality?",
          options: [
            "It's probably excellent—aggressive marketing means confidence",
            "Major red flags—likely scam or low-quality content",
            "This is standard poker book marketing",
            "You should buy it immediately"
          ],
          correctAnswer: 1,
          explanation: "Huge red flags. 'Secret strategies' don't exist—good poker is well-understood principles. 'Pros don't want you to know' is conspiracy nonsense. 'Double your win rate in a week' is impossible and dishonest. Quality books have credible authors, realistic promises, and focus on fundamentals. Avoid sensationalist marketing—it indicates content aimed at suckers, not serious players.",
          difficulty: "easy",
          points: 2
        },
        {
          id: "9.3-a5",
          type: "scenario",
          topic: "9.3.6 Building Reading Habits",
          scenario: "You want to build a sustainable reading habit. Which approach is most likely to succeed long-term?",
          question: "Choose the most sustainable reading schedule:",
          options: [
            "Read 3 books in a weekend once per month",
            "Read 20-30 minutes daily before bed",
            "Read whenever you feel motivated",
            "Read 8 hours straight on your day off"
          ],
          correctAnswer: 1,
          explanation: "Daily consistency beats binge reading. 20-30 minutes daily (1) builds a habit loop, (2) allows time to process and apply, (3) is sustainable indefinitely, (4) accumulates—210 minutes/week vs. sporadic binges. Marathon sessions create fatigue and poor retention. 'When motivated' is unreliable. Habits > motivation. Small, consistent daily practice wins long-term.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "9.3-a6",
          type: "scenario",
          topic: "9.3.4 Article Sources",
          scenario: "You find two articles on the same topic: Article A on a free blog by an anonymous author. Article B on a training site by a high-stakes pro with verified results.",
          question: "Which article should you prioritize reading?",
          options: [
            "Article A—free content is always best",
            "Article B—author credibility indicates quality",
            "Both are equally valuable",
            "Neither—only read books, not articles"
          ],
          correctAnswer: 1,
          explanation: "Credibility > cost. Article B from a proven winner is far more valuable than Article A from an anonymous author who might be a losing player. Free content can be excellent OR terrible—author credentials help you evaluate. Many top players publish free content, but you need to verify who they are. Always check author credibility before trusting strategy advice.",
          difficulty: "easy",
          points: 2
        },
        {
          id: "9.3-a7",
          type: "scenario",
          topic: "9.3.2 Active Reading Methods",
          scenario: "You're reading a poker book on your commute. By the time you arrive, you realize you read 10 pages but can't remember any content.",
          question: "What's the problem and solution?",
          options: [
            "You're not smart enough for poker books",
            "You were reading passively in a distracting environment; need focused reading time",
            "The book is boring—find a better one",
            "Commute reading is fine, keep doing it"
          ],
          correctAnswer: 1,
          explanation: "Environment + engagement matter. Passive reading while distracted (commute, TV on, interruptions) creates minimal learning. You need: focused time, quiet environment, active engagement (note-taking, highlighting). Some people can focus on commutes; most can't. Be honest about your attention quality. Better 15 focused minutes at home than 30 distracted minutes on the train. Quality attention > quantity of pages.",
          difficulty: "medium",
          points: 2
        }
      ]
    },
    {
      id: "practical",
      title: "Section C: Practical Scenarios",
      description: "Build effective reading habits and select quality content",
      weight: 35,
      questions: [
        {
          id: "9.3-p1",
          type: "scenario",
          topic: "9.3.1 Essential Reading List",
          scenario: "You're prioritizing your reading list based on your biggest leak: you tilt frequently and lose multiple buy-ins when running bad.",
          question: "Which book should be your next priority?",
          options: [
            "Advanced GTO strategy book",
            "Mental game/tilt control book (e.g., The Mental Game of Poker)",
            "Tournament strategy book",
            "Book on hand reading"
          ],
          correctAnswer: 1,
          explanation: "Address your biggest leak first. Tilt is your problem—mental game content is the solution. Technical strategy books won't help if you're punting off stacks while tilting. Read Jared Tendler's 'Mental Game of Poker' or similar content. Fix the mental game to unlock your technical skills. Prioritize books addressing YOUR specific needs, not general 'good books.' Targeted reading creates the most improvement.",
          difficulty: "easy",
          points: 2
        },
        {
          id: "9.3-p2",
          type: "scenario",
          topic: "9.3.3 Application Strategies",
          scenario: "You're reading 'The Theory of Poker' (classic strategy text). It's dense with concepts. How should you approach reading and applying it?",
          question: "What's the most effective strategy?",
          options: [
            "Speed-read the entire book in one sitting",
            "Read one chapter, pause to think/take notes, apply concepts, then continue",
            "Read it all without pausing, then apply everything at once",
            "Just read the summary at the end of each chapter"
          ],
          correctAnswer: 1,
          explanation: "Chunk learning for dense material. Read a chapter (or even subsection), pause to process, take notes, apply those specific concepts, then continue. Dense books require time to digest. Trying to absorb everything at once creates overload. Progressive implementation: learn → apply → master → continue. This is especially important for foundational texts with complex concepts.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "9.3-p3",
          type: "scenario",
          topic: "9.3.5 Evaluating Content",
          scenario: "You found a highly-rated poker book from 2008. The reviews are excellent and the author is a respected pro. It focuses on online 6-max cash games.",
          question: "Should you read this book in 2024+?",
          options: [
            "No—anything pre-2020 is obsolete",
            "Yes—if core concepts are timeless, but adjust specific tactics for modern games",
            "Only read it if you can't find anything newer",
            "No—online poker has changed too much"
          ],
          correctAnswer: 1,
          explanation: "Old books can be valuable if you filter content. Core concepts (position, aggression, hand reading principles) remain relevant. Specific tactics (optimal opening ranges, standard lines) have likely evolved. Read it for foundational understanding but cross-reference with modern content for current tactics. Many 2008 books still teach excellent fundamentals—just supplement with updated strategic content.",
          difficulty: "hard",
          points: 2
        },
        {
          id: "9.3-p4",
          type: "scenario",
          topic: "9.3.6 Building Reading Habits",
          scenario: "You bought 5 poker books but haven't finished any. You keep starting new books when the current one gets challenging.",
          question: "What's the problem and how do you fix it?",
          options: [
            "You're smart to skip boring parts—keep doing it",
            "Commit to finishing one book before starting another; push through difficult sections",
            "Buy more books to stay motivated",
            "Give up on reading—it's not working"
          ],
          correctAnswer: 1,
          explanation: "Book-hopping prevents deep learning. Challenging sections often contain the most valuable content—that's where you're pushed to grow. Commit: finish Book 1 before starting Book 2. When it gets hard, that's when to slow down and engage more, not skip. Discipline beats novelty-seeking. You can have multiple books going if purposeful (1 fundamental, 1 mental game), but abandoning books when they challenge you wastes time.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "9.3-p5",
          type: "scenario",
          topic: "9.3.4 Article Sources",
          scenario: "You subscribe to a poker strategy blog that publishes 5 articles weekly. You're overwhelmed trying to read everything.",
          question: "How should you approach article consumption?",
          options: [
            "Read every article to get full value",
            "Skim titles, read only articles directly relevant to your current focus/leaks",
            "Cancel the subscription—too much content",
            "Read one per day randomly"
          ],
          correctAnswer: 1,
          explanation: "Curate ruthlessly. Not every article applies to you. Skim titles, read what's relevant to your format, stakes, and current study focus. Reading everything creates information overload without retention. Better to read 1-2 highly relevant articles deeply than 5 articles superficially. Quality + relevance > quantity. Let go of FOMO—you can't read everything, and you don't need to.",
          difficulty: "hard",
          points: 2
        },
        {
          id: "9.3-p6",
          type: "scenario",
          topic: "9.3.2 Active Reading Methods",
          scenario: "You finished reading a poker book. You want to maximize retention and application of what you learned.",
          question: "What's the most effective post-reading process?",
          options: [
            "Immediately start another book",
            "Write a summary of key concepts and create an implementation plan for next sessions",
            "Put the book away and hope you remember it",
            "Re-read it immediately"
          ],
          correctAnswer: 1,
          explanation: "Post-reading summary + implementation plan = retention. Summarize: What were the 5-10 most important concepts? Create action items: 'I will focus on X in my next 10 sessions.' This transitions from passive consumption to active implementation. The book's value comes from application, not completion. Summarizing also reveals what you actually learned vs. what you just read.",
          difficulty: "easy",
          points: 2
        },
        {
          id: "9.3-p7",
          type: "scenario",
          topic: "9.3.1 Essential Reading List",
          scenario: "Your friend recommends a poker book that helped them tremendously. However, they play MTTs and you play cash games.",
          question: "Should you read this book?",
          options: [
            "Yes—good poker advice applies to all formats",
            "Evaluate if concepts are universal (mental game, fundamentals) or format-specific (ICM, bubble play)",
            "No—only read books for your exact format",
            "Yes—your friend's success proves it's valuable"
          ],
          correctAnswer: 1,
          explanation: "Filter for relevance. Mental game books, fundamental strategy, and bankroll management apply across formats—read those. MTT-specific content (ICM, bubble play, stack management) won't help your cash game. Some concepts overlap (aggression, position), others don't (chip value, survival). Ask: Is this universal or format-specific? Don't blindly follow recommendations—evaluate fit for YOUR game.",
          difficulty: "medium",
          points: 2
        }
      ]
    },
    {
      id: "speed",
      title: "Section D: Speed Round",
      description: "Quick reading strategy principles",
      weight: 10,
      timed: true,
      timePerQuestion: 15,
      questions: [
        {
          id: "9.3-s1",
          type: "quick-calc",
          topic: "9.3.2 Active Reading Methods",
          question: "Active or passive reading is more effective?",
          correctAnswer: "Active",
          acceptableAnswers: ["Active", "active"],
          explanation: "Active reading (highlighting, notes, thinking) creates retention and application.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "9.3-s2",
          type: "quick-calc",
          topic: "9.3.6 Building Reading Habits",
          question: "Better reading habit: Daily 20min or monthly 8hr binge?",
          correctAnswer: "Daily",
          acceptableAnswers: ["Daily", "daily", "20min", "Daily 20min", "consistent"],
          explanation: "Daily consistency (20-30 min) beats monthly binges for habit building and retention.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "9.3-s3",
          type: "quick-calc",
          topic: "9.3.3 Application Strategies",
          question: "Should you re-read good poker books? (Yes/No)",
          correctAnswer: "Yes",
          acceptableAnswers: ["Yes", "yes", "Y"],
          explanation: "Yes—re-reading at higher skill levels reveals new depth and understanding.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "9.3-s4",
          type: "quick-calc",
          topic: "9.3.5 Evaluating Content",
          question: "Most important book evaluation factor? (Date/Author credentials)",
          correctAnswer: "Author credentials",
          acceptableAnswers: ["Author credentials", "Credentials", "Author", "Credibility"],
          explanation: "Author credibility is more important than publication date for evaluating quality.",
          difficulty: "medium",
          points: 1
        },
        {
          id: "9.3-s5",
          type: "quick-calc",
          topic: "9.3.1 Essential Reading List",
          question: "Read every poker book or curated selection? (Every/Curated)",
          correctAnswer: "Curated",
          acceptableAnswers: ["Curated", "curated", "Selection", "selective"],
          explanation: "Curated selection of quality books beats trying to read everything.",
          difficulty: "easy",
          points: 1
        }
      ]
    }
  ]
};

export default bookStudyQuiz;
