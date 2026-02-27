'use client';

import React, { createContext, useContext, useEffect, useRef } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import { useData } from '@/lib/hooks/useData';

interface DataContextType {
  isReady: boolean;
}

const DataContext = createContext<DataContextType>({ isReady: false });

export function DataProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { recordLogin, isLoading: dataLoading } = useData();

  // Use a ref so the effect doesn't re-fire when recordLogin's identity
  // changes, and a flag to ensure login is only recorded once per session.
  const recordLoginRef = useRef(recordLogin);
  recordLoginRef.current = recordLogin;
  const hasRecordedLoginRef = useRef(false);

  // Record login once when user authenticates
  useEffect(() => {
    if (isAuthenticated && !authLoading && !hasRecordedLoginRef.current) {
      hasRecordedLoginRef.current = true;
      recordLoginRef.current();
    }
  }, [isAuthenticated, authLoading]);

  // Reset the flag when the user logs out so the next login is recorded
  useEffect(() => {
    if (!isAuthenticated) {
      hasRecordedLoginRef.current = false;
    }
  }, [isAuthenticated]);

  const isReady = !authLoading && (!isAuthenticated || !dataLoading);

  return (
    <DataContext.Provider value={{ isReady }}>
      {children}
    </DataContext.Provider>
  );
}

export function useDataReady() {
  return useContext(DataContext);
}
