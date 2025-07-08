'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SearchIcon } from 'lucide-react';
import { cn } from '@/lib/shadcn/utils';
import { useDebounce } from '@/hooks/use-debounce';
import { Input, Label } from '../ui';

interface Props {
  paramKey: string;
  label: string;
  placeholder: string;
  className?: string;
  initialValue?: string;
  basePath: string;
}

export function SearchFilterInput({
  paramKey,
  label,
  placeholder,
  className,
  initialValue = '',
  basePath,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [value, setValue] = useState(initialValue);
  const debouncedValue = useDebounce(value, 400);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (!debouncedValue || debouncedValue === 'all') {
      params.delete(paramKey);
    } else {
      params.set(paramKey, debouncedValue);
    }

    const query = params.toString();
    router.replace(`${basePath}${query ? `?${query}` : ''}`);
  }, [basePath, debouncedValue, paramKey, router, searchParams]);

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
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="pl-10"
        />
      </div>
    </div>
  );
}
