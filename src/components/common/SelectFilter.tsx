'use client';

import { cn } from '@/lib/shadcn/utils';
import { Option } from '@/types';
import { Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui';
import { useUrlParams } from '@/hooks';

interface Props {
  paramKey: string;
  label: string;
  placeholder: string;
  options: Option[];
  initialValue?: string;
  basePath: string;
  className?: string;
}

export function SelectFilter({
  paramKey,
  label,
  placeholder,
  options,
  initialValue = 'all',
  basePath,
  className,
}: Props) {
  const { value, setValue } = useUrlParams(paramKey, {
    basePath,
    defaultValue: initialValue,
  });
  return (
    <div className={cn('w-fit', className)}>
      <Label htmlFor={paramKey}>{label}</Label>
      <Select onValueChange={setValue} value={value}>
        <SelectTrigger
          id={paramKey}
          name={paramKey}
          className="mt-1 bg-background dark:hover:bg-gray-800"
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
