'use client';

import { cn } from '@/lib/shadcn/utils';
import { Input, Label } from '../../ui';
import { SearchIcon } from 'lucide-react';

interface SearchInputProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function SearchInput({
  id,
  label,
  placeholder,
  className,
  value,
  onChange,
}: SearchInputProps) {
  return (
    <div className={cn('w-full', className)}>
      <Label htmlFor={id}>{label}</Label>
      <div className="relative mt-1">
        <SearchIcon
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4"
          aria-hidden="true"
        />
        <Input
          id={id}
          type="search"
          name={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="pl-10"
        />
      </div>
    </div>
  );
}
