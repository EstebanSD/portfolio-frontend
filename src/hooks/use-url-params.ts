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

  // Get current URL value
  const urlValue = searchParams.get(paramKey) ?? defaultValue;
  const [localValue, setLocalValue] = useState(urlValue);

  // Synchronize local status when URL changes externally
  useEffect(() => {
    setLocalValue(urlValue);
  }, [urlValue]);

  // URL update function
  const updateUrl = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (!value || value === 'all' || value === defaultValue) {
        params.delete(paramKey);
      } else {
        params.set(paramKey, value);
      }

      const query = params.toString();
      router.replace(`${basePath}${query ? `?${query}` : ''}`);
    },
    [basePath, paramKey, router, searchParams, defaultValue],
  );

  // Handle debounce if necessary
  useEffect(() => {
    if (debounceMs > 0) {
      const timeoutId = setTimeout(() => {
        updateUrl(localValue);
      }, debounceMs);

      return () => clearTimeout(timeoutId);
    } else {
      updateUrl(localValue);
    }
  }, [localValue, updateUrl, debounceMs]);

  return {
    value: localValue,
    setValue: setLocalValue,
    urlValue,
    updateUrl,
  };
}
