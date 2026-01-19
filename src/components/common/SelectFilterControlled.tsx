'use client';

import { SelectFilterBase, SelectFilterBaseProps } from './SelectFilterBase';

interface SelectFilterControlledProps<T extends string>
  extends Omit<SelectFilterBaseProps<T>, 'value' | 'onValueChange'> {
  value: T;
  onValueChange: (value: T) => void;
}

export function SelectFilterControlled<T extends string>({
  paramKey,
  label,
  placeholder,
  options,
  className,
  value,
  onValueChange,
}: SelectFilterControlledProps<T>) {
  return (
    <SelectFilterBase
      paramKey={paramKey}
      label={label}
      placeholder={placeholder}
      options={options}
      className={className}
      value={value}
      onValueChange={onValueChange}
    />
  );
}
