/**
 * Generates a clean URL slug from Arabic or Latin text
 */
export function generateSlug(text: string): string {
  if (!text) return '';

  return text
    .toString()
    .trim()
    .toLowerCase()
    // Replace spaces and underscores with hyphens
    .replace(/[\s_]+/g, '-')
    // Remove unwanted symbols except Arabic letters, English letters, digits, and hyphens
    .replace(/[^\p{L}\p{N}-]+/gu, '')
    // Replace multiple consecutive hyphens with a single hyphen
    .replace(/-+/g, '-')
    // Trim hyphens from start and end
    .replace(/^-+|-+$/g, '');
}
