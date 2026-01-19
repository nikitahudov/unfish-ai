import type { QuizData } from '@/types/quiz';

export const handReviewQuiz: QuizData = {
  moduleInfo: {
    id: "9.1",
    title: "Hand History Review",
    category: "Study Methods",
    phase: 1,
    level: "Fundamental",
    passingScore: 80,
    estimatedTime: "25-35 minutes",
    timedModeMinutes: 25,
    speedModeMinutes: 12,
    learningOutcomes: [
      "Select appropriate hands for review",
      "Analyze hands objectively and thoroughly",
      "Identify decision-making errors",
      "Extract actionable lessons from hands",
      "Track patterns across multiple reviews"
    ],
    nextModule: {
      id: "9.2",
      title: "Video Content Study"
    }
  },
  sections: [
    {
      id: "conceptual",
      title: "Section A: Conceptual Understanding",
      description: "Test your understanding of hand review principles",
      weight: 20,
      questions: [
        {
          id: "9.1-c1",
          type: "multiple-choice",
          topic: "9.1.1 Hand Selection for Review",
          question: "Which type of hand is MOST valuable to review for learning purposes?",
          options: [
            "Big winning hands where you played perfectly",
            "Hands where you were uncertain about the best decision",
            "Huge bad beats that cost you stacks",
            "Routine hands that went as expected"
          ],
          correctAnswer: 1,
          explanation: "Hands with UNCERTAINTY are the goldmine for learning. These are spots where you weren't sure of the best play—that's where improvement lives. Reviewing obvious good plays teaches nothing. Bad beats are usually just variance. Uncertain hands reveal the edges of your knowledge and highlight what you need to study. Focus your review time where learning potential is highest.",
          difficulty: "medium",
          points: 1
        },
        {
          id: "9.1-c2",
          type: "true-false",
          topic: "9.1.1 Hand Selection for Review",
          question: "You should prioritize reviewing hands based on the size of the pot rather than the complexity of decisions.",
          correctAnswer: false,
          explanation: "FALSE. Big pots can be trivial decisions (AA all-in preflop = no review needed), while small pots can have complex, instructive decisions. Review based on LEARNING VALUE: Were you uncertain? Did you make a close decision? Was there a strategic concept involved? Pot size is irrelevant to educational value. Don't fall into results-oriented hand selection.",
          difficulty: "medium",
          points: 1
        },
        {
          id: "9.1-c3",
          type: "multiple-choice",
          topic: "9.1.2 Review Framework",
          question: "What is the FIRST step when reviewing a hand?",
          options: [
            "Look at the results to see if you won or lost",
            "Recreate the situation: what information did you have at decision point?",
            "Ask other players what they would do",
            "Calculate the exact math and ranges"
          ],
          correctAnswer: 1,
          explanation: "START by recreating the decision point. What information did you have? What was your thought process? What options were available? This focuses review on the decision, not the outcome. Only THEN analyze ranges, math, and alternatives. Looking at results first creates bias. Put yourself back in the moment before analyzing with hindsight.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "9.1-c4",
          type: "true-false",
          topic: "9.1.2 Review Framework",
          question: "If your play won a big pot, there's no need to review that hand since you made the right decision.",
          correctAnswer: false,
          explanation: "Massively false! Winning doesn't mean you played correctly. You can make terrible plays and get lucky. Review winning hands where you were uncertain, got lucky, or won despite questionable play. Sometimes your worst mistakes show profit in the short run. Results-oriented thinking ('I won so it was right') kills learning. Focus on decision quality, not outcomes.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "9.1-c5",
          type: "multiple-choice",
          topic: "9.1.5 Lesson Extraction",
          question: "After reviewing a hand, what is the most important thing to extract?",
          options: [
            "A specific memory of that exact hand",
            "A generalizable lesson you can apply to similar future situations",
            "Confirmation that you're a good/bad player",
            "The exact cards your opponent had"
          ],
          correctAnswer: 1,
          explanation: "Extract GENERALIZABLE lessons. The goal isn't memorizing one hand—it's learning a principle to apply across many similar spots. Example: Don't just note 'I should have bet here,' but 'When IP on dry boards vs fish, I should bet range for value and denial.' Principles > specific hands. Build a mental library of transferable concepts.",
          difficulty: "medium",
          points: 1
        },
        {
          id: "9.1-c6",
          type: "multiple-choice",
          topic: "9.1.6 Review Tools & Methods",
          question: "What is the primary benefit of posting hands in forums or study groups for review?",
          options: [
            "To show off your good plays",
            "To get multiple perspectives and challenge your assumptions",
            "To prove you're right and others are wrong",
            "To find people who agree with you"
          ],
          correctAnswer: 1,
          explanation: "Multiple perspectives break you out of confirmation bias. Other players will challenge your assumptions, point out options you didn't consider, and provide different strategic frameworks. The value is in being CHALLENGED, not validated. Be open to criticism. The best reviewers seek people who will tell them they're wrong, not affirm they're right.",
          difficulty: "hard",
          points: 1
        }
      ]
    },
    {
      id: "application",
      title: "Section B: Application Skills",
      description: "Apply hand review techniques to realistic scenarios",
      weight: 35,
      questions: [
        {
          id: "9.1-a1",
          type: "scenario",
          topic: "9.1.1 Hand Selection for Review",
          scenario: "You played 500 hands today. Which 3-5 hands should you prioritize for review tonight?",
          question: "What selection criteria should guide your choice?",
          options: [
            "The 3 biggest pots you won",
            "The 3 biggest pots you lost",
            "Hands where you felt uncertain, made close decisions, or spotted potential mistakes",
            "Random hands to get a representative sample"
          ],
          correctAnswer: 2,
          explanation: "Select based on LEARNING POTENTIAL: uncertainty, close decisions, potential mistakes, spots outside your comfort zone. These hands reveal knowledge gaps. Big pots won/lost are often variance or obvious plays. You might review: a thin value bet decision, a spot where you weren't sure whether to bluff, a hand you suspect you overfolded. Uncertainty = learning opportunity.",
          difficulty: "easy",
          points: 2
        },
        {
          id: "9.1-a2",
          type: "scenario",
          topic: "9.1.4 Common Mistakes to Find",
          scenario: "Reviewing a hand: You opened QJo from MP, got 3-bet by the button, and called. You check-folded on K72 rainbow to a c-bet.",
          question: "What is the likely mistake in this hand?",
          options: [
            "The flop fold was too tight",
            "Opening QJo from MP is marginal; calling the 3-bet is likely the main error",
            "You should have 4-bet preflop",
            "No mistakes—reasonable hand"
          ],
          correctAnswer: 1,
          explanation: "The primary mistake is calling the 3-bet with QJo from MP vs button 3-bet. QJo plays poorly in 3-bet pots (dominated by better broadways, hard to flop strong hands). You should either 4-bet as a bluff or fold. The call puts you in a tough spot out of position. The flop fold is fine given your mistake preflop. Identify the FIRST error in the decision tree.",
          difficulty: "hard",
          points: 2
        },
        {
          id: "9.1-a3",
          type: "scenario",
          topic: "9.1.3 Analysis Techniques",
          scenario: "You're reviewing a river decision where you had a bluff-catcher facing a large bet. You called and won when villain showed a bluff.",
          question: "How should you analyze this decision?",
          options: [
            "You won, so the call was correct—move on",
            "Analyze pot odds vs villain's bluffing frequency to see if call was theoretically correct",
            "Results don't matter—focus on whether you could beat any value hands",
            "Always call river in this spot since you won this time"
          ],
          correctAnswer: 1,
          explanation: "Ignore the outcome; analyze theoretically. Calculate: What pot odds am I getting? What's villain's bluffing frequency in this spot based on their range and tendencies? Does the math support calling? Winning doesn't validate the call—maybe villain overbluffed this time. Objective analysis: pot odds vs. estimated bluffing frequency. This skill transfers to future spots.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "9.1-a4",
          type: "scenario",
          topic: "9.1.2 Review Framework",
          scenario: "You review a hand where you bluffed river with air and got called. You're frustrated and think 'I should never bluff this player.'",
          question: "What is wrong with this analysis?",
          options: [
            "Nothing—getting called means bluffing was wrong",
            "It's results-oriented; should analyze if the bluff had positive expectation given what you knew",
            "You should bluff more next time to balance",
            "The player is a calling station—you identified the right lesson"
          ],
          correctAnswer: 1,
          explanation: "Classic results-oriented thinking. Getting called once doesn't make the bluff wrong. Analyze: Given villain's range, frequencies, and tendencies known AT THE TIME, did the bluff have +EV? If villain calls 40% and you need 33%, it's still correct even when you get called. One outcome doesn't determine correctness. Process > results. Avoid sweeping conclusions from single hands.",
          difficulty: "hard",
          points: 2
        },
        {
          id: "9.1-a5",
          type: "multiple-choice",
          topic: "9.1.6 Review Tools & Methods",
          question: "What is an effective way to review hands when you're not sure about the best play?",
          options: [
            "Forget about it—you'll never know the answer",
            "Use solver software, post in forums, or discuss with a coach/study group",
            "Go with your gut feeling and move on",
            "Always assume you were right"
          ],
          correctAnswer: 1,
          explanation: "Leverage resources for difficult spots: Solvers (PioSOLVER, GTO+) show optimal play in specific scenarios. Forums (2+2, Reddit) provide community input. Study groups offer collaborative analysis. Coaches give expert guidance. Don't struggle alone with tough spots—use available tools. But understand WHY the play is correct, don't just memorize solver output.",
          difficulty: "easy",
          points: 2
        },
        {
          id: "9.1-a6",
          type: "scenario",
          topic: "9.1.5 Lesson Extraction",
          scenario: "You reviewed a hand where you check-raised the turn with a draw and got called by top pair. You missed the river and gave up. You realize your check-raise was too aggressive in this spot.",
          question: "What generalizable lesson should you extract?",
          options: [
            "'Never check-raise turns with draws'",
            "'Against this specific player, don't bluff'",
            "'On turn with draws, consider board texture, opponent type, and equity before aggressive plays'",
            "'Check-raising is bad'"
          ],
          correctAnswer: 2,
          explanation: "Extract a NUANCED, generalizable principle. Blanket rules ('never check-raise draws') are wrong—context matters. The lesson: evaluate board texture (is it draw-heavy?), opponent type (do they fold to aggression?), your equity (do you have backup when called?). Build decision frameworks, not absolute rules. Apply this analysis to all future turn decisions with draws.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "9.1-a7",
          type: "scenario",
          topic: "9.1.3 Analysis Techniques",
          scenario: "Reviewing a hand street-by-street, you notice you made a good preflop decision and a good flop decision, but made a mistake on the turn that led to a river disaster.",
          question: "What does this teach you about hand review?",
          options: [
            "Just review the river since that's where you lost money",
            "Street-by-street analysis helps identify WHERE in the hand things went wrong",
            "Review all streets equally regardless of where the mistake occurred",
            "Preflop and flop don't matter if you lose on river"
          ],
          correctAnswer: 1,
          explanation: "Street-by-street analysis isolates WHERE mistakes happen. The river disaster was a consequence of the turn mistake. If you only reviewed the river, you'd miss the root cause. By breaking down each street, you pinpoint decision points and see how earlier mistakes cascade. This helps you fix leaks at their source rather than treating symptoms.",
          difficulty: "medium",
          points: 2
        }
      ]
    },
    {
      id: "practical",
      title: "Section C: Practical Scenarios",
      description: "Make effective hand review decisions in realistic situations",
      weight: 35,
      questions: [
        {
          id: "9.1-p1",
          type: "scenario",
          topic: "9.1.4 Common Mistakes to Find",
          scenario: "Hand review: UTG raises, you call on button with 77. Flop comes Q-9-3 rainbow. UTG bets 60% pot, you call. Turn 2, UTG bets 75% pot, you fold.",
          question: "What is the most likely strategic mistake?",
          options: [
            "The turn fold was too weak",
            "Calling flop with one overcard is the main mistake",
            "Should have raised the flop",
            "Should have 3-bet preflop with 77"
          ],
          correctAnswer: 1,
          explanation: "Calling flop with one pair facing aggression on this board is marginal. UTG's range hits this flop (QQ+, AQ, KQ, AJ, TT+), you're often behind, and you have no equity advantage. The turn fold is reasonable given your flop call. The ROOT mistake is the flop call. With 77 on Q-high, consider folding flop vs tight opener unless you have specific reads suggesting they're bluffing or value-betting wide.",
          difficulty: "hard",
          points: 2
        },
        {
          id: "9.1-p2",
          type: "scenario",
          topic: "9.1.1 Hand Selection for Review",
          scenario: "After a session, you're choosing which hands to review: Hand A) Lost $300 pot with AA vs a bad beat. Hand B) Won $50 pot but were unsure if your thin value bet was correct. Hand C) Routine fold preflop.",
          question: "Which hand should you prioritize?",
          options: [
            "Hand A—biggest loss needs review",
            "Hand B—uncertainty indicates learning opportunity",
            "Hand C—reviewing folds is important too",
            "All three equally"
          ],
          correctAnswer: 1,
          explanation: "Hand B is the clear priority. The uncertainty about thin value betting is a strategic decision worth analyzing. Hand A (AA bad beat) is likely just variance—no learning value unless you misplayed it. Hand C (routine fold) is autopilot. ALWAYS prioritize hands where you were uncertain or made close decisions. That's where your edge improves.",
          difficulty: "easy",
          points: 2
        },
        {
          id: "9.1-p3",
          type: "scenario",
          topic: "9.1.6 Review Tools & Methods",
          scenario: "You're analyzing a complex 3-bet pot where you're unsure if your line was correct. You have poker tracking software, a solver, and access to a study group.",
          question: "What is the most effective review process?",
          options: [
            "Just use the solver and copy its output",
            "1) Analyze yourself, 2) Check solver for baseline, 3) Discuss in study group for context",
            "Only ask the study group—solvers aren't realistic",
            "Skip review if it's too complex"
          ],
          correctAnswer: 1,
          explanation: "Layered approach is best: (1) Self-analysis first—think through the hand yourself to engage critically. (2) Solver check—see GTO baseline and compare to your thinking. (3) Study group—discuss practical adjustments, opponent types, and real-game applications. This combines self-reliance, theoretical foundation, and practical wisdom. Don't just copy solver output—understand WHY.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "9.1-p4",
          type: "scenario",
          topic: "9.1.5 Lesson Extraction",
          scenario: "You reviewed 10 hands this week and noticed a pattern: you consistently overfolded to river aggression when you had bluff-catchers.",
          question: "What should you do with this insight?",
          options: [
            "Note it and forget about it",
            "Create an action item: study calling down frequencies, practice bluff-catching, revisit this in a month",
            "Start calling every river bet to fix it",
            "Ignore it—rivers are unpredictable anyway"
          ],
          correctAnswer: 1,
          explanation: "Turn insights into ACTION ITEMS. You've identified a leak (overfolding rivers). Now: (1) Study bluff-catching theory (pot odds, frequencies), (2) Practice in-game, (3) Review progress in a month. Track patterns across reviews—recurring mistakes are your biggest leaks. Create specific study plans to address them. Review without action is wasted time.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "9.1-p5",
          type: "scenario",
          topic: "9.1.2 Review Framework",
          scenario: "Reviewing a hand where you made a hero call with third pair and were right—villain was bluffing. Your study partner says 'Great call!' and moves on.",
          question: "What should you actually analyze?",
          options: [
            "Nothing—you were right, move on",
            "Was the call profitable based on pot odds vs villain's range, or did you get lucky?",
            "How you knew villain was bluffing—trust your reads",
            "Celebrate the good call and build confidence"
          ],
          correctAnswer: 1,
          explanation: "Even when right, ask: Was this call +EV given what I knew? Or did I get lucky? Calculate pot odds vs. villain's actual bluffing frequency in this spot. Maybe you needed 33% and they bluff 20%—then it was a bad call that happened to work. Or maybe it was genuinely profitable. Don't let a correct outcome prevent critical analysis.",
          difficulty: "hard",
          points: 2
        },
        {
          id: "9.1-p6",
          type: "scenario",
          topic: "9.1.3 Analysis Techniques",
          scenario: "You're reviewing a hand where you bet flop and turn with top pair, then checked river. You're using range analysis and realize villain's range smashes the river card.",
          question: "What lesson should this teach you?",
          options: [
            "Never check river with top pair",
            "Board texture evolution matters—adjust your plan as cards come",
            "Always bet three streets for value with top pair",
            "River checks show weakness"
          ],
          correctAnswer: 1,
          explanation: "This teaches DYNAMIC BOARD READING. What was a good betting hand on flop/turn may become a check on certain rivers (completing draws, favoring villain's range). Poker isn't static—reassess each street based on new information. Your river check demonstrates sophisticated board awareness. Generalize: always consider how new cards change range advantages before acting.",
          difficulty: "medium",
          points: 2
        },
        {
          id: "9.1-p7",
          type: "scenario",
          topic: "9.1.4 Common Mistakes to Find",
          scenario: "You notice you frequently make hands interesting by getting creative with bluffs in spots where straightforward value betting would be more profitable.",
          question: "What does this pattern indicate?",
          options: [
            "You're a creative, advanced player",
            "You're likely making -EV plays due to boredom or ego (fancy play syndrome)",
            "Bluffing is always good—keep it up",
            "This shows strong hand-reading ability"
          ],
          correctAnswer: 1,
          explanation: "This is 'Fancy Play Syndrome'—making creative plays for ego/entertainment rather than profit. Often driven by boredom with straightforward play or desire to feel clever. If value betting is more profitable, do that. Poker isn't about style points. Recognize when you're playing for fun/ego vs. maximal EV. Sometimes boring is best. Fix this leak by focusing on EV, not creativity.",
          difficulty: "hard",
          points: 2
        }
      ]
    },
    {
      id: "speed",
      title: "Section D: Speed Round",
      description: "Quick hand review principles",
      weight: 10,
      timed: true,
      timePerQuestion: 15,
      questions: [
        {
          id: "9.1-s1",
          type: "quick-calc",
          topic: "9.1.1 Hand Selection for Review",
          question: "Select hands for review based on? (Results/Uncertainty)",
          correctAnswer: "Uncertainty",
          acceptableAnswers: ["Uncertainty", "uncertainty", "Learning potential", "Complexity", "Difficult decisions"],
          explanation: "Review hands where you were uncertain, not based on pot size or results.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "9.1-s2",
          type: "quick-calc",
          topic: "9.1.2 Review Framework",
          question: "Should you look at results before analyzing? (Yes/No)",
          correctAnswer: "No",
          acceptableAnswers: ["No", "no", "N"],
          explanation: "No—recreate the decision point first to avoid results-oriented thinking.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "9.1-s3",
          type: "quick-calc",
          topic: "9.1.5 Lesson Extraction",
          question: "Extract what from hand reviews? (Specific/General)",
          correctAnswer: "General",
          acceptableAnswers: ["General", "general", "Generalizable lessons", "Principles", "Concepts"],
          explanation: "Extract generalizable principles, not memories of specific hands.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "9.1-s4",
          type: "quick-calc",
          topic: "9.1.3 Analysis Techniques",
          question: "Best analysis approach? (Street-by-street/All at once)",
          correctAnswer: "Street-by-street",
          acceptableAnswers: ["Street-by-street", "street by street", "Each street", "Street-by-street"],
          explanation: "Analyze street-by-street to isolate where decisions went wrong.",
          difficulty: "easy",
          points: 1
        },
        {
          id: "9.1-s5",
          type: "quick-calc",
          topic: "9.1.6 Review Tools & Methods",
          question: "Name one hand review tool/resource.",
          correctAnswer: "Solver",
          acceptableAnswers: ["Solver", "solver", "Forum", "Study group", "Coach", "PioSOLVER", "GTO+", "2+2"],
          explanation: "Solvers, forums, study groups, and coaches are all valuable review resources.",
          difficulty: "easy",
          points: 1
        }
      ]
    }
  ]
};

export default handReviewQuiz;
