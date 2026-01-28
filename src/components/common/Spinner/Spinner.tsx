import { Loader2Icon } from 'lucide-react';
import { cn } from '@/lib/shadcn/utils';

interface Props {
  loading: boolean;
  text: string;
  loadingText?: string;
  icon?: React.ReactNode;
  className?: string;
}
export function Spinner({ loading, loadingText, text, icon, className }: Props) {
  const label = loading ? (loadingText ?? text) : text;

  return (
    <div
      className={cn('w-full flex items-center justify-center gap-2', className)}
      role={loading ? 'status' : undefined}
      aria-live={loading ? 'polite' : undefined}
      aria-busy={loading ? 'true' : 'false'}
    >
      {loading ? (
        <>
          <Loader2Icon className="w-4 h-4 animate-spin" aria-hidden="true" />
          <span>{label}</span>
        </>
      ) : (
        <>
          {icon && icon}
          <span>{label}</span>
        </>
      )}
    </div>
  );
}
