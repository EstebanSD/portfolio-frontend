import { AsteriskIcon } from 'lucide-react';
import { FormLabel } from '../../ui';

type FormInputLabelProps = {
  htmlFor: string;
  label?: string;
  labelIcon?: React.ReactNode;
  inputRequired?: boolean;
};

export function FormInputLabel({ htmlFor, label, labelIcon, inputRequired }: FormInputLabelProps) {
  if (!label) {
    return null;
  }

  return (
    <FormLabel
      htmlFor={htmlFor}
      aria-required={inputRequired || undefined}
      className="data-[error=true]:text-foreground"
    >
      {labelIcon && <span>{labelIcon}</span>}
      <p className="m-0 text-sm font-medium flex items-center gap-1">
        {label}
        {inputRequired && <AsteriskIcon className="text-destructive w-3 h-3 mb-1" />}
      </p>
    </FormLabel>
  );
}
