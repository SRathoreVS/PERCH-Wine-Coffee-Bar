/**
 * Slug Generator
 */

const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');

const uniqueSlug = (text, suffix = '') => {
  const base = slugify(text);
  return suffix ? `${base}-${suffix}` : base;
};

module.exports = { slugify, uniqueSlug };
