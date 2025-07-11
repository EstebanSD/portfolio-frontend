'use client';

import { SearchIcon } from 'lucide-react';
import { cn } from '@/lib/shadcn/utils';
import { Input, Label } from '../ui';
import { useUrlParams } from '@/hooks';

interface Props {
  paramKey: string;
  label: string;
  placeholder: string;
  className?: string;
  basePath: string;
}

export function SearchFilterInput({ paramKey, label, placeholder, className, basePath }: Props) {
  const { value, setValue } = useUrlParams(paramKey, {
    basePath,
    debounceMs: 600,
  });

  return (
    <div className={cn('w-full', className)}>
      <Label htmlFor={paramKey}>{label}</Label>
      <div className="relative mt-1">
        <SearchIcon
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4"
          aria-hidden="true"
        />
        <Input
          id={paramKey}
          type="search"
          name={paramKey}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="pl-10"
        />
      </div>
    </div>
  );
}
