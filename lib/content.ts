import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface ContentFrontmatter {
  id: string;
  title: string;
  category: string;
  level: 'Fundamental' | 'Intermediate' | 'Advanced';
  prerequisites: string[];
  estimatedTime: string;
  exercisesTotal: number;
  scenariosTotal: number;
}

export async function getSkillContent(skillId: string): Promise<{
  frontmatter: ContentFrontmatter;
  content: string;
} | null> {
  try {
    // Convert "1.1" to "1-1" format for filename
    const fileName = skillId.replace('.', '-');
    const filePath = path.join(process.cwd(), 'content', 'skills', `${fileName}.mdx`);

    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      frontmatter: data as ContentFrontmatter,
      content,
    };
  } catch (error) {
    console.error(`Error loading content for ${skillId}:`, error);
    return null;
  }
}

export function getAvailableContent(): string[] {
  try {
    const contentDir = path.join(process.cwd(), 'content', 'skills');
    if (!fs.existsSync(contentDir)) {
      return [];
    }

    const files = fs.readdirSync(contentDir);
    return files
      .filter(file => file.endsWith('.mdx'))
      .map(file => file.replace('.mdx', '').replace('-', '.'));
  } catch (error) {
    console.error('Error reading content directory:', error);
    return [];
  }
}

export function hasContent(skillId: string): boolean {
  const fileName = skillId.replace('.', '-');
  const filePath = path.join(process.cwd(), 'content', 'skills', `${fileName}.mdx`);
  return fs.existsSync(filePath);
}
