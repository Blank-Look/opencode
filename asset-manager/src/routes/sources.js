const { Router } = require('express');
const db = require('../db');

const router = Router();

router.get('/', (req, res) => {
  const rows = db.prepare(`
    SELECT s.*, COUNT(a.id) as asset_count
    FROM sources s LEFT JOIN assets a ON a.source_id = s.id
    GROUP BY s.id ORDER BY s.name
  `).all();
  res.json(rows.map(r => ({
    ...r,
    config: r.config ? JSON.parse(r.config) : null,
  })));
});

router.post('/', (req, res) => {
  const { name, display_name, description, config } = req.body;
  if (!name || !display_name) return res.status(400).json({ error: 'name and display_name are required' });
  try {
    const result = db.prepare('INSERT INTO sources (name, display_name, description, config) VALUES (?, ?, ?, ?)').run(name, display_name, description || null, config ? JSON.stringify(config) : null);
    res.status(201).json({ id: result.lastInsertRowid });
  } catch (e) {
    if (e.message.includes('UNIQUE')) return res.status(409).json({ error: 'Source already exists' });
    throw e;
  }
});

router.put('/:id', (req, res) => {
  const { name, display_name, description, enabled, config } = req.body;
  const result = db.prepare(`
    UPDATE sources SET name = COALESCE(?, name), display_name = COALESCE(?, display_name),
      description = COALESCE(?, description), enabled = COALESCE(?, enabled),
      config = COALESCE(?, config), updated_at = datetime('now')
    WHERE id = ?
  `).run(name || null, display_name || null, description || null, enabled !== undefined ? (enabled ? 1 : 0) : null, config ? JSON.stringify(config) : null, req.params.id);
  if (!result.changes) return res.status(404).json({ error: 'Source not found' });
  res.json({ updated: result.changes });
});

router.delete('/:id', (req, res) => {
  const used = db.prepare('SELECT COUNT(*) as count FROM assets WHERE source_id = ?').get(req.params.id);
  if (used.count > 0) return res.status(400).json({ error: `Cannot delete: ${used.count} assets from this source. Remove them first.` });
  db.prepare('DELETE FROM sources WHERE id = ?').run(req.params.id);
  res.json({ deleted: true });
});

module.exports = router;
