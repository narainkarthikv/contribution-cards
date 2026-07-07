/**
 * Tiny className joiner used across common/ primitives.
 * Filters out falsy values so conditional classes stay tidy.
 */
export const cx = (
  ...classes: Array<string | false | null | undefined>
): string => classes.filter(Boolean).join(' ');
