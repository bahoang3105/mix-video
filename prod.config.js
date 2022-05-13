const env = {
  NODE_ENV: 'production',
  LOG_LEVEL: 'info',
  PORT: 3001
}

module.exports = {
  apps: [
    {
      name: 'mix-video-server',
      script: './backend/build/app.js',
      env: {
        ...env,
      },
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      error_file: './backend/logs/pm2.err',
      out_file: './backend/logs/pm2.log'
    }
  ],
};