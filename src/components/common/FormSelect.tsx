'use client';

import { Control, ControllerRenderProps, FieldValues, Path } from 'react-hook-form';
import { AsteriskIcon } from 'lucide-react';
import { Option } from '@/types';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui';

interface SelectOption extends Option {
  disabled?: boolean;
}

type FormSelectProps<T extends FieldValues, K extends Path<T>> = {
  control: Control<T>;
  name: K;
  label?: string;
  labelIcon?: React.ReactNode;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  options: SelectOption[];
  emptyMessage?: string;
};

export function FormSelect<T extends FieldValues, K extends Path<T>>({
  control,
  name,
  label = '',
  labelIcon = null,
  required = false,
  placeholder = 'Select an option...',
  disabled = false,
  options = [],
  emptyMessage = 'No options available',
}: FormSelectProps<T, K>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }: { field: ControllerRenderProps<T, K> }) => (
        <FormItem className="w-full">
          {label && (
            <FormLabel aria-required={required} className="data-[error=true]:text-foreground">
              {labelIcon && <span>{labelIcon}</span>}
              <p className="m-0 text-sm font-medium flex items-center gap-1">
                {label}
                {required && <AsteriskIcon className="text-destructive w-3 h-3 mb-1" />}
              </p>
            </FormLabel>
          )}
          <Select onValueChange={field.onChange} defaultValue={field.value} disabled={disabled}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.length > 0 ? (
                options.map((option) => (
                  <SelectItem key={option.value} value={option.value} disabled={option.disabled}>
                    {option.label}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="" disabled>
                  {emptyMessage}
                </SelectItem>
              )}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
