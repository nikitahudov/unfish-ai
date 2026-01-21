'use client';

import { Exercise } from '@/components/content/Exercise';
import { KeyConcept } from '@/components/content/KeyConcept';

export default function TestMDX() {
  return (
    <div className="p-8 max-w-2xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-white">MDX Component Test</h1>

      <KeyConcept title="Test Concept">
        This is a key concept box. It should stand out visually.
      </KeyConcept>

      <KeyConcept variant="formula" title="Pot Odds Formula">
        Pot Odds = Pot Size : Call Amount
      </KeyConcept>

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
    </div>
  );
}
