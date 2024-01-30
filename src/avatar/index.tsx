import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '../lib/utils';

const avatarVariants = cva(
  'relative flex shrink-0 overflow-hidden rounded-full',
  {
    variants: {
      size: {
        default: 'h-10 w-10',
        sm: 'h-8 w-8',
        lg: 'h-12 w-12',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

interface AvatarProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof avatarVariants> {}

function Avatar({ className, size, ...props }: AvatarProps) {
  return (
    <span className={cn(avatarVariants({ size }), className)} {...props} />
  );
}

function AvatarImage({
  className,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) {
  return <img className={cn('w-full h-full', className)} {...props} />;
}

export { Avatar, AvatarImage };
