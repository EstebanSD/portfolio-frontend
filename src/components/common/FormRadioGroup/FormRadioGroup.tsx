'use client';

import { useFormContext } from 'react-hook-form';
import { AsteriskIcon } from 'lucide-react';
import { cn } from '@/lib/shadcn/utils';
import { FormField, FormItem, FormMessage, RadioGroup } from '../../ui';
import { RadioOptionItem, type RadioOption } from './RadioOptionItem';

type FormRadioGroupProps = {
  name: string;
  label?: string;
  options: RadioOption[];
  required?: boolean;
  layout?: 'row' | 'column';
  wrapperClassName?: string;
  groupClassName?: string;
  disabled?: boolean;
};

export function FormRadioGroup({
  name,
  label,
  options,
  required = false,
  layout = 'column',
  wrapperClassName = '',
  groupClassName = '',
  disabled = false,
}: FormRadioGroupProps) {
  const { control } = useFormContext();
  const fieldClass = layout === 'column' ? 'flex flex-col' : 'flex items-center justify-between';
  const radioGroupClass = layout === 'column' ? 'flex flex-col gap-4' : 'flex gap-4';

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <fieldset className={cn(fieldClass, wrapperClassName)} aria-required={required}>
            {label && (
              <legend className="block mb-4">
                <p className="m-0 text-sm font-medium flex items-center gap-1">
                  {label}
                  {required && <AsteriskIcon className="text-destructive w-3 h-3 mb-1" />}
                </p>
              </legend>
            )}
            <RadioGroup
              id={name}
              required={required}
              name={name}
              onValueChange={field.onChange}
              value={field.value}
              className={cn(radioGroupClass, groupClassName)}
              disabled={disabled}
            >
              {options.map((option) => (
                <RadioOptionItem
                  key={option.value}
                  option={option}
                  name={name}
                  disabled={disabled}
                />
              ))}
            </RadioGroup>
          </fieldset>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
