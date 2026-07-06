import React from 'react';
import { Badge, Button, Card, cx } from '../../common';

type MainProps = React.ComponentPropsWithoutRef<'div'>;
type SectionProps = React.ComponentPropsWithoutRef<'section'>;
type DivProps = React.ComponentPropsWithoutRef<'div'>;

type GlowVariant = 'left' | 'right';

export const LandingShell: React.FC<MainProps> = ({ className, ...props }) => (
  <div
    className={cx(
      'relative w-full overflow-hidden bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]',
      className
    )}
    {...props}
  />
);

export const LandingHero: React.FC<SectionProps> = ({
  className,
  ...props
}) => (
  <section
    className={cx('relative px-6 lg:px-10 py-20 lg:py-24', className)}
    {...props}
  />
);

export const LandingSection: React.FC<SectionProps> = ({
  className,
  ...props
}) => <section className={cx('px-6 lg:px-10', className)} {...props} />;

type LandingSectionInnerProps = DivProps & { withPadding?: boolean };

export const LandingSectionInner: React.FC<LandingSectionInnerProps> = ({
  className,
  withPadding = true,
  ...props
}) => (
  <div
    className={cx(
      withPadding ? 'mx-auto max-w-6xl py-12 lg:py-16' : 'mx-auto max-w-6xl',
      className
    )}
    {...props}
  />
);

export const LandingGlow: React.FC<{ variant: GlowVariant }> = ({
  variant,
}) => {
  const style =
    variant === 'right'
      ? {
          background:
            'radial-gradient(circle at center, color-mix(in_srgb, var(--color-border-primary) 32%, transparent 68%) 0%, transparent 70%)',
        }
      : {
          background:
            'radial-gradient(circle at center, color-mix(in_srgb, var(--color-bg-secondary) 48%, transparent 52%) 0%, transparent 72%)',
        };

  return (
    <div
      className={cx(
        'pointer-events-none absolute rounded-full blur-3xl',
        variant === 'right'
          ? '-top-28 right-[-10%] h-[440px] w-[440px]'
          : '-bottom-44 left-[-8%] h-[520px] w-[520px]'
      )}
      style={style}
    />
  );
};

export const LandingHalo: React.FC = () => (
  <div
    className='pointer-events-none absolute inset-0 opacity-35'
    style={{
      backgroundImage:
        'radial-gradient(circle at top, color-mix(in_srgb, var(--color-border-primary) 35%, transparent 65%) 0%, transparent 55%)',
    }}
  />
);

export const LandingEyebrow: React.FC<DivProps> = ({ className, ...props }) => (
  <div
    className={cx(
      'inline-flex items-center gap-3 rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em]',
      className
    )}
    style={{
      border:
        '1px solid color-mix(in_srgb, var(--color-border-primary) 70%, transparent 30%)',
      background:
        'color-mix(in_srgb, var(--color-bg-secondary) 75%, transparent 25%)',
      color: 'var(--color-text-secondary)',
    }}
    {...props}
  />
);

export const PrimaryCtaButton: React.FC<
  React.ComponentPropsWithoutRef<'button'>
> = ({ className, ...props }) => (
  <Button variant='primary' size='md' className={className} {...props} />
);

export const SecondaryCtaLink: React.FC<React.ComponentPropsWithoutRef<'a'>> = ({
  className,
  href,
  ...props
}) => (
  <Button
    variant='secondary'
    size='md'
    href={href ?? '#'}
    className={className}
    {...props}
  />
);

export const OutlineChip: React.FC<{ size?: 'sm' | 'md' } & DivProps> = ({
  size = 'md',
  ...props
}) => <Badge variant='outline' size={size} {...props} />;

export const LandingCardStrong: React.FC<DivProps> = (props) => (
  <Card tone='primary' padding='lg' rounded='2xl' {...props} />
);

export const LandingCardMuted: React.FC<DivProps> = (props) => (
  <Card tone='secondary' padding='lg' rounded='2xl' {...props} />
);

export const LandingPanel: React.FC<DivProps> = (props) => (
  <Card tone='primary' padding='md' rounded='lg' {...props} />
);

export const LandingPanelSoft: React.FC<DivProps> = (props) => (
  <Card tone='primary' padding='sm' rounded='lg' {...props} />
);

export const LandingIconChip: React.FC<DivProps> = ({
  className,
  ...props
}) => (
  <span
    className={cx('rounded-md p-2', className)}
    style={{
      background: 'var(--color-bg-secondary)',
      color: 'var(--color-action-default)',
    }}
    {...props}
  />
);

export const LandingStatChip: React.FC<{
  icon: React.ElementType;
  value: number;
  label: string;
  loading: boolean;
}> = ({ icon: Icon, value, label, loading }) => (
  <Card
    tone='primary'
    padding='none'
    rounded='lg'
    className='flex items-center gap-3 px-4 py-3'>
    <LandingIconChip>
      <Icon size={18} />
    </LandingIconChip>
    <div className='flex items-center gap-3'>
      <div className='text-lg font-semibold leading-none text-[var(--color-text-primary)]'>
        {loading ? '—' : value.toLocaleString()}
      </div>
      <div className='text-[11px] uppercase tracking-[0.18em] text-[var(--color-text-muted)]'>
        {label}
      </div>
    </div>
  </Card>
);
