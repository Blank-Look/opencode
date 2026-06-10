const { Router } = require('express');
const db = require('../db');

const router = Router();

router.get('/', (req, res) => {
  const rows = db.prepare(`
    SELECT t.*, COUNT(a.id) as asset_count
    FROM asset_types t
    LEFT JOIN assets a ON a.asset_type_id = t.id
    GROUP BY t.id
    ORDER BY t.name
  `).all();
  res.json(rows);
});

router.post('/', (req, res) => {
  const { name, icon, description } = req.body;
  if (!name) return res.status(400).json({ error: 'name is required' });
  try {
    const result = db.prepare('INSERT INTO asset_types (name, icon, description) VALUES (?, ?, ?)').run(name, icon || '📦', description || null);
    res.status(201).json({ id: result.lastInsertRowid });
  } catch (e) {
    if (e.message.includes('UNIQUE')) return res.status(409).json({ error: 'Asset type already exists' });
    throw e;
  }
});

router.put('/:id', (req, res) => {
  const { name, icon, description } = req.body;
  const result = db.prepare("UPDATE asset_types SET name = COALESCE(?, name), icon = COALESCE(?, icon), description = COALESCE(?, description), updated_at = datetime('now') WHERE id = ?").run(name || null, icon || null, description || null, req.params.id);
  if (!result.changes) return res.status(404).json({ error: 'Asset type not found' });
  res.json({ updated: result.changes });
});

router.delete('/:id', (req, res) => {
  const used = db.prepare('SELECT COUNT(*) as count FROM assets WHERE asset_type_id = ?').get(req.params.id);
  if (used.count > 0) return res.status(400).json({ error: `Cannot delete: ${used.count} assets use this type. Reassign them first.` });
  const result = db.prepare('DELETE FROM asset_types WHERE id = ?').run(req.params.id);
  if (!result.changes) return res.status(404).json({ error: 'Asset type not found' });
  res.json({ deleted: result.changes });
});

module.exports = router;
