import { Option } from '@/types';
import { cn } from '@/lib/shadcn/utils';
import { FormLabel, RadioGroupItem } from '../../ui';

export interface RadioOption extends Option {
  icon?: React.ReactNode;
}
export function RadioOptionItem({
  option,
  name,
  disabled,
}: {
  option: RadioOption;
  name: string;
  disabled?: boolean;
}) {
  const optionId = `${name}-${option.value}`;

  return (
    <div className="flex items-center gap-2">
      <RadioGroupItem value={option.value} id={optionId} disabled={disabled} />
      <FormLabel
        htmlFor={optionId}
        className={cn('flex items-center gap-2 flex-1', !disabled && 'cursor-pointer')}
      >
        {option.icon && <span className="flex-shrink-0">{option.icon}</span>}
        {option.label}
      </FormLabel>
    </div>
  );
}
