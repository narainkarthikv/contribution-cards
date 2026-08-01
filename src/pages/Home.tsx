/**
 * Home Page (Landing Page) – Wisdom Fox Community
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Github,
  Users,
  Zap,
  Sparkles,
  ShieldCheck,
  Globe2,
  HeartHandshake,
  Layers,
  Gauge,
  Wand2,
  ArrowUpRight,
} from 'lucide-react';

import { useGlobalStats } from '../controllers/useGlobalStats';
import {
  LandingShell,
  LandingHero,
  LandingSection,
  LandingSectionInner,
  LandingGlow,
  LandingHalo,
  LandingEyebrow,
  PrimaryCtaButton,
  SecondaryCtaLink,
  OutlineChip,
  LandingCardStrong,
  LandingCardMuted,
  LandingPanel,
  LandingPanelSoft,
  LandingIconChip,
  LandingStatChip,
} from '../components/landing';
import {
  APP_NAME,
  APP_REPOSITORY,
  REPOSITORY_LIST,
} from '../constants/repositories';
import { FooterLinkColumn, type FooterLinkItem, Button } from '../common';
import { useI18n } from '../i18n/useI18n';

const projectLinks = (t: (key: string) => string): FooterLinkItem[] => [
  { label: t('app.openApp'), href: '/contributors' },
  {
    label: t('app.githubRepo'),
    href: `https://github.com/${APP_REPOSITORY}`,
    external: true,
  },
  {
    label: t('app.issuesRoadmap'),
    href: `https://github.com/${APP_REPOSITORY}/issues`,
    external: true,
  },
];

const communityLinks = (t: (key: string) => string): FooterLinkItem[] => [
  {
    label: t('app.contributing'),
    href: `https://github.com/${APP_REPOSITORY}/blob/main/CONTRIBUTING.md`,
    external: true,
  },
  {
    label: t('app.codeOfConduct'),
    href: `https://github.com/${APP_REPOSITORY}/blob/main/CODE_OF_CONDUCT.md`,
    external: true,
  },
  {
    label: t('app.securityPolicy'),
    href: `https://github.com/${APP_REPOSITORY}/blob/main/SECURITY.md`,
    external: true,
  },
];

const legalLinks = (t: (key: string) => string): FooterLinkItem[] => [
  {
    label: t('app.mitLicense'),
    href: `https://github.com/${APP_REPOSITORY}/blob/main/MIT-LICENSE.txt`,
    external: true,
  },
  {
    label: t('app.documentation'),
    href: `https://github.com/${APP_REPOSITORY}/blob/main/README.md`,
    external: true,
  },
  {
    label: t('app.releaseNotes'),
    href: `https://github.com/${APP_REPOSITORY}/releases`,
    external: true,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { stats, isLoading } = useGlobalStats();
  const { t } = useI18n();
  const projectLinksList = projectLinks(t);
  const communityLinksList = communityLinks(t);
  const legalLinksList = legalLinks(t);
  const projectHighlights = [
    t('home.footerHighlightOne'),
    t('home.footerHighlightTwo'),
    t('home.footerHighlightThree'),
  ];
  const projectFocus = [
    t('home.footerFocusOne'),
    t('home.footerFocusTwo'),
    t('home.footerFocusThree'),
  ];

  return (
    <LandingShell>
      <LandingGlow variant='right' />
      <LandingGlow variant='left' />
      <LandingHalo />

      <LandingHero>
        <div className='mx-auto max-w-6xl'>
          <div className='grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]'>
            <motion.div variants={container} initial='hidden' animate='show'>
              <motion.div variants={fadeUp} className='w-fit'>
                <LandingEyebrow>
                  <span className='inline-flex h-2 w-2 rounded-full bg-[var(--color-success)]' />
                  {t('home.eyebrow')}
                </LandingEyebrow>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className='mt-6 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl'>
                {t('home.heroTitle')}
                <span className='block text-[var(--color-text-primary)]'>
                  {t('home.heroTitleAccent')}
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className='mt-4 max-w-[56ch] text-lg text-[var(--color-text-secondary)]'>
                {t('home.heroSubtitle')}
              </motion.p>

              <motion.div
                variants={fadeUp}
                className='mt-8 flex flex-wrap items-center gap-3'>
                <PrimaryCtaButton onClick={() => navigate('/contributors')}>
                  {t('home.primaryCta')}
                  <ArrowRight size={18} />
                </PrimaryCtaButton>
                <SecondaryCtaLink
                  href={`https://github.com/${APP_REPOSITORY}`}
                  target='_blank'
                  rel='noopener noreferrer'>
                  {t('home.secondaryCta')}
                  <ArrowUpRight size={16} />
                </SecondaryCtaLink>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className='mt-8 flex flex-wrap items-center gap-3 text-xs text-[var(--color-text-secondary)]'>
                {t('home.chips').split('|').map((item) => (
                  <OutlineChip key={item}>{item}</OutlineChip>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              variants={container}
              initial='hidden'
              animate='show'
              className='grid gap-4'>
              <motion.div
                variants={fadeUp}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}>
                <LandingCardStrong>
                  <div className='flex items-center justify-between'>
                    <p className='text-xs uppercase tracking-[0.2em] text-[var(--color-text-secondary)]'>
                      {t('home.communityPulse')}
                    </p>
                    <span className='rounded-full bg-[color-mix(in_srgb,var(--color-success)_18%,transparent_82%)] px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-[var(--color-success)]'>
                      {t('home.live')}
                    </span>
                  </div>
                  <div className='mt-6 grid gap-3'>
                    <LandingStatChip
                      icon={Users}
                      value={stats?.uniqueContributorCount ?? 0}
                      label={t('home.statUniqueBuilders')}
                      loading={isLoading}
                    />
                    <LandingStatChip
                      icon={Zap}
                      value={stats?.totalContributions ?? 0}
                      label={t('home.statTotalContributions')}
                      loading={isLoading}
                    />
                    <LandingStatChip
                      icon={Github}
                      value={stats?.totalRepositories ?? REPOSITORY_LIST.length}
                      label={t('home.statActiveRepositories')}
                      loading={isLoading}
                    />
                  </div>
                </LandingCardStrong>
              </motion.div>
              <motion.div
                variants={fadeUp}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}>
                <LandingCardMuted>
                  <p className='text-sm font-semibold'>
                    {t('home.nextStepsTitle')}
                  </p>
                  <p className='mt-2 text-sm text-[var(--color-text-secondary)]'>
                    {t('home.nextStepsBody')}
                  </p>
                  <div className='mt-4 flex flex-wrap items-center gap-2 text-xs text-[var(--color-text-secondary)]'>
                    {t('home.nextStepsChips').split('|').map((item) => (
                      <OutlineChip key={item} size='sm'>
                        {item}
                      </OutlineChip>
                    ))}
                  </div>
                </LandingCardMuted>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </LandingHero>

      <LandingSection>
        <LandingSectionInner>
          <div className='grid gap-12 lg:grid-cols-[0.9fr_1.1fr]'>
            <div>
              <p className='text-sm uppercase tracking-[0.2em] text-[var(--color-text-secondary)]'>
                {t('home.designedForClarity')}
              </p>
              <h2 className='mt-3 text-3xl font-semibold sm:text-4xl'>
                {t('home.sectionTitle')}
              </h2>
              <p className='mt-4 text-base text-[var(--color-text-secondary)]'>
                {t('home.sectionBody')}
              </p>
              <div className='mt-8 grid gap-4'>
                {[
                  {
                    title: t('home.cardsTitle'),
                    copy: t('home.cardsBody'),
                    icon: Wand2,
                  },
                  {
                    title: t('home.insightsTitle'),
                    copy: t('home.insightsBody'),
                    icon: Gauge,
                  },
                  {
                    title: t('home.accessibleTitle'),
                    copy: t('home.accessibleBody'),
                    icon: Layers,
                  },
                ].map((item) => (
                  <LandingPanelSoft
                    key={item.title}
                    className='flex items-start gap-4'>
                    <LandingIconChip>
                      <item.icon size={18} />
                    </LandingIconChip>
                    <div>
                      <h3 className='text-sm font-semibold'>{item.title}</h3>
                      <p className='mt-1 text-sm text-[var(--color-text-secondary)]'>
                        {item.copy}
                      </p>
                    </div>
                  </LandingPanelSoft>
                ))}
              </div>
            </div>

            <div className='grid gap-5'>
              {[
                {
                  title: t('home.insightsTitle'),
                  copy: t('home.insightsBody'),
                  icon: ShieldCheck,
                },
                {
                  title: t('home.cardsTitle'),
                  copy: t('home.cardsBody'),
                  icon: HeartHandshake,
                },
                {
                  title: t('home.accessibleTitle'),
                  copy: t('home.accessibleBody'),
                  icon: Globe2,
                },
                {
                  title: t('home.sectionTitle'),
                  copy: t('home.sectionBody'),
                  icon: Sparkles,
                },
              ].map((item) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  initial='hidden'
                  whileInView='show'
                  viewport={{ once: true, amount: 0.2 }}>
                  <LandingPanel>
                    <div className='flex items-center gap-3'>
                      <LandingIconChip>
                        <item.icon size={18} />
                      </LandingIconChip>
                      <h3 className='text-sm font-semibold'>{item.title}</h3>
                    </div>
                    <p className='mt-3 text-sm text-[var(--color-text-secondary)]'>
                      {item.copy}
                    </p>
                  </LandingPanel>
                </motion.div>
              ))}
            </div>
          </div>
        </LandingSectionInner>
      </LandingSection>

      <LandingSection>
        <LandingSectionInner>
          <LandingCardMuted className='rounded-3xl p-8 md:p-10'>
            <div className='grid gap-10 md:grid-cols-[1.1fr_0.9fr]'>
              <div>
                <p className='text-sm uppercase tracking-[0.2em] text-[var(--color-text-secondary)]'>
                  {t('home.footerTitle')}
                </p>
                <h2 className='mt-3 text-3xl font-semibold sm:text-4xl'>
                  {t('home.footerTitle')}
                </h2>
                <p className='mt-4 text-base text-[var(--color-text-secondary)]'>
                  {t('home.footerBody')}
                </p>
              </div>
              <div className='grid gap-4'>
                <LandingPanel>
                  <h3 className='text-sm font-semibold'>
                    {t('home.footerHighlightsTitle')}
                  </h3>
                  <ul className='mt-3 space-y-2 text-sm text-[var(--color-text-secondary)]'>
                    {projectHighlights.map((item) => (
                      <li key={item} className='flex items-start gap-2'>
                        <span className='text-[var(--color-action-default)]'>
                          →
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </LandingPanel>
                <LandingPanel>
                  <h3 className='text-sm font-semibold'>
                    {t('home.footerFocusTitle')}
                  </h3>
                  <ul className='mt-3 space-y-2 text-sm text-[var(--color-text-secondary)]'>
                    {projectFocus.map((item) => (
                      <li key={item} className='flex items-start gap-2'>
                        <span className='text-[var(--color-error)]'>✗</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </LandingPanel>
              </div>
            </div>
          </LandingCardMuted>
        </LandingSectionInner>
      </LandingSection>

      <LandingSection>
        <LandingSectionInner className='pt-8 pb-8 lg:pt-10 lg:pb-10'>
          <div className='rounded-3xl border border-[var(--color-border-primary)] bg-[var(--color-surface-primary)] p-10'>
            <div className='mx-auto max-w-3xl text-center'>
              <h2 className='text-3xl font-semibold sm:text-4xl'>
                {t('home.ctaHeading')}
              </h2>
              <p className='mx-auto mt-4 max-w-[60ch] text-base text-[var(--color-text-secondary)]'>
                {t('home.ctaSubtitle')}
              </p>
              <div className='mt-8 flex flex-wrap items-center justify-center gap-3'>
                <Button
                  variant='primary'
                  size='md'
                  onClick={() => navigate('/contributors')}>
                  {t('home.openContributors')}
                  <ArrowRight size={18} />
                </Button>
                <Button
                  variant='secondary'
                  size='md'
                  href={`https://github.com/${APP_REPOSITORY}`}
                  target='_blank'
                  rel='noopener noreferrer'>
                  <Github size={18} />
                  {t('home.starOnGitHub')}
                </Button>
              </div>
            </div>
          </div>
        </LandingSectionInner>
      </LandingSection>

      <LandingSection>
        <LandingSectionInner className='pt-8 pb-8 lg:pt-10 lg:pb-10'>
          <LandingCardMuted className='rounded-3xl p-8 text-center'>
            <div className='mx-auto max-w-3xl'>
              <p className='text-sm uppercase tracking-[0.2em] text-[var(--color-text-secondary)]'>
                {t('app.eyebrow')}
              </p>
              <h2 className='mt-3 text-3xl font-semibold sm:text-4xl'>
                {t('home.supportTitle')}
              </h2>
              <p className='mx-auto mt-4 max-w-[64ch] text-base text-[var(--color-text-secondary)]'>
                {t('home.supportBody')}
              </p>
              <div className='mt-8 flex flex-wrap items-center justify-center gap-3'>
                <Button
                  variant='secondary'
                  size='sm'
                  href='https://ko-fi.com/wisdomfox'
                  target='_blank'
                  rel='noopener noreferrer'>
                  {t('home.buyACoffee')}
                </Button>
                <Button
                  variant='primary'
                  size='sm'
                  href='https://buymeacoffee.com/narainkarthikv'
                  target='_blank'
                  rel='noopener noreferrer'>
                  {t('home.supportOnBuyMeACoffee')}
                </Button>
              </div>
              <p className='mt-8 text-xs text-[var(--color-text-secondary)]'>
                {t('home.donationNote')}
              </p>
            </div>
          </LandingCardMuted>
        </LandingSectionInner>
      </LandingSection>

      <LandingSection>
        <LandingSectionInner
          withPadding={false}
          className='pt-4 pb-6 lg:pt-6 lg:pb-8'>
          <div className='border-t border-[color-mix(in_srgb,var(--color-border-primary)_70%,transparent_30%)] pt-8'>
            <div className='grid gap-8 text-center md:grid-cols-[1.3fr_1fr_1fr_1fr] md:text-left'>
              <div>
                <h3 className='text-lg font-semibold'>{APP_NAME}</h3>
                <p className='mt-3 text-sm text-[var(--color-text-secondary)]'>
                  {t('home.communityTagline')}
                </p>
                <p className='mt-4 text-xs text-[var(--color-text-secondary)]'>
                  {t('home.copyright')}
                </p>
              </div>
              <FooterLinkColumn title={t('home.footerProjectTitle')} links={projectLinksList} />
              <FooterLinkColumn title={t('home.footerCommunityTitle')} links={communityLinksList} />
              <FooterLinkColumn title={t('home.footerLegalTitle')} links={legalLinksList} />
            </div>
            <div className='mt-8 text-center text-xs text-[var(--color-text-secondary)]'></div>
          </div>
        </LandingSectionInner>
      </LandingSection>
    </LandingShell>
  );
};
