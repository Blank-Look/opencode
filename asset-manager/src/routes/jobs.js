const { Router } = require('express');
const db = require('../db');
const scheduler = require('../scheduler');

const router = Router();

router.get('/', (req, res) => {
  const rows = db.prepare(`
    SELECT j.*, s.name as source_name, s.display_name as source_display
    FROM sync_jobs j LEFT JOIN sources s ON s.id = j.source_id
    ORDER BY j.name
  `).all();
  res.json(rows.map(r => ({
    ...r,
    config: r.config ? JSON.parse(r.config) : null,
    enabled: !!r.enabled,
  })));
});

router.post('/', (req, res) => {
  const { name, source_id, schedule, config } = req.body;
  if (!name) return res.status(400).json({ error: 'name is required' });
  const result = db.prepare('INSERT INTO sync_jobs (name, source_id, schedule, config) VALUES (?, ?, ?, ?)').run(name, source_id || null, schedule || null, config ? JSON.stringify(config) : null);
  const job = db.prepare('SELECT * FROM sync_jobs WHERE id = ?').get(result.lastInsertRowid);
  scheduler.register(job);
  res.status(201).json({ id: result.lastInsertRowid });
});

router.put('/:id', (req, res) => {
  const { name, source_id, schedule, enabled, config } = req.body;
  db.prepare(`
    UPDATE sync_jobs SET name = COALESCE(?, name), source_id = COALESCE(?, source_id),
      schedule = COALESCE(?, schedule), enabled = COALESCE(?, enabled),
      config = COALESCE(?, config), updated_at = datetime('now')
    WHERE id = ?
  `).run(name || null, source_id || null, schedule || null, enabled !== undefined ? (enabled ? 1 : 0) : null, config ? JSON.stringify(config) : null, req.params.id);
  const job = db.prepare('SELECT * FROM sync_jobs WHERE id = ?').get(req.params.id);
  if (!job) return res.status(404).json({ error: 'Job not found' });
  scheduler.register(job);
  res.json({ updated: true, job });
});

router.post('/:id/trigger', (req, res) => {
  const job = db.prepare('SELECT * FROM sync_jobs WHERE id = ?').get(req.params.id);
  if (!job) return res.status(404).json({ error: 'Job not found' });
  scheduler.executeJob(job).catch(err => console.error('Triggered job failed:', err));
  res.json({ message: `Job "${job.name}" triggered` });
});

router.post('/:id/pause', (req, res) => {
  const result = db.prepare("UPDATE sync_jobs SET enabled = 0, updated_at = datetime('now') WHERE id = ?").run(req.params.id);
  if (!result.changes) return res.status(404).json({ error: 'Job not found' });
  scheduler.stop(req.params.id);
  res.json({ paused: true });
});

router.post('/:id/resume', (req, res) => {
  const result = db.prepare("UPDATE sync_jobs SET enabled = 1, updated_at = datetime('now') WHERE id = ?").run(req.params.id);
  if (!result.changes) return res.status(404).json({ error: 'Job not found' });
  const job = db.prepare('SELECT * FROM sync_jobs WHERE id = ?').get(req.params.id);
  scheduler.register(job);
  res.json({ resumed: true });
});

router.get('/:id/logs', (req, res) => {
  const logs = db.prepare('SELECT * FROM sync_logs WHERE job_id = ? ORDER BY created_at DESC LIMIT 50').all(req.params.id);
  res.json(logs);
});

router.delete('/:id', (req, res) => {
  scheduler.stop(req.params.id);
  db.prepare('DELETE FROM sync_logs WHERE job_id = ?').run(req.params.id);
  const result = db.prepare('DELETE FROM sync_jobs WHERE id = ?').run(req.params.id);
  if (!result.changes) return res.status(404).json({ error: 'Job not found' });
  res.json({ deleted: result.changes });
});

module.exports = router;
