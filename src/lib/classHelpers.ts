import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combine Tailwind class names with intelligent merging.
 * Accepts any number of class values (strings, arrays, objects) and merges them using
 * `clsx` for conditional logic and `tailwind-merge` to deduplicate conflicting utilities.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
