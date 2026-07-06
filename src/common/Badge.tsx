/**
 * Badge — shared pill/chip primitive for short labels and tags.
 */

import React from 'react';
import { cx } from './classNames';

export type BadgeVariant = 'outline' | 'solid';
export type BadgeSize = 'sm' | 'md';

const variantClasses: Record<BadgeVariant, string> = {
  outline:
    'border border-[var(--color-border-primary)] bg-[var(--color-surface-primary)] text-[var(--color-text-secondary)]',
  solid:
    'border border-[color-mix(in_srgb,var(--color-action-default)_35%,transparent)] bg-[color-mix(in_srgb,var(--color-action-default)_18%,transparent)] text-[var(--color-action-default)]',
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'rounded-md px-2 py-1 text-xs',
  md: 'rounded-full px-3 py-1 text-xs',
};

export interface BadgeProps extends React.ComponentPropsWithoutRef<'span'> {
  variant?: BadgeVariant;
  size?: BadgeSize;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'outline',
  size = 'md',
  className,
  ...props
}) => (
  <span
    className={cx(
      'inline-flex items-center font-semibold',
      variantClasses[variant],
      sizeClasses[size],
      className
    )}
    {...props}
  />
);
