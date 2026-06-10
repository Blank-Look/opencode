const db = require('./db');
const scheduler = require('./scheduler');

async function run() {
  const jobName = process.argv[2];
  if (!jobName) {
    console.log('Usage: node src/manual-sync.js <job-name>');
    console.log('Available jobs:');
    const jobs = db.prepare('SELECT j.id, j.name, s.name as source FROM sync_jobs j LEFT JOIN sources s ON s.id = j.source_id').all();
    jobs.forEach(j => console.log(`  ${j.name} (source: ${j.source})`));
    process.exit(1);
  }

  const job = db.prepare('SELECT * FROM sync_jobs WHERE name = ?').get(jobName);
  if (!job) {
    console.error(`Job "${jobName}" not found`);
    process.exit(1);
  }

  console.log(`Running sync job: ${job.name}...`);
  const result = await scheduler.executeJob(job);
  console.log('Result:', JSON.stringify(result, null, 2));
  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });
