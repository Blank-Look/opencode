const config = require('./config');
const app = require('./app');
const db = require('./db');
const scheduler = require('./scheduler');

scheduler.init();

console.log(`Asset Manager starting...`);
console.log(`  Database: ${config.dbPath}`);
console.log(`  Port: ${config.port}`);
console.log(`  Environment: ${config.nodeEnv}`);

app.listen(config.port, () => {
  console.log(`Asset Manager running at http://localhost:${config.port}`);
});
