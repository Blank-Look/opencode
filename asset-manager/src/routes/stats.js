const { Router } = require('express');
const db = require('../db');

const router = Router();

router.get('/', (req, res) => {
  const totalAssets = db.prepare('SELECT COUNT(*) as count FROM assets').get();
  const unassigned = db.prepare('SELECT COUNT(*) as count FROM assets WHERE owner_id IS NULL').get();
  const active = db.prepare("SELECT COUNT(*) as count FROM assets WHERE status = 'active'").get();
  const bySource = db.prepare(`
    SELECT s.name, s.display_name, COUNT(a.id) as count
    FROM sources s LEFT JOIN assets a ON a.source_id = s.id
    GROUP BY s.id
  `).all();
  const byType = db.prepare(`
    SELECT t.name, t.icon, COUNT(a.id) as count
    FROM asset_types t LEFT JOIN assets a ON a.asset_type_id = t.id
    GROUP BY t.id
  `).all();
  const byStatus = db.prepare(`
    SELECT status, COUNT(*) as count
    FROM assets GROUP BY status
  `).all();
  const lastSync = db.prepare(`
    SELECT MAX(ended_at) as last_run
    FROM sync_logs WHERE status = 'completed'
  `).get();

  const totalBySource = {};
  bySource.forEach(s => { totalBySource[s.name] = s.count; });

  res.json({
    totalAssets: totalAssets.count,
    unassigned: unassigned.count,
    active: active.count,
    lastSync: lastSync?.last_run || null,
    bySource,
    byType,
    byStatus,
    totalBySource,
  });
});

module.exports = router;
