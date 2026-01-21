import type { MDXComponents } from 'mdx/types'
import { Exercise } from '@/components/content/Exercise'
import { MultiExercise } from '@/components/content/MultiExercise'
import { KeyConcept } from '@/components/content/KeyConcept'
import { FlashCards } from '@/components/content/FlashCards'
import { Scenario } from '@/components/content/Scenario'
import { Calculator } from '@/components/content/Calculator'
import { Comparison } from '@/components/content/Comparison'
import { QuizLink } from '@/components/content/QuizLink'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Exercise,
    MultiExercise,
    KeyConcept,
    FlashCards,
    Scenario,
    Calculator,
    Comparison,
    QuizLink,
    ...components,
  }
}
