import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'discount' | 'new' | 'sale' | 'outOfStock' | 'lowStock';
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = 'new', children, className, style, ...props }: BadgeProps) {
  return (
    <span className={cn('badge', `badge--${variant}`, className)} style={style} {...props}>
      {children}
    </span>
  );
}
