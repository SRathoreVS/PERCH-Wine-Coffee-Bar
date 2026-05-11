/**
 * Swagger / OpenAPI 3.0 Specification
 */

const swaggerJsDoc = require('swagger-jsdoc');
const config = require('../config');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'PERCH Wine & Coffee Bar — API',
      version: '1.0.0',
      description: 'Production-grade REST API powering the PERCH Wine & Coffee Bar website',
      contact: {
        name: 'PERCH Dev Team',
        email: 'dev@perchbar.com',
      },
    },
    servers: [
      {
        url: `http://localhost:${config.port}/api`,
        description: 'Development Server',
      },
      {
        url: 'https://api.perchbar.com/api',
        description: 'Production Server',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT access token obtained from /api/auth/login',
        },
      },
      schemas: {
        SuccessResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string', example: 'Data fetched successfully' },
            data: { type: 'object' },
            meta: {
              type: 'object',
              properties: {
                page: { type: 'integer' },
                limit: { type: 'integer' },
                total: { type: 'integer' },
                totalPages: { type: 'integer' },
                hasNext: { type: 'boolean' },
                hasPrev: { type: 'boolean' },
              },
            },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Something went wrong' },
            errors: { type: 'array', items: { type: 'object' } },
          },
        },
        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', format: 'email', example: 'admin@perchbar.com' },
            password: { type: 'string', example: 'Admin@1234' },
          },
        },
        ContactRequest: {
          type: 'object',
          required: ['name', 'email', 'subject', 'message'],
          properties: {
            name: { type: 'string', example: 'John Doe' },
            email: { type: 'string', format: 'email', example: 'john@example.com' },
            phone: { type: 'string', example: '+1 555-0123' },
            subject: { type: 'string', example: 'Reservation inquiry' },
            message: { type: 'string', example: 'I would like to book a table for 4...' },
            type: {
              type: 'string',
              enum: ['general', 'reservation', 'event', 'feedback', 'complaint', 'other'],
              example: 'reservation',
            },
          },
        },
        BookingRequest: {
          type: 'object',
          required: ['name', 'email', 'date', 'time', 'partySize'],
          properties: {
            name: { type: 'string', example: 'Jane Smith' },
            email: { type: 'string', format: 'email' },
            phone: { type: 'string' },
            date: { type: 'string', format: 'date', example: '2025-12-25' },
            time: { type: 'string', example: '7:00 PM' },
            partySize: { type: 'integer', minimum: 1, maximum: 50, example: 4 },
            type: {
              type: 'string',
              enum: ['table', 'private_event', 'wine_tasting', 'other'],
            },
            specialRequests: { type: 'string' },
          },
        },
        Service: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            title: { type: 'string' },
            slug: { type: 'string' },
            description: { type: 'string' },
            shortDescription: { type: 'string' },
            category: { type: 'string' },
            icon: { type: 'string' },
            image: { type: 'string' },
            highlights: { type: 'array', items: { type: 'string' } },
            isFeatured: { type: 'boolean' },
            isActive: { type: 'boolean' },
            order: { type: 'integer' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        Testimonial: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            author: { type: 'string' },
            role: { type: 'string' },
            content: { type: 'string' },
            rating: { type: 'integer', minimum: 1, maximum: 5 },
            source: { type: 'string' },
            isFeatured: { type: 'boolean' },
          },
        },
      },
    },
    tags: [
      { name: 'Auth', description: 'Authentication & authorization' },
      { name: 'Business', description: 'Business information' },
      { name: 'Services', description: 'Service offerings' },
      { name: 'Gallery', description: 'Photo gallery' },
      { name: 'Testimonials', description: 'Customer reviews' },
      { name: 'Contact', description: 'Contact form' },
      { name: 'Newsletter', description: 'Newsletter subscriptions' },
      { name: 'FAQs', description: 'Frequently asked questions' },
      { name: 'SEO', description: 'SEO metadata per page' },
      { name: 'Bookings', description: 'Reservations & bookings' },
      { name: 'Analytics', description: 'Analytics & dashboard' },
      { name: 'Settings', description: 'Website settings' },
      { name: 'Upload', description: 'File upload management' },
      { name: 'Admin', description: 'Admin user management' },
    ],
    // Inline path documentation (summary level)
    paths: {
      '/auth/login': {
        post: {
          tags: ['Auth'],
          summary: 'Admin login',
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/LoginRequest' } } } },
          responses: {
            200: { description: 'Login successful', content: { 'application/json': { schema: { $ref: '#/components/schemas/SuccessResponse' } } } },
            401: { description: 'Invalid credentials', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          },
        },
      },
      '/auth/me': {
        get: {
          tags: ['Auth'],
          summary: 'Get current user',
          security: [{ BearerAuth: [] }],
          responses: { 200: { description: 'Current user' }, 401: { description: 'Unauthorized' } },
        },
      },
      '/business': {
        get: { tags: ['Business'], summary: 'Get business info (public)', responses: { 200: { description: 'Business info' } } },
        post: { tags: ['Business'], summary: 'Create/update business info', security: [{ BearerAuth: [] }], responses: { 200: { description: 'Business saved' } } },
      },
      '/services': {
        get: { tags: ['Services'], summary: 'Get all services (public)', parameters: [
          { in: 'query', name: 'category', schema: { type: 'string' } },
          { in: 'query', name: 'featured', schema: { type: 'boolean' } },
          { in: 'query', name: 'search', schema: { type: 'string' } },
          { in: 'query', name: 'page', schema: { type: 'integer', default: 1 } },
          { in: 'query', name: 'limit', schema: { type: 'integer', default: 10 } },
        ], responses: { 200: { description: 'Services list' } } },
        post: { tags: ['Services'], summary: 'Create service', security: [{ BearerAuth: [] }], responses: { 201: { description: 'Service created' } } },
      },
      '/gallery': {
        get: { tags: ['Gallery'], summary: 'Get gallery images', responses: { 200: { description: 'Gallery images' } } },
        post: { tags: ['Gallery'], summary: 'Upload gallery image', security: [{ BearerAuth: [] }], responses: { 201: { description: 'Image uploaded' } } },
      },
      '/testimonials': {
        get: { tags: ['Testimonials'], summary: 'Get testimonials', responses: { 200: { description: 'Testimonials list' } } },
        post: { tags: ['Testimonials'], summary: 'Create testimonial', security: [{ BearerAuth: [] }], responses: { 201: { description: 'Testimonial created' } } },
      },
      '/contact': {
        post: { tags: ['Contact'], summary: 'Submit contact form', requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/ContactRequest' } } } }, responses: { 201: { description: 'Message sent' }, 400: { description: 'Validation error' }, 429: { description: 'Rate limit exceeded' } } },
        get: { tags: ['Contact'], summary: 'Get all messages (admin)', security: [{ BearerAuth: [] }], responses: { 200: { description: 'Messages list' } } },
      },
      '/newsletter/subscribe': {
        post: { tags: ['Newsletter'], summary: 'Subscribe to newsletter', responses: { 201: { description: 'Subscribed' } } },
      },
      '/faqs': {
        get: { tags: ['FAQs'], summary: 'Get all FAQs', responses: { 200: { description: 'FAQs list' } } },
      },
      '/seo/{page}': {
        get: { tags: ['SEO'], summary: 'Get SEO metadata for a page', parameters: [{ in: 'path', name: 'page', required: true, schema: { type: 'string' } }], responses: { 200: { description: 'SEO data' } } },
      },
      '/bookings': {
        post: { tags: ['Bookings'], summary: 'Create booking', requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/BookingRequest' } } } }, responses: { 201: { description: 'Booking created' } } },
        get: { tags: ['Bookings'], summary: 'Get all bookings (admin)', security: [{ BearerAuth: [] }], responses: { 200: { description: 'Bookings list' } } },
      },
      '/analytics/dashboard': {
        get: { tags: ['Analytics'], summary: 'Get dashboard stats (admin)', security: [{ BearerAuth: [] }], responses: { 200: { description: 'Dashboard statistics' } } },
      },
      '/analytics/track': {
        post: { tags: ['Analytics'], summary: 'Track analytics event', responses: { 200: { description: 'Event tracked' } } },
      },
      '/settings/public': {
        get: { tags: ['Settings'], summary: 'Get public settings', responses: { 200: { description: 'Public settings' } } },
      },
      '/upload/image': {
        post: { tags: ['Upload'], summary: 'Upload image to cloud', security: [{ BearerAuth: [] }], responses: { 201: { description: 'File uploaded' } } },
      },
    },
  },
  apis: ['./src/routes/*.js'],
};

module.exports = swaggerJsDoc(options);
