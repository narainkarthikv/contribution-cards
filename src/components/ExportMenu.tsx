/**
 * ExportMenu — Markdown export options dropdown for contributors
 */

import React, { useRef, useEffect, useState } from 'react';
import { Download, Copy, Check } from 'lucide-react';
import type { Contributor } from '../types/github';
import {
  exportContributorsMarkdown,
  downloadMarkdownFile,
  copyMarkdownToClipboard,
  type ExportOptions,
} from '../utils/markdownExport';
import { IconButton } from '../common';

interface ExportMenuProps {
  contributors: Contributor[];
}

export const ExportMenu: React.FC<ExportMenuProps> = React.memo(({ contributors }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleExportFormat = async (
    format: 'table' | 'card' | 'list',
    action: 'download' | 'copy'
  ) => {
    const options: ExportOptions = {
      format,
      includeBadges: false,
    };

    const result = exportContributorsMarkdown(contributors, options);

    if (action === 'download') {
      downloadMarkdownFile(result);
    } else {
      const success = await copyMarkdownToClipboard(result.content);
      if (success) {
        setCopiedId(format);
        setTimeout(() => setCopiedId(null), 2000);
      }
    }

    setIsOpen(false);
  };

  const handleExportBadges = async (action: 'download' | 'copy') => {
    const options: ExportOptions = {
      format: 'list',
      includeBadges: true,
    };

    const result = exportContributorsMarkdown(contributors, options);

    if (action === 'download') {
      downloadMarkdownFile(result);
    } else {
      const success = await copyMarkdownToClipboard(result.content);
      if (success) {
        setCopiedId('badges');
        setTimeout(() => setCopiedId(null), 2000);
      }
    }

    setIsOpen(false);
  };

  return (
    <div ref={menuRef} className='relative'>
      <IconButton
        onClick={() => setIsOpen(!isOpen)}
        variant={isOpen ? 'active' : 'outline'}
        size='lg'
        aria-label='Export as Markdown'
        title='Export contributors as Markdown'
        aria-expanded={isOpen}
        aria-haspopup='menu'>
        <Download size={18} />
      </IconButton>

      {isOpen && (
        <div
          className='absolute right-0 top-full z-50 mt-2 w-max rounded-md border border-[var(--color-border-primary)] bg-[var(--color-surface-primary)] shadow-lg dark:shadow-xl'
          role='menu'>
          {/* Table Format */}
          <div className='flex flex-col border-b border-[var(--color-border-primary)] p-2'>
            <p className='px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]'>
              Table Format
            </p>
            <button
              onClick={() => handleExportFormat('table', 'download')}
              className='flex items-center gap-2 rounded px-3 py-2 text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-surface-secondary)]'
              role='menuitem'>
              <Download size={14} />
              Download
            </button>
            <button
              onClick={() => handleExportFormat('table', 'copy')}
              className='flex items-center gap-2 rounded px-3 py-2 text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-surface-secondary)]'
              role='menuitem'>
              {copiedId === 'table' ? <Check size={14} className='text-green-500' /> : <Copy size={14} />}
              {copiedId === 'table' ? 'Copied!' : 'Copy'}
            </button>
          </div>

          {/* Card Format */}
          <div className='flex flex-col border-b border-[var(--color-border-primary)] p-2'>
            <p className='px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]'>
              Card Format
            </p>
            <button
              onClick={() => handleExportFormat('card', 'download')}
              className='flex items-center gap-2 rounded px-3 py-2 text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-surface-secondary)]'
              role='menuitem'>
              <Download size={14} />
              Download
            </button>
            <button
              onClick={() => handleExportFormat('card', 'copy')}
              className='flex items-center gap-2 rounded px-3 py-2 text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-surface-secondary)]'
              role='menuitem'>
              {copiedId === 'card' ? <Check size={14} className='text-green-500' /> : <Copy size={14} />}
              {copiedId === 'card' ? 'Copied!' : 'Copy'}
            </button>
          </div>

          {/* List Format */}
          <div className='flex flex-col border-b border-[var(--color-border-primary)] p-2'>
            <p className='px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]'>
              List Format
            </p>
            <button
              onClick={() => handleExportFormat('list', 'download')}
              className='flex items-center gap-2 rounded px-3 py-2 text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-surface-secondary)]'
              role='menuitem'>
              <Download size={14} />
              Download
            </button>
            <button
              onClick={() => handleExportFormat('list', 'copy')}
              className='flex items-center gap-2 rounded px-3 py-2 text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-surface-secondary)]'
              role='menuitem'>
              {copiedId === 'list' ? <Check size={14} className='text-green-500' /> : <Copy size={14} />}
              {copiedId === 'list' ? 'Copied!' : 'Copy'}
            </button>
          </div>

          {/* Badges Format */}
          <div className='flex flex-col p-2'>
            <p className='px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]'>
              Badges
            </p>
            <button
              onClick={() => handleExportBadges('download')}
              className='flex items-center gap-2 rounded px-3 py-2 text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-surface-secondary)]'
              role='menuitem'>
              <Download size={14} />
              Download
            </button>
            <button
              onClick={() => handleExportBadges('copy')}
              className='flex items-center gap-2 rounded px-3 py-2 text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-surface-secondary)]'
              role='menuitem'>
              {copiedId === 'badges' ? <Check size={14} className='text-green-500' /> : <Copy size={14} />}
              {copiedId === 'badges' ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

ExportMenu.displayName = 'ExportMenu';
