'use client';

import { SearchInput } from '../SearchInput';

interface SearchInputControlledProps {
  paramKey: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function SearchInputControlled({
  paramKey,
  label,
  placeholder,
  className,
  value,
  onChange,
}: SearchInputControlledProps) {
  return (
    <SearchInput
      id={paramKey}
      label={label}
      placeholder={placeholder}
      className={className}
      value={value}
      onChange={onChange}
    />
  );
}
