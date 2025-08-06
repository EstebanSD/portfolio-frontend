import { Loader2Icon } from 'lucide-react';

interface Props {
  loading: boolean;
  text: string;
  loadingText?: string;
  icon?: React.ReactNode;
}
export function Spinner({ loading, loadingText, text, icon }: Props) {
  return (
    <div
      className="w-full flex items-center justify-center gap-2"
      role={loading ? 'status' : undefined}
      aria-busy={loading}
    >
      {loading ? (
        <>
          <Loader2Icon className="w-4 h-4 animate-spin" />
          <span>{loadingText ?? text}</span>
        </>
      ) : (
        <>
          {icon && icon}
          <span>{text}</span>
        </>
      )}
    </div>
  );
}
