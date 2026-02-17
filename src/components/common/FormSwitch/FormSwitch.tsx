'use client';

import { useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { FormInputLabel } from '../FormInputLabel';
import { Switch } from '@/components/ui';
import { useId } from 'react';

type FormSwitchProps = {
  name: string;
  label?: string;
  labelIcon?: React.ReactNode;
  required?: boolean;
  description?: string;
  disabled?: boolean;
};

export function FormSwitch({
  name,
  label,
  labelIcon,
  required,
  description,
  disabled = false,
}: FormSwitchProps) {
  const switchId = useId();
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <FormInputLabel
              htmlFor={switchId}
              label={label}
              labelIcon={labelIcon}
              inputRequired={required}
            />

            {description && <FormDescription>{description}</FormDescription>}
          </div>

          <FormControl>
            <Switch
              id={switchId}
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={disabled}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
