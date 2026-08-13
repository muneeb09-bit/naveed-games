import { cn } from '@/lib/utils';
import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'discount' | 'new' | 'sale' | 'outOfStock' | 'lowStock';
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function Badge({ variant = 'new', children, className, style, ...props }: BadgeProps) {
  return (
    <span className={cn('badge', `badge--${variant}`, className)} style={style} {...props}>
      {children}
    </span>
  );
}
