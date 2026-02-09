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

  return (
    <LandingShell>
      <LandingGlow variant='right' />
      <LandingGlow variant='left' />
      <LandingHalo />

      <LandingHero>
        <div className='mx-auto max-w-6xl'>
          <div className='grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]'>
            <motion.div variants={container} initial='hidden' animate='show'>
              <motion.div variants={fadeUp} className='w-fit'>
                <LandingEyebrow>
                  <span className='inline-flex h-2 w-2 rounded-full bg-[var(--color-success)]' />
                  Wisdom Fox community
                </LandingEyebrow>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className='mt-6 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl'>
                Spotlight the builders shaping
                <span className='block bg-[linear-gradient(110deg,var(--color-action-default),_color-mix(in_srgb,var(--color-action-default)_70%,var(--color-success)_30%))] bg-clip-text text-transparent'>
                  Wisdom Fox Community
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className='mt-4 max-w-[56ch] text-lg text-[var(--color-text-secondary)]'>
                {APP_NAME} turns contributor impact into premium, share-ready
                cards. Highlight the people behind every repo with a polished,
                modern experience.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className='mt-8 flex flex-wrap items-center gap-3'>
                <PrimaryCtaButton onClick={() => navigate('/contributors')}>
                  Explore contributors
                  <ArrowRight size={18} />
                </PrimaryCtaButton>
                <SecondaryCtaLink
                  href={`https://github.com/${APP_REPOSITORY}`}
                  target='_blank'
                  rel='noopener noreferrer'>
                  View the repo
                  <ArrowUpRight size={16} />
                </SecondaryCtaLink>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className='mt-10 flex flex-wrap items-center gap-3 text-xs text-[var(--color-text-secondary)]'>
                {['Impact insights', 'Share-ready cards', 'Smart filters'].map(
                  (item) => (
                    <OutlineChip key={item}>{item}</OutlineChip>
                  )
                )}
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
                      Community pulse
                    </p>
                    <span className='rounded-full bg-[color-mix(in_srgb,var(--color-success)_18%,transparent_82%)] px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-[var(--color-success)]'>
                      Live
                    </span>
                  </div>
                  <div className='mt-6 grid gap-3'>
                    <LandingStatChip
                      icon={Users}
                      value={stats?.uniqueContributorCount ?? 0}
                      label='Unique builders'
                      loading={isLoading}
                    />
                    <LandingStatChip
                      icon={Zap}
                      value={stats?.totalContributions ?? 0}
                      label='Total contributions'
                      loading={isLoading}
                    />
                    <LandingStatChip
                      icon={Github}
                      value={stats?.totalRepositories ?? REPOSITORY_LIST.length}
                      label='Active repositories'
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
                    Next steps, simplified
                  </p>
                  <p className='mt-2 text-sm text-[var(--color-text-secondary)]'>
                    Filter by repo, sort by impact, and open a profile in
                    seconds. Everything stays fast and respectful of rate
                    limits.
                  </p>
                  <div className='mt-4 flex flex-wrap items-center gap-2 text-xs text-[var(--color-text-secondary)]'>
                    {['Smart filters', 'Quick share', 'Rank by impact'].map(
                      (item) => (
                        <OutlineChip key={item} size='sm'>
                          {item}
                        </OutlineChip>
                      )
                    )}
                  </div>
                </LandingCardMuted>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </LandingHero>

      <LandingSection>
        <LandingSectionInner>
          <div className='grid gap-10 lg:grid-cols-[0.9fr_1.1fr]'>
            <div>
              <p className='text-sm uppercase tracking-[0.2em] text-[var(--color-text-secondary)]'>
                Designed for clarity
              </p>
              <h2 className='mt-3 text-3xl font-semibold sm:text-4xl'>
                A quiet, premium way to honor contributors
              </h2>
              <p className='mt-4 text-base text-[var(--color-text-secondary)]'>
                Fewer surfaces. Better focus. The experience stays calm while
                still highlighting the people who move the project forward.
              </p>
              <div className='mt-6 grid gap-4'>
                {[
                  {
                    title: 'Elegant cards',
                    copy: 'Shareable profiles that feel curated, not cluttered.',
                    icon: Wand2,
                  },
                  {
                    title: 'SWR refresh',
                    copy: 'Instant results while fresh data loads behind the scenes.',
                    icon: Gauge,
                  },
                  {
                    title: 'Dual-layer cache',
                    copy: 'Memory and localStorage keep everything snappy.',
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

            <div className='grid gap-4'>
              {[
                {
                  title: 'Instant insight loops',
                  copy: 'Surface contributor momentum fast with smart aggregation.',
                  icon: ShieldCheck,
                },
                {
                  title: 'Team-ready profiles',
                  copy: 'Spotlight builders with clean, shareable profile cards.',
                  icon: HeartHandshake,
                },
                {
                  title: 'Signal over noise',
                  copy: 'Focus on impact, not cluttered dashboards or exports.',
                  icon: Globe2,
                },
                {
                  title: 'Responsive by default',
                  copy: 'Looks sharp on desktop, tablet, or a quick mobile check-in.',
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
          <LandingCardMuted className='rounded-[28px] p-8 md:p-10'>
            <div className='grid gap-8 md:grid-cols-[1.1fr_0.9fr]'>
              <div>
                <p className='text-sm uppercase tracking-[0.2em] text-[var(--color-text-secondary)]'>
                  Transparent tech
                </p>
                <h2 className='mt-3 text-3xl font-semibold sm:text-4xl'>
                  The honest breakdown, without the noise
                </h2>
                <p className='mt-4 text-base text-[var(--color-text-secondary)]'>
                  No hidden services. No mystery APIs. Just a clean, open stack
                  designed for speed and trust.
                </p>
              </div>
              <div className='grid gap-4'>
                <LandingPanel>
                  <h3 className='text-sm font-semibold'>
                    Where the data lives
                  </h3>
                  <ul className='mt-3 space-y-2 text-sm text-[var(--color-text-secondary)]'>
                    <li className='flex items-start gap-2'>
                      <span className='text-[var(--color-action-default)]'>
                        →
                      </span>
                      GitHub contributors API with smart caching.
                    </li>
                    <li className='flex items-start gap-2'>
                      <span className='text-[var(--color-action-default)]'>
                        →
                      </span>
                      Client-side filtering and sorting only.
                    </li>
                    <li className='flex items-start gap-2'>
                      <span className='text-[var(--color-action-default)]'>
                        →
                      </span>
                      No databases to leak because we do not run one.
                    </li>
                  </ul>
                </LandingPanel>
                <LandingPanel>
                  <h3 className='text-sm font-semibold'>
                    What keeps it focused
                  </h3>
                  <ul className='mt-3 space-y-2 text-sm text-[var(--color-text-secondary)]'>
                    <li className='flex items-start gap-2'>
                      <span className='text-[var(--color-error)]'>✗</span>
                      Heavy dashboards that slow teams down.
                    </li>
                    <li className='flex items-start gap-2'>
                      <span className='text-[var(--color-error)]'>✗</span>
                      Manual exports or spreadsheet wrangling.
                    </li>
                    <li className='flex items-start gap-2'>
                      <span className='text-[var(--color-error)]'>✗</span>
                      Fragmented views of contributor impact.
                    </li>
                  </ul>
                </LandingPanel>
              </div>
            </div>
          </LandingCardMuted>
        </LandingSectionInner>
      </LandingSection>

      <LandingSection>
        <LandingSectionInner>
          <div className='rounded-[30px] bg-[linear-gradient(135deg,_color-mix(in_srgb,var(--color-action-default)_70%,transparent_30%)_0%,_color-mix(in_srgb,var(--color-success)_46%,transparent_54%)_100%)] p-10 text-white shadow-[0_28px_70px_-46px_rgba(15,23,42,0.5)]'>
            <div className='mx-auto max-w-3xl text-center'>
              <h2 className='text-3xl font-semibold sm:text-4xl'>
                Ready to spotlight the builders?
              </h2>
              <p className='mx-auto mt-4 max-w-[60ch] text-base text-white/90'>
                Honor contributions, onboard new teammates, and keep the Wisdom
                Fox culture glowing. Start with the contributor cards now.
              </p>
              <div className='mt-8 flex flex-wrap items-center justify-center gap-3'>
                <button
                  onClick={() => navigate('/contributors')}
                  className='inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-base font-semibold text-slate-900 shadow-[0_18px_36px_-24px_rgba(15,23,42,0.5)] transition'>
                  Open contributors
                  <ArrowRight size={18} />
                </button>
                <a
                  href={`https://github.com/${APP_REPOSITORY}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center gap-2 rounded-xl border border-white/50 px-6 py-3 text-base font-semibold text-white transition'>
                  <Github size={18} />
                  Star on GitHub
                </a>
              </div>
            </div>
          </div>
        </LandingSectionInner>
      </LandingSection>

      <LandingSection>
        <LandingSectionInner>
          <LandingCardMuted className='rounded-[28px] p-8 text-center'>
            <div className='mx-auto max-w-3xl'>
              <p className='text-sm uppercase tracking-[0.2em] text-[var(--color-text-secondary)]'>
                Wisdom Fox Community
              </p>
              <h2 className='mt-3 text-3xl font-semibold sm:text-4xl'>
                Support open source craft
              </h2>
              <p className='mx-auto mt-4 max-w-[64ch] text-base text-[var(--color-text-secondary)]'>
                Contribution Cards is maintained by the Wisdom Fox community. If
                the project saves you time, consider fueling the next release
                with a coffee or a small pledge.
              </p>
              <div className='mt-8 flex flex-wrap items-center justify-center gap-3'>
                <a
                  href='https://ko-fi.com/wisdomfox'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center gap-2 rounded-xl border border-[color-mix(in_srgb,var(--color-border-primary)_70%,transparent_30%)] bg-[color-mix(in_srgb,var(--color-surface-primary)_92%,transparent_8%)] px-6 py-3 text-sm font-semibold transition'>
                  ☕ Buy us a coffee
                </a>
                <a
                  href='https://patreon.com/user?u=72747187'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center gap-2 rounded-xl bg-[var(--color-action-default)] px-6 py-3 text-sm font-semibold text-white transition'>
                  💚 Support on Patreon
                </a>
              </div>
              <p className='mt-6 text-xs text-[var(--color-text-secondary)]'>
                Donations are optional. Contribution Cards will always be free
                and open source.
              </p>
            </div>
          </LandingCardMuted>
        </LandingSectionInner>
      </LandingSection>

      <LandingSection>
        <LandingSectionInner withPadding={false} className='pt-8 pb-4'>
          <div className='border-t border-[color-mix(in_srgb,var(--color-border-primary)_70%,transparent_30%)] pt-8'>
            <div className='grid gap-8 text-center md:grid-cols-[1.3fr_1fr_1fr_1fr] md:text-left'>
              <div>
                <h3 className='text-lg font-semibold'>{APP_NAME}</h3>
                <p className='mt-3 text-sm text-[var(--color-text-secondary)]'>
                  A fast, contributor showcase built by the Wisdom Fox
                  community.
                </p>
                <p className='mt-4 text-xs text-[var(--color-text-secondary)]'>
                  © 2026 {APP_NAME}. Crafted with care for an open web.
                </p>
              </div>
              <div>
                <h4 className='text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-text-secondary)]'>
                  Project
                </h4>
                <ul className='mt-4 space-y-2 text-sm'>
                  <li>
                    <a
                      href='/contributors'
                      className='text-[var(--color-text-secondary)] transition hover:text-[var(--color-text-primary)]'>
                      Open app
                    </a>
                  </li>
                  <li>
                    <a
                      href={`https://github.com/${APP_REPOSITORY}`}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-[var(--color-text-secondary)] transition hover:text-[var(--color-text-primary)]'>
                      GitHub repo
                    </a>
                  </li>
                  <li>
                    <a
                      href={`https://github.com/${APP_REPOSITORY}/issues`}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-[var(--color-text-secondary)] transition hover:text-[var(--color-text-primary)]'>
                      Issues & roadmap
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className='text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-text-secondary)]'>
                  Community
                </h4>
                <ul className='mt-4 space-y-2 text-sm'>
                  <li>
                    <a
                      href={`https://github.com/${APP_REPOSITORY}/blob/main/CONTRIBUTING.md`}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-[var(--color-text-secondary)] transition hover:text-[var(--color-text-primary)]'>
                      Contributing
                    </a>
                  </li>
                  <li>
                    <a
                      href={`https://github.com/${APP_REPOSITORY}/blob/main/CODE_OF_CONDUCT.md`}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-[var(--color-text-secondary)] transition hover:text-[var(--color-text-primary)]'>
                      Code of conduct
                    </a>
                  </li>
                  <li>
                    <a
                      href={`https://github.com/${APP_REPOSITORY}/blob/main/SECURITY.md`}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-[var(--color-text-secondary)] transition hover:text-[var(--color-text-primary)]'>
                      Security policy
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className='text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-text-secondary)]'>
                  Legal
                </h4>
                <ul className='mt-4 space-y-2 text-sm'>
                  <li>
                    <a
                      href={`https://github.com/${APP_REPOSITORY}/blob/main/MIT-LICENSE.txt`}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-[var(--color-text-secondary)] transition hover:text-[var(--color-text-primary)]'>
                      MIT License
                    </a>
                  </li>
                  <li>
                    <a
                      href={`https://github.com/${APP_REPOSITORY}/blob/main/README.md`}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-[var(--color-text-secondary)] transition hover:text-[var(--color-text-primary)]'>
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a
                      href={`https://github.com/${APP_REPOSITORY}/releases`}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-[var(--color-text-secondary)] transition hover:text-[var(--color-text-primary)]'>
                      Release notes
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className='mt-8 text-center text-xs text-[var(--color-text-secondary)]'></div>
          </div>
        </LandingSectionInner>
      </LandingSection>
    </LandingShell>
  );
};
