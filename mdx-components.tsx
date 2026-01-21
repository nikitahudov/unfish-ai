import type { MDXComponents } from 'mdx/types'
import { Exercise } from '@/components/content/Exercise'
import { KeyConcept } from '@/components/content/KeyConcept'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Exercise,
    KeyConcept,
    ...components,
  }
}
