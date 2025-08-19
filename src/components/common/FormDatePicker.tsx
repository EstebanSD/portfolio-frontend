'use client';

import { useState } from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';
import { CalendarIcon, AsteriskIcon } from 'lucide-react';
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Calendar,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui';

type FormDatePickerProps<T extends FieldValues, K extends Path<T>> = {
  control: Control<T>;
  name: K;
  label?: string;
  labelIcon?: React.ReactNode;
  required?: boolean;
  placeholder?: string;
  startMonth?: number;
  endMonth?: number;
  disabled?: boolean;
};

export function FormDatePicker<T extends FieldValues, K extends Path<T>>({
  control,
  name,
  label = '',
  labelIcon = null,
  required = false,
  placeholder = 'Select date',
  startMonth = undefined,
  endMonth = undefined,
  disabled = false,
}: FormDatePickerProps<T, K>) {
  const [open, setOpen] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const selectedDate = field.value ? new Date(field.value) : undefined;

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
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id={name}
                    className="w-full justify-between font-normal"
                    disabled={disabled}
                  >
                    {selectedDate ? selectedDate.toLocaleDateString('en-EN') : placeholder}
                    <CalendarIcon className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      field.onChange(date ? date.toISOString().split('T')[0] : '');
                      setOpen(false);
                    }}
                    captionLayout="dropdown"
                    startMonth={startMonth ? new Date(startMonth, 0) : undefined}
                    endMonth={endMonth ? new Date(endMonth, 11) : undefined}
                  />
                </PopoverContent>
              </Popover>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
