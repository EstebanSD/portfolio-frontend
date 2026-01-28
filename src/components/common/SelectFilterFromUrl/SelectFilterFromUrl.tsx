'use client';

import { useUrlParams } from '@/hooks/useUrlParams';
import { SelectFilter } from '../SelectFilter';

interface Option<T extends string> {
  value: T;
  label: string;
}

type OptionValue<T extends readonly Option<string>[]> = T[number]['value'];

interface SelectFilterFromUrlProps<TOptions extends readonly Option<string>[]> {
  paramKey: string;
  label: string;
  placeholder: string;
  options: TOptions;
  className?: string;
  basePath: string;
  initialValue?: OptionValue<TOptions>;
  debounceMs?: number;
}

export function SelectFilterFromUrl<TOptions extends readonly Option<string>[]>({
  paramKey,
  label,
  placeholder,
  options,
  className,
  basePath,
  initialValue,
  debounceMs,
}: SelectFilterFromUrlProps<TOptions>) {
  const { value, setValue } = useUrlParams(paramKey, {
    basePath,
    defaultValue: initialValue,
    debounceMs,
  });

  return (
    <SelectFilter
      id={paramKey}
      label={label}
      placeholder={placeholder}
      options={options}
      className={className}
      value={value as OptionValue<TOptions>}
      onValueChange={setValue as (v: OptionValue<TOptions>) => void}
    />
  );
}
