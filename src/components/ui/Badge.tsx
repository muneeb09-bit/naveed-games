import { cn } from '@/lib/utils';

interface BadgeProps {
  variant?: 'discount' | 'new' | 'sale' | 'outOfStock' | 'lowStock';
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = 'new', children, className }: BadgeProps) {
  return (
    <span className={cn('badge', `badge--${variant}`, className)}>
      {children}
    </span>
  );
}
