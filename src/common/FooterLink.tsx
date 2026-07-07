/**
 * FooterLink — shared footer/link primitive with an animated underline
 * that reveals on hover, tinted with the design system's action-blue.
 */

import React from 'react';
import { cx } from './classNames';

export interface FooterLinkProps extends React.ComponentPropsWithoutRef<'a'> {
  external?: boolean;
}

export const FooterLink: React.FC<FooterLinkProps> = ({
  external,
  className,
  children,
  ...props
}) => (
  <a
    className={cx(
      'group relative inline-flex w-fit items-center text-[var(--color-text-secondary)] transition-colors duration-200 hover:text-[var(--color-action-default)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-default)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-primary)] rounded-sm',
      className
    )}
    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    {...props}>
    <span className='relative'>
      {children}
      <span className='absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-[var(--color-action-default)] transition-transform duration-200 ease-out group-hover:scale-x-100' />
    </span>
  </a>
);
