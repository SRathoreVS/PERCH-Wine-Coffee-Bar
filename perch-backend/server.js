/**
 * PERCH Wine & Coffee Bar — Server Entry Point
 */

const http = require('http');
const app = require('./src/app');
const { connectDB } = require('./src/database/connection');
const { initSocket } = require('./src/sockets');
const logger = require('./src/utils/logger');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Create HTTP server
    const server = http.createServer(app);

    // Initialize Socket.io
    initSocket(server);

    // Start listening
    server.listen(PORT, () => {
      logger.info(`🚀 PERCH Backend running on port ${PORT}`);
      logger.info(`📌 Environment: ${process.env.NODE_ENV || 'development'}`);
      logger.info(`📄 API Docs: http://localhost:${PORT}/api/docs`);
    });

    // Graceful shutdown
    const shutdown = async (signal) => {
      logger.info(`${signal} received. Shutting down gracefully...`);
      server.close(async () => {
        const mongoose = require('mongoose');
        await mongoose.connection.close();
        logger.info('MongoDB connection closed.');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));

  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
