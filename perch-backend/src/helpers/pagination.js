/**
 * Pagination & Query Builder Helpers
 */

const getPagination = (query) => {
  const page = Math.max(1, parseInt(query.page) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(query.limit) || 10));
  const skip = (page - 1) * limit;
  return { page, limit, skip };
};

const buildSortOptions = (sortQuery, allowedFields = []) => {
  if (!sortQuery) return { createdAt: -1 };
  const [field, order] = sortQuery.split(':');
  if (allowedFields.length && !allowedFields.includes(field)) return { createdAt: -1 };
  return { [field]: order === 'asc' ? 1 : -1 };
};

const buildSearchFilter = (searchQuery, fields) => {
  if (!searchQuery) return {};
  const regex = new RegExp(searchQuery, 'i');
  return { $or: fields.map((f) => ({ [f]: regex })) };
};

module.exports = { getPagination, buildSortOptions, buildSearchFilter };
