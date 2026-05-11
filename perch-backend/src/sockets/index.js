/**
 * Socket.io — Real-time Notifications (future-ready)
 */

const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const config = require('../config');
const logger = require('../utils/logger');

let io;

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: config.frontend.url,
      methods: ['GET', 'POST'],
      credentials: true,
    },
    transports: ['websocket', 'polling'],
  });

  // Auth middleware for socket connections
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error('Authentication required'));

    try {
      const decoded = jwt.verify(token, config.jwt.accessSecret);
      socket.user = decoded;
      next();
    } catch {
      next(new Error('Invalid token'));
    }
  });

  io.on('connection', (socket) => {
    logger.info(`Socket connected: ${socket.id} (user: ${socket.user?.id})`);

    // Join admin room
    if (['admin', 'superadmin'].includes(socket.user?.role)) {
      socket.join('admins');
      logger.info(`Admin ${socket.user.id} joined admin room`);
    }

    socket.on('disconnect', () => {
      logger.info(`Socket disconnected: ${socket.id}`);
    });

    // Custom events
    socket.on('join:booking', (bookingId) => {
      socket.join(`booking:${bookingId}`);
    });
  });

  logger.info('🔌 Socket.io initialized');
  return io;
};

// Emit to admin room (called from controllers)
const emitToAdmins = (event, data) => {
  if (io) {
    io.to('admins').emit(event, data);
  }
};

// Emit to specific room
const emitToRoom = (room, event, data) => {
  if (io) {
    io.to(room).emit(event, data);
  }
};

const getIO = () => io;

module.exports = { initSocket, emitToAdmins, emitToRoom, getIO };
