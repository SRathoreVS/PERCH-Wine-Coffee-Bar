/**
 * PM2 Ecosystem Config — PERCH Backend
 * Usage: pm2 start ecosystem.config.js --env production
 */

module.exports = {
  apps: [
    {
      name: 'perch-api',
      script: 'server.js',
      instances: 'max',          // Use all CPU cores
      exec_mode: 'cluster',      // Cluster mode for load balancing
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',

      env: {
        NODE_ENV: 'development',
        PORT: 5000,
      },

      env_production: {
        NODE_ENV: 'production',
        PORT: 5000,
      },

      // Logging
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      error_file: './src/logs/pm2-error.log',
      out_file: './src/logs/pm2-out.log',
      merge_logs: true,

      // Graceful shutdown
      kill_timeout: 5000,
      listen_timeout: 10000,
      shutdown_with_message: true,

      // Health check
      min_uptime: '10s',
      max_restarts: 10,
    },
  ],
};
