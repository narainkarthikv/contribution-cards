/**
 * FooterLinkColumn — shared footer column primitive.
 * Renders a heading followed by a vertical list of FooterLinks so
 * repeated footer sections (Project, Community, Legal, ...) stay DRY.
 */

import React from 'react';
import { FooterLink } from './FooterLink';

export interface FooterLinkItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterLinkColumnProps {
  title: string;
  links: FooterLinkItem[];
}

export const FooterLinkColumn: React.FC<FooterLinkColumnProps> = ({
  title,
  links,
}) => (
  <div>
    <h4 className='text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-text-secondary)]'>
      {title}
    </h4>
    <ul className='mt-4 space-y-2 text-sm'>
      {links.map(({ label, href, external }) => (
        <li key={href}>
          <FooterLink href={href} external={external}>
            {label}
          </FooterLink>
        </li>
      ))}
    </ul>
  </div>
);
