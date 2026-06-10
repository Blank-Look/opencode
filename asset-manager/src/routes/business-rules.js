const { Router } = require('express');
const db = require('../db');
const rulesEngine = require('../rules-engine');

const router = Router();

router.get('/', (req, res) => {
  const rows = db.prepare(`
    SELECT r.*, t.name as type_name, t.icon as type_icon, s.name as source_name
    FROM business_rules r
    LEFT JOIN asset_types t ON t.id = r.asset_type_id
    LEFT JOIN sources s ON s.id = r.source_id
    ORDER BY r.name
  `).all();
  res.json(rows.map(r => ({
    ...r,
    condition_config: JSON.parse(r.condition_config),
    action_config: r.action_config ? JSON.parse(r.action_config) : null,
    enabled: !!r.enabled,
  })));
});

router.post('/', (req, res) => {
  const { name, description, asset_type_id, source_id, condition_type, condition_config, action_type, action_config } = req.body;
  if (!name || !condition_type || !action_type) return res.status(400).json({ error: 'name, condition_type, and action_type are required' });
  const result = db.prepare(`
    INSERT INTO business_rules (name, description, asset_type_id, source_id, condition_type, condition_config, action_type, action_config)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(name, description || null, asset_type_id || null, source_id || null, condition_type, JSON.stringify(condition_config), action_type, action_config ? JSON.stringify(action_config) : null);
  res.status(201).json({ id: result.lastInsertRowid });
});

router.put('/:id', (req, res) => {
  const fields = [];
  const params = [];
  ['name', 'description', 'asset_type_id', 'source_id', 'condition_type', 'action_type', 'enabled'].forEach(f => {
    if (req.body[f] !== undefined) {
      fields.push(`${f} = ?`);
      params.push(req.body[f]);
    }
  });
  if (req.body.condition_config !== undefined) {
    fields.push('condition_config = ?');
    params.push(JSON.stringify(req.body.condition_config));
  }
  if (req.body.action_config !== undefined) {
    fields.push('action_config = ?');
    params.push(JSON.stringify(req.body.action_config));
  }
  if (!fields.length) return res.status(400).json({ error: 'No fields to update' });
  fields.push("updated_at = datetime('now')");
  params.push(req.params.id);
  const result = db.prepare(`UPDATE business_rules SET ${fields.join(', ')} WHERE id = ?`).run(...params);
  if (!result.changes) return res.status(404).json({ error: 'Rule not found' });
  res.json({ updated: result.changes });
});

router.post('/:id/evaluate', (req, res) => {
  const rule = db.prepare('SELECT * FROM business_rules WHERE id = ?').get(req.params.id);
  if (!rule) return res.status(404).json({ error: 'Rule not found' });
  const results = rulesEngine.evaluate(rule);
  res.json({ evaluated: true, affected: results.length, results });
});

router.delete('/:id', (req, res) => {
  const result = db.prepare('DELETE FROM business_rules WHERE id = ?').run(req.params.id);
  if (!result.changes) return res.status(404).json({ error: 'Rule not found' });
  res.json({ deleted: result.changes });
});

module.exports = router;
