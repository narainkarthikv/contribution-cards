import React from 'react';

const withClassName = (base: string, extra?: string) =>
  extra ? `${base} ${extra}` : base;

type MainProps = React.ComponentPropsWithoutRef<'div'>;
type SectionProps = React.ComponentPropsWithoutRef<'section'>;
type DivProps = React.ComponentPropsWithoutRef<'div'>;
type ButtonProps = React.ComponentPropsWithoutRef<'button'>;
type AnchorProps = React.ComponentPropsWithoutRef<'a'>;

type GlowVariant = 'left' | 'right';

export const LandingShell: React.FC<MainProps> = ({ className, ...props }) => (
  <div
    className={withClassName(
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
    className={withClassName(
      'relative px-6 lg:px-10 py-20 lg:py-24',
      className
    )}
    {...props}
  />
);

export const LandingSection: React.FC<SectionProps> = ({
  className,
  ...props
}) => (
  <section className={withClassName('px-6 lg:px-10', className)} {...props} />
);

type LandingSectionInnerProps = DivProps & { withPadding?: boolean };

export const LandingSectionInner: React.FC<LandingSectionInnerProps> = ({
  className,
  withPadding = true,
  ...props
}) => (
  <div
    className={withClassName(
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
      className={withClassName(
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
    className={withClassName(
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

export const PrimaryCtaButton: React.FC<ButtonProps> = ({
  className,
  ...props
}) => (
  <button
    className={withClassName(
      'inline-flex items-center gap-2 rounded-md px-6 py-3 text-base font-semibold text-[var(--color-text-inverse)] transition-colors hover:bg-[var(--color-action-hover)] active:bg-[var(--color-action-active)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-default)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-primary)] disabled:cursor-not-allowed disabled:bg-[var(--color-action-disabled)] disabled:text-[var(--color-text-muted)]',
      className
    )}
    style={{
      background: 'var(--color-action-default)',
    }}
    {...props}
  />
);

export const SecondaryCtaLink: React.FC<AnchorProps> = ({
  className,
  ...props
}) => (
  <a
    className={withClassName(
      'inline-flex items-center gap-2 rounded-md px-6 py-3 text-base font-semibold transition-colors hover:bg-[var(--color-bg-secondary)] active:bg-[var(--color-surface-secondary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-default)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-primary)]',
      className
    )}
    style={{
      border: '1px solid var(--color-border-primary)',
      background: 'var(--color-surface-primary)',
      color: 'var(--color-text-primary)',
    }}
    {...props}
  />
);

export const OutlineChip: React.FC<{ size?: 'sm' | 'md' } & DivProps> = ({
  size = 'md',
  className,
  ...props
}) => (
  <span
    className={withClassName(
      size === 'sm'
        ? 'rounded-md px-2 py-1 text-xs'
        : 'rounded-md px-3 py-1 text-xs',
      className
    )}
    style={{
      border: '1px solid var(--color-border-primary)',
      background: 'var(--color-surface-primary)',
    }}
    {...props}
  />
);

export const LandingCardStrong: React.FC<DivProps> = ({
  className,
  ...props
}) => (
  <div
    className={withClassName(
      'rounded-2xl p-6 transition-colors duration-300',
      className
    )}
    style={{
      border: '1px solid var(--color-border-primary)',
      background: 'var(--color-surface-primary)',
    }}
    {...props}
  />
);

export const LandingCardMuted: React.FC<DivProps> = ({
  className,
  ...props
}) => (
  <div
    className={withClassName(
      'rounded-2xl p-6 transition-colors duration-300',
      className
    )}
    style={{
      border: '1px solid var(--color-border-primary)',
      background: 'var(--color-bg-secondary)',
    }}
    {...props}
  />
);

export const LandingPanel: React.FC<DivProps> = ({ className, ...props }) => (
  <div
    className={withClassName(
      'rounded-lg p-5 transition-colors duration-300',
      className
    )}
    style={{
      border: '1px solid var(--color-border-primary)',
      background: 'var(--color-surface-primary)',
    }}
    {...props}
  />
);

export const LandingPanelSoft: React.FC<DivProps> = ({
  className,
  ...props
}) => (
  <div
    className={withClassName(
      'rounded-lg p-4 transition-colors duration-300',
      className
    )}
    style={{
      border: '1px solid var(--color-border-primary)',
      background: 'var(--color-surface-primary)',
    }}
    {...props}
  />
);

export const LandingIconChip: React.FC<DivProps> = ({
  className,
  ...props
}) => (
  <span
    className={withClassName('rounded-md p-2', className)}
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
  <div
    className='flex items-center gap-3 rounded-lg px-4 py-3 transition-colors duration-300'
    style={{
      border: '1px solid var(--color-border-primary)',
      background: 'var(--color-surface-primary)',
    }}>
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
  </div>
);
