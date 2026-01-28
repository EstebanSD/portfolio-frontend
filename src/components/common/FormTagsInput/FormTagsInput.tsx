'use client';

import { useState, useRef, KeyboardEvent } from 'react';
import { ControllerRenderProps, useFormContext } from 'react-hook-form';
import { XIcon } from 'lucide-react';
import { cn } from '@/lib/shadcn/utils';
import { FormControl, FormField, FormItem, FormMessage } from '../../ui';
import { FormInputLabel } from '../FormInputLabel';

type FormTagsInputProps = {
  name: string;
  label?: string;
  labelIcon?: React.ReactNode;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  allowDuplicates?: boolean;
};

export function FormTagsInput({
  name,
  label,
  labelIcon,
  required = false,
  placeholder,
  disabled = false,
  allowDuplicates = false,
}: FormTagsInputProps) {
  const { control } = useFormContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, field: ControllerRenderProps) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newTag = inputValue.trim();

      if (!newTag) return;
      if (/[,\n\r]/.test(newTag)) return;

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

  const removeTag = (indexToRemove: number, field: ControllerRenderProps) => {
    const updatedTags = field.value.filter((_: string, index: number) => index !== indexToRemove);
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
            <FormInputLabel
              htmlFor={name}
              label={label}
              labelIcon={labelIcon}
              inputRequired={required}
            />
            <FormControl>
              <div
                role="group"
                aria-labelledby={label ? `${name}-label` : undefined}
                aria-describedby={`${name}-description`}
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
                        onClick={() => removeTag(index, field)}
                        className="hover:text-destructive"
                        disabled={disabled}
                        aria-label={`Remove ${tag} tag`}
                      >
                        <XIcon className="h-3.5 w-3.5" aria-hidden="true" />
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
