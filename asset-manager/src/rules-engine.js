const db = require('./db');

function evaluateCondition(rule, asset) {
  const config = typeof rule.condition_config === 'string' ? JSON.parse(rule.condition_config) : rule.condition_config;

  switch (rule.condition_type) {
    case 'age': {
      const days = config.days || 30;
      const refDate = new Date();
      refDate.setDate(refDate.getDate() - days);
      const assetDate = new Date(asset.created_at);
      return assetDate < refDate;
    }
    case 'last_seen': {
      const days = config.days || 90;
      if (!asset.last_seen) return true;
      const refDate = new Date();
      refDate.setDate(refDate.getDate() - days);
      const lastSeen = new Date(asset.last_seen);
      return lastSeen < refDate;
    }
    case 'status': {
      return asset.status === config.status;
    }
    case 'unassigned': {
      return !asset.owner_id;
    }
    case 'custom': {
      try {
        const fn = new Function('asset', 'return ' + config.expression);
        return fn(asset);
      } catch { return false; }
    }
    default:
      return false;
  }
}

function executeAction(rule, asset) {
  const config = typeof rule.action_config === 'string' ? JSON.parse(rule.action_config) : rule.action_config;

  switch (rule.action_type) {
    case 'update_status': {
      const newStatus = config?.status || 'inactive';
      db.prepare("UPDATE assets SET status = ?, updated_at = datetime('now') WHERE id = ?").run(newStatus, asset.id);
      return { assetId: asset.id, action: 'update_status', value: newStatus };
    }
    case 'tag': {
      const tag = config?.tag || 'flagged';
      const existingMeta = asset.metadata ? JSON.parse(asset.metadata) : {};
      existingMeta.tags = existingMeta.tags || [];
      if (!existingMeta.tags.includes(tag)) {
        existingMeta.tags.push(tag);
        db.prepare("UPDATE assets SET metadata = ?, updated_at = datetime('now') WHERE id = ?").run(JSON.stringify(existingMeta), asset.id);
      }
      return { assetId: asset.id, action: 'tag', value: tag };
    }
    case 'assign_owner': {
      if (config?.owner_id) {
        db.prepare("UPDATE assets SET owner_id = ?, updated_at = datetime('now') WHERE id = ?").run(config.owner_id, asset.id);
        return { assetId: asset.id, action: 'assign_owner', value: config.owner_id };
      }
      return null;
    }
    default:
      return null;
  }
}

function evaluate(rule) {
  const ruleObj = typeof rule.condition_config === 'string' ? {
    ...rule,
    condition_config: JSON.parse(rule.condition_config),
    action_config: rule.action_config ? JSON.parse(rule.action_config) : null,
  } : rule;

  let query = 'SELECT * FROM assets WHERE 1=1';
  const params = [];

  if (ruleObj.asset_type_id) {
    query += ' AND asset_type_id = ?';
    params.push(ruleObj.asset_type_id);
  }
  if (ruleObj.source_id) {
    query += ' AND source_id = ?';
    params.push(ruleObj.source_id);
  }

  const assets = db.prepare(query).all(...params);
  const results = [];

  for (const asset of assets) {
    if (evaluateCondition(ruleObj, asset)) {
      const result = executeAction(ruleObj, asset);
      if (result) results.push(result);
    }
  }

  return results;
}

function evaluateAll() {
  const rules = db.prepare('SELECT * FROM business_rules WHERE enabled = 1').all();
  const allResults = [];
  for (const rule of rules) {
    const results = evaluate(rule);
    allResults.push(...results);
  }
  if (allResults.length) {
    console.log(`[RulesEngine] Evaluated rules: ${allResults.length} actions taken`);
  }
  return allResults;
}

module.exports = { evaluate, evaluateAll };
