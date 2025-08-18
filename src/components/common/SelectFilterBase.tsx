'use client';

import { cn } from '@/lib/shadcn/utils';
import { Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui';

export interface Option<T extends string> {
  value: T;
  label: string;
}

export interface SelectFilterBaseProps<T extends string> {
  paramKey: string;
  label: string;
  placeholder: string;
  options: Option<T>[];
  className?: string;
  value: T;
  onValueChange: (value: T) => void;
}

export function SelectFilterBase<T extends string>({
  paramKey,
  label,
  placeholder,
  options,
  className,
  value,
  onValueChange,
}: SelectFilterBaseProps<T>) {
  return (
    <div className={cn('w-fit', className)}>
      <Label htmlFor={paramKey}>{label}</Label>
      <Select onValueChange={onValueChange} value={value}>
        <SelectTrigger
          id={paramKey}
          name={paramKey}
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
