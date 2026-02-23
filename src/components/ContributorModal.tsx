/**
 * ContributorModal — Detailed contributor profile overlay.
 * Accessible dialog with keyboard support and focus trap awareness.
 */

import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github } from 'lucide-react';
import type { Contributor } from '../types/github';

interface ContributorModalProps {
  contributor: Contributor | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ContributorModal: React.FC<ContributorModalProps> = React.memo(
  ({ contributor, isOpen, onClose }) => {
    // Close on Escape key
    const handleKeyDown = useCallback(
      (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      },
      [onClose]
    );

    useEffect(() => {
      if (!isOpen) return;
      document.addEventListener('keydown', handleKeyDown);
      // Prevent background scroll while modal is open
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    }, [isOpen, handleKeyDown]);

    if (!contributor || !isOpen) return null;

    const totalCommits = contributor.contributions.reduce(
      (sum, c) => sum + (c.commitsCount ?? 0),
      0
    );

    return (
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className='fixed inset-0 bg-[var(--color-surface-overlay)] z-40'
              aria-hidden='true'
            />

            <motion.div
              role='dialog'
              aria-modal='true'
              aria-label={`Profile details for ${contributor.name ?? contributor.login}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className='fixed inset-2 sm:inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-3xl bg-[var(--color-surface-primary)] rounded-lg sm:rounded-xl z-50 overflow-y-auto max-h-[95vh] sm:max-h-[90vh] border border-[var(--color-border-primary)]'>
              <button
                onClick={onClose}
                className='absolute top-2 right-2 sm:top-4 sm:right-4 p-2 hover:bg-[var(--color-bg-secondary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-default)] rounded-md transition-colors z-10'
                aria-label='Close dialog'>
                <X
                  size={20}
                  className='sm:w-6 sm:h-6 text-[var(--color-text-primary)]'
                />
              </button>

              <div className='p-4 sm:p-6 md:p-10'>
                <div className='flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-6 sm:mb-8'>
                  <img
                    src={contributor.avatarUrl}
                    alt=''
                    className='w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full ring-4 ring-[var(--color-action-default)] object-cover flex-shrink-0'
                    loading='lazy'
                  />

                  <div className='flex-1 text-center sm:text-left'>
                    <h2 className='text-lg sm:text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] mb-2'>
                      {contributor.name ?? contributor.login}
                    </h2>
                    <p className='text-sm sm:text-base md:text-lg text-[var(--color-text-secondary)] mb-2'>
                      @{contributor.login}
                    </p>

                    {contributor.bio && (
                      <p className='text-sm sm:text-base text-[var(--color-text-primary)] mb-4'>
                        {contributor.bio}
                      </p>
                    )}

                    <div className='mb-4 rounded-md border border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)] px-3 py-2 inline-block'>
                      <div className='text-xl sm:text-2xl md:text-3xl font-bold text-[var(--color-action-default)]'>
                        {totalCommits}
                      </div>
                      <div className='text-xs sm:text-sm text-[var(--color-text-secondary)]'>
                        Total Contributions
                      </div>
                    </div>
                  </div>
                </div>

                <div className='mb-6 sm:mb-8'>
                  <h3 className='text-base sm:text-lg md:text-xl font-bold text-[var(--color-text-primary)] mb-3 sm:mb-4'>
                    Contributions
                  </h3>

                  <ul
                    className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4'
                    role='list'>
                    {contributor.contributions.map((contrib) => (
                      <li
                        key={contrib.repo}
                        className='bg-[var(--color-surface-secondary)] rounded-lg sm:rounded-xl p-3 sm:p-4 border border-[var(--color-border-primary)]'>
                        <div className='flex items-start justify-between mb-2 sm:mb-3'>
                          <h4 className='font-semibold text-[var(--color-text-primary)] break-all text-sm sm:text-base'>
                            {contrib.repo}
                          </h4>
                        </div>

                        <div className='space-y-1 sm:space-y-2 text-xs sm:text-sm'>
                          <div className='flex justify-between items-center'>
                            <span className='text-[var(--color-text-secondary)]'>
                              Commits:
                            </span>
                            <span className='font-bold text-[var(--color-action-default)]'>
                              {contrib.commitsCount ?? 0}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className='flex flex-col gap-2 sm:gap-3'>
                  <a
                    href={contributor.profileUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='w-full bg-[var(--color-action-default)] hover:bg-[var(--color-action-hover)] active:bg-[var(--color-action-active)] text-[var(--color-text-inverse)] py-2 sm:py-3 px-4 rounded-md flex items-center justify-center gap-2 transition-colors font-semibold text-xs sm:text-sm md:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-default)]'>
                    <Github size={16} className='sm:w-5 sm:h-5' />
                    View GitHub Profile
                  </a>
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
