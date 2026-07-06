/**
 * Card — shared surface container primitive.
 * Consolidates the repeated "bordered surface" pattern used across
 * contributor cards, landing panels, and stat tiles.
 */

import React from 'react';
import { cx } from './classNames';

export type CardTone = 'primary' | 'secondary';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';
export type CardRounded = 'md' | 'lg' | 'xl' | '2xl';

const toneClasses: Record<CardTone, string> = {
  primary:
    'border border-[var(--color-border-primary)] bg-[var(--color-surface-primary)]',
  secondary:
    'border border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)]',
};

const paddingClasses: Record<CardPadding, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-5',
  lg: 'p-6',
};

const roundedClasses: Record<CardRounded, string> = {
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
};

export interface CardProps extends React.ComponentPropsWithoutRef<'div'> {
  tone?: CardTone;
  padding?: CardPadding;
  rounded?: CardRounded;
}

export const Card: React.FC<CardProps> = ({
  tone = 'primary',
  padding = 'md',
  rounded = 'lg',
  className,
  ...props
}) => (
  <div
    className={cx(
      toneClasses[tone],
      paddingClasses[padding],
      roundedClasses[rounded],
      'transition-colors duration-300',
      className
    )}
    {...props}
  />
);
