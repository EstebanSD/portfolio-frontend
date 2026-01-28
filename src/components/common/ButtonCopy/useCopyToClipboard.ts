'use client';

import { useState, useCallback, useEffect, useRef } from 'react';

type UseCopyToClipboardOptions = {
  resetInterval?: number;
  onSuccess?: (text: string) => void;
  onError?: (error: Error) => void;
};

type UseCopyToClipboardReturn = {
  isCopied: boolean;
  error: Error | null;
  copy: (text: string) => Promise<void>;
  reset: () => void;
};

export function useCopyToClipboard(
  options: UseCopyToClipboardOptions = {},
): UseCopyToClipboardReturn {
  const { resetInterval = 2000, onSuccess, onError } = options;

  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const reset = useCallback(() => {
    setIsCopied(false);
    setError(null);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const copy = useCallback(
    async (text: string) => {
      try {
        setError(null);

        await navigator.clipboard.writeText(text);

        setIsCopied(true);

        onSuccess?.(text);

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
          setIsCopied(false);
        }, resetInterval);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to copy');
        setError(error);
        setIsCopied(false);

        onError?.(error);
      }
    },
    [resetInterval, onSuccess, onError],
  );

  return { isCopied, error, copy, reset };
}
