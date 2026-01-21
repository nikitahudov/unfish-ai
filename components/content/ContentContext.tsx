'use client';

import React, { createContext, useContext, useEffect, useRef } from 'react';
import { useProgressStore } from '@/lib/progressStore';

interface ContentContextType {
  skillId: string;
  onExerciseComplete: () => void;
  onScenarioComplete: () => void;
  onFlashcardsReviewed: () => void;
}

const ContentContext = createContext<ContentContextType | null>(null);

interface ContentProviderProps {
  skillId: string;
  exercisesTotal: number;
  scenariosTotal: number;
  children: React.ReactNode;
}

export function ContentProvider({
  skillId,
  exercisesTotal,
  scenariosTotal,
  children
}: ContentProviderProps) {
  const {
    initContentProgress,
    updateTimeSpent,
    recordExerciseComplete,
    recordScenarioComplete,
    markFlashcardsReviewed
  } = useProgressStore();

  const startTimeRef = useRef<number>(Date.now());
  const lastUpdateRef = useRef<number>(Date.now());

  // Initialize content progress on mount
  useEffect(() => {
    initContentProgress(skillId, exercisesTotal, scenariosTotal);
    startTimeRef.current = Date.now();
    lastUpdateRef.current = Date.now();
  }, [skillId, exercisesTotal, scenariosTotal, initContentProgress]);

  // Track time spent
  useEffect(() => {
    // Update time every 30 seconds while page is visible
    const interval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        const now = Date.now();
        const elapsed = Math.floor((now - lastUpdateRef.current) / 1000);
        if (elapsed > 0) {
          updateTimeSpent(skillId, elapsed);
          lastUpdateRef.current = now;
        }
      }
    }, 30000);

    // Update time on visibility change (when user leaves tab)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        const now = Date.now();
        const elapsed = Math.floor((now - lastUpdateRef.current) / 1000);
        if (elapsed > 0) {
          updateTimeSpent(skillId, elapsed);
          lastUpdateRef.current = now;
        }
      }
    };

    // Update time on page unload
    const handleBeforeUnload = () => {
      const now = Date.now();
      const elapsed = Math.floor((now - lastUpdateRef.current) / 1000);
      if (elapsed > 0) {
        updateTimeSpent(skillId, elapsed);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);

      // Save final time on unmount
      const now = Date.now();
      const elapsed = Math.floor((now - lastUpdateRef.current) / 1000);
      if (elapsed > 0) {
        updateTimeSpent(skillId, elapsed);
      }
    };
  }, [skillId, updateTimeSpent]);

  const contextValue: ContentContextType = {
    skillId,
    onExerciseComplete: () => recordExerciseComplete(skillId),
    onScenarioComplete: () => recordScenarioComplete(skillId),
    onFlashcardsReviewed: () => markFlashcardsReviewed(skillId),
  };

  return (
    <ContentContext.Provider value={contextValue}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (!context) {
    // Return no-op functions if not in provider (for test page)
    return {
      skillId: '',
      onExerciseComplete: () => {},
      onScenarioComplete: () => {},
      onFlashcardsReviewed: () => {},
    };
  }
  return context;
}
