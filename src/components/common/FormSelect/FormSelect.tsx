'use client';

import { useFormContext } from 'react-hook-form';
import { Option } from '@/types';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui';
import { FormInputLabel } from '../FormInputLabel';

export interface SelectOption extends Option {
  disabled?: boolean;
}

type FormSelectProps = {
  name: string;
  label?: string;
  labelIcon?: React.ReactNode;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  options: SelectOption[];
  emptyMessage?: string;
};

export function FormSelect({
  name,
  label = '',
  labelIcon = null,
  required = false,
  placeholder = 'Select an option...',
  disabled = false,
  options = [],
  emptyMessage = 'No options available',
}: FormSelectProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormInputLabel
            htmlFor={name}
            label={label}
            labelIcon={labelIcon}
            inputRequired={required}
          />

          <Select
            onValueChange={field.onChange}
            value={field.value}
            disabled={disabled}
            onOpenChange={(open) => {
              if (!open) {
                field.onBlur();
              }
            }}
          >
            <FormControl>
              <SelectTrigger aria-required={required}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.length === 0 ? (
                <div className="py-6 text-center text-sm text-muted-foreground">{emptyMessage}</div>
              ) : (
                options.map((option) => (
                  <SelectItem key={option.value} value={option.value} disabled={option.disabled}>
                    {option.label}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
