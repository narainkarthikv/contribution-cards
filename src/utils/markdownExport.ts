import type { Contributor } from '../types/github';

export interface ExportOptions {
  format: 'table' | 'card' | 'list';
  includeBadges: boolean;
}

export interface MarkdownExportResult {
  content: string;
  filename: string;
}

/**
 * Generate Markdown table format for contributors
 */
function generateMarkdownTable(contributors: Contributor[]): string {
  if (contributors.length === 0) {
    return '| Avatar | Name | Contributions | Repositories |\n|--------|------|---------------|---------------|\n';
  }

  const header = '| Avatar | Name | Contributions | Repositories |\n|--------|------|---------------|---------------|\n';
  const rows = contributors
    .map((c) => {
      const avatar = `![${c.login}](${c.avatarUrl})`;
      const name = `[${c.name || c.login}](${c.profileUrl})`;
      const contributions = c.totalContributions || 0;
      const repos = c.contributions.map((r) => r.repo).join(', ') || 'N/A';
      return `| ${avatar} | ${name} | ${contributions} | ${repos} |`;
    })
    .join('\n');

  return header + rows;
}

/**
 * Generate Markdown card format for contributors
 */
function generateMarkdownCards(contributors: Contributor[]): string {
  if (contributors.length === 0) {
    return '## Contributors\n\nNo contributors to display.\n';
  }

  const cards = contributors
    .map((c) => {
      const header = `### [${c.name || c.login}](${c.profileUrl})`;
      const avatar = `![Avatar](${c.avatarUrl})`;
      const bio = c.bio ? `> ${c.bio}` : '';
      const contributions = `**Contributions:** ${c.totalContributions}`;
      const repos = c.contributions.length
        ? `**Repositories:** ${c.contributions.map((r) => r.repo).join(', ')}`
        : '';

      return [header, avatar, bio, contributions, repos].filter((line) => line).join('\n\n');
    })
    .join('\n\n---\n\n');

  return `## Contributors\n\n${cards}\n`;
}

/**
 * Generate Markdown list format for contributors
 */
function generateMarkdownList(contributors: Contributor[]): string {
  if (contributors.length === 0) {
    return '## Contributors\n\nNo contributors to display.\n';
  }

  const items = contributors
    .map((c) => {
      const name = c.name || c.login;
      const link = `[${name}](${c.profileUrl})`;
      const contributions = c.totalContributions ? ` - ${c.totalContributions} contributions` : '';
      const repos = c.contributions.length ? ` in ${c.contributions.map((r) => r.repo).join(', ')}` : '';
      return `- ${link}${contributions}${repos}`;
    })
    .join('\n');

  return `## Contributors\n\n${items}\n`;
}

/**
 * Generate GitHub contributor badge/shield for Markdown
 */
function generateContributorBadge(contributor: Contributor): string {
  const badgeUrl = `https://img.shields.io/badge/${encodeURIComponent(contributor.login)}-${encodeURIComponent(
    contributor.totalContributions.toString()
  )}_contributions-blue`;
  return `[![${contributor.login}](${badgeUrl})](${contributor.profileUrl})`;
}

/**
 * Generate badge collection for all contributors
 */
function generateBadgeCollection(contributors: Contributor[]): string {
  if (contributors.length === 0) {
    return '## Contributors\n\nNo contributors to display.\n';
  }

  const badges = contributors.map((c) => generateContributorBadge(c)).join(' ');

  return `## Contributors\n\n${badges}\n`;
}

/**
 * Export a single contributor as Markdown
 */
export function exportSingleContributorMarkdown(
  contributor: Contributor
): MarkdownExportResult {
  let content = `# ${contributor.name || contributor.login}\n\n`;

  content += `![${contributor.login}](${contributor.avatarUrl})\n\n`;

  content += `**GitHub Profile:** [${contributor.profileUrl}](${contributor.profileUrl})\n\n`;

  if (contributor.bio) {
    content += `**Bio:** ${contributor.bio}\n\n`;
  }

  content += `**Total Contributions:** ${contributor.totalContributions}\n\n`;

  if (contributor.contributions.length) {
    content += `**Contributed to Repositories:**\n\n${contributor.contributions
      .map((r) => `- ${r.repo} (${r.commitsCount || 0} commits)`)
      .join('\n')}\n\n`;
  }

  const filename = `${contributor.login.replace(/[^a-z0-9]/gi, '_')}_profile.md`;

  return {
    content,
    filename,
  };
}

/**
 * Export multiple contributors as Markdown
 */
export function exportContributorsMarkdown(
  contributors: Contributor[],
  options: ExportOptions
): MarkdownExportResult {
  let content = '';

  // Add header
  content += `# Contributors\n\n`;
  content += `**Generated:** ${new Date().toISOString()}\n\n`;
  content += `**Total Contributors:** ${contributors.length}\n\n`;

  // Add badges if requested
  if (options.includeBadges) {
    content += `## Badges\n\n${generateBadgeCollection(contributors)}\n\n---\n\n`;
  }

  // Generate content based on format
  switch (options.format) {
    case 'table':
      content += generateMarkdownTable(contributors);
      break;
    case 'card':
      content += generateMarkdownCards(contributors);
      break;
    case 'list':
      content += generateMarkdownList(contributors);
      break;
    default:
      content += generateMarkdownTable(contributors);
  }

  const timestamp = new Date().toISOString().split('T')[0];
  const filename = `contributors_${options.format}_${timestamp}.md`;

  return {
    content,
    filename,
  };
}

/**
 * Download Markdown content as a file
 */
export function downloadMarkdownFile(result: MarkdownExportResult): void {
  const element = document.createElement('a');
  const file = new Blob([result.content], { type: 'text/markdown' });

  element.href = URL.createObjectURL(file);
  element.download = result.filename;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
  URL.revokeObjectURL(element.href);
}

/**
 * Copy Markdown content to clipboard
 */
export async function copyMarkdownToClipboard(content: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(content);
    return true;
  } catch {
    return false;
  }
}
