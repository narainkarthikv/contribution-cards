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
      'relative px-6 lg:px-10 py-16 lg:py-24',
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
            'radial-gradient(circle at center, color-mix(in_srgb, var(--color-action-default) 26%, transparent 74%) 0%, transparent 68%)',
        }
      : {
          background:
            'radial-gradient(circle at center, color-mix(in_srgb, var(--color-success) 22%, transparent 78%) 0%, transparent 70%)',
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
      'inline-flex items-center gap-2 rounded-xl px-6 py-3 text-base font-semibold text-white transition hover:bg-[var(--color-action-hover)]',
      className
    )}
    style={{
      background: 'var(--color-action-default)',
      boxShadow: '0 18px 40px -24px rgba(37, 99, 235, 0.6)',
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
      'inline-flex items-center gap-2 rounded-xl px-6 py-3 text-base font-semibold transition',
      className
    )}
    style={{
      border:
        '1px solid color-mix(in_srgb, var(--color-border-primary) 70%, transparent 30%)',
      background:
        'color-mix(in_srgb, var(--color-surface-primary) 92%, transparent 8%)',
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
        ? 'rounded-full px-2 py-1 text-xs'
        : 'rounded-full px-3 py-1 text-xs',
      className
    )}
    style={{
      border:
        '1px solid color-mix(in_srgb, var(--color-border-primary) 70%, transparent 30%)',
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
      'rounded-3xl p-6 transition-all duration-300',
      className
    )}
    style={{
      border: '1px solid transparent',
      background:
        'linear-gradient(180deg, color-mix(in_srgb, var(--color-surface-primary) 94%, transparent 6%) 0%, color-mix(in_srgb, var(--color-surface-primary) 86%, transparent 14%) 100%) padding-box, linear-gradient(135deg, color-mix(in_srgb, var(--color-action-default) 38%, var(--color-border-primary) 62%) 0%, color-mix(in_srgb, var(--color-border-primary) 90%, transparent 10%) 100%) border-box',
      boxShadow:
        '0 26px 60px -42px rgba(15, 23, 42, 0.5), inset 0 1px 0 color-mix(in_srgb, var(--color-text-inverse) 10%, transparent 90%)',
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
      'rounded-3xl p-6 transition-all duration-300',
      className
    )}
    style={{
      border: '1px solid transparent',
      background:
        'linear-gradient(180deg, color-mix(in_srgb, var(--color-bg-secondary) 92%, transparent 8%) 0%, color-mix(in_srgb, var(--color-bg-secondary) 84%, transparent 16%) 100%) padding-box, linear-gradient(135deg, color-mix(in_srgb, var(--color-border-primary) 85%, transparent 15%) 0%, color-mix(in_srgb, var(--color-border-primary) 65%, transparent 35%) 100%) border-box',
      boxShadow:
        'inset 0 1px 0 color-mix(in_srgb, var(--color-text-inverse) 8%, transparent 92%)',
    }}
    {...props}
  />
);

export const LandingPanel: React.FC<DivProps> = ({ className, ...props }) => (
  <div
    className={withClassName(
      'rounded-2xl p-5 transition-all duration-300',
      className
    )}
    style={{
      border: '1px solid transparent',
      background:
        'linear-gradient(180deg, color-mix(in_srgb, var(--color-surface-primary) 94%, transparent 6%) 0%, color-mix(in_srgb, var(--color-surface-primary) 86%, transparent 14%) 100%) padding-box, linear-gradient(135deg, color-mix(in_srgb, var(--color-border-primary) 90%, transparent 10%) 0%, color-mix(in_srgb, var(--color-border-primary) 70%, transparent 30%) 100%) border-box',
      boxShadow:
        'inset 0 1px 0 color-mix(in_srgb, var(--color-text-inverse) 8%, transparent 92%)',
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
      'rounded-2xl p-4 transition-all duration-300',
      className
    )}
    style={{
      border: '1px solid transparent',
      background:
        'linear-gradient(180deg, color-mix(in_srgb, var(--color-surface-primary) 96%, transparent 4%) 0%, color-mix(in_srgb, var(--color-surface-primary) 90%, transparent 10%) 100%) padding-box, linear-gradient(135deg, color-mix(in_srgb, var(--color-border-primary) 80%, transparent 20%) 0%, color-mix(in_srgb, var(--color-border-primary) 65%, transparent 35%) 100%) border-box',
      boxShadow:
        'inset 0 1px 0 color-mix(in_srgb, var(--color-text-inverse) 7%, transparent 93%)',
    }}
    {...props}
  />
);

export const LandingIconChip: React.FC<DivProps> = ({
  className,
  ...props
}) => (
  <span
    className={withClassName('rounded-xl p-2', className)}
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
    className='flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-300'
    style={{
      border: '1px solid transparent',
      background:
        'linear-gradient(180deg, color-mix(in_srgb, var(--color-surface-primary) 96%, transparent 4%) 0%, color-mix(in_srgb, var(--color-surface-primary) 88%, transparent 12%) 100%) padding-box, linear-gradient(135deg, color-mix(in_srgb, var(--color-border-primary) 90%, transparent 10%) 0%, color-mix(in_srgb, var(--color-border-primary) 70%, transparent 30%) 100%) border-box',
      boxShadow:
        'inset 0 1px 0 color-mix(in_srgb, var(--color-text-inverse) 8%, transparent 92%)',
    }}>
    <LandingIconChip>
      <Icon size={18} />
    </LandingIconChip>
    <div>
      <div className='text-lg font-semibold text-[var(--color-text-primary)]'>
        {loading ? '—' : value.toLocaleString()}
      </div>
      <div className='text-[11px] uppercase tracking-[0.18em] text-[var(--color-text-muted)]'>
        {label}
      </div>
    </div>
  </div>
);
