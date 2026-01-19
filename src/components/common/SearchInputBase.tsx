'use client';

import { cn } from '@/lib/shadcn/utils';
import { Input, Label } from '../ui';
import { SearchIcon } from 'lucide-react';

export interface SearchInputBaseProps {
  paramKey: string;
  label: string;
  placeholder: string;
  className?: string;
}

export function SearchInputBase({
  paramKey,
  label,
  placeholder,
  className,
  value,
  onChange,
}: SearchInputBaseProps & { value: string; onChange: (value: string) => void }) {
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
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="pl-10"
        />
      </div>
    </div>
  );
}
