'use client';

import React from 'react';
import Link from 'next/link';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { ContentProvider } from '@/components/content/ContentContext';
import { MDXContent } from '@/components/content/MDXContent';
import { KeyConcept } from '@/components/content/KeyConcept';
import { QuizLink } from '@/components/content/QuizLink';
import type { Skill } from '@/data/skills';
import type { ContentFrontmatter } from '@/lib/content';

interface SkillContentClientProps {
  skill: Skill;
  categoryName: string | null;
  mdxSource: MDXRemoteSerializeResult | null;
  frontmatter: ContentFrontmatter | null;
  hasQuizAvailable: boolean;
}

export function SkillContentClient({
  skill,
  categoryName,
  mdxSource,
  frontmatter,
  hasQuizAvailable,
}: SkillContentClientProps) {
  const exercisesTotal = frontmatter?.exercisesTotal || 0;
  const scenariosTotal = frontmatter?.scenariosTotal || 0;

  return (
    <ContentProvider
      skillId={skill.id}
      exercisesTotal={exercisesTotal}
      scenariosTotal={scenariosTotal}
    >
      <div className="p-6 md:p-8 max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
          <Link href="/wiki" className="hover:text-white transition-colors">
            Curriculum
          </Link>
          <span>/</span>
          <span className="text-slate-500">{categoryName || 'Unknown'}</span>
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
            {frontmatter && (
              <span className="px-2 py-1 bg-slate-700/50 text-slate-400 text-xs rounded">
                {frontmatter.estimatedTime}
              </span>
            )}
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">{skill.name}</h1>
          <p className="text-slate-400">{skill.description}</p>
        </header>

        {/* Content */}
        {mdxSource ? (
          <MDXContent source={mdxSource} />
        ) : (
          <div className="space-y-6">
            <KeyConcept title="Content Coming Soon">
              The detailed learning content for <strong>{skill.name}</strong> is being developed.
              {hasQuizAvailable && " In the meantime, you can take the quiz to test your existing knowledge."}
            </KeyConcept>

            <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700/50">
              <h2 className="text-xl font-semibold text-white mb-4">What You'll Learn</h2>
              <p className="text-slate-300 mb-4">{skill.description}</p>
            </div>

            {hasQuizAvailable && (
              <div>
                <h2 className="text-xl font-semibold text-white mb-4">Test Your Knowledge</h2>
                <QuizLink moduleId={skill.id} />
              </div>
            )}
          </div>
        )}

        {/* Footer Navigation */}
        <footer className="mt-12 pt-6 border-t border-slate-700/50 flex justify-between items-center">
          <Link
            href="/wiki"
            className="text-slate-400 hover:text-white transition-colors"
          >
            ← Back to Curriculum
          </Link>
          {hasQuizAvailable && (
            <Link
              href={`/assess/quiz/${skill.id}`}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors"
            >
              Take Quiz →
            </Link>
          )}
        </footer>
      </div>
    </ContentProvider>
  );
}
