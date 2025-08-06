'use client';

import { HTMLInputAutoCompleteAttribute, useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { Control, ControllerRenderProps, FieldValues, Path } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from '../ui';

type FormInputProps<T extends FieldValues, K extends Path<T>> = {
  control: Control<T>;
  name: K;
  label?: string;
  labelIcon?: React.ReactNode;
  required?: boolean;
  placeholder?: string;
  type?: 'text' | 'password' | 'email' | 'tel';
  autoComplete?: HTMLInputAutoCompleteAttribute;
  showIconPassword?: boolean;
  disabled?: boolean;
};

export function FormInput<T extends FieldValues, K extends Path<T>>({
  control,
  name,
  label = '',
  labelIcon = null,
  required = false,
  placeholder,
  type = 'text',
  autoComplete = 'off',
  showIconPassword = false,
  disabled = false,
}: FormInputProps<T, K>) {
  const [showPassword, setShowPassword] = useState(false);

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
            <div className="relative">
              <Input
                id={name}
                type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
                autoComplete={autoComplete}
                placeholder={placeholder}
                inputMode={type === 'tel' ? 'numeric' : undefined}
                disabled={disabled}
                {...field}
              />
              {type === 'password' && showIconPassword && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  disabled={disabled}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
