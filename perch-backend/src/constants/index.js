/**
 * Application Constants
 */

const ROLES = Object.freeze({
  SUPERADMIN: 'superadmin',
  ADMIN: 'admin',
  EDITOR: 'editor',
});

const MESSAGE_STATUS = Object.freeze({
  UNREAD: 'unread',
  READ: 'read',
  REPLIED: 'replied',
  ARCHIVED: 'archived',
});

const BOOKING_STATUS = Object.freeze({
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
  NO_SHOW: 'no_show',
});

const SUBSCRIBER_STATUS = Object.freeze({
  PENDING: 'pending',
  ACTIVE: 'active',
  UNSUBSCRIBED: 'unsubscribed',
  BOUNCED: 'bounced',
});

const SERVICE_CATEGORIES = Object.freeze([
  'wine', 'coffee', 'food', 'events', 'private', 'other',
]);

const GALLERY_CATEGORIES = Object.freeze([
  'ambiance', 'food', 'drinks', 'events', 'team', 'other',
]);

const CONTACT_TYPES = Object.freeze([
  'general', 'reservation', 'event', 'feedback', 'complaint', 'other',
]);

const SOCKET_EVENTS = Object.freeze({
  NEW_MESSAGE: 'admin:new_message',
  NEW_BOOKING: 'admin:new_booking',
  NEW_SUBSCRIBER: 'admin:new_subscriber',
  BOOKING_UPDATED: 'admin:booking_updated',
  MESSAGE_UPDATED: 'admin:message_updated',
});

const HTTP_STATUS = Object.freeze({
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_ERROR: 500,
});

module.exports = {
  ROLES,
  MESSAGE_STATUS,
  BOOKING_STATUS,
  SUBSCRIBER_STATUS,
  SERVICE_CATEGORIES,
  GALLERY_CATEGORIES,
  CONTACT_TYPES,
  SOCKET_EVENTS,
  HTTP_STATUS,
};
