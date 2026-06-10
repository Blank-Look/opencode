const { Router } = require('express');
const db = require('../db');

const router = Router();

router.get('/', (req, res) => {
  const { search, source, status, type, owner_id, page = 1, limit = 50 } = req.query;
  const conditions = [];
  const params = [];

  if (search) {
    conditions.push('(a.name LIKE ? OR a.metadata LIKE ?)');
    params.push(`%${search}%`, `%${search}%`);
  }
  if (source) {
    conditions.push('s.name = ?');
    params.push(source);
  }
  if (status) {
    conditions.push('a.status = ?');
    params.push(status);
  }
  if (type) {
    conditions.push('t.name = ?');
    params.push(type);
  }
  if (owner_id) {
    conditions.push('a.owner_id = ?');
    params.push(parseInt(owner_id, 10));
  }

  const where = conditions.length ? 'WHERE ' + conditions.join(' AND ') : '';
  const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);

  const countRow = db.prepare(`
    SELECT COUNT(*) as total
    FROM assets a
    LEFT JOIN asset_types t ON t.id = a.asset_type_id
    LEFT JOIN sources s ON s.id = a.source_id
    ${where}
  `).get(...params);

  const rows = db.prepare(`
    SELECT a.*, t.name as type_name, t.icon as type_icon,
           s.name as source_name, s.display_name as source_display,
           o.name as owner_name, o.email as owner_email, o.initials as owner_initials
    FROM assets a
    LEFT JOIN asset_types t ON t.id = a.asset_type_id
    LEFT JOIN sources s ON s.id = a.source_id
    LEFT JOIN owners o ON o.id = a.owner_id
    ${where}
    ORDER BY a.updated_at DESC
    LIMIT ? OFFSET ?
  `).all(...params, parseInt(limit, 10), offset);

  const assets = rows.map(r => ({
    id: r.id,
    externalId: r.external_id,
    name: r.name,
    description: r.description,
    type: { id: r.asset_type_id, name: r.type_name, icon: r.type_icon },
    source: { id: r.source_id, name: r.source_name, display: r.source_display },
    status: r.status,
    owner: r.owner_id ? {
      id: r.owner_id, name: r.owner_name, email: r.owner_email, initials: r.owner_initials,
    } : null,
    category: r.category,
    lastSeen: r.last_seen,
    metadata: r.metadata ? JSON.parse(r.metadata) : null,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  }));

  res.json({ assets, total: countRow.total, page: parseInt(page, 10), limit: parseInt(limit, 10) });
});

router.get('/:id', (req, res) => {
  const row = db.prepare(`
    SELECT a.*, t.name as type_name, t.icon as type_icon,
           s.name as source_name, s.display_name as source_display,
           o.name as owner_name, o.email as owner_email, o.initials as owner_initials
    FROM assets a
    LEFT JOIN asset_types t ON t.id = a.asset_type_id
    LEFT JOIN sources s ON s.id = a.source_id
    LEFT JOIN owners o ON o.id = a.owner_id
    WHERE a.id = ?
  `).get(req.params.id);

  if (!row) return res.status(404).json({ error: 'Asset not found' });

  res.json({
    id: row.id,
    externalId: row.external_id,
    name: row.name,
    description: row.description,
    type: { id: row.asset_type_id, name: row.type_name, icon: row.type_icon },
    source: { id: row.source_id, name: row.source_name, display: row.source_display },
    status: row.status,
    owner: row.owner_id ? {
      id: row.owner_id, name: row.owner_name, email: row.owner_email, initials: row.owner_initials,
    } : null,
    category: row.category,
    lastSeen: row.last_seen,
    metadata: row.metadata ? JSON.parse(row.metadata) : null,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  });
});

router.post('/', (req, res) => {
  const { name, description, asset_type_id, source_id, status, owner_id, category, last_seen, metadata, external_id } = req.body;
  if (!name) return res.status(400).json({ error: 'name is required' });

  const result = db.prepare(`
    INSERT INTO assets (external_id, name, description, asset_type_id, source_id, status, owner_id, category, last_seen, metadata)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    external_id || null, name, description || null,
    asset_type_id || null, source_id || null,
    status || 'unknown', owner_id || null,
    category || null, last_seen || null,
    metadata ? JSON.stringify(metadata) : null
  );

  res.status(201).json({ id: result.lastInsertRowid });
});

router.put('/:id', (req, res) => {
  const fields = [];
  const params = [];

  ['external_id', 'name', 'description', 'asset_type_id', 'source_id', 'status', 'owner_id', 'category', 'last_seen'].forEach(f => {
    if (req.body[f] !== undefined) {
      fields.push(`${f} = ?`);
      params.push(req.body[f]);
    }
  });
  if (req.body.metadata !== undefined) {
    fields.push('metadata = ?');
    params.push(JSON.stringify(req.body.metadata));
  }

  if (!fields.length) return res.status(400).json({ error: 'No fields to update' });

  fields.push("updated_at = datetime('now')");
  params.push(req.params.id);

  const result = db.prepare(`UPDATE assets SET ${fields.join(', ')} WHERE id = ?`).run(...params);
  if (!result.changes) return res.status(404).json({ error: 'Asset not found' });

  res.json({ updated: result.changes });
});

router.patch('/:id/owner', (req, res) => {
  const { owner_id } = req.body;
  const result = db.prepare("UPDATE assets SET owner_id = ?, updated_at = datetime('now') WHERE id = ?").run(owner_id || null, req.params.id);
  if (!result.changes) return res.status(404).json({ error: 'Asset not found' });
  res.json({ updated: result.changes });
});

router.delete('/:id', (req, res) => {
  const result = db.prepare('DELETE FROM assets WHERE id = ?').run(req.params.id);
  if (!result.changes) return res.status(404).json({ error: 'Asset not found' });
  res.json({ deleted: result.changes });
});

module.exports = router;
