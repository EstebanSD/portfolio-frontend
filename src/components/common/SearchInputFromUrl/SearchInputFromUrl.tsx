'use client';

import { useUrlParams } from '@/hooks/useUrlParams';
import { SearchInput } from '../SearchInput';

interface SearchInputFromUrlProps {
  paramKey: string;
  label: string;
  placeholder: string;
  className?: string;
  basePath: string;
  debounceMs?: number;
  defaultValue?: string;
}

export function SearchInputFromUrl({
  paramKey,
  label,
  placeholder,
  className,
  basePath,
  debounceMs = 600,
  defaultValue,
}: SearchInputFromUrlProps) {
  const { value, setValue } = useUrlParams(paramKey, {
    basePath,
    debounceMs,
    defaultValue,
  });

  return (
    <SearchInput
      id={paramKey}
      label={label}
      placeholder={placeholder}
      className={className}
      value={value}
      onChange={setValue}
    />
  );
}
