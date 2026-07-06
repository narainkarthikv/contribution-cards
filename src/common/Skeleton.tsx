/**
 * Skeleton — shared loading placeholder primitive.
 * Renders an animated pulse block; consumers control size via className.
 */

import React from 'react';
import { cx } from './classNames';

export type SkeletonShape = 'rect' | 'circle';

export interface SkeletonProps extends React.ComponentPropsWithoutRef<'div'> {
  shape?: SkeletonShape;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  shape = 'rect',
  className,
  ...props
}) => (
  <div
    className={cx(
      'animate-pulse bg-[var(--color-bg-secondary)]',
      shape === 'circle' ? 'rounded-full' : 'rounded',
      className
    )}
    {...props}
  />
);
