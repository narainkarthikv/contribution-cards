/**
 * ContributorModal — Detailed contributor profile overlay.
 * Accessible dialog with keyboard support and focus trap awareness.
 */

import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Github,
  GitCommitHorizontal,
  FolderGit2,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import type { Contributor } from '../types/github';

interface ContributorModalProps {
  contributor: Contributor | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ContributorModal: React.FC<ContributorModalProps> = React.memo(
  ({ contributor, isOpen, onClose }) => {
    const handleKeyDown = useCallback(
      (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      },
      [onClose]
    );

    useEffect(() => {
      if (!isOpen) return;
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    }, [isOpen, handleKeyDown]);

    if (!contributor || !isOpen) return null;

    const repositoryContributions = [...contributor.contributions].sort(
      (left, right) => (right.commitsCount ?? 0) - (left.commitsCount ?? 0)
    );

    const totalCommits = repositoryContributions.reduce(
      (sum, contribution) => sum + (contribution.commitsCount ?? 0),
      0
    );

    const topRepository = repositoryContributions[0];
    const averageCommits =
      repositoryContributions.length > 0
        ? Math.round(totalCommits / repositoryContributions.length)
        : 0;

    return (
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className='fixed inset-0 z-40 bg-[var(--color-surface-overlay)] backdrop-blur-sm'
              aria-hidden='true'
            />

            <motion.div
              role='dialog'
              aria-modal='true'
              aria-label={`Profile details for ${contributor.name ?? contributor.login}`}
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className='fixed inset-2 z-50 overflow-hidden rounded-[20px] border border-[var(--color-border-primary)] bg-[var(--color-surface-primary)] shadow-2xl sm:inset-4 md:bottom-4 md:left-1/2 md:top-4 md:w-full md:max-w-5xl md:-translate-x-1/2'>
              <button
                onClick={onClose}
                className='absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border-primary)] bg-[color-mix(in_srgb,var(--color-surface-primary)_78%,transparent_22%)] text-[var(--color-text-primary)] backdrop-blur-sm transition-colors hover:bg-[var(--color-bg-secondary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-default)]'
                aria-label='Close dialog'>
                <X size={20} />
              </button>

              <div className='h-full max-h-[95vh] overflow-y-auto md:max-h-none'>
                <div className='border-b border-[var(--color-border-primary)] bg-[linear-gradient(135deg,color-mix(in_srgb,var(--color-action-default)_14%,var(--color-surface-primary)_86%)_0%,var(--color-surface-primary)_58%,color-mix(in_srgb,var(--color-surface-secondary)_78%,transparent_22%)_100%)] px-5 pb-6 pt-12 sm:px-8 sm:pb-8 md:px-10 md:pt-14'>
                  <div className='flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between'>
                    <div className='flex flex-col gap-5 sm:flex-row sm:items-center'>
                      <div className='relative mx-auto sm:mx-0'>
                        <div className='absolute inset-0 rounded-full bg-[color-mix(in_srgb,var(--color-action-default)_22%,transparent_78%)] blur-xl' />
                        <img
                          src={contributor.avatarUrl}
                          alt=''
                          className='relative h-24 w-24 rounded-full border-4 border-[color-mix(in_srgb,var(--color-surface-primary)_86%,transparent_14%)] object-cover shadow-lg sm:h-28 sm:w-28 md:h-32 md:w-32'
                          loading='lazy'
                        />
                      </div>

                      <div className='text-center sm:text-left'>
                        <div className='inline-flex items-center gap-2 rounded-full border border-[var(--color-border-primary)] bg-[color-mix(in_srgb,var(--color-surface-primary)_84%,transparent_16%)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-text-secondary)]'>
                          <Sparkles
                            size={14}
                            className='text-[var(--color-action-default)]'
                          />
                          Contributor snapshot
                        </div>
                        <h2 className='mt-4 text-3xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-4xl'>
                          {contributor.name ?? contributor.login}
                        </h2>
                        <div className='mt-2 flex flex-wrap items-center justify-center gap-2 text-sm text-[var(--color-text-secondary)] sm:justify-start sm:text-base'>
                          <span>@{contributor.login}</span>
                          <span className='hidden h-1 w-1 rounded-full bg-[var(--color-text-muted)] sm:inline-block' />
                          <span>{repositoryContributions.length} repositories</span>
                        </div>

                        {contributor.bio && (
                          <p className='mt-4 max-w-2xl text-sm leading-6 text-[var(--color-text-secondary)] sm:text-base'>
                            {contributor.bio}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className='grid grid-cols-2 gap-3 sm:w-full sm:max-w-md'>
                      <MetricCard
                        icon={GitCommitHorizontal}
                        label='Total commits'
                        value={totalCommits}
                      />
                      <MetricCard
                        icon={FolderGit2}
                        label='Repositories'
                        value={repositoryContributions.length}
                      />
                    </div>
                  </div>
                </div>

                <div className='grid gap-6 px-5 py-5 sm:px-8 sm:py-8 md:grid-cols-[minmax(0,1.45fr)_280px] md:px-10'>
                  <section className='rounded-[18px] border border-[var(--color-border-primary)] bg-[var(--color-surface-secondary)] p-4 sm:p-5'>
                    <div className='flex flex-col gap-2 border-b border-[var(--color-border-primary)] pb-4 sm:flex-row sm:items-end sm:justify-between'>
                      <div>
                        <p className='text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-text-secondary)]'>
                          Contributions
                        </p>
                        <h3 className='mt-2 text-xl font-semibold text-[var(--color-text-primary)]'>
                          Activity across the ecosystem
                        </h3>
                      </div>
                      <p className='text-sm text-[var(--color-text-secondary)]'>
                        Sorted by commit volume
                      </p>
                    </div>

                    <ul className='mt-4 space-y-3' role='list'>
                      {repositoryContributions.map((contrib, index) => {
                        const commits = contrib.commitsCount ?? 0;
                        const width =
                          topRepository && (topRepository.commitsCount ?? 0) > 0
                            ? Math.max(
                                12,
                                Math.round(
                                  (commits / (topRepository.commitsCount ?? 1)) *
                                    100
                                )
                              )
                            : 12;

                        return (
                          <li
                            key={contrib.repo}
                            className='rounded-2xl border border-[var(--color-border-primary)] bg-[var(--color-surface-primary)] p-4 transition-transform duration-200 hover:-translate-y-0.5'>
                            <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
                              <div className='min-w-0 flex-1'>
                                <div className='flex items-center gap-3'>
                                  <span className='inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--color-action-default)_12%,transparent_88%)] text-sm font-semibold text-[var(--color-action-default)]'>
                                    {index + 1}
                                  </span>
                                  <div className='min-w-0'>
                                    <h4 className='truncate text-base font-semibold text-[var(--color-text-primary)] sm:text-lg'>
                                      {contrib.repo}
                                    </h4>
                                    <p className='mt-1 text-sm text-[var(--color-text-secondary)]'>
                                      Repository contribution footprint
                                    </p>
                                  </div>
                                </div>

                                <div className='mt-4 h-2 overflow-hidden rounded-full bg-[var(--color-bg-secondary)]'>
                                  <div
                                    className='h-full rounded-full bg-[linear-gradient(90deg,var(--color-action-default),color-mix(in_srgb,var(--color-action-hover)_70%,white_30%))]'
                                    style={{ width: `${width}%` }}
                                  />
                                </div>
                              </div>

                              <div className='rounded-2xl border border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)] px-4 py-3 text-left sm:min-w-[124px] sm:text-right'>
                                <p className='text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-text-secondary)]'>
                                  Commits
                                </p>
                                <p className='mt-1 text-2xl font-semibold tracking-tight text-[var(--color-action-default)]'>
                                  {commits}
                                </p>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </section>

                  <aside className='space-y-4'>
                    <div className='rounded-[18px] border border-[var(--color-border-primary)] bg-[var(--color-surface-secondary)] p-5'>
                      <p className='text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-text-secondary)]'>
                        Highlights
                      </p>
                      <div className='mt-4 space-y-4'>
                        <InsightRow
                          label='Top repository'
                          value={topRepository?.repo ?? '—'}
                          helper={`${topRepository?.commitsCount ?? 0} commits`}
                        />
                        <InsightRow
                          label='Average per repo'
                          value={averageCommits.toString()}
                          helper='commits on average'
                        />
                        <InsightRow
                          label='Open source reach'
                          value={`${repositoryContributions.length} repositories`}
                          helper='tracked in this project ecosystem'
                        />
                      </div>
                    </div>

                    <div className='rounded-[18px] border border-[var(--color-border-primary)] bg-[var(--color-surface-secondary)] p-5'>
                      <p className='text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-text-secondary)]'>
                        Quick action
                      </p>
                      <p className='mt-3 text-sm leading-6 text-[var(--color-text-secondary)]'>
                        Continue exploring this contributor’s public work on
                        GitHub for deeper context and recent activity.
                      </p>
                      <div className='mt-5 flex flex-col gap-2 sm:gap-3'>
                        <a
                          href={contributor.profileUrl}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-action-default)] px-4 py-3 text-sm font-semibold text-[var(--color-text-inverse)] transition-colors hover:bg-[var(--color-action-hover)] active:bg-[var(--color-action-active)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-default)]'>
                          <Github size={18} />
                          View GitHub Profile
                          <ArrowUpRight size={16} />
                        </a>
                      </div>
                    </div>
                  </aside>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }
);

ContributorModal.displayName = 'ContributorModal';

interface MetricCardProps {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: number;
}

const MetricCard: React.FC<MetricCardProps> = ({ icon: Icon, label, value }) => (
  <div className='rounded-2xl border border-[var(--color-border-primary)] bg-[color-mix(in_srgb,var(--color-surface-primary)_88%,transparent_12%)] p-4 backdrop-blur-sm'>
    <div className='flex items-center gap-3'>
      <span className='inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--color-action-default)_12%,transparent_88%)] text-[var(--color-action-default)]'>
        <Icon size={18} />
      </span>
      <div>
        <p className='text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-text-secondary)]'>
          {label}
        </p>
        <p className='mt-1 text-2xl font-semibold tracking-tight text-[var(--color-text-primary)]'>
          {value}
        </p>
      </div>
    </div>
  </div>
);

interface InsightRowProps {
  label: string;
  value: string;
  helper: string;
}

const InsightRow: React.FC<InsightRowProps> = ({ label, value, helper }) => (
  <div className='rounded-2xl border border-[var(--color-border-primary)] bg-[var(--color-surface-primary)] p-4'>
    <p className='text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-text-secondary)]'>
      {label}
    </p>
    <p className='mt-2 break-words text-base font-semibold text-[var(--color-text-primary)]'>
      {value}
    </p>
    <p className='mt-1 text-sm text-[var(--color-text-secondary)]'>{helper}</p>
  </div>
);
