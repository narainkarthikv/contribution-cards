/**
 * ContributorCard — Pure presentation component for a single contributor.
 * Wrapped in React.memo to prevent unnecessary re-renders in list contexts.
 */

import React, { useCallback } from 'react';
import { Github, Copy, ArrowRight } from 'lucide-react';
import type { Contributor } from '../types/github';
import { IconButton } from '../common';

interface ContributorCardProps {
  contributor: Contributor;
  onViewDetails: (contributor: Contributor) => void;
}

export const ContributorCard: React.FC<ContributorCardProps> = React.memo(
  ({ contributor, onViewDetails }) => {
    const handleCopyProfile = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        navigator.clipboard.writeText(contributor.profileUrl);
      },
      [contributor.profileUrl]
    );

    const totalCommits = contributor.contributions.reduce(
      (sum, c) => sum + (c.commitsCount ?? 0),
      0
    );

    return (
      <article
        className='h-full w-full'
        aria-label={`Contributor card for ${contributor.name ?? contributor.login}`}>
        <div
          role='button'
          tabIndex={0}
          className='relative h-full w-full rounded-lg p-6 transition-colors overflow-hidden group cursor-pointer border border-[var(--color-border-primary)] bg-[var(--color-surface-primary)] flex flex-col hover:bg-[var(--color-bg-secondary)] focus-visible:ring-2 focus-visible:ring-[var(--color-action-default)]'
          onClick={() => onViewDetails(contributor)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onViewDetails(contributor);
            }
          }}>
          {/* Contribution Badge */}
          <div className='absolute top-4 left-4 flex items-center justify-center'>
            <div className='relative w-14 h-14 rounded-full bg-[var(--color-action-default)] flex items-center justify-center ring-2 ring-[var(--color-surface-primary)]'>
              <span
                className='text-lg font-bold text-white'
                aria-label={`${totalCommits} contributions`}>
                {totalCommits}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className='absolute top-4 right-4 flex gap-1.5 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200'>
            <IconButton
              variant='outline'
              size='sm'
              onClick={handleCopyProfile}
              aria-label={`Copy profile link for ${contributor.login}`}>
              <Copy size={16} />
            </IconButton>

            <IconButton
              variant='solid'
              size='sm'
              href={contributor.profileUrl}
              target='_blank'
              rel='noopener noreferrer'
              onClick={(e) => e.stopPropagation()}
              aria-label={`Open ${contributor.login}'s GitHub profile`}>
              <Github size={16} />
            </IconButton>

            <IconButton
              variant='solid'
              size='sm'
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(contributor);
              }}
              aria-label={`View details for ${contributor.login}`}>
              <ArrowRight size={16} />
            </IconButton>
          </div>

          {/* Avatar */}
          <div className='flex justify-center mb-4 flex-shrink-0 mt-2'>
            <img
              src={contributor.avatarUrl}
              alt=''
              className='w-20 h-20 rounded-full ring-2 ring-[var(--color-action-default)] ring-offset-2 ring-offset-[var(--color-surface-primary)] object-cover'
              loading='lazy'
            />
          </div>

          {/* Name */}
          <div className='text-center mb-3 flex flex-col justify-center flex-shrink-0'>
            <h3 className='text-lg font-bold text-[var(--color-text-primary)] truncate'>
              {contributor.name ?? contributor.login}
            </h3>
            <p className='text-xs sm:text-sm text-[var(--color-text-secondary)] truncate font-medium'>
              @{contributor.login}
            </p>
          </div>

          {/* Bio */}
          {contributor.bio && (
            <p className='text-xs sm:text-sm text-[var(--color-text-secondary)] text-center line-clamp-3 flex-1'>
              {contributor.bio}
            </p>
          )}
        </div>
      </article>
    );
  }
);

ContributorCard.displayName = 'ContributorCard';
