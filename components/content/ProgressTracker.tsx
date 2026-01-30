'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import { useData } from '@/lib/hooks';

interface ProgressTrackerProps {
  skillId: string;
  skillName: string;
  children: React.ReactNode;
}

export function ProgressTracker({ skillId, skillName, children }: ProgressTrackerProps) {
  const { isAuthenticated } = useAuth();
  const { recordContentView, addStudyTime } = useData();
  const startTimeRef = useRef<number>(Date.now());
  const [hasRecordedView, setHasRecordedView] = useState(false);

  // Record view on mount (only once per session)
  useEffect(() => {
    if (isAuthenticated && !hasRecordedView) {
      recordContentView(skillId, skillName);
      setHasRecordedView(true);
    }
  }, [isAuthenticated, skillId, skillName, hasRecordedView, recordContentView]);

  // Track time spent on unmount or tab change
  useEffect(() => {
    if (!isAuthenticated) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        const timeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000);
        if (timeSpent > 5) { // Only record if > 5 seconds
          addStudyTime(skillId, timeSpent);
        }
        startTimeRef.current = Date.now();
      }
    };

    const handleBeforeUnload = () => {
      const timeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000);
      if (timeSpent > 5) {
        // Use sendBeacon for reliability on page unload
        navigator.sendBeacon?.('/api/track-time', JSON.stringify({
          skillId,
          seconds: timeSpent,
        }));
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);

      // Record time on unmount
      const timeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000);
      if (timeSpent > 5) {
        addStudyTime(skillId, timeSpent);
      }
    };
  }, [isAuthenticated, skillId, addStudyTime]);

  return <>{children}</>;
}
