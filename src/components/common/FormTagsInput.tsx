'use client';

import { useState, useRef, KeyboardEvent } from 'react';
import { Control, ControllerRenderProps, FieldValues, Path } from 'react-hook-form';
import { AsteriskIcon, XIcon } from 'lucide-react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui';
import { cn } from '@/lib/shadcn/utils';

type FormTagsInputProps<T extends FieldValues, K extends Path<T>> = {
  control: Control<T>;
  name: K;
  label?: string;
  labelIcon?: React.ReactNode;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  allowDuplicates?: boolean;
};

export function FormTagsInput<T extends FieldValues, K extends Path<T>>({
  control,
  name,
  label,
  labelIcon,
  required = false,
  placeholder,
  disabled = false,
  allowDuplicates = false,
}: FormTagsInputProps<T, K>) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    field: ControllerRenderProps<T, K>,
  ) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newTag = inputValue.trim();

      if (!newTag) return;

      const tags = Array.isArray(field.value) ? [...field.value] : [];

      const isDuplicate = tags.includes(newTag);

      if (!allowDuplicates && isDuplicate) return;

      field.onChange([...tags, newTag]);
      setInputValue('');
    }
    if (e.key === 'Backspace' && inputValue === '') {
      e.preventDefault();
      const tags = Array.isArray(field.value) ? [...field.value] : [];
      if (tags.length > 0) {
        const updatedTags = tags.slice(0, -1);
        field.onChange(updatedTags);
      }
    }
  };

  const removeTag = (tagToRemove: string, field: ControllerRenderProps<T, K>) => {
    const updatedTags = field.value.filter((tag: string) => tag !== tagToRemove);
    field.onChange(updatedTags);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const tags = Array.isArray(field.value) ? field.value : [];
        const shouldShowPlaceholder = tags.length === 0;

        return (
          <FormItem className="w-full">
            {label && (
              <FormLabel
                htmlFor={name}
                aria-required={required}
                className="data-[error=true]:text-foreground"
              >
                {labelIcon && <span>{labelIcon}</span>}
                <p className="m-0 text-sm font-medium flex items-center gap-1">
                  {label}
                  {required && <AsteriskIcon className="text-destructive w-3 h-3 mb-1" />}
                </p>
              </FormLabel>
            )}
            <FormControl>
              <div
                className={cn(
                  'flex min-h-9 w-full flex-wrap items-center gap-2 rounded-md border border-input bg-transparent dark:bg-input/30 px-3 py-1 text-sm shadow-xs transition-colors placeholder:text-muted-foreground ',
                  'focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]',
                  disabled && 'cursor-not-allowed opacity-50',
                )}
              >
                {Array.isArray(field.value) &&
                  field.value.map((tag: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs text-foreground"
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => removeTag(tag, field)}
                        className="hover:text-destructive"
                        disabled={disabled}
                      >
                        <XIcon className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                <input
                  ref={inputRef}
                  id={name}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, field)}
                  placeholder={shouldShowPlaceholder ? placeholder : undefined}
                  disabled={disabled}
                  className="flex-1 border-none bg-transparent p-0 text-sm focus:outline-none"
                  autoComplete="off"
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
