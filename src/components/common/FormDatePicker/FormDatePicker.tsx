'use client';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { CalendarIcon } from 'lucide-react';
import { useLocale } from '@/lib/i18n/utils';
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Calendar,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from '../../ui';
import { FormInputLabel } from '../FormInputLabel';
import { formatFormDate, formatFormDateForDisplay, parseFormDate } from './dateUtils';
import { dateFnsLocales } from './dateLocale.types';

interface FormDatePickerProps {
  name: string;
  label?: string;
  labelIcon?: React.ReactNode;
  required?: boolean;
  placeholder?: string;
  fromYear?: number;
  toYear?: number;
  disabled?: boolean;
}

export function FormDatePicker({
  name,
  label = '',
  labelIcon = null,
  required = false,
  placeholder = 'Select date',
  fromYear,
  toYear,
  disabled = false,
}: FormDatePickerProps) {
  const { control } = useFormContext();
  const locale = useLocale();
  const [open, setOpen] = useState(false);

  const dateFnsLocale = dateFnsLocales[locale];
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const selectedDate = parseFormDate(field.value);

        const displayValue =
          typeof field.value === 'string' && field.value
            ? formatFormDateForDisplay(field.value, dateFnsLocale)
            : placeholder;

        return (
          <FormItem className="w-full">
            <FormInputLabel
              htmlFor={name}
              label={label}
              labelIcon={labelIcon}
              inputRequired={required}
            />

            <FormControl>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id={name}
                    className="w-full justify-between font-normal"
                    disabled={disabled}
                  >
                    {displayValue}
                    <CalendarIcon className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      field.onChange(date ? formatFormDate(date) : '');
                      setOpen(false);
                    }}
                    captionLayout="dropdown"
                    startMonth={fromYear ? new Date(fromYear, 0, 1) : undefined}
                    endMonth={toYear ? new Date(toYear, 11, 31) : undefined}
                    disabled={disabled}
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
