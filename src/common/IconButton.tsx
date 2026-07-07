/**
 * IconButton — shared, icon-only button primitive used for compact actions
 * (copy, external links, close controls, toggles). Renders as <button> or,
 * when `href` is provided, as an <a> so the same visuals cover both cases.
 * `aria-label` is required since there is no visible text label.
 */

import React from 'react';
import { cx } from './classNames';

export type IconButtonVariant = 'solid' | 'outline' | 'active' | 'ghost';
export type IconButtonSize = 'sm' | 'md' | 'lg';

const baseClasses =
  'inline-flex flex-shrink-0 items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-default)]';

const variantClasses: Record<IconButtonVariant, string> = {
  solid:
    'bg-[var(--color-action-default)] text-white hover:bg-[var(--color-action-hover)] active:bg-[var(--color-action-active)]',
  outline:
    'border border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
  active:
    'border border-[var(--color-action-default)] bg-[var(--color-action-default)] text-white',
  ghost:
    'border border-[var(--color-border-primary)] bg-transparent hover:bg-[var(--color-bg-secondary)] active:bg-[var(--color-surface-secondary)]',
};

const sizeClasses: Record<IconButtonSize, string> = {
  sm: 'h-9 w-9',
  md: 'h-10 w-10',
  lg: 'h-10 px-3',
};

interface CommonIconButtonProps {
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  className?: string;
  'aria-label': string;
}

type IconButtonAsButton = CommonIconButtonProps &
  Omit<React.ComponentPropsWithoutRef<'button'>, 'href'> & { href?: undefined };

type IconButtonAsAnchor = CommonIconButtonProps &
  React.ComponentPropsWithoutRef<'a'> & { href: string };

export type IconButtonProps = IconButtonAsButton | IconButtonAsAnchor;

export const IconButton: React.FC<IconButtonProps> = ({
  variant = 'outline',
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
    const { href, ...anchorProps } = props as IconButtonAsAnchor;
    return <a href={href} className={classes} {...anchorProps} />;
  }

  const { type = 'button', ...buttonProps } = props as IconButtonAsButton;
  return <button type={type} className={classes} {...buttonProps} />;
};
