'use client';

import { useUrlParams } from '@/hooks/use-url-params';
import { SearchInputBase, SearchInputBaseProps } from './SearchInputBase';

interface UrlModeProps extends SearchInputBaseProps {
  basePath: string;
  debounceMs?: number;
  defaultValue?: string;
}

export function SearchFilterInputUrl({
  paramKey,
  label,
  placeholder,
  className,
  basePath,
  debounceMs = 600,
  defaultValue,
}: UrlModeProps) {
  const { value, setValue } = useUrlParams(paramKey, {
    basePath,
    debounceMs,
    defaultValue,
  });

  return (
    <SearchInputBase
      paramKey={paramKey}
      label={label}
      placeholder={placeholder}
      className={className}
      value={value}
      onChange={setValue}
    />
  );
}
