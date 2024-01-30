import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '../lib/utils';

const badgeVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-full text-xs font-medium uppercase',
  {
    variants: {
      variant: {
        default: 'border border-slate-400 text-slate-400',
      },
      size: {
        default: 'h-7 px-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, size, variant, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ size, variant }), className)}
      {...props}
    />
  );
}

export { Badge };
