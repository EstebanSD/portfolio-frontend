'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

interface UseUrlParamsOptions {
  basePath: string;
  debounceMs?: number;
  defaultValue?: string;
}

export function useUrlParams(paramKey: string, options: UseUrlParamsOptions) {
  const { basePath, debounceMs = 0, defaultValue = '' } = options;
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlValue = searchParams.get(paramKey) ?? defaultValue;
  const [localValue, setLocalValue] = useState(urlValue);

  // Sync local state ONLY if external change
  useEffect(() => {
    if (urlValue !== localValue) {
      setLocalValue(urlValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlValue]);

  const updateUrl = useCallback(
    (value: string) => {
      // avoid redundant navigation
      if (value === urlValue) return;

      const params = new URLSearchParams(searchParams.toString());

      if (!value || value === 'all' || value === defaultValue) {
        params.delete(paramKey);
      } else {
        params.set(paramKey, value);
      }

      const query = params.toString();
      const nextUrl = `${basePath}${query ? `?${query}` : ''}`;

      router.replace(nextUrl);
    },
    [basePath, paramKey, router, searchParams, defaultValue, urlValue],
  );

  useEffect(() => {
    if (debounceMs > 0) {
      const id = setTimeout(() => updateUrl(localValue), debounceMs);
      return () => clearTimeout(id);
    }

    updateUrl(localValue);
  }, [localValue, updateUrl, debounceMs]);

  return {
    value: localValue,
    setValue: setLocalValue,
    urlValue,
  };
}
