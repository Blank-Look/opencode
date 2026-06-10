const cron = require('node-cron');
const db = require('./db');
const EntraConnector = require('./connectors/entra');
const SharePointConnector = require('./connectors/sharepoint');
const DefenderConnector = require('./connectors/defender');
const PowerAutomateConnector = require('./connectors/powerautomate');
const ManualConnector = require('./connectors/manual');
const rulesEngine = require('./rules-engine');

const connectors = {
  entra: new EntraConnector(),
  sharepoint: new SharePointConnector(),
  defender: new DefenderConnector(),
  powerautomate: new PowerAutomateConnector(),
  manual: new ManualConnector(),
};

const tasks = {};

function getConnectorForSource(sourceName) {
  return connectors[sourceName] || null;
}

async function executeJob(job) {
  const source = db.prepare('SELECT * FROM sources WHERE id = ?').get(job.source_id);
  if (!source) {
    console.error(`[Scheduler] Job ${job.id} ("${job.name}"): source not found`);
    return;
  }

  const connector = getConnectorForSource(source.name);
  if (!connector) {
    console.error(`[Scheduler] Job ${job.id} ("${job.name}"): no connector for source "${source.name}"`);
    return;
  }

  console.log(`[Scheduler] Running job "${job.name}" (source: ${source.name})...`);
  const result = await connector.sync(job.id);
  console.log(`[Scheduler] Job "${job.name}" complete:`, result.status);

  rulesEngine.evaluateAll();

  return result;
}

function register(job) {
  stop(job.id);
  if (!job.enabled || !job.schedule) return;

  if (!cron.validate(job.schedule)) {
    console.error(`[Scheduler] Invalid cron expression for job "${job.name}": ${job.schedule}`);
    return;
  }

  tasks[job.id] = cron.schedule(job.schedule, async () => {
    const current = db.prepare('SELECT * FROM sync_jobs WHERE id = ?').get(job.id);
    if (!current || !current.enabled) {
      stop(job.id);
      return;
    }
    await executeJob(current);
  });

  console.log(`[Scheduler] Registered job "${job.name}" (${job.schedule})`);
}

function stop(jobId) {
  if (tasks[jobId]) {
    tasks[jobId].stop();
    delete tasks[jobId];
  }
}

function stopAll() {
  Object.keys(tasks).forEach(id => stop(id));
}

function init() {
  const jobs = db.prepare('SELECT * FROM sync_jobs').all();
  console.log(`[Scheduler] Initializing ${jobs.length} jobs...`);
  jobs.forEach(j => register(j));
  console.log(`[Scheduler] ${Object.keys(tasks).length} jobs active`);
}

module.exports = { register, stop, stopAll, init, executeJob };
