'use client';

import { Control, ControllerRenderProps, FieldValues, Path } from 'react-hook-form';
import { AsteriskIcon } from 'lucide-react';
import { FormField, FormItem, FormLabel, FormMessage, RadioGroup, RadioGroupItem } from '../ui';
import { Option } from '@/types';
import { cn } from '@/lib/shadcn/utils';

interface RadioOption extends Option {
  icon?: React.ReactNode;
}

type FormRadioGroupProps<T extends FieldValues, K extends Path<T>> = {
  control: Control<T>;
  name: K;
  label?: string;
  options: RadioOption[];
  required?: boolean;
  layout?: 'row' | 'column';
  wrapperClassName?: string;
  groupClassName?: string;
};

export function FormRadioGroup<T extends FieldValues, K extends Path<T>>({
  control,
  name,
  label,
  options,
  required = false,
  layout = 'column',
  wrapperClassName = '',
  groupClassName = '',
}: FormRadioGroupProps<T, K>) {
  const fieldClass = layout === 'column' ? 'flex flex-col' : 'flex items-center justify-between';
  const radioGroupClass = layout === 'column' ? 'flex flex-col gap-4' : 'flex gap-4';

  const renderOption = (option: RadioOption) => {
    return (
      <div key={option.value} className="flex items-center space-x-2">
        <RadioGroupItem value={option.value} id={option.value} aria-required={required} />
        <FormLabel htmlFor={option.value} className="cursor-pointer flex items-center gap-2 flex-1">
          {option.icon && <span className="flex-shrink-0">{option.icon}</span>}
          {option.label}
        </FormLabel>
      </div>
    );
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }: { field: ControllerRenderProps<T, K> }) => (
        <FormItem>
          <fieldset className={cn(fieldClass, wrapperClassName)}>
            {label && (
              <legend aria-required={required} className="block mb-4">
                <p className="m-0 text-sm font-medium flex items-center gap-1">
                  {label}
                  {required && <AsteriskIcon className="text-destructive w-3 h-3 mb-1" />}
                </p>
              </legend>
            )}
            <RadioGroup
              id={name}
              name={name}
              onValueChange={field.onChange}
              value={field.value}
              className={cn(radioGroupClass, groupClassName)}
            >
              {options.map(renderOption)}
            </RadioGroup>
          </fieldset>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
