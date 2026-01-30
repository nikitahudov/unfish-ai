'use client';

import { useState, useEffect, useCallback } from 'react';

interface UseAsyncDataOptions<T> {
  initialData?: T;
  enabled?: boolean;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

interface UseAsyncDataResult<T> {
  data: T | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  mutate: (newData: T | ((prev: T | undefined) => T)) => void;
}

export function useAsyncData<T>(
  fetcher: () => Promise<T>,
  deps: unknown[] = [],
  options: UseAsyncDataOptions<T> = {}
): UseAsyncDataResult<T> {
  const { initialData, enabled = true, onSuccess, onError } = options;

  const [data, setData] = useState<T | undefined>(initialData);
  const [isLoading, setIsLoading] = useState(enabled);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (!enabled) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await fetcher();
      setData(result);
      onSuccess?.(result);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      onError?.(error);
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, enabled]);

  const mutate = useCallback((newData: T | ((prev: T | undefined) => T)) => {
    setData((prev: T | undefined) => typeof newData === 'function' ? (newData as (prev: T | undefined) => T)(prev) : newData);
  }, []);

  return {
    data,
    isLoading,
    error,
    refetch: fetchData,
    mutate,
  };
}
