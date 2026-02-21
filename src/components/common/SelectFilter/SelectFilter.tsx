'use client';

import { useId } from 'react';
import { cn } from '@/lib/shadcn/utils';
import { Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui';

interface Option<T extends string> {
  value: T;
  label: string;
}

interface SelectFilterProps<T extends string> {
  label: string;
  placeholder: string;
  options: readonly Option<T>[];
  className?: string;
  value: T;
  onValueChange: (value: T) => void;
}

export function SelectFilter<T extends string>({
  label,
  placeholder,
  options,
  className,
  value,
  onValueChange,
}: SelectFilterProps<T>) {
  const id = useId();

  return (
    <div className={cn('w-fit', className)}>
      <Label htmlFor={id}>{label}</Label>
      <Select onValueChange={onValueChange} value={value}>
        <SelectTrigger
          id={id}
          name={id}
          className="w-full mt-1 bg-background dark:hover:bg-gray-800"
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent className="bg-background dark:bg-gray-800">
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
