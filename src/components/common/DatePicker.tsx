'use client';

import * as React from 'react';
import { CalendarIcon } from 'lucide-react';

import { Button, Calendar, Popover, PopoverContent, PopoverTrigger, Label } from '@/components/ui';

interface Props {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  label?: string;
  startMonth?: number;
  endMonth?: number;
  disabled?: boolean;
}

export function DatePicker({
  value,
  onChange,
  label = 'Date',
  startMonth = undefined,
  endMonth = undefined,
  disabled = false,
}: Props) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="date" className="px-1">
        {label}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-48 justify-between font-normal"
            disabled={disabled}
          >
            {value ? value.toLocaleDateString('en-EN') : 'Select date'}
            <CalendarIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            captionLayout="dropdown"
            onSelect={(date) => {
              onChange?.(date);
              setOpen(false);
            }}
            startMonth={startMonth ? new Date(startMonth, 0) : undefined}
            endMonth={endMonth ? new Date(endMonth, 11) : undefined}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
