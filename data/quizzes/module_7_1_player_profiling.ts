import type { QuizData } from '@/types/quiz';

export const playerProfilingQuiz: QuizData = {
  moduleInfo: {
    id: "7.1",
    title: "Player Profiling",
    category: "Opponent Analysis",
    phase: 3,
    level: "Advanced",
    passingScore: 80,
    estimatedTime: "30-40 minutes",
    timedModeMinutes: 30,
    speedModeMinutes: 15,
    learningOutcomes: [
      "Quickly categorize players into actionable types",
      "Build accurate profiles from limited information",
      "Adjust strategy based on player type",
      "Update profiles as new information arrives",
      "Avoid common profiling mistakes"
    ],
    nextModule: {
      id: "7.2",
      title: "Table Selection"
    }
  },
  sections: [
    {
      id: "conceptual",
      title: "Section A: Conceptual Understanding",
      description: "Test your understanding of player profiling concepts",
      weight: 20,
      questions: [
        {
          id: "7.1-c1",
          type: "multiple-choice",
          topic: "7.1.1 Player Type Framework",
          question: "What are the two main dimensions for categorizing players?",
          options: [
            "Skill and luck",
            "Tight/Loose (hand selection) and Passive/Aggressive (betting behavior)",
            "Online and live",
            "Winning and losing"
          ],
          correctAnswer: 1,
          explanation: "The two dimensions are: (1) TIGHT/LOOSE (how many hands they play - VPIP), and (2) PASSIVE/AGGRESSIVE (how often they bet/raise vs call - PFR/aggression). These create categories: TAG (Tight-Aggressive), LAG (Loose-Aggressive), Calling Station (Loose-Passive), Nit (Tight-Passive), etc. This framework helps you quickly categorize and adjust strategy.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "7.1-c2",
          type: "multiple-choice",
          topic: "7.1.1 Player Type Framework",
          question: "What characterizes a TAG (Tight-Aggressive) player?",
          options: [
            "Plays few hands but bets/raises when they play (15-20% VPIP, 12-18% PFR)",
            "Plays many hands and calls a lot",
            "Plays few hands and calls a lot",
            "Plays every hand and raises every time"
          ],
          correctAnswer: 0,
          explanation: "TAG = TIGHT (plays 15-20% of hands, selective preflop) + AGGRESSIVE (bets/raises when playing, high PFR). TAGs are solid players who play premium hands and apply pressure. Against TAGs: respect their aggression, don't bluff much, value bet when you have it. TAGs are typically winning players and tough opponents.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "7.1-c3",
          type: "multiple-choice",
          topic: "7.1.1 Player Type Framework",
          question: "What characterizes a Calling Station?",
          options: [
            "Never calls, always raises",
            "Plays many hands and calls too much, rarely folds (Loose-Passive)",
            "Plays very few hands",
            "Always aggressive"
          ],
          correctAnswer: 1,
          explanation: "CALLING STATION = LOOSE (plays too many hands) + PASSIVE (calls excessively, rarely bets/raises). They don't fold enough and chase draws with bad odds. Against calling stations: (1) Value bet thin, (2) NEVER bluff, (3) Bet larger for value, (4) Avoid fancy plays. They're profitable to play against if you stop bluffing them.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "7.1-c4",
          type: "true-false",
          topic: "7.1.4 Building Profiles",
          question: "You should trust your initial impression of a player and never update it.",
          correctAnswer: false,
          explanation: "False! Always UPDATE profiles as new information arrives. Initial impressions are hypotheses to test, not certainties. Players adjust, have different gears, or you might have misread early. Stay flexible. Good profiling = forming quick initial reads + constantly updating with new data. Rigid profiling leads to mistakes against adaptive players.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "7.1-c5",
          type: "multiple-choice",
          topic: "7.1.2 Quick Profiling Methods",
          question: "What information is most valuable in the first orbit (9-10 hands) for profiling?",
          options: [
            "What they're wearing",
            "VPIP (how often they enter pots) and showdown hands",
            "How much money they have",
            "Their facial expressions only"
          ],
          correctAnswer: 1,
          explanation: "First orbit focus: (1) VPIP (are they playing many or few hands?), (2) SHOWDOWNS (what hands do they show up with?), (3) Aggression (bet/raise or call?). In 10 hands you can estimate: tight vs loose, aggressive vs passive, and get 1-2 showdowns. This gives you an actionable initial profile. Other factors matter but these are most informative early.",
          difficulty: "medium",
          points: 1
        },
        {
          id: "7.1-c6",
          type: "true-false",
          topic: "7.1.6 Common Profiling Mistakes",
          question: "Once you categorize someone as a 'calling station,' you should treat every decision against them the same way.",
          correctAnswer: false,
          explanation: "False! Avoid OVER-GENERALIZING. Even calling stations have patterns: maybe they call light but fold to large river bets, or call flop/turn but fold rivers, or defend wide but give up when raised. Find specific tendencies within the general category. Adjust to their specific leaks, not just the broad label. Nuance matters - every player is unique.",
          difficulty: "medium",
          points: 1
        }
      ]
    },
    {
      id: "application",
      title: "Section B: Player Type Identification",
      description: "Identify player types and determine appropriate adjustments",
      weight: 35,
      questions: [
        {
          id: "7.1-a1",
          type: "scenario",
          topic: "7.1.1 Player Type Framework",
          scenario: "A player enters ~35% of pots, raises 25% of the time, 3-bets frequently, and c-bets most flops. At showdown they've shown both strong hands and bluffs.",
          question: "What player type is this?",
          options: [
            "Nit (Tight-Passive)",
            "TAG (Tight-Aggressive)",
            "LAG (Loose-Aggressive)",
            "Calling Station (Loose-Passive)"
          ],
          correctAnswer: 2,
          explanation: "This is a LAG (Loose-Aggressive): plays many hands (35% VPIP is loose), raises frequently (25% PFR is aggressive), 3-bets often, c-bets frequently, shows up with both value and bluffs. LAGs are tricky opponents who apply pressure. Against LAG: tighten opening range, call down lighter (they bluff more), let them bluff, 3-bet quality hands.",
          difficulty: "easy",
          points: 2
        },
        {
          id: "7.1-a2",
          type: "scenario",
          topic: "7.1.1 Player Type Framework",
          scenario: "A player enters ~12% of pots, almost never raises (3% PFR), mostly calls when they play, and has shown down medium-strength hands they called to the river with.",
          question: "What player type is this?",
          options: [
            "Nit/Weak-Tight (Tight-Passive)",
            "TAG (Tight-Aggressive)",
            "LAG (Loose-Aggressive)",
            "Maniac"
          ],
          correctAnswer: 0,
          explanation: "This is a NIT or WEAK-TIGHT player: plays very few hands (12% VPIP is tight), rarely raises (3% PFR is passive), mostly calls. Nits are predictable and exploitable. Against nits: (1) Bluff more (they fold too much), (2) Don't value bet thin (they only call with strong hands), (3) Fold when they show aggression (they have it), (4) Steal their blinds often.",
          difficulty: "easy",
          points: 2
        },
        {
          id: "7.1-a3",
          type: "multiple-choice",
          topic: "7.1.3 Strategy Adjustments by Type",
          question: "Against a Calling Station, what's your PRIMARY adjustment?",
          options: [
            "Bluff frequently",
            "Value bet thin and bet larger, never bluff",
            "Play tight and wait for aces",
            "Always check"
          ],
          correctAnswer: 1,
          explanation: "Against calling stations: (1) VALUE BET THIN (they call with weak hands), (2) BET LARGER (they call anyway, get max value), (3) NEVER BLUFF (they don't fold). This is critical - most players lose to calling stations by bluffing too much. Stop bluffing, bet your hands for value. They're ATMs if you value bet, money pits if you bluff.",
          difficulty: "easy",
          points: 2
        },
        {
          id: "7.1-a4",
          type: "multiple-choice",
          topic: "7.1.3 Strategy Adjustments by Type",
          question: "Against a Nit (Tight-Passive), what's your PRIMARY adjustment?",
          options: [
            "Never bluff - they always have it",
            "Bluff more and steal frequently, fold when they show aggression",
            "Play exactly the same as vs anyone",
            "Only play aces"
          ],
          correctAnswer: 1,
          explanation: "Against nits: (1) BLUFF MORE (they fold too much), (2) STEAL FREQUENTLY (especially their blinds), (3) FOLD when they show aggression (they have it - nits don't bluff). Don't value bet thin against nits - they only call with strong hands. Attack their weakness (folding too much) and avoid their strength (when they actually have a hand).",
          difficulty: "medium",
          points: 2
        },
        {
          id: "7.1-a5",
          type: "scenario",
          topic: "7.1.2 Quick Profiling Methods",
          scenario: "New player sits down. First hand: limps UTG with Q♠9♠, calls a raise. Second hand: limps button with 5♥4♥. Third hand: limps MP with K♦T♦.",
          question: "What's your initial read?",
          options: [
            "TAG player",
            "Loose-Passive (potential calling station) - plays too many hands, limps",
            "LAG player",
            "Nit"
          ],
          correctAnswer: 1,
          explanation: "Initial read: LOOSE-PASSIVE tendencies. Limping UTG with Q9s and limping multiple marginal hands = playing too many hands (loose) passively (limping not raising). This looks like calling station profile. Adjust: value bet more, bluff less, bet larger. Stay flexible - confirm this read over more hands, but make tentative adjustments now.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "7.1-a6",
          type: "multiple-choice",
          topic: "7.1.4 Building Profiles",
          question: "How much information do you need before making initial strategy adjustments?",
          options: [
            "Need 1000+ hands",
            "Can make tentative adjustments after 10-20 hands with 1-2 showdowns",
            "Never adjust without perfect information",
            "Wait until end of session"
          ],
          correctAnswer: 1,
          explanation: "Make TENTATIVE adjustments after 10-20 hands with some showdowns. You can estimate tight/loose, passive/aggressive, and see 1-2 holdings. This isn't perfect but it's actionable. Not adjusting until you have 'enough' data means missing exploitable opportunities. Make educated guesses early, stay flexible, update constantly. Imperfect adjustments > no adjustments.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "7.1-a7",
          type: "scenario",
          topic: "7.1.3 Strategy Adjustments by Type",
          scenario: "Against a LAG (Loose-Aggressive) who 3-bets you frequently and barrels multiple streets, what adjustment should you make?",
          question: "Best adjustment vs LAG:",
          options: [
            "Fold to all their aggression",
            "Tighten opening range, call down lighter with bluff-catchers, let them bluff",
            "Never call, always 4-bet or fold",
            "Play exactly like vs a nit"
          ],
          correctAnswer: 1,
          explanation: "Vs LAG: (1) TIGHTEN opening range (they punish weak opens), (2) CALL DOWN LIGHTER (they bluff more, so you need less to call), (3) LET THEM BLUFF (check-call instead of folding), (4) 3-bet quality hands for value. Don't try to out-LAG a LAG. Use their aggression against them by calling with medium-strength hands. Be the pot calling their bluffs.",
          difficulty: "hard",
          points: 2
        }
      ]
    },
    {
      id: "scenarios",
      title: "Section C: Practical Application",
      description: "Apply player profiling to complex situations",
      weight: 35,
      questions: [
        {
          id: "7.1-s1",
          type: "scenario",
          topic: "7.1.4 Building Profiles",
          scenario: "You profiled a player as a nit (tight-passive) after 30 hands. Now you see them 3-bet, c-bet, and barrel turn aggressively - behavior inconsistent with your profile.",
          question: "What should you do?",
          options: [
            "Ignore it - stick with your original read",
            "Update profile: maybe they have gears, or initial read was wrong. Adjust accordingly.",
            "Assume they're tilting and exploit",
            "Leave the table"
          ],
          correctAnswer: 1,
          explanation: "UPDATE PROFILE immediately! This behavior contradicts your nit profile. Possibilities: (1) Initial read was wrong (small sample), (2) They have different GEARS (play tight then aggressive), (3) They adjusted/tilted. Don't be rigid - update constantly. Adjust strategy: respect this aggression more than nit's typical range. Flexible profiling beats stubborn profiling.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "7.1-s2",
          type: "scenario",
          topic: "7.1.6 Common Profiling Mistakes",
          scenario: "You lost a big pot to an opponent who hit a lucky draw. Now you view them as 'lucky and bad' and make aggressive plays against them.",
          question: "What profiling mistake is this?",
          options: [
            "No mistake - correct read",
            "EMOTIONAL BIAS - one hand doesn't define a player, you're profiling based on emotion not data",
            "Good exploitation",
            "Perfect adjustment"
          ],
          correctAnswer: 1,
          explanation: "This is EMOTIONAL/TILT BIAS! One lucky hand doesn't make someone bad or lucky. You're profiling based on emotion (you're upset) not objective data. This leads to -EV spew plays. Correct approach: (1) Separate emotion from analysis, (2) Profile based on patterns across many hands, (3) Ask 'What does their overall play pattern show?' One hand is noise, patterns are signal.",
          difficulty: "easy",
          points: 2
        },
        {
          id: "7.1-s3",
          type: "scenario",
          topic: "7.1.2 Quick Profiling Methods",
          scenario: "In online poker, you have HUD stats: Player shows VPIP 42%, PFR 8%, Aggression Factor 0.5.",
          question: "What does this profile indicate?",
          options: [
            "TAG player",
            "Classic Calling Station: plays too many hands (42%), rarely raises (8%), very passive (0.5 AF)",
            "LAG player",
            "Nit"
          ],
          correctAnswer: 1,
          explanation: "Classic CALLING STATION! VPIP 42% = very loose (plays too many hands). PFR 8% = very passive (rarely raises even when playing). AF 0.5 = calls much more than bets/raises. This player plays too many hands and calls too much. Adjustment: value bet everything, bet large, never bluff. HUD stats make profiling instant online.",
          difficulty: "easy",
          points: 2
        },
        {
          id: "7.1-s4",
          type: "scenario",
          topic: "7.1.5 Updating Profiles",
          scenario: "Regular opponent who's usually TAG has shown up to the last 3 sessions playing much looser and more aggressive (LAG style). What might explain this?",
          question: "Possible explanations and response:",
          options: [
            "Random - ignore it",
            "They're developing their game, on tilt, or adjusting to table. Update profile and adjust strategy.",
            "Stick to original TAG read",
            "They're definitely tilting"
          ],
          correctAnswer: 1,
          explanation: "UPDATE PROFILE with possible explanations: (1) GAME DEVELOPMENT (learning LAG style), (2) TILT (recent losses), (3) TABLE ADJUSTMENT (current table is passive), or (4) GEAR CHANGE (has multiple styles). Don't assume - adjust to what they're doing NOW while staying alert. Adapt your strategy: defend wider, call down more. Players evolve - your profiling must too.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "7.1-s5",
          type: "scenario",
          topic: "7.1.3 Strategy Adjustments by Type",
          scenario: "Unknown player. First hand: they 3-bet your raise. Second hand: they 3-bet another player's raise. Third hand: they open-raise 5 consecutive hands. What's your read and adjustment?",
          question: "Initial profile and adjustment:",
          options: [
            "Nit - fold to their aggression",
            "Maniac/Ultra-aggressive - tighten up, trap with premiums, call down lighter",
            "TAG - respect all aggression",
            "Calling station - value bet"
          ],
          correctAnswer: 1,
          explanation: "Initial read: MANIAC or ultra-LAG! 3-betting frequently and opening 5 consecutive hands = very loose and very aggressive. Adjustment: (1) TIGHTEN preflop (wait for hands), (2) TRAP with premiums (call their 3-bets with AA/KK), (3) CALL DOWN lighter postflop (they're bluffing often), (4) Don't bluff them (they call/raise wide). Let their aggression be their undoing.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "7.1-s6",
          type: "scenario",
          topic: "7.1.6 Common Profiling Mistakes",
          scenario: "You notice an opponent wears a hoodie and sunglasses. You assume they're a serious, tough player and play cautiously against them.",
          question: "What mistake is this?",
          options: [
            "No mistake - good read",
            "STEREOTYPING based on appearance, not actual play patterns. Profile actions, not appearance.",
            "Perfect profiling",
            "Good caution"
          ],
          correctAnswer: 1,
          explanation: "This is STEREOTYPING! Clothing/appearance doesn't indicate skill. Some recreational players wear hoodies. Some pros dress casually. Profile based on ACTIONS: hand selection, bet sizing, showdown hands, timing, patterns. Appearance is irrelevant. This mistake causes you to either give undeserved respect or not respect skilled players who dress casually. Judge by actions only.",
          difficulty: "easy",
          points: 2
        }
      ]
    },
    {
      id: "speed",
      title: "Section D: Speed Round",
      description: "Quick player type identification",
      weight: 10,
      timed: true,
      timePerQuestion: 15,
      questions: [
        {
          id: "7.1-sp1",
          type: "quick-calc",
          topic: "7.1.1 Player Type Framework",
          question: "TAG: Tight-____?",
          correctAnswer: "Aggressive",
          acceptableAnswers: ["Aggressive", "aggressive", "Agg", "agg"],
          explanation: "TAG = Tight-Aggressive",
          difficulty: "easy",
          points: 1
        },
        {
          id: "7.1-sp2",
          type: "quick-calc",
          topic: "7.1.1 Player Type Framework",
          question: "Calling Station: bluff more or less?",
          correctAnswer: "less",
          acceptableAnswers: ["less", "Less", "never"],
          explanation: "Never bluff calling stations",
          difficulty: "easy",
          points: 1
        },
        {
          id: "7.1-sp3",
          type: "quick-calc",
          topic: "7.1.3 Strategy Adjustments by Type",
          question: "Vs Nit: bluff more or less?",
          correctAnswer: "more",
          acceptableAnswers: ["more", "More"],
          explanation: "Bluff more vs nits (they fold too much)",
          difficulty: "easy",
          points: 1
        },
        {
          id: "7.1-sp4",
          type: "quick-calc",
          topic: "7.1.3 Strategy Adjustments by Type",
          question: "Vs LAG: call down lighter or tighter?",
          correctAnswer: "lighter",
          acceptableAnswers: ["lighter", "Lighter"],
          explanation: "Call down lighter vs LAG (they bluff more)",
          difficulty: "easy",
          points: 1
        },
        {
          id: "7.1-sp5",
          type: "quick-calc",
          topic: "7.1.4 Building Profiles",
          question: "Profiles: fixed or update constantly?",
          correctAnswer: "update",
          acceptableAnswers: ["update", "Update", "update constantly"],
          explanation: "Update profiles constantly with new data",
          difficulty: "easy",
          points: 1
        }
      ]
    }
  ]
};

export default playerProfilingQuiz;
