import type { QuizData } from '@/types/quiz';

export const showdownAnalysisQuiz: QuizData = {
  moduleInfo: {
    id: "5.2",
    title: "Showdown Analysis",
    category: "Hand Reading & Board Analysis",
    phase: 2,
    level: "Intermediate",
    passingScore: 80,
    estimatedTime: "25-35 minutes",
    timedModeMinutes: 25,
    speedModeMinutes: 12,
    learningOutcomes: [
      "Extract maximum information from every showdown",
      "Build and update player profiles systematically",
      "Identify patterns in opponent play styles",
      "Use showdown data to inform future decisions",
      "Maintain organized notes on regular opponents"
    ],
    nextModule: {
      id: "6.1",
      title: "Tilt Control"
    }
  },
  sections: [
    {
      id: "conceptual",
      title: "Section A: Conceptual Understanding",
      description: "Test your understanding of showdown analysis principles",
      weight: 20,
      questions: [
        {
          id: "5.2-c1",
          type: "multiple-choice",
          topic: "5.2.1 Information Extraction",
          question: "What's the most valuable information from a showdown?",
          options: [
            "Whether you won or lost the hand",
            "What cards the opponent had",
            "The betting line the opponent took with that specific hand",
            "The pot size"
          ],
          correctAnswer: 2,
          explanation: "The BETTING LINE with that hand is most valuable. Knowing opponent called a 3-bet with 87s, or check-raised with middle pair, or folded top pair to a big bet - these patterns help you predict future actions. The specific cards matter less than how they played them. Focus on their decision-making process.",
          difficulty: "medium",
          points: 1
        },
        {
          id: "5.2-c2",
          type: "multiple-choice",
          topic: "5.2.2 Note-Taking Systems",
          question: "What's the most important principle for effective note-taking?",
          options: [
            "Write down every single hand",
            "Only note bad beats",
            "Focus on surprising or exploitable tendencies",
            "Only note winning hands"
          ],
          correctAnswer: 2,
          explanation: "Focus on SURPRISING or EXPLOITABLE tendencies. Note when players do something unexpected or revealing: calling 3-bets wide, folding too much, bluffing rivers frequently, etc. Don't note standard plays. Your notes should highlight how THIS player deviates from standard strategy so you can exploit them.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "5.2-c3",
          type: "multiple-choice",
          topic: "5.2.3 Player Profiling",
          question: "What are the two main dimensions for categorizing players?",
          options: [
            "Skill and bankroll",
            "Tight/Loose (VPIP) and Passive/Aggressive (PFR)",
            "Online vs Live",
            "Winners vs Losers"
          ],
          correctAnswer: 1,
          explanation: "Players are primarily categorized by: (1) TIGHT/LOOSE (VPIP - how many hands they play), and (2) PASSIVE/AGGRESSIVE (PFR/aggression - how often they bet/raise vs call). This creates categories: TAG (Tight-Aggressive), LAG (Loose-Aggressive), Calling Station (Loose-Passive), Nit (Tight-Passive), etc.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "5.2-c4",
          type: "true-false",
          topic: "5.2.5 Applying Showdown Data",
          question: "You should trust reads from a single showdown and adjust your entire strategy against that player.",
          correctAnswer: false,
          explanation: "False! One showdown is NOT enough data. People can show up with anything once. You need MULTIPLE showdowns showing a PATTERN before making significant adjustments. Sample size matters. Use initial showdowns as hypotheses to test, not as absolute truths. Stay flexible and update as you gather more data.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "5.2-c5",
          type: "multiple-choice",
          topic: "5.2.4 Pattern Recognition",
          question: "What's a common sizing tell?",
          options: [
            "Players never have sizing tells",
            "Small bets are always bluffs, large bets are always value",
            "Some players bet smaller with strong hands and larger with bluffs (or vice versa)",
            "All players bet the same with all hands"
          ],
          correctAnswer: 2,
          explanation: "Many recreational players have SIZING TELLS: some bet small when strong (afraid to scare you off) and large when bluffing (trying to scare you). Others do the opposite. Once you identify a player's sizing pattern through showdowns, you can exploit it. But the pattern varies by player - there's no universal rule.",
          difficulty: "medium",
          points: 1
        },
        {
          id: "5.2-c6",
          type: "true-false",
          topic: "5.2.6 Live vs Online Considerations",
          question: "HUDs (Heads-Up Displays) are legal and useful in online poker for tracking statistics.",
          correctAnswer: true,
          explanation: "True! HUDs are legal on most online poker sites and display statistics like VPIP, PFR, 3-bet%, aggression frequency, etc. They automate showdown analysis by tracking every hand. However, you still need to interpret the data correctly and note specific tendencies. HUDs are tools, not substitutes for thinking.",
          difficulty: "easy",
          points: 1
        }
      ]
    },
    {
      id: "application",
      title: "Section B: Information Extraction",
      description: "Demonstrate your ability to extract and apply showdown information",
      weight: 35,
      questions: [
        {
          id: "5.2-a1",
          type: "scenario",
          topic: "5.2.1 Information Extraction",
          scenario: "A player calls your UTG raise from the BB with 8♠7♠. The flop misses them, they check-call. Turn misses, they check-fold.",
          question: "What does this showdown reveal?",
          options: [
            "Nothing useful",
            "They're willing to call preflop 3-bets with suited connectors but give up easily postflop",
            "They always bluff",
            "They're a nit"
          ],
          correctAnswer: 1,
          explanation: "This shows: (1) LOOSE preflop (calling raises with 87s), and (2) PASSIVE/FIT-OR-FOLD postflop (giving up when they miss). This is a calling station/loose-passive pattern. You should value bet thin against them (they call with weak hands) but not bluff much (they fold when they have nothing anyway).",
          difficulty: "medium",
          points: 2
        },
        {
          id: "5.2-a2",
          type: "scenario",
          topic: "5.2.4 Pattern Recognition",
          scenario: "You've seen a player bet $15 (30% pot) three times at showdown. Each time they had the nuts or near-nuts.",
          question: "What pattern might this indicate?",
          options: [
            "Random - no pattern",
            "Small bet sizing tell - they bet small when very strong",
            "They always bet small",
            "They're a professional"
          ],
          correctAnswer: 1,
          explanation: "This suggests a SMALL BET SIZING TELL with strong hands. Some recreational players bet smaller when strong (afraid to lose action) and larger when bluffing. If this pattern continues, you should: (1) Fold more to their small bets, (2) Call down their large bets more. Exploit the tell by adjusting to their pattern.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "5.2-a3",
          type: "multiple-choice",
          topic: "5.2.3 Player Profiling",
          question: "A player shows down: calling 3-bets with KTo, calling river bluffs with ace-high, calling flop raises with gutshots. What's their profile?",
          options: [
            "TAG (Tight-Aggressive)",
            "Calling Station (Loose-Passive)",
            "LAG (Loose-Aggressive)",
            "Nit (Tight-Passive)"
          ],
          correctAnswer: 1,
          explanation: "This is a CALLING STATION: they play too many hands (loose) and call too much (passive). Against calling stations: (1) Value bet extremely thin, (2) Don't bluff - they don't fold, (3) Avoid fancy plays, (4) Bet larger for value. They're the most profitable opponent type if you avoid bluffing them.",
          difficulty: "easy",
          points: 2
        },
        {
          id: "5.2-a4",
          type: "scenario",
          topic: "5.2.2 Note-Taking Systems",
          scenario: "A player 3-bets you, you call. Flop comes dry, they c-bet, you call. Turn bricks, they check. River bricks, they check-fold to your bet. They show A-high (missed).",
          question: "What's the most important note to take?",
          options: [
            "Player is a maniac",
            "3-bets light but gives up when called - can call 3-bets more",
            "Player always has A-high",
            "No useful information"
          ],
          correctAnswer: 1,
          explanation: "Key note: '3-bets light preflop but gives up easily to resistance'. This is exploitable - you can call their 3-bets with more hands and apply pressure postflop. They're trying to play LAG but don't follow through. Perfect note format: describes the tendency and implies the adjustment.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "5.2-a5",
          type: "multiple-choice",
          topic: "5.2.5 Applying Showdown Data",
          question: "How many showdowns showing a similar pattern do you need before making significant strategy adjustments?",
          options: [
            "1 showdown is enough",
            "2-3 showdowns showing consistent pattern",
            "100+ showdowns",
            "Never adjust based on showdowns"
          ],
          correctAnswer: 1,
          explanation: "2-3 showdowns showing a CONSISTENT pattern is enough to make initial adjustments. One showdown could be anything. But if someone shows up with light 3-bets and gives up twice, that's a pattern. Stay flexible and update if they adjust, but you can't wait for 100 showdowns. In poker, you make decisions with imperfect information.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "5.2-a6",
          type: "scenario",
          topic: "5.2.4 Pattern Recognition",
          scenario: "A player has check-raised the flop 4 times. Each time they showed: two pair, a set, a flush draw, and top pair. Never a bluff.",
          question: "What's your adjustment?",
          options: [
            "Never fold to their check-raises",
            "Fold more to check-raises unless you have strong hands",
            "Always bluff-raise them back",
            "No adjustment needed"
          ],
          correctAnswer: 1,
          explanation: "Fold more to their check-raises! They've shown 4 times they only check-raise with legitimate hands, never bluffs. This is a TIGHT check-raise pattern. Against this player, you should: (1) Fold marginal hands to check-raises, (2) C-bet less as a bluff (they might check-raise), (3) Only continue with strong hands. Exploit their tight pattern by folding more.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "5.2-a7",
          type: "multiple-choice",
          topic: "5.2.6 Live vs Online Considerations",
          question: "What's the main advantage of live poker for showdown analysis?",
          options: [
            "You can use a HUD",
            "You can observe physical tells and reactions",
            "Hands play faster",
            "No advantage - online is better"
          ],
          correctAnswer: 1,
          explanation: "Live poker allows observation of PHYSICAL TELLS: bet timing, hand shaking, speech patterns, facial expressions, betting mechanics. At showdown, watch HOW they show their hand - proudly, reluctantly, sheepishly? These add extra information beyond the cards. Online, you only have betting patterns and timing tells.",
          difficulty: "easy",
          points: 2
        }
      ]
    },
    {
      id: "scenarios",
      title: "Section C: Practical Application",
      description: "Apply showdown analysis to build profiles and make decisions",
      weight: 35,
      questions: [
        {
          id: "5.2-s1",
          type: "scenario",
          topic: "5.2.3 Player Profiling",
          scenario: "Over 2 hours, you've seen a player: 3-bet preflop 8 times, c-bet every flop, barrel most turns, and show up with both value and bluffs. Their VPIP is about 28%, PFR 22%.",
          question: "What's their player type?",
          options: [
            "Nit (Tight-Passive)",
            "Calling Station (Loose-Passive)",
            "TAG (Tight-Aggressive)",
            "LAG (Loose-Aggressive)"
          ],
          correctAnswer: 3,
          explanation: "This is a LAG (Loose-Aggressive) player. They play many hands (28% VPIP is loose), raise frequently (22% PFR is aggressive), and apply pressure postflop (frequent c-bets, barrels). Against LAG players: (1) Tighten your opening range, (2) Call down lighter (they bluff more), (3) Let them bluff, (4) 3-bet quality hands for value.",
          difficulty: "easy",
          points: 2
        },
        {
          id: "5.2-s2",
          type: "scenario",
          topic: "5.2.1 Information Extraction",
          scenario: "Opponent raises, you call. Flop: K♥9♠3♦. They bet $10 into $15, you call. Turn: 2♣. They check, you bet $20, they fold and show QQ.",
          question: "What does this showdown reveal about their play?",
          options: [
            "They always fold QQ",
            "They give up easily with overpairs when scared - can bluff them",
            "They're a great player",
            "Nothing useful"
          ],
          correctAnswer: 1,
          explanation: "This reveals they're SCARED/WEAK when facing aggression. They had an overpair (QQ), c-bet, then gave up when you bet the turn. This is exploitable: apply pressure when they show weakness. They're fit-or-fold even with decent hands. Note: 'Folds overpairs to turn aggression - can bluff more'.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "5.2-s3",
          type: "scenario",
          topic: "5.2.5 Applying Showdown Data",
          scenario: "New player sits down. First hand they play: limp-call preflop, check-call flop and turn, check-call river with third pair. They lose to top pair.",
          question: "What's your initial read and adjustment?",
          options: [
            "No read yet - need more hands",
            "Initial read: passive/calling station - value bet thin",
            "They're a pro - play carefully",
            "They always have third pair"
          ],
          correctAnswer: 1,
          explanation: "Initial read: PASSIVE/CALLING STATION tendencies. One hand isn't conclusive, but limp-calling and calling down with weak hands is typical calling station behavior. Initial adjustment: value bet thin and avoid bluffs. Stay flexible - if they show up aggressive or tight in future hands, update your read. But make tentative adjustments early.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "5.2-s4",
          type: "scenario",
          topic: "5.2.2 Note-Taking Systems",
          scenario: "Which note is most useful for future hands?",
          question: "Select the best note:",
          options: [
            "'Lost with AK'",
            "'Bad player'",
            "'Called river with 3rd pair vs $100 bet - station'",
            "'Unlucky'"
          ],
          correctAnswer: 2,
          explanation: "Best note: 'Called river with 3rd pair vs $100 bet - station'. This is SPECIFIC (what they did), ACTIONABLE (tells you they're a calling station), and includes KEY DETAILS (river, large bet, weak hand). Bad notes are vague ('bad player') or useless ('unlucky'). Good notes describe specific exploitable tendencies.",
          difficulty: "easy",
          points: 2
        },
        {
          id: "5.2-s5",
          type: "scenario",
          topic: "5.2.4 Pattern Recognition",
          scenario: "Over 3 sessions, you notice a regular opponent always bets 60-70% pot with strong hands, but shoves all-in when bluffing.",
          question: "How should you exploit this pattern?",
          options: [
            "Ignore it - could be coincidence",
            "Call their shoves more, fold to their medium bets more",
            "Always fold to any bet",
            "Treat all bets the same"
          ],
          correctAnswer: 1,
          explanation: "Exploit the sizing tell! If they overbet/shove when bluffing but bet medium with value, you should: (1) Call their shoves lighter (they're bluffing), (2) Fold marginal hands to medium bets (they have it). This is a huge leak to exploit. Sizing tells are common in recreational players and very profitable to exploit once identified.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "5.2-s6",
          type: "scenario",
          topic: "5.2.6 Live vs Online Considerations",
          scenario: "In a live game, you notice when a player has a strong hand, they immediately reach for chips and make their bet smoothly. When bluffing, they hesitate and fumble with chips.",
          question: "How reliable is this tell?",
          options: [
            "Very reliable - physical tells never lie",
            "Somewhat reliable if consistent - track more showdowns to confirm",
            "Ignore all physical tells",
            "Only trust HUD stats"
          ],
          correctAnswer: 1,
          explanation: "Physical tells are SOMEWHAT reliable if CONSISTENT, but need confirmation. Some players have genuine tells (strong = confident, weak = hesitant). Others know about tells and use reverse tells. Track 3-4 showdowns to see if the pattern holds. If consistent, exploit it. But always be ready to adjust if they're using reverse tells.",
          difficulty: "hard",
          points: 2
        }
      ]
    },
    {
      id: "speed",
      title: "Section D: Speed Round",
      description: "Quick showdown analysis concepts",
      weight: 10,
      timed: true,
      timePerQuestion: 15,
      questions: [
        {
          id: "5.2-sp1",
          type: "quick-calc",
          topic: "5.2.3 Player Profiling",
          question: "TAG stands for? (tight-___)",
          correctAnswer: "aggressive",
          acceptableAnswers: ["aggressive", "Aggressive", "agg"],
          explanation: "TAG = Tight-Aggressive",
          difficulty: "easy",
          points: 1
        },
        {
          id: "5.2-sp2",
          type: "quick-calc",
          topic: "5.2.3 Player Profiling",
          question: "LAG stands for? (loose-___)",
          correctAnswer: "aggressive",
          acceptableAnswers: ["aggressive", "Aggressive", "agg"],
          explanation: "LAG = Loose-Aggressive",
          difficulty: "easy",
          points: 1
        },
        {
          id: "5.2-sp3",
          type: "quick-calc",
          topic: "5.2.3 Player Profiling",
          question: "Calling station: bluff more or less?",
          correctAnswer: "less",
          acceptableAnswers: ["less", "Less"],
          explanation: "Bluff less against calling stations",
          difficulty: "easy",
          points: 1
        },
        {
          id: "5.2-sp4",
          type: "quick-calc",
          topic: "5.2.5 Applying Showdown Data",
          question: "Min showdowns for pattern? (1/2/3)",
          correctAnswer: "2",
          acceptableAnswers: ["2", "2-3", "two", "Two"],
          explanation: "2-3 showdowns to establish pattern",
          difficulty: "easy",
          points: 1
        },
        {
          id: "5.2-sp5",
          type: "quick-calc",
          topic: "5.2.2 Note-Taking Systems",
          question: "Note what? Standard plays or surprising tendencies?",
          correctAnswer: "surprising",
          acceptableAnswers: ["surprising", "Surprising", "tendencies", "Tendencies"],
          explanation: "Note surprising/exploitable tendencies",
          difficulty: "easy",
          points: 1
        }
      ]
    }
  ]
};

export default showdownAnalysisQuiz;
