require('dotenv').config();
const path = require('path');

module.exports = {
  port: parseInt(process.env.PORT, 10) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  dbPath: process.env.DATABASE_PATH || path.join(__dirname, '..', 'data', 'asset-manager.db'),
  azure: {
    tenantId: process.env.AZURE_TENANT_ID,
    clientId: process.env.AZURE_CLIENT_ID,
    clientSecret: process.env.AZURE_CLIENT_SECRET,
  },
  sessionSecret: process.env.SESSION_SECRET || 'dev-secret-change-in-production',
  isDev: (process.env.NODE_ENV || 'development') === 'development',
};
