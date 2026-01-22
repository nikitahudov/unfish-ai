import React from 'react';
import { notFound } from 'next/navigation';
import { serialize } from 'next-mdx-remote/serialize';
import { getSkillById, getCategoryBySkillId, getAllSkills } from '@/data/skills';
import { getSkillContent } from '@/lib/content';
import { hasQuiz } from '@/data/quizRegistry';
import { SkillContentClient } from './SkillContentClient';

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

  let mdxSource = null;
  let frontmatter = null;

  if (contentData) {
    mdxSource = await serialize(contentData.content);
    frontmatter = contentData.frontmatter;
  }

  return (
    <SkillContentClient
      skill={skill}
      categoryName={categoryName}
      mdxSource={mdxSource}
      frontmatter={frontmatter}
      hasQuizAvailable={hasQuiz(skillId)}
    />
  );
}

// Generate static params for all skills (optional optimization)
export async function generateStaticParams() {
  const skills = getAllSkills();
  return skills.map((skill) => ({
    skillId: skill.id,
  }));
}
