'use client';

import { HTMLInputAutoCompleteAttribute } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormMessage, Input } from '../../ui';
import { usePasswordToggle } from './usePasswordToggle';
import { FormInputLabel } from '../FormInputLabel';
import { PasswordToggleButton } from './PasswordToggleButton';

type FormInputProps = {
  name: string;
  label?: string;
  labelIcon?: React.ReactNode;
  required?: boolean;
  placeholder?: string;
  type?: 'text' | 'password' | 'email' | 'tel';
  autoComplete?: HTMLInputAutoCompleteAttribute;
  showIconPassword?: boolean;
  disabled?: boolean;
};

export function FormInput({
  name,
  label = '',
  labelIcon = null,
  required = false,
  placeholder,
  type = 'text',
  autoComplete = 'off',
  showIconPassword = true,
  disabled = false,
}: FormInputProps) {
  const { control } = useFormContext();
  const { showPassword, toggle, getInputType } = usePasswordToggle();

  const inputType = getInputType(type);

  const shouldShowToggle = type === 'password' && showIconPassword;

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

          <FormControl>
            <div className="relative">
              <Input
                id={name}
                type={inputType}
                autoComplete={autoComplete}
                placeholder={placeholder}
                inputMode={inputType === 'tel' ? 'numeric' : undefined}
                disabled={disabled}
                {...field}
              />
              {shouldShowToggle && (
                <PasswordToggleButton
                  showPassword={showPassword}
                  onToggle={toggle}
                  disabled={disabled}
                />
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
