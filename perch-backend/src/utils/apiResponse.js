/**
 * Standardized API Response Helpers
 */

const successResponse = (res, { message = 'Success', data = null, meta = null, statusCode = 200 } = {}) => {
  const payload = { success: true, message };
  if (data !== null) payload.data = data;
  if (meta !== null) payload.meta = meta;
  return res.status(statusCode).json(payload);
};

const errorResponse = (res, { message = 'Something went wrong', error = null, statusCode = 500 } = {}) => {
  const payload = { success: false, message };
  if (error && process.env.NODE_ENV === 'development') payload.error = error;
  return res.status(statusCode).json(payload);
};

const paginationMeta = ({ page, limit, total }) => ({
  page: parseInt(page),
  limit: parseInt(limit),
  total,
  totalPages: Math.ceil(total / limit),
  hasNext: page * limit < total,
  hasPrev: page > 1,
});

module.exports = { successResponse, errorResponse, paginationMeta };
