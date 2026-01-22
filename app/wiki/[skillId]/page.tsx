'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getSkillById, getCategoryBySkillId } from '@/data/skills';
import { hasQuiz } from '@/data/quizRegistry';
import { ContentProvider } from '@/components/content/ContentContext';
import { KeyConcept } from '@/components/content/KeyConcept';
import { QuizLink } from '@/components/content/QuizLink';

export default function SkillContentPage() {
  const params = useParams();
  const skillId = params.skillId as string;

  const skill = getSkillById(skillId);
  const category = getCategoryBySkillId(skillId);

  if (!skill) {
    return (
      <div className="p-8 max-w-3xl mx-auto text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Skill Not Found</h1>
        <p className="text-slate-400 mb-6">The skill &quot;{skillId}&quot; does not exist.</p>
        <Link href="/wiki" className="text-amber-400 hover:text-amber-300">
          ← Back to Curriculum
        </Link>
      </div>
    );
  }

  return (
    <ContentProvider skillId={skillId} exercisesTotal={0} scenariosTotal={0}>
      <div className="p-6 md:p-8 max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
          <Link href="/wiki" className="hover:text-white">Curriculum</Link>
          <span>/</span>
          <span className="text-slate-500">{category}</span>
          <span>/</span>
          <span className="text-white">{skill.name}</span>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-2 py-1 bg-amber-500/20 text-amber-400 text-sm font-mono rounded">
              {skill.id}
            </span>
            <span className={`px-2 py-1 text-xs rounded ${
              skill.level === 'Fundamental' ? 'bg-emerald-500/20 text-emerald-400' :
              skill.level === 'Intermediate' ? 'bg-amber-500/20 text-amber-400' :
              'bg-rose-500/20 text-rose-400'
            }`}>
              {skill.level}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">{skill.name}</h1>
          <p className="text-slate-400">{skill.description}</p>
        </header>

        {/* Placeholder Content */}
        <div className="prose prose-invert max-w-none">
          <KeyConcept title="Content Coming Soon">
            The detailed learning content for <strong>{skill.name}</strong> is being developed.
            In the meantime, you can take the quiz to test your existing knowledge.
          </KeyConcept>

          <div className="my-8 p-6 bg-slate-800/50 rounded-xl border border-slate-700/50">
            <h2 className="text-xl font-semibold text-white mb-4">What You&apos;ll Learn</h2>
            <p className="text-slate-300 mb-4">{skill.description}</p>
          </div>

          {/* Quiz Link */}
          {hasQuiz(skillId) && (
            <div className="my-8">
              <h2 className="text-xl font-semibold text-white mb-4">Ready to Test Your Knowledge?</h2>
              <QuizLink moduleId={skillId} />
            </div>
          )}
        </div>

        {/* Navigation */}
        <footer className="mt-12 pt-6 border-t border-slate-700/50 flex justify-between">
          <Link
            href="/wiki"
            className="text-slate-400 hover:text-white transition-colors"
          >
            ← Back to Curriculum
          </Link>
          {hasQuiz(skillId) && (
            <Link
              href={`/assess/quiz/${skillId}`}
              className="text-amber-400 hover:text-amber-300 transition-colors"
            >
              Take Quiz →
            </Link>
          )}
        </footer>
      </div>
    </ContentProvider>
  );
}
