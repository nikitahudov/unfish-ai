'use client';

import Link from 'next/link';
import { useProgressStore } from '@/lib/progressStore';

interface QuizLinkProps {
  moduleId: string;
}

export function QuizLink({ moduleId }: QuizLinkProps) {
  const getSkillStatus = useProgressStore((state) => state.getSkillStatus);
  const skillStatus = getSkillStatus(moduleId);

  const getStatusDisplay = () => {
    switch (skillStatus.status) {
      case 'not_started':
        return {
          text: 'Take the Quiz',
          icon: '→',
          detail: '',
          gradient: 'from-amber-500 to-amber-600',
        };
      case 'in_progress':
        return {
          text: 'Continue Quiz',
          icon: '→',
          detail: `Best: ${skillStatus.bestScore}%`,
          gradient: 'from-blue-500 to-blue-600',
        };
      case 'completed':
        return {
          text: 'Quiz Passed',
          icon: '✓',
          detail: `Best: ${skillStatus.bestScore}% - Retake?`,
          gradient: 'from-green-500 to-green-600',
        };
      default:
        return {
          text: 'Take the Quiz',
          icon: '→',
          detail: '',
          gradient: 'from-amber-500 to-amber-600',
        };
    }
  };

  const display = getStatusDisplay();

  return (
    <Link href={`/assess/quiz/${moduleId}`}>
      <div
        className={`
          relative overflow-hidden rounded-lg p-6
          bg-gradient-to-r ${display.gradient}
          hover:opacity-90 transition-opacity cursor-pointer
          shadow-lg hover:shadow-xl
        `}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white font-semibold text-lg mb-1">
              {display.text} {display.icon}
            </p>
            {display.detail && (
              <p className="text-white/90 text-sm">
                {display.detail}
              </p>
            )}
          </div>

          {skillStatus.attempts > 0 && (
            <div className="text-right text-white/90">
              <p className="text-xs">Attempts</p>
              <p className="text-2xl font-bold">{skillStatus.attempts}</p>
            </div>
          )}
        </div>

        {/* Optional decorative element */}
        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full" />
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full" />
      </div>
    </Link>
  );
}
