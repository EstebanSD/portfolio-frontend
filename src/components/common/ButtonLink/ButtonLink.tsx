import Link from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/shadcn/utils';

const buttonLinkVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        // Main button - most important action
        default:
          'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:ring-primary/20',

        // Important secondary actions, but not primary ones
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 focus-visible:ring-secondary/20',

        // Button with border, less prominent than default
        outline:
          'border border-border bg-background text-foreground shadow-sm hover:bg-muted hover:text-foreground focus-visible:ring-muted/20',

        // Subtle actions, integrated into the background
        ghost: 'text-foreground hover:bg-muted hover:text-foreground focus-visible:ring-muted/20',

        // Very subtle, for low-contrast actions
        muted:
          'bg-muted text-muted-foreground shadow-sm hover:bg-muted/80 hover:text-foreground focus-visible:ring-muted/20',

        // For links or actions that appear to be links
        link: 'text-primary underline-offset-4 hover:underline focus-visible:ring-primary/20',

        // For positive actions (save, confirm)
        success:
          'bg-success text-primary-foreground shadow-sm hover:bg-success/90 focus-visible:ring-success/20',

        // For warnings
        warning:
          'bg-warning text-foreground shadow-sm hover:bg-warning/90 focus-visible:ring-warning/20',

        // For destructive actions (delete, cancel)
        destructive:
          'bg-destructive text-primary-foreground shadow-sm hover:bg-destructive/90 focus-visible:ring-destructive/20',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        default: 'h-10 px-4 py-2',
        lg: 'h-12 px-6 py-3 text-base',
        icon: 'size-9',
        'icon-sm': 'size-7',
        'icon-lg': 'size-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

interface ButtonLinkProps
  extends React.ComponentProps<typeof Link>,
    VariantProps<typeof buttonLinkVariants> {}

function ButtonLink({ className, variant, size, ...props }: ButtonLinkProps) {
  return (
    <Link className={cn(buttonLinkVariants({ variant, size }), className)} {...props}>
      {props.children}
    </Link>
  );
}
export { ButtonLink, buttonLinkVariants };
