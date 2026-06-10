const { Router } = require('express');
const db = require('../db');

const router = Router();

router.get('/', (req, res) => {
  const rows = db.prepare(`
    SELECT o.*, COUNT(a.id) as asset_count
    FROM owners o LEFT JOIN assets a ON a.owner_id = o.id
    GROUP BY o.id ORDER BY o.name
  `).all();
  res.json(rows);
});

router.post('/', (req, res) => {
  const { name, email, initials, department } = req.body;
  if (!name) return res.status(400).json({ error: 'name is required' });
  try {
    const result = db.prepare('INSERT INTO owners (name, email, initials, department) VALUES (?, ?, ?, ?)').run(name, email || null, initials || null, department || null);
    res.status(201).json({ id: result.lastInsertRowid });
  } catch (e) {
    if (e.message.includes('UNIQUE')) return res.status(409).json({ error: 'Owner with this email already exists' });
    throw e;
  }
});

router.put('/:id', (req, res) => {
  const { name, email, initials, department } = req.body;
  const result = db.prepare("UPDATE owners SET name = COALESCE(?, name), email = COALESCE(?, email), initials = COALESCE(?, initials), department = COALESCE(?, department), updated_at = datetime('now') WHERE id = ?").run(name || null, email || null, initials || null, department || null, req.params.id);
  if (!result.changes) return res.status(404).json({ error: 'Owner not found' });
  res.json({ updated: result.changes });
});

router.delete('/:id', (req, res) => {
  db.prepare('UPDATE assets SET owner_id = NULL WHERE owner_id = ?').run(req.params.id);
  const result = db.prepare('DELETE FROM owners WHERE id = ?').run(req.params.id);
  if (!result.changes) return res.status(404).json({ error: 'Owner not found' });
  res.json({ deleted: result.changes });
});

module.exports = router;
