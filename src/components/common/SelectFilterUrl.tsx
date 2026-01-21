'use client';

import { useUrlParams } from '@/hooks/use-url-params';
import { SelectFilterBase, SelectFilterBaseProps } from './SelectFilterBase';

interface SelectFilterUrlProps<T extends string> extends Omit<
  SelectFilterBaseProps<T>,
  'value' | 'onValueChange'
> {
  basePath: string;
  initialValue?: T;
  debounceMs?: number;
}

export function SelectFilterUrl<T extends string>({
  paramKey,
  label,
  placeholder,
  options,
  className,
  basePath,
  initialValue = 'all' as T,
  debounceMs,
}: SelectFilterUrlProps<T>) {
  const { value, setValue } = useUrlParams(paramKey, {
    basePath,
    defaultValue: initialValue,
    debounceMs,
  });

  return (
    <SelectFilterBase
      paramKey={paramKey}
      label={label}
      placeholder={placeholder}
      options={options}
      className={className}
      value={value}
      onValueChange={setValue}
    />
  );
}
