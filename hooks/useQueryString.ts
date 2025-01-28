'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

type QueryKeyType = 'name' | 'category' | 'orderCol' | 'orderSort';

export const useQueryString = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const getQuery = useCallback((key: QueryKeyType) => searchParams.get(key), [searchParams]);

  const setQuery = useCallback(
    (key: QueryKeyType, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (!value) params.delete(key);
      else params.set(key, value);
      router.push(`?${params.toString()}`);
    },
    [router, searchParams],
  );

  const setQueries = useCallback(
    (newQueries: Partial<Record<QueryKeyType, string>>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(newQueries).forEach(([key, value]) => {
        if (!value) params.delete(key);
        else params.set(key, value);
      });

      router.push(`?${params.toString()}`);
    },
    [searchParams, router],
  );
  return { getQuery, setQuery, setQueries };
};
