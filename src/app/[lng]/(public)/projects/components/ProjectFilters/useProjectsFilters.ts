'use client';

import { useCallback } from 'react';
import { useUrlParams } from '@/hooks/useUrlParams';

interface Props {
  lng: string;
}

export function useProjectsFilters({ lng }: Props) {
  const basePath = `/${lng}/projects`;

  const type = useUrlParams('type', {
    basePath,
    defaultValue: 'all',
  });

  const status = useUrlParams('status', {
    basePath,
    defaultValue: 'all',
  });

  const title = useUrlParams('title', {
    basePath,
    defaultValue: '',
    debounceMs: 300,
  });

  const resetAll = useCallback(() => {
    type.setValue('all');
    status.setValue('all');
    title.setValue('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasActiveFilters = type.value !== 'all' || status.value !== 'all' || title.value !== '';

  return {
    filters: {
      type: type.value,
      status: status.value,
      title: title.value,
    },
    setType: type.setValue,
    setStatus: status.setValue,
    setTitle: title.setValue,
    resetAll,
    hasActiveFilters,
  };
}
