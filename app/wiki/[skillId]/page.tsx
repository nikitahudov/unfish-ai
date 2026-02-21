import React from 'react';
import { notFound } from 'next/navigation';
import { compileMDX } from 'next-mdx-remote/rsc';
import { getSkillById, getCategoryBySkillId, getAllSkills } from '@/data/skills';
import { getSkillContent } from '@/lib/content';
import { hasQuiz } from '@/data/quizRegistry';
import { SkillContentClient } from './SkillContentClient';
import { mdxComponents } from '@/components/content/mdxComponents';

interface PageProps {
  params: Promise<{ skillId: string }>;
}

export default async function SkillContentPage({ params }: PageProps) {
  const { skillId } = await params;

  const skill = getSkillById(skillId);
  if (!skill) {
    notFound();
  }

  const categoryName = getCategoryBySkillId(skillId) || null;
  const contentData = await getSkillContent(skillId);

  let mdxContent: React.ReactElement | null = null;
  let frontmatter = null;

  if (contentData) {
    const result = await compileMDX({
      source: contentData.content,
      components: mdxComponents,
      options: {
        blockJS: false,
      },
    });
    mdxContent = result.content;
    frontmatter = contentData.frontmatter;
  }

  return (
    <SkillContentClient
      skill={skill}
      categoryName={categoryName}
      frontmatter={frontmatter}
      hasQuizAvailable={hasQuiz(skillId)}
    >
      {mdxContent && (
        <div className="prose prose-invert max-w-none">
          {mdxContent}
        </div>
      )}
    </SkillContentClient>
  );
}

// Generate static params for all skills (optional optimization)
export async function generateStaticParams() {
  const skills = getAllSkills();
  return skills.map((skill) => ({
    skillId: skill.id,
  }));
}
