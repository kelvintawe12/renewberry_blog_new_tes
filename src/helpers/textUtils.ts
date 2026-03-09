// Text utility functions for consistent truncation across the app

/**
 * Truncates text to a specified number of words
 * @param text - The text to truncate
 * @param wordLimit - Maximum number of words (default: 30)
 * @param suffix - Suffix to add when truncated (default: '...')
 */
export function truncateToWords(
text: string,
wordLimit: number = 30,
suffix: string = '...')
: string {
  if (!text) return '';

  const words = text.trim().split(/\s+/);

  if (words.length <= wordLimit) {
    return text;
  }

  return words.slice(0, wordLimit).join(' ') + suffix;
}

/**
 * Truncates text to a specified character limit
 * @param text - The text to truncate
 * @param charLimit - Maximum number of characters
 * @param suffix - Suffix to add when truncated (default: '...')
 */
export function truncateToChars(
text: string,
charLimit: number = 150,
suffix: string = '...')
: string {
  if (!text) return '';

  if (text.length <= charLimit) {
    return text;
  }

  // Find the last space before the limit to avoid cutting words
  const truncated = text.slice(0, charLimit);
  const lastSpace = truncated.lastIndexOf(' ');

  if (lastSpace > charLimit * 0.8) {
    return truncated.slice(0, lastSpace) + suffix;
  }

  return truncated + suffix;
}

/**
 * Formats a number for display (e.g., 1200 -> 1.2K)
 */
export function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

/**
 * Formats a date for display
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

/**
 * Generates a relative time string (e.g., "2 hours ago")
 */
export function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);

  if (diffSecs < 60) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffWeeks < 4) return `${diffWeeks}w ago`;
  if (diffMonths < 12) return `${diffMonths}mo ago`;

  return formatDate(dateString);
}