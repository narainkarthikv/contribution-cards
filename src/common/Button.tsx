/**
 * Button — shared, themeable button primitive.
 * Renders a native <button> by default, or an <a> when `href` is provided,
 * so the same visual variants can be reused for links (e.g. CTAs) and actions.
 */

import React from 'react';
import { cx } from './classNames';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-default)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-primary)] disabled:cursor-not-allowed disabled:bg-[var(--color-action-disabled)] disabled:text-[var(--color-text-muted)]';

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--color-action-default)] text-[var(--color-text-inverse)] hover:bg-[var(--color-action-hover)] active:bg-[var(--color-action-active)]',
  secondary:
    'border border-[var(--color-border-primary)] bg-[var(--color-surface-primary)] text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)] active:bg-[var(--color-surface-secondary)]',
  ghost:
    'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text-primary)]',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-xs sm:text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

interface CommonButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

type ButtonAsButton = CommonButtonProps &
  Omit<React.ComponentPropsWithoutRef<'button'>, 'href'> & { href?: undefined };

type ButtonAsAnchor = CommonButtonProps &
  React.ComponentPropsWithoutRef<'a'> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}) => {
  const classes = cx(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  if (props.href !== undefined) {
    const { href, ...anchorProps } = props as ButtonAsAnchor;
    return <a href={href} className={classes} {...anchorProps} />;
  }

  const { type = 'button', ...buttonProps } = props as ButtonAsButton;
  return <button type={type} className={classes} {...buttonProps} />;
};
