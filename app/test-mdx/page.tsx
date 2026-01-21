'use client';

import { Exercise } from '@/components/content/Exercise';
import { MultiExercise } from '@/components/content/MultiExercise';
import { KeyConcept } from '@/components/content/KeyConcept';
import { FlashCards } from '@/components/content/FlashCards';
import { Scenario } from '@/components/content/Scenario';
import { Calculator } from '@/components/content/Calculator';
import { Comparison } from '@/components/content/Comparison';
import { QuizLink } from '@/components/content/QuizLink';
import { ContentProvider } from '@/components/content/ContentContext';
import { useProgressStore } from '@/lib/progressStore';

// Debug component to show current progress
function ProgressDebug({ skillId }: { skillId: string }) {
  const contentProgress = useProgressStore((state) => state.contentProgress);
  const progress = contentProgress[skillId];

  if (!progress) return <div className="text-slate-400">No progress yet</div>;

  return (
    <div className="bg-slate-800 rounded-lg p-4 font-mono text-sm">
      <pre className="text-slate-300">
        {JSON.stringify(progress, null, 2)}
      </pre>
    </div>
  );
}

export default function TestMDX() {
  return (
    <ContentProvider skillId="test" exercisesTotal={6} scenariosTotal={1}>
      <div className="p-8 max-w-3xl mx-auto space-y-12">
        <h1 className="text-3xl font-bold text-white">MDX Component Test</h1>

      {/* Existing Components */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-amber-400">KeyConcept</h2>
        <KeyConcept title="Test Concept">
          This is a key concept box. It should stand out visually.
        </KeyConcept>

        <KeyConcept variant="formula" title="Pot Odds Formula">
          Pot Odds = Pot Size : Call Amount
        </KeyConcept>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-amber-400">Exercise</h2>
        <Exercise
          question="The pot is $100 and you need to call $25. What are your pot odds as a ratio?"
          type="text"
          answer="4:1"
          acceptableAnswers={["4:1", "4 to 1", "4-1"]}
          hint="Divide the pot by the call amount"
          explanation="Pot odds = $100 : $25 = 4:1. You're getting 4-to-1 on your call."
        />

        <Exercise
          question="You have 9 outs on the flop facing an all-in. Using the Rule of 4, what's your equity?"
          type="number"
          answer={36}
          acceptableRange={[35, 37]}
          unit="%"
          explanation="9 outs × 4 = 36%. The Rule of 4 estimates your chance of hitting by the river."
        />

        <Exercise
          question="Which type of bet gives you the best pot odds?"
          type="multiple-choice"
          options={["Half-pot bet", "Pot-sized bet", "2x pot overbet"]}
          answer="Half-pot bet"
          explanation="Smaller bets give better pot odds. Half-pot = 3:1 (25%), Pot = 2:1 (33%), 2x pot = 1.5:1 (40%)."
        />
      </section>

      {/* New Components */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-amber-400">MultiExercise</h2>
        <MultiExercise
          title="Quick Pot Odds Practice"
          exercises={[
            { question: "Pot $100, bet $50. Pot odds?", answer: "3:1", explanation: "$150 : $50 = 3:1" },
            { question: "Pot $80, bet $80. Pot odds?", answer: "2:1", explanation: "$160 : $80 = 2:1" },
            { question: "Pot $60, bet $20. Pot odds?", answer: "4:1", explanation: "$80 : $20 = 4:1" },
          ]}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-amber-400">FlashCards</h2>
        <FlashCards
          title="Common Bet Sizes & Pot Odds"
          cards={[
            { front: "Half-pot bet", back: "3:1 odds (25% equity needed)" },
            { front: "2/3 pot bet", back: "2.5:1 odds (29% equity needed)" },
            { front: "Pot-sized bet", back: "2:1 odds (33% equity needed)" },
            { front: "2x pot overbet", back: "1.5:1 odds (40% equity needed)" },
          ]}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-amber-400">Scenario</h2>
        <Scenario
          title="Should You Call This Bet?"
          setup="You have 7♥6♥ on a K♥9♥2♣ board. The pot is $75 and your opponent bets $25."
          steps={[
            {
              question: "What are your pot odds?",
              answer: "4:1",
              hint: "Add bet to pot, then divide by call amount",
              explanation: "Pot after bet = $75 + $25 = $100. Call = $25. Odds = $100:$25 = 4:1"
            },
            {
              question: "How many outs do you have?",
              answer: "9",
              hint: "Count remaining hearts",
              explanation: "You have a flush draw. 13 hearts - 4 visible = 9 outs"
            },
            {
              question: "What's your equity using Rule of 2?",
              answer: "18%",
              hint: "Multiply outs by 2",
              explanation: "9 outs × 2 = 18% chance to hit on the turn"
            },
            {
              question: "Should you call? (yes/no)",
              answer: "no",
              explanation: "You need 20% equity (4:1 odds) but only have 18%. Pure pot odds say fold, but implied odds might justify a call."
            }
          ]}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-amber-400">Calculator</h2>
        <Calculator type="pot-odds" />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-amber-400">Comparison</h2>
        <Comparison
          title="When to Use Rule of 2 vs Rule of 4"
          left={{
            title: "Rule of 2",
            items: [
              "One card to come",
              "Turn → River",
              "Facing a non-all-in bet",
              "Multiply outs × 2"
            ]
          }}
          right={{
            title: "Rule of 4",
            items: [
              "Two cards to come",
              "Flop → River",
              "Facing an all-in bet",
              "Multiply outs × 4"
            ]
          }}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-amber-400">QuizLink</h2>
        <QuizLink moduleId="1.1" />
      </section>

      {/* Progress Debug */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-amber-400">Progress Debug</h2>
        <ProgressDebug skillId="test" />
      </section>
    </div>
    </ContentProvider>
  );
}
