import type { QuizData } from '@/types/quiz';

export const tableSelectionQuiz: QuizData = {
  moduleInfo: {
    id: "7.2",
    title: "Table Selection",
    category: "Game Dynamics",
    phase: 1,
    level: "Fundamental",
    passingScore: 80,
    estimatedTime: "25-35 minutes",
    timedModeMinutes: 25,
    speedModeMinutes: 12,
    learningOutcomes: [
      "Identify profitable tables quickly",
      "Recognize warning signs of tough tables",
      "Develop a consistent table selection routine",
      "Know when to leave a table",
      "Maximize hourly rate through selection"
    ],
    nextModule: {
      id: "8.1",
      title: "Bankroll Management"
    }
  },
  sections: [
    {
      id: "conceptual",
      title: "Section A: Conceptual Understanding",
      description: "Test your understanding of table selection principles",
      weight: 20,
      questions: [
        {
          id: "7.2-c1",
          type: "multiple-choice",
          topic: "7.2.1 Table Selection Importance",
          question: "What is the primary benefit of good table selection?",
          options: [
            "It guarantees you will win every session",
            "It significantly increases your win rate and hourly earnings",
            "It allows you to play more hands per hour",
            "It makes variance disappear from your results"
          ],
          correctAnswer: 1,
          explanation: "Good table selection is one of the highest EV decisions you can make. Finding soft games with recreational players can increase your win rate by 5-10 BB/100 or more compared to tough games, dramatically improving your hourly rate. It's often more important than small technical improvements to your play.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "7.2-c2",
          type: "true-false",
          topic: "7.2.1 Table Selection Importance",
          question: "Spending 5 minutes finding the best table is usually more valuable than playing 5 extra minutes at a mediocre table.",
          correctAnswer: true,
          explanation: "Absolutely true. The difference in win rate between a great table and a mediocre one can be enormous (5-10 BB/100 or more). Those 5 minutes of table shopping can find you a game where you might win in one hour what would take 3-4 hours at a tougher table. Table selection has massive opportunity cost implications.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "7.2-c3",
          type: "multiple-choice",
          topic: "7.2.2 Profitable Table Indicators",
          question: "Which statistic is generally the MOST reliable indicator of a profitable table in online poker lobbies?",
          options: [
            "Total number of players at the table",
            "Percentage of players seeing the flop (high %)",
            "Average pot size",
            "Number of hands played per hour"
          ],
          correctAnswer: 1,
          explanation: "Players to flop % is the gold standard indicator. Tables with 35%+ (or 40%+ even better) seeing flops typically have recreational players who play too many hands. Average pot size can be misleading (could be one big hand), and hands/hour just shows speed. High flop-seen % reliably indicates loose, passive opponents—exactly what you want.",
          difficulty: "medium",
          points: 1
        },
        {
          id: "7.2-c4",
          type: "multiple-choice",
          topic: "7.2.5 Knowing When to Leave",
          question: "You've been playing at a great table for 2 hours and are up 5 buy-ins. The two recreational players leave and are replaced by regulars. What should you do?",
          options: [
            "Stay—you're running hot and should capitalize",
            "Leave immediately—the game composition has changed",
            "Stay for 30 more minutes to protect your win",
            "Stay—winning players should never leave"
          ],
          correctAnswer: 1,
          explanation: "When the game quality deteriorates significantly (losing the fish), leave immediately regardless of your results. Your win/loss is a sunk cost. The game you were crushing is now potentially marginal or even negative EV. Being up or down is irrelevant—only current game quality matters. Leave and find a better table.",
          difficulty: "medium",
          points: 1
        },
        {
          id: "7.2-c5",
          type: "true-false",
          topic: "7.2.3 Warning Signs",
          question: "A table where most players have similar stack sizes (90-110 BB) is usually a sign of a soft, profitable game.",
          correctAnswer: false,
          explanation: "This is actually a WARNING sign, not a positive indicator. Similar stack sizes suggest experienced players who buy in full and play carefully. Profitable tables typically have diverse stack sizes: some short stacks (gamblers who lost), some huge stacks (fish who won and will give it back), and varying levels. Stack diversity = player diversity = profitable game.",
          difficulty: "hard",
          points: 1
        },
        {
          id: "7.2-c6",
          type: "multiple-choice",
          topic: "7.2.6 Platform-Specific Tips",
          question: "In live poker, what time of day typically offers the softest games?",
          options: [
            "Early morning (6-10 AM)",
            "Weekday afternoons (2-6 PM)",
            "Friday and Saturday nights",
            "Late weeknight evenings (Monday-Thursday, 10 PM-2 AM)"
          ],
          correctAnswer: 2,
          explanation: "Friday and Saturday nights are prime time for recreational players who play poker for entertainment. They're off work, out socializing, possibly drinking, and playing for fun. Weekday mornings and afternoons tend to have more retirees and professionals (tougher). Late weeknights have fewer players overall and more grinders trying to put in volume.",
          difficulty: "easy",
          points: 1
        }
      ]
    },
    {
      id: "application",
      title: "Section B: Application Skills",
      description: "Apply table selection concepts to realistic situations",
      weight: 35,
      questions: [
        {
          id: "7.2-a1",
          type: "multiple-choice",
          topic: "7.2.2 Profitable Table Indicators",
          question: "You're looking at two $1/$2 tables online. Table A: 28% to flop, avg pot $45. Table B: 42% to flop, avg pot $65. Which should you choose?",
          options: [
            "Table A—smaller pots mean less variance",
            "Table B—high flop % and big pots indicate loose players",
            "Table A—more disciplined players are easier to read",
            "They're roughly equal in profitability"
          ],
          correctAnswer: 1,
          explanation: "Table B is clearly better. 42% to flop indicates loose, recreational players (regulars typically see 20-25% of flops). The higher average pot size confirms players are putting more money in—exactly what you want. More action and looser players = higher win rate. Table A's 28% flop-seen suggests a tighter, likely tougher game.",
          difficulty: "easy",
          points: 2
        },
        {
          id: "7.2-a2",
          type: "scenario",
          topic: "7.2.4 Selection Routine",
          scenario: "Online, you find a table with 45% to flop and $80 average pot. Before sitting, you observe for one orbit.",
          question: "What are you primarily looking for during this observation period?",
          options: [
            "Which players are on tilt and making mistakes",
            "Stack sizes and who the recreational players are",
            "What cards players are showing down",
            "Whether the dealer is running a fair game"
          ],
          correctAnswer: 1,
          explanation: "During observation, identify: (1) Who are the fish (loose, passive, bad calls/bets)? (2) Who are the regulars (tight, aggressive, HUD users)? (3) What are stack sizes (who's stuck, who's winning)? This lets you pick the best seat (fish on your right, position on money). The stats got you there; observation helps you optimize your seat and initial strategy.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "7.2-a3",
          type: "multiple-choice",
          topic: "7.2.4 Selection Routine",
          question: "You've identified the recreational player at the table. What is the optimal seat selection?",
          options: [
            "Immediately to the fish's left (you act after them)",
            "Immediately to the fish's right (you act before them)",
            "Directly across from the fish",
            "Seat position doesn't matter if you're a good player"
          ],
          correctAnswer: 0,
          explanation: "You want position on the money—sit to the fish's LEFT. This means you act AFTER the recreational player, giving you position on them postflop. You'll see their actions before making your decision, allowing you to value bet thinner, bluff more effectively, and generally exploit them better. Position on the weak player is crucial for maximizing profit.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "7.2-a4",
          type: "scenario",
          topic: "7.2.3 Warning Signs",
          scenario: "You join a table and notice: all players have HUD stats visible, the chat is silent, everyone bought in for exactly 100 BB, and action is very fast.",
          question: "What should you conclude about this table?",
          options: [
            "Great table—fast action means lots of hands per hour",
            "Warning signs—likely all regulars, should leave",
            "Neutral table—modern online poker standard",
            "Great table—disciplined players are predictable"
          ],
          correctAnswer: 1,
          explanation: "These are major red flags indicating a table full of regulars: HUDs = regs, silent chat = serious grinders, uniform stacks = experienced players, fast action = people who multi-table. This is a low-profit or even losing game. Leave immediately and find a table with recreational players who chat, have random stack sizes, and create a social atmosphere.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "7.2-a5",
          type: "multiple-choice",
          topic: "7.2.5 Knowing When to Leave",
          question: "You're stuck 3 buy-ins at a great table with multiple fish. You're playing well but running bad. What should you do?",
          options: [
            "Leave—being stuck means you're probably tilting",
            "Stay—the game is great and results are short-term",
            "Leave—losers should always quit",
            "Stay until you're at least break-even"
          ],
          correctAnswer: 1,
          explanation: "Stay in great games regardless of your results! Your current win/loss is irrelevant—only game quality and your mental state matter. If the game is soft and you're playing well, you have massive edge. Short-term results mean nothing. Leaving a great game because you're losing is a huge mistake. (Only leave if you start tilting or playing poorly.)",
          difficulty: "medium",
          points: 2
        },
        {
          id: "7.2-a6",
          type: "scenario",
          topic: "7.2.6 Platform-Specific Tips",
          scenario: "Playing online on a Sunday afternoon, you have waitlists on multiple tables. Table X has 2 spots ahead of you but 38% flop seen. Table Y has 6 spots ahead but 47% flop seen.",
          question: "Which waitlist should you prioritize?",
          options: [
            "Table X—shorter wait time is worth it",
            "Table Y—the game quality difference justifies the wait",
            "They're roughly equal, take whichever opens first",
            "Neither—only join tables with no wait"
          ],
          correctAnswer: 1,
          explanation: "Wait for the better game. The difference between 38% and 47% flop-seen is massive in terms of game softness. A few extra minutes of waiting to get into a significantly better game will pay for itself many times over in the first hour. Time spent waiting for a great game is time well spent. Be patient and selective.",
          difficulty: "hard",
          points: 2
        },
        {
          id: "7.2-a7",
          type: "multiple-choice",
          topic: "7.2.2 Profitable Table Indicators",
          question: "In a live game, which player behavior is the STRONGEST indicator of a recreational player?",
          options: [
            "Limping frequently preflop",
            "Checking their phone between hands",
            "Ordering alcoholic drinks",
            "Chatting with other players"
          ],
          correctAnswer: 0,
          explanation: "Frequent limping is the #1 technical tell of a recreational player. Good players almost never limp (except occasionally from the button or small blind). Chronic limpers don't understand positional value or aggressive play. While drinking and socializing can indicate recreational players, many can still play decently. Limping is a direct strategic leak that signals weakness.",
          difficulty: "easy",
          points: 2
        }
      ]
    },
    {
      id: "practical",
      title: "Section C: Practical Scenarios",
      description: "Make table selection decisions in realistic poker situations",
      weight: 35,
      questions: [
        {
          id: "7.2-p1",
          type: "scenario",
          topic: "7.2.4 Selection Routine",
          scenario: "Live $2/$5: You walk into the poker room and see 4 active tables. Table 1 has loud talking and laughing. Table 2 is silent with everyone focused. Table 3 has a mix—some serious, some social. Table 4 has 3 empty seats.",
          question: "Which table should you investigate first?",
          options: [
            "Table 1—social atmosphere suggests recreational players",
            "Table 2—focused players are more predictable",
            "Table 3—balanced mix is ideal",
            "Table 4—more seats available means easier to get in"
          ],
          correctAnswer: 0,
          explanation: "Table 1 should be your priority. Talking, laughing, and social atmosphere strongly indicate recreational players who are there for entertainment, not grinding. Silent, focused tables are usually regulars. While Table 3 might be OK, start with the most promising lead. Empty seats (Table 4) might indicate a bad game that people are avoiding.",
          difficulty: "easy",
          points: 2
        },
        {
          id: "7.2-p2",
          type: "scenario",
          topic: "7.2.5 Knowing When to Leave",
          scenario: "Online cash game: You've played 200 hands at your table. Your win rate is 15 BB/100 (excellent). The table just broke and you're moved to a new table. After 30 hands, you notice all opponents have VPIP 19-24% and PFR 16-21%.",
          question: "What is your best move?",
          options: [
            "Stay—you're winning and running hot",
            "Stay—30 hands isn't enough sample size",
            "Leave—these stats indicate a tough regular-filled game",
            "Stay—consistent stats mean predictable opponents"
          ],
          correctAnswer: 2,
          explanation: "Leave immediately. VPIP 19-24% and PFR 16-21% are textbook regular stats (tight, aggressive, balanced). Your previous results are irrelevant—that was a different game. Even 30 hands is enough to see this table is full of competent players. Your edge here is tiny compared to tables with recreational players. Find a better game.",
          difficulty: "hard",
          points: 2
        },
        {
          id: "7.2-p3",
          type: "scenario",
          topic: "7.2.4 Selection Routine",
          scenario: "You've spotted a fish with a $800 stack (400 BB) at a $1/$2 table. The only open seat is to the fish's immediate right. The seat to their left (position on the fish) is occupied by a good regular.",
          question: "What should you do?",
          options: [
            "Take the seat—being at the table with the fish is what matters",
            "Join the waitlist for the seat to the fish's left",
            "Take the seat and plan to change seats later",
            "Find a different table—the seat is too bad"
          ],
          correctAnswer: 2,
          explanation: "Take the seat and change later. Getting in the game is priority #1 before the fish goes broke. Once you're at the table, you can request a seat change when the position seat opens up (the regular might leave). Waiting for the perfect seat risks missing the fish entirely. Sitting to their right isn't ideal but you'll still get opportunities to profit, especially in multiway pots.",
          difficulty: "hard",
          points: 2
        },
        {
          id: "7.2-p4",
          type: "scenario",
          topic: "7.2.6 Platform-Specific Tips",
          scenario: "Online tournament just finished, releasing 200+ players. It's 11 PM on a Saturday. You log into cash games immediately after.",
          question: "What should you expect about game conditions?",
          options: [
            "Normal conditions—no different than any other time",
            "Tougher games—tournament grinders are skilled",
            "Much softer games—players are in action mode and may be tilted",
            "Emptier games—players are tired and logging off"
          ],
          correctAnswer: 2,
          explanation: "This is a GOLDEN TIME for cash games. Post-tournament is when you find the softest games: players are in 'action mode' from tournament play, some are tilted from bad beats, many are loose with their tournament winnings, and recreational players who don't normally play cash are jumping in. This is premium table selection timing. Load up tables immediately.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "7.2-p5",
          type: "scenario",
          topic: "7.2.2 Profitable Table Indicators",
          scenario: "Live $1/$3: You're scouting a table and see in one 10-minute period: a 3-bet pot where both players turned over AK (split pot), a bluff-catch with ace-high, and someone folding QQ preflop to a 3-bet.",
          question: "What does this tell you about the game?",
          options: [
            "Great game—lots of action and big pots",
            "Tough game—advanced plays like bluff-catching and big folds",
            "Mediocre game—seems fairly standard",
            "Can't determine from one orbit of hands"
          ],
          correctAnswer: 1,
          explanation: "These are WARNING SIGNS of a tough game: both players having AK shows narrow ranges and strong hand selection, ace-high bluff-catch shows sophisticated thinking, and folding QQ preflop shows disciplined 3-bet/4-bet awareness. Good players make these plays; recreational players don't. Look for a game with more limping, calling, and straightforward play.",
          difficulty: "hard",
          points: 2
        },
        {
          id: "7.2-p6",
          type: "scenario",
          topic: "7.2.5 Knowing When to Leave",
          scenario: "You've been playing for 4 hours and are up 8 buy-ins at an amazing table. You're starting to feel tired and notice you made a bad call last orbit that you wouldn't normally make.",
          question: "What should you do?",
          options: [
            "Stay—the game is too good to leave",
            "Leave—fatigue is affecting your play",
            "Take a 15-minute break then return",
            "Stay but play tighter to avoid mistakes"
          ],
          correctAnswer: 1,
          explanation: "Leave when your game deteriorates, regardless of game quality. You're making mistakes due to fatigue—this will only get worse. Playing sub-optimally in a great game can still lose money. Protect your 8 BI win, rest, and come back fresh later or tomorrow. Your edge comes from both game selection AND playing well. Without the latter, even great games become marginal.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "7.2-p7",
          type: "scenario",
          topic: "7.2.6 Platform-Specific Tips",
          scenario: "Online, you typically play $0.50/$1 with a 35 BI bankroll ($3,500). You notice the $1/$2 tables are exceptionally soft today, showing 45%+ flop seen on multiple tables.",
          question: "Should you move up and take a shot at $1/$2?",
          options: [
            "No—never deviate from bankroll management rules",
            "Yes—take multiple shots to maximize EV",
            "Yes—take ONE shot with strict stop-loss",
            "No—soft $0.50/$1 is better than any $1/$2 game"
          ],
          correctAnswer: 2,
          explanation: "A disciplined shot-take is reasonable here. The game quality is exceptional (45%+ flop seen) and you're bankrolled for your regular stakes. Buy in for one bullet at $1/$2 with a strict rule: if you lose it, drop back down. Don't reload multiple times. This balances the opportunity (great game, building $1/$2 experience) with bankroll protection. But one bullet only—multiple reloads is spewy.",
          difficulty: "medium",
          points: 2
        }
      ]
    },
    {
      id: "speed",
      title: "Section D: Speed Round",
      description: "Quick table selection decisions",
      weight: 10,
      timed: true,
      timePerQuestion: 15,
      questions: [
        {
          id: "7.2-s1",
          type: "quick-calc",
          topic: "7.2.2 Profitable Table Indicators",
          question: "Minimum % of players seeing flop for a 'good' table indicator?",
          correctAnswer: "35%",
          acceptableAnswers: ["35", "35%", "30", "30%", "40", "40%"],
          explanation: "35%+ flop-seen is a strong indicator of loose, recreational play. 40%+ is even better.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "7.2-s2",
          type: "quick-calc",
          topic: "7.2.4 Selection Routine",
          question: "Best seat relative to the fish? (Left/Right)",
          correctAnswer: "Left",
          acceptableAnswers: ["Left", "left", "to the left", "fish's left"],
          explanation: "Sit to the fish's LEFT to have position on them postflop.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "7.2-s3",
          type: "quick-calc",
          topic: "7.2.6 Platform-Specific Tips",
          question: "Best day(s) for soft live games?",
          correctAnswer: "Friday/Saturday",
          acceptableAnswers: ["Friday", "Saturday", "Fri/Sat", "Friday/Saturday", "Friday and Saturday", "weekends", "Weekends"],
          explanation: "Friday and Saturday nights attract the most recreational players.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "7.2-s4",
          type: "quick-calc",
          topic: "7.2.3 Warning Signs",
          question: "If all players have similar stack sizes, is this good or bad?",
          correctAnswer: "Bad",
          acceptableAnswers: ["Bad", "bad", "warning", "Warning", "negative"],
          explanation: "Similar stacks indicate experienced players. You want stack diversity.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "7.2-s5",
          type: "quick-calc",
          topic: "7.2.5 Knowing When to Leave",
          question: "Should you stay when fish leave and regs join? (Yes/No)",
          correctAnswer: "No",
          acceptableAnswers: ["No", "no", "leave", "Leave"],
          explanation: "Leave immediately when game composition deteriorates significantly.",
          difficulty: "easy",
          points: 1
        }
      ]
    }
  ]
};

export default tableSelectionQuiz;
