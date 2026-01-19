import type { QuizData } from '@/types/quiz';

export const cashGameQuiz: QuizData = {
  moduleInfo: {
    id: "10.1",
    title: "Cash Game Strategy",
    category: "Format Strategy",
    phase: 1,
    level: "Fundamental",
    passingScore: 80,
    estimatedTime: "25-35 minutes",
    timedModeMinutes: 25,
    speedModeMinutes: 12,
    learningOutcomes: [
      "Understand cash game specific dynamics",
      "Implement proper stack management",
      "Apply cash game mindset principles",
      "Execute optimal session management",
      "Differentiate cash from tournament play"
    ],
    nextModule: null
  },
  sections: [
    {
      id: "conceptual",
      title: "Section A: Conceptual Understanding",
      description: "Test your understanding of cash game fundamentals",
      weight: 20,
      questions: [
        {
          id: "10.1-c1",
          type: "multiple-choice",
          topic: "10.1.1 Cash Game Fundamentals",
          question: "What is the fundamental difference between chip value in cash games vs. tournaments?",
          options: [
            "Cash game chips are worth more",
            "In cash games, chips = direct money value; in tournaments, chip value changes (ICM)",
            "There is no difference in chip value",
            "Tournament chips are fake, cash chips are real"
          ],
          correctAnswer: 1,
          explanation: "In cash games, your chips have direct 1:1 monetary value—$100 in chips = $100 you can cash out anytime. In tournaments, chip value is determined by ICM (Independent Chip Model)—doubling your chips doesn't double your equity due to payout structure and survival value. This fundamental difference changes optimal strategy across all streets.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "10.1-c2",
          type: "true-false",
          topic: "10.1.2 Cash vs Tournament Differences",
          question: "In cash games, survival is not a factor—you can always rebuy if you go broke.",
          correctAnswer: true,
          explanation: "TRUE. Cash games have no elimination penalty—bust and you can rebuy immediately. This changes risk calculations dramatically. In tournaments, being eliminated ends your opportunity. In cash, it just means buying more chips. This allows more aggressive plays in cash games (thin value bets, bluffs) since going broke isn't catastrophic. Rebuy ability = less survival pressure.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "10.1-c3",
          type: "multiple-choice",
          topic: "10.1.4 Cash Game Mindset",
          question: "What is the correct way to think about cash game results?",
          options: [
            "Focus on winning each session",
            "Think in BB/100 hands and long-term win rate",
            "Try to double your buy-in every session",
            "Aim to never have a losing session"
          ],
          correctAnswer: 1,
          explanation: "Cash game success is measured in BB/100 over large samples (10k+ hands). Individual sessions mean nothing—variance dominates short-term. A -3 BB session today doesn't indicate anything about your skill. Think long-term: 'Am I winning at X BB/100 over 50,000 hands?' Session results are noise; BB/100 over time is signal. This mindset prevents tilt and maintains perspective.",
          difficulty: "medium",
          points: 1
        },
        {
          id: "10.1-c4",
          type: "multiple-choice",
          topic: "10.1.3 Stack Management",
          question: "Why should you buy in for the full 100 BB in cash games?",
          options: [
            "To intimidate opponents",
            "Deep stacks maximize your edge and flexibility postflop",
            "It's required by poker rules",
            "Short stacking is always better"
          ],
          correctAnswer: 1,
          explanation: "Full stacks (100+ BB) maximize skill edge. Deep play allows more postflop streets, creative lines, implied odds situations, and leverages superior hand reading. Short stacking (20-40 BB) simplifies the game to push/fold. If you're better than opponents, you WANT depth and complexity. Full buy-ins give you maximum maneuverability and profit potential.",
          difficulty: "medium",
          points: 1
        },
        {
          id: "10.1-c5",
          type: "true-false",
          topic: "10.1.5 Session Strategy",
          question: "In cash games, you should have a predetermined time limit for each session and quit when it expires, regardless of table conditions or your performance.",
          correctAnswer: false,
          explanation: "FALSE. Cash game session length should be flexible based on: game quality, your mental state, and your performance. Great game + playing well? Stay longer. Bad game or tilting? Leave early. Arbitrary time limits ignore crucial factors. The right time to quit is when game quality deteriorates, you're playing poorly, or you're mentally tired—not because a clock says so.",
          difficulty: "hard",
          points: 1
        },
        {
          id: "10.1-c6",
          type: "multiple-choice",
          topic: "10.1.2 Cash vs Tournament Differences",
          question: "How should aggression levels differ between cash games and tournaments?",
          options: [
            "Tournaments require more aggression due to blinds increasing",
            "Cash games allow more aggression since you can rebuy and chips = direct $",
            "Aggression should be identical in both formats",
            "Cash games should be more passive to avoid variance"
          ],
          correctAnswer: 1,
          explanation: "Cash games support more aggression. You can rebuy (no survival pressure), stacks stay deep (room for multi-street aggression), and chips = money (risk/reward is direct). Tournaments have elimination risk and ICM pressure. In cash, you can make thinner value bets, more bluffs, and aggressive plays because going broke just means rebuying. Use your rebuy ability to apply pressure.",
          difficulty: "medium",
          points: 1
        }
      ]
    },
    {
      id: "application",
      title: "Section B: Application Skills",
      description: "Apply cash game concepts to realistic situations",
      weight: 35,
      questions: [
        {
          id: "10.1-a1",
          type: "scenario",
          topic: "10.1.3 Stack Management",
          scenario: "You're playing $1/$2 and started with $200. You're now up to $450 after 2 hours of good play and running well.",
          question: "What should you do with your stack?",
          options: [
            "Cash out $250 profit and keep playing with $200",
            "Leave the full $450 on the table if game is good and you're playing well",
            "Always pocket profits and rebuy for minimum",
            "Leave with your profit immediately"
          ],
          correctAnswer: 1,
          explanation: "Keep money in play in good games. If the game is profitable and you're playing well, your $450 has the same value as your initial $200—it's not 'house money,' it's YOUR money with the same earning potential. Arbitrary profit-taking ('lock up wins') is results-oriented thinking. Only leave if: game deteriorates, you're playing poorly, or you're mentally tired. Stack size shouldn't change based on wins/losses.",
          difficulty: "hard",
          points: 2
        },
        {
          id: "10.1-a2",
          type: "scenario",
          topic: "10.1.4 Cash Game Mindset",
          scenario: "You've had 5 consecutive losing sessions over 2 weeks, down 8 buy-ins total. You're tracking stats and are still winning at 5 BB/100 over your last 10,000 hands.",
          question: "How should you interpret this situation?",
          options: [
            "You're playing poorly—make major strategy changes",
            "Normal variance—5 losing sessions and 8 BI downswing are within normal ranges",
            "Quit poker—clearly not working",
            "You're tilting without knowing it"
          ],
          correctAnswer: 1,
          explanation: "This is textbook variance, not a skill problem. Maintaining 5 BB/100 over 10k hands while experiencing a downswing shows you're playing well but running below expectation. Losing sessions happen in clusters—5 in a row is well within normal distribution. Don't change winning strategy based on short-term results. Stay process-focused, not results-focused. Trust your BB/100, not session count.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "10.1-a3",
          type: "scenario",
          topic: "10.1.2 Cash vs Tournament Differences",
          scenario: "You have KK preflop in a cash game vs. the same situation in a tournament near the money bubble. In both, villain moves all-in.",
          question: "How does your calling range differ between formats?",
          options: [
            "Identical—KK is KK regardless of format",
            "Cash game: call more liberally (can rebuy). Tournament: consider ICM and bubble pressure",
            "Tournament: always call. Cash: be more careful",
            "Fold in both spots to avoid variance"
          ],
          correctAnswer: 1,
          explanation: "Format changes decisions. Cash game: KK is a snap-call vs most ranges (can rebuy if you lose). Tournament bubble: ICM matters—your tournament life has extra value, doubling up doesn't double your equity. You might fold KK in extreme ICM spots. Cash games = chip EV. Tournaments = prize pool equity (ICM). Same hand, different optimal strategy based on format.",
          difficulty: "hard",
          points: 2
        },
        {
          id: "10.1-a4",
          type: "scenario",
          topic: "10.1.6 Positional Play in Cash",
          scenario: "You're in a deep-stacked $2/$5 cash game (200 BB effective). You have position on a weak player who's shown they call too much postflop.",
          question: "How should deep stacks + position influence your strategy?",
          options: [
            "No difference—play the same as 100 BB stacks",
            "Widen range, play more speculative hands with implied odds potential",
            "Tighten up—deep stacks are scary",
            "Short stack the table to avoid deep stack play"
          ],
          correctAnswer: 1,
          explanation: "Deep stacks + position + weak opponent = expand range. Play more suited connectors, small pairs, suited aces—hands with implied odds potential. When you hit, deep stacks + position let you extract maximum value from calling stations. 200 BB gives you room for multi-street maneuvering. This is where position's value amplifies in cash games. Exploit depth + position vs weak opponents.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "10.1-a5",
          type: "scenario",
          topic: "10.1.5 Session Strategy",
          scenario: "You've been playing for 6 hours at a great table. You're up 10 buy-ins. You're starting to make small mistakes due to fatigue but the table is still soft.",
          question: "What should you do?",
          options: [
            "Stay—the table is too good to leave",
            "Leave—fatigue-induced mistakes will cost you",
            "Take a 15-minute break then continue",
            "Push through—you're winning so it's fine"
          ],
          correctAnswer: 1,
          explanation: "Leave when your A-game deteriorates. A soft game doesn't matter if you're making mistakes—you can still be -EV if playing poorly enough. Fatigue compounds: small mistakes become big mistakes. You've already won 10 BI—protect it. Rest, return tomorrow with fresh focus. Playing tired in great games is how you give back wins. Your edge = game quality × your play quality. If your play quality drops, leave.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "10.1-a6",
          type: "scenario",
          topic: "10.1.3 Stack Management",
          scenario: "You're playing $1/$3 with $300. You lose a big pot and are down to $120 (40 BB). Game is good and you're playing well.",
          question: "What should you do?",
          options: [
            "Leave—never play with less than 100 BB",
            "Top up to $300 immediately to maintain deep stack",
            "Play short stack until you win some back",
            "Leave and come back tomorrow"
          ],
          correctAnswer: 1,
          explanation: "Top up to maintain optimal stack depth. Playing 40 BB in a cash game sacrifices your postflop edge and limits your options. If the game is good and you're playing well, reload to full buy-in. Your stack size should be based on optimal strategy, not results. Being down $180 doesn't make the next $180 different—avoid short-stack mentality. Maintain your edge with full stacks.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "10.1-a7",
          type: "scenario",
          topic: "10.1.4 Cash Game Mindset",
          scenario: "You track your results: Monday-Thursday 8 BB/100 (30k hands). Friday-Saturday -2 BB/100 (15k hands). Overall 5 BB/100 across 45k hands.",
          question: "What's the best interpretation and action?",
          options: [
            "Only play Monday-Thursday—avoid weekends",
            "Analyze: Are weekend games actually worse, or am I playing worse? (fatigue, alcohol, tilt)",
            "It's just variance—ignore it",
            "Weekend players are better—give up weekend play"
          ],
          correctAnswer: 1,
          explanation: "Investigate patterns, don't jump to conclusions. Weekend games are typically SOFTER (recreational players), yet you're losing. Likely causes: YOU are the problem (tired from work week, drinking, distracted), not the games. Analyze honestly: mental state, focus level, tilt triggers. Maybe you're playing poorly on weekends despite softer games. Fix your preparation, or if you can't, avoid weekends. Data should prompt investigation, not automatic conclusions.",
          difficulty: "hard",
          points: 2
        }
      ]
    },
    {
      id: "practical",
      title: "Section C: Practical Scenarios",
      description: "Make optimal cash game decisions in realistic situations",
      weight: 35,
      questions: [
        {
          id: "10.1-p1",
          type: "scenario",
          topic: "10.1.1 Cash Game Fundamentals",
          scenario: "You're a tournament player considering adding cash games to your schedule. You have $10,000 bankroll.",
          question: "How should you approach adding cash games?",
          options: [
            "Play $5/$10 immediately—you're a good player",
            "Start at $0.50/$1 or $1/$2 with proper 30 BI, treat it as learning new format",
            "Use your entire bankroll for one $5/$10 session",
            "Cash games are too different—stick to tournaments"
          ],
          correctAnswer: 1,
          explanation: "Cash games require format-specific skills: stack management, no ICM pressure, continuous deep play, different ranges. Start at stakes you can properly bankroll (30 BI) while learning. $1/$2 = $60 BI × 30 = $1,800 from your $10k. Learn the format, build cash game skills, then move up. Being a good tournament player doesn't make you a good cash player. Respect the learning curve.",
          difficulty: "easy",
          points: 2
        },
        {
          id: "10.1-p2",
          type: "scenario",
          topic: "10.1.5 Session Strategy",
          scenario: "Live $2/$5 session: You're down $800 after 3 hours. The table is very soft but you're feeling frustrated and not playing your best.",
          question: "What should you do?",
          options: [
            "Stay until you win back your losses",
            "Leave now—mental state matters more than game quality",
            "Take a quick break then chase your losses",
            "Move up to $5/$10 to win it back faster"
          ],
          correctAnswer: 1,
          explanation: "Mental state > game quality. Frustration leads to tilt, tilt leads to mistakes, mistakes cost money. You're already down and not playing well—staying risks bigger losses. A soft game tomorrow is worth more than a soft game today if you're tilting. Leave, reset, return fresh. Chasing losses when mentally compromised is the fastest way to turn a bad session into a disaster session.",
          difficulty: "easy",
          points: 2
        },
        {
          id: "10.1-p3",
          type: "scenario",
          topic: "10.1.6 Positional Play in Cash",
          scenario: "Online 6-max $0.50/$1: You're on the button with 150 BB effective. Tight player opens UTG, you have 8♠7♠.",
          question: "How should stack depth influence your decision?",
          options: [
            "Fold—too weak to play",
            "Call—deep stacks give implied odds if you hit, plus positional advantage",
            "3-bet as a bluff",
            "Stack depth doesn't matter—always fold 87s to UTG"
          ],
          correctAnswer: 1,
          explanation: "Deep stacks + position make speculative hands playable. 150 BB gives huge implied odds—if you flop a straight or flush, you can stack them. You have position for all postflop streets. UTG is tight (you know their range), so you can play fit-or-fold profitably. At 50 BB this is a fold; at 150 BB in position, it's a call. Deep cash game play leverages these marginal spots.",
          difficulty: "hard",
          points: 2
        },
        {
          id: "10.1-p4",
          type: "scenario",
          topic: "10.1.3 Stack Management",
          scenario: "$1/$2 live game: Fish at the table has $800 (400 BB). You have $200 (100 BB). Fish is punting off money to everyone.",
          question: "What should you do about your stack?",
          options: [
            "Keep $200—that's your buy-in",
            "Top up to $500-800 to cover the fish and maximize profit potential",
            "Short stack to $100 to reduce variance",
            "Leave—you're outgunned"
          ],
          correctAnswer: 1,
          explanation: "Match big stacks when you have edge. The fish has $800 and is spewing—you want to cover them to win maximum when they punt to you. Top up to $500-800 (within BRM). You can't win their full stack if you only have $200. This is a prime profit opportunity. When fish are deep and bad, get deep too. Stack matching + skill edge = maximum profit extraction.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "10.1-p5",
          type: "scenario",
          topic: "10.1.4 Cash Game Mindset",
          scenario: "You're reviewing your cash game database. Over 80,000 hands: win rate 6 BB/100, standard deviation 85 BB/100.",
          question: "What does this tell you about expected results?",
          options: [
            "You should win every session",
            "You're a solid winner but will experience significant variance/downswings",
            "Your standard deviation is too high—play fewer hands",
            "6 BB/100 is unbeatable long-term"
          ],
          correctAnswer: 1,
          explanation: "6 BB/100 is a solid win rate. SD 85 BB/100 is normal but means high variance: expect 10-20 BI downswings. This combination means: you're profitable long-term, but will have brutal downswings. Understanding your variance helps set realistic expectations, maintain BRM (30+ BI for this variance), and avoid tilt during normal downswings. Variance doesn't mean you're playing poorly.",
          difficulty: "hard",
          points: 2
        },
        {
          id: "10.1-p6",
          type: "scenario",
          topic: "10.1.2 Cash vs Tournament Differences",
          scenario: "You make a thin value bet on the river with second pair in a cash game and get called by worse. Your friend says 'That's too risky—you could have been beaten.'",
          question: "What's the correct response?",
          options: [
            "They're right—avoid thin value bets",
            "Thin value bets are correct in cash games when villain calls with worse often enough",
            "Only bet when you have the nuts",
            "Checking is always safer"
          ],
          correctAnswer: 1,
          explanation: "Thin value betting is crucial in cash games. You can rebuy, chips = direct money, and extracting value is how you maximize win rate. If villain calls worse >50% of the time, bet. You don't need certainty—you need +EV. Being 'beaten' sometimes doesn't matter if you're value betting profitably over time. This is cash game thinking: maximize EV, not avoid risk.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "10.1-p7",
          type: "scenario",
          topic: "10.1.5 Session Strategy",
          scenario: "You're winning $1,500 after 2 hours at $2/$5. A new player sits down and buys in for $2,000. You don't know anything about them yet.",
          question: "Should you leave with your profit or stay?",
          options: [
            "Leave—lock in your win",
            "Stay—game quality hasn't changed, and you're playing well",
            "Leave—unknown players are dangerous",
            "Stay only if you promise yourself to quit if you lose $500"
          ],
          correctAnswer: 1,
          explanation: "Don't make decisions based on arbitrary profit targets. Game is still good, you're playing well—why leave? A new unknown player doesn't change that. Observe them, adjust as you get information. 'Locking in wins' is results-oriented thinking. Your $1,500 has the same earning potential as your original buy-in. Quit when: game deteriorates, you play poorly, or you're mentally done. Not because you're up.",
          difficulty: "hard",
          points: 2
        }
      ]
    },
    {
      id: "speed",
      title: "Section D: Speed Round",
      description: "Quick cash game fundamentals",
      weight: 10,
      timed: true,
      timePerQuestion: 15,
      questions: [
        {
          id: "10.1-s1",
          type: "quick-calc",
          topic: "10.1.1 Cash Game Fundamentals",
          question: "In cash games, can you rebuy after losing? (Yes/No)",
          correctAnswer: "Yes",
          acceptableAnswers: ["Yes", "yes", "Y"],
          explanation: "Yes—unlimited rebuys are a fundamental feature of cash games.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "10.1-s2",
          type: "quick-calc",
          topic: "10.1.4 Cash Game Mindset",
          question: "Cash game results measured in? (BB/100/Session wins)",
          correctAnswer: "BB/100",
          acceptableAnswers: ["BB/100", "BB per 100", "bb/100", "Big blinds per 100"],
          explanation: "BB/100 hands is the standard metric for cash game win rates.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "10.1-s3",
          type: "quick-calc",
          topic: "10.1.3 Stack Management",
          question: "Standard cash game buy-in depth? (# of BB)",
          correctAnswer: "100",
          acceptableAnswers: ["100", "100BB", "100 BB"],
          explanation: "100 BB is the standard full buy-in for cash games.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "10.1-s4",
          type: "quick-calc",
          topic: "10.1.2 Cash vs Tournament Differences",
          question: "Does ICM apply to cash games? (Yes/No)",
          correctAnswer: "No",
          acceptableAnswers: ["No", "no", "N"],
          explanation: "No—ICM doesn't apply in cash games because chips = direct money value.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "10.1-s5",
          type: "quick-calc",
          topic: "10.1.5 Session Strategy",
          question: "Should you quit when you hit a time limit or when factors change? (Time/Factors)",
          correctAnswer: "Factors",
          acceptableAnswers: ["Factors", "factors", "When factors change", "factors change"],
          explanation: "Quit based on game quality, mental state, and performance—not arbitrary time limits.",
          difficulty: "medium",
          points: 1
        }
      ]
    }
  ]
};

export default cashGameQuiz;
