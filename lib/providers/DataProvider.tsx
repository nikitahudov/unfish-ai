'use client';

import React, { createContext, useContext, useEffect } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import { useData } from '@/lib/hooks/useData';

interface DataContextType {
  isReady: boolean;
}

const DataContext = createContext<DataContextType>({ isReady: false });

export function DataProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { recordLogin, isLoading: dataLoading } = useData();

  // Record login when user authenticates
  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      recordLogin();
    }
  }, [isAuthenticated, authLoading, recordLogin]);

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
