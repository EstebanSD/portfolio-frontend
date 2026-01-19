'use client';

import { SearchInputBase, SearchInputBaseProps } from './SearchInputBase';

interface ControlledModeProps extends SearchInputBaseProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchFilterInputControlled({
  paramKey,
  label,
  placeholder,
  className,
  value,
  onChange,
}: ControlledModeProps) {
  return (
    <SearchInputBase
      paramKey={paramKey}
      label={label}
      placeholder={placeholder}
      className={className}
      value={value}
      onChange={onChange}
    />
  );
}
