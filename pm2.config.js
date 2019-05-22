'use strict'

module.exports = {
  apps: [
    {
      name: 'nodejs-starter',
      script: './src/index.js',
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      exec_mode: 'cluster',
      instances: 'max',
      restart_delay: 5000,
      env: {
        watch: false,
        autorestart: true,
      },
      env_production: {
        NODE_ENV: 'production',
      },
      env_staging: {
        NODE_ENV: 'staging',
      },
      env_development: {
        NODE_ENV: 'development',
      },
    },
  ],
}
