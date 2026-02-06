import React from 'react';
import { Exercise } from './Exercise';
import { MultiExercise } from './MultiExercise';
import { KeyConcept } from './KeyConcept';
import { FlashCards } from './FlashCards';
import { Scenario } from './Scenario';
import { Calculator } from './Calculator';
import { Comparison } from './Comparison';
import { QuizLink } from './QuizLink';

export const mdxComponents = {
  Exercise,
  MultiExercise,
  KeyConcept,
  FlashCards,
  Scenario,
  Calculator,
  Comparison,
  QuizLink,
  // Override default HTML elements for styling
  h1: (props: any) => <h1 className="text-3xl font-bold text-white mt-8 mb-4" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-semibold text-white mt-8 mb-3" {...props} />,
  h3: (props: any) => <h3 className="text-xl font-medium text-white mt-6 mb-2" {...props} />,
  p: (props: any) => <p className="text-slate-300 mb-4 leading-relaxed" {...props} />,
  ul: (props: any) => <ul className="text-slate-300 mb-4 ml-6 list-disc space-y-1" {...props} />,
  ol: (props: any) => <ol className="text-slate-300 mb-4 ml-6 list-decimal space-y-1" {...props} />,
  li: (props: any) => <li className="text-slate-300" {...props} />,
  strong: (props: any) => <strong className="text-white font-semibold" {...props} />,
  em: (props: any) => <em className="text-amber-400" {...props} />,
  code: (props: any) => <code className="bg-slate-700 px-1.5 py-0.5 rounded text-amber-400 text-sm" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-amber-500 pl-4 my-4 text-slate-400 italic" {...props} />
  ),
  hr: () => <hr className="border-slate-700 my-8" />,
};
