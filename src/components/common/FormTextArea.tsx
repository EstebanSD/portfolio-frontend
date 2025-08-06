'use client';

import { Control, ControllerRenderProps, FieldValues, Path } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Textarea } from '../ui';

type FormTextAreaProps<T extends FieldValues, K extends Path<T>> = {
  control: Control<T>;
  name: K;
  label?: string;
  labelIcon?: React.ReactNode;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  rows?: number;
  maxLength?: number;
};

export function FormTextArea<T extends FieldValues, K extends Path<T>>({
  control,
  name,
  label = '',
  labelIcon = null,
  required = false,
  placeholder,
  disabled = false,
  rows = 3,
  maxLength,
}: FormTextAreaProps<T, K>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }: { field: ControllerRenderProps<T, K> }) => (
        <FormItem className="w-full">
          {label && (
            <FormLabel
              htmlFor={name}
              aria-required={required}
              className="data-[error=true]:text-foreground"
            >
              {labelIcon && <span>{labelIcon}</span>}
              <p className="m-0 text-sm font-medium">
                {label}
                {required && <span> *</span>}
              </p>
            </FormLabel>
          )}
          <FormControl>
            <Textarea
              id={name}
              placeholder={placeholder}
              disabled={disabled}
              rows={rows}
              maxLength={maxLength}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
