const db = require('../db');

class BaseConnector {
  constructor(sourceName) {
    this.sourceName = sourceName;
    this.source = db.prepare('SELECT * FROM sources WHERE name = ?').get(sourceName);
  }

  getAssetTypeId(name) {
    let row = db.prepare('SELECT id FROM asset_types WHERE name = ?').get(name);
    if (!row) {
      const result = db.prepare('INSERT INTO asset_types (name) VALUES (?)').run(name);
      return result.lastInsertRowid;
    }
    return row.id;
  }

  upsertAsset({ externalId, name, description, assetTypeId, category, status, metadata, ownerEmail, lastSeen }) {
    if (!this.source) return null;

    const existing = db.prepare('SELECT id FROM assets WHERE external_id = ? AND source_id = ?').get(externalId, this.source.id);

    if (existing) {
      db.prepare(`
        UPDATE assets SET name = ?, description = ?, asset_type_id = ?,
          category = ?, status = ?, metadata = ?, last_seen = ?,
          updated_at = datetime('now')
        WHERE id = ?
      `).run(name, description || null, assetTypeId, category || null, status || 'active',
        metadata ? JSON.stringify(metadata) : null, lastSeen || new Date().toISOString().split('T')[0],
        existing.id);
      return { action: 'updated', id: existing.id };
    }

    const result = db.prepare(`
      INSERT INTO assets (external_id, name, description, asset_type_id, source_id, category, status, metadata, last_seen)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(externalId, name, description || null, assetTypeId, this.source.id,
      category || null, status || 'active',
      metadata ? JSON.stringify(metadata) : null,
      lastSeen || new Date().toISOString().split('T')[0]);
    return { action: 'added', id: result.lastInsertRowid };
  }

  logSync(jobId, startedAt, result) {
    db.prepare(`
      INSERT INTO sync_logs (job_id, started_at, ended_at, status, assets_added, assets_updated, assets_removed, error_message, details)
      VALUES (?, ?, datetime('now'), ?, ?, ?, ?, ?, ?)
    `).run(jobId, startedAt, result.status, result.added || 0, result.updated || 0, result.removed || 0, result.error || null, result.details ? JSON.stringify(result.details) : null);

    db.prepare('UPDATE sync_jobs SET last_run_at = datetime(\'now\'), last_status = ?, updated_at = datetime(\'now\') WHERE id = ?').run(result.status, jobId);
  }
}

module.exports = BaseConnector;
