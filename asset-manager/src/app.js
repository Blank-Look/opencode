const express = require('express');
const cors = require('cors');
const path = require('path');

const config = require('./config');
const assetsRouter = require('./routes/assets');
const assetTypesRouter = require('./routes/asset-types');
const sourcesRouter = require('./routes/sources');
const ownersRouter = require('./routes/owners');
const jobsRouter = require('./routes/jobs');
const businessRulesRouter = require('./routes/business-rules');
const statsRouter = require('./routes/stats');

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.use('/api/assets', assetsRouter);
app.use('/api/asset-types', assetTypesRouter);
app.use('/api/sources', sourcesRouter);
app.use('/api/owners', ownersRouter);
app.use('/api/jobs', jobsRouter);
app.use('/api/business-rules', businessRulesRouter);
app.use('/api/stats', statsRouter);

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
  }
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error', message: config.isDev ? err.message : undefined });
});

module.exports = app;
