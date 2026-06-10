const db = require('./db');
const config = require('./config');

console.log('Seeding asset-manager database...');

const sources = [
  { name: 'entra', display_name: 'Entra ID', description: 'Microsoft Entra ID (Azure AD) — groups, apps, users' },
  { name: 'sharepoint', display_name: 'SharePoint', description: 'SharePoint Online — sites and lists' },
  { name: 'defender', display_name: 'Microsoft Defender', description: 'Defender for Endpoint — alerts, vulnerabilities, software' },
  { name: 'powerautomate', display_name: 'Power Automate', description: 'Power Automate — flows and service principals' },
  { name: 'manual', display_name: 'Manual Entry', description: 'Assets added manually through the UI or API' },
];

const insertSource = db.prepare('INSERT OR IGNORE INTO sources (name, display_name, description) VALUES (?, ?, ?)');
for (const s of sources) insertSource.run(s.name, s.display_name, s.description);

const assetTypes = [
  { name: 'Team', icon: '💬', description: 'Microsoft 365 Group / Team' },
  { name: 'App Registration', icon: '🗄️', description: 'Azure AD App Registration / Enterprise App' },
  { name: 'Group', icon: '👥', description: 'Azure AD / Microsoft 365 Group' },
  { name: 'User', icon: '👤', description: 'Azure AD User' },
  { name: 'Site', icon: '📄', description: 'SharePoint Site' },
  { name: 'List', icon: '📋', description: 'SharePoint List' },
  { name: 'Software', icon: '💻', description: 'Software inventory from Defender' },
  { name: 'Vulnerability', icon: '🔒', description: 'Security vulnerability / threat indicator' },
  { name: 'Alert', icon: '⚠️', description: 'Security alert from Defender' },
  { name: 'Flow', icon: '⚡', description: 'Power Automate flow' },
  { name: 'Device', icon: '🖥️', description: 'Managed device' },
  { name: 'License', icon: '🔑', description: 'Software license / subscription' },
  { name: 'Contract', icon: '📝', description: 'Vendor contract / agreement' },
];

const insertType = db.prepare('INSERT OR IGNORE INTO asset_types (name, icon, description) VALUES (?, ?, ?)');
for (const t of assetTypes) insertType.run(t.name, t.icon, t.description);

const owners = [
  { name: 'Kate M.', email: 'kate@contoso.com', initials: 'KM', department: 'Engineering' },
  { name: 'James R.', email: 'james@contoso.com', initials: 'JR', department: 'Security' },
  { name: 'Alex L.', email: 'alex@contoso.com', initials: 'AL', department: 'IT Operations' },
  { name: 'Sarah C.', email: 'sarah@contoso.com', initials: 'SC', department: 'Compliance' },
  { name: 'Tom W.', email: 'tom@contoso.com', initials: 'TW', department: 'Infrastructure' },
];

const insertOwner = db.prepare('INSERT OR IGNORE INTO owners (name, email, initials, department) VALUES (?, ?, ?, ?)');
for (const o of owners) insertOwner.run(o.name, o.email, o.initials, o.department);

// Sample assets for demo purposes
const sourcesMap = {};
db.prepare('SELECT * FROM sources').all().forEach(s => { sourcesMap[s.name] = s.id; });

const typesMap = {};
db.prepare('SELECT * FROM asset_types').all().forEach(t => { typesMap[t.name] = t.id; });

const ownersMap = {};
db.prepare('SELECT * FROM owners').all().forEach(o => { ownersMap[o.email] = o.id; });

const assets = [
  { external_id: 'g01', name: 'Contoso Sales Team', type: 'Team', source: 'entra', status: 'active', owner: 'kate@contoso.com', category: 'Microsoft 365', last_seen: '2026-06-09', meta: { visibility: 'Private', members: 12 } },
  { external_id: 'g02', name: 'Contoso IT Admins', type: 'Group', source: 'entra', status: 'active', owner: 'alex@contoso.com', category: 'Microsoft 365', last_seen: '2026-06-10', meta: { visibility: 'Private', members: 5 } },
  { external_id: 'a01', name: 'IT Asset DB App', type: 'App Registration', source: 'entra', status: 'active', owner: null, category: 'Enterprise App', last_seen: '2026-06-09', meta: { publisherDomain: 'contoso.com' } },
  { external_id: 'a02', name: 'HR Portal App', type: 'App Registration', source: 'entra', status: 'active', owner: 'james@contoso.com', category: 'Enterprise App', last_seen: '2026-06-10', meta: { publisherDomain: 'contoso.com' } },
  { external_id: 's01', name: 'Contoso HR Portal', type: 'Site', source: 'sharepoint', status: 'active', owner: 'james@contoso.com', category: 'SharePoint Site', last_seen: '2026-06-10', meta: { webUrl: 'https://contoso.sharepoint.com/sites/hr' } },
  { external_id: 's02', name: 'Compliance Review Site', type: 'Site', source: 'sharepoint', status: 'inactive', owner: 'james@contoso.com', category: 'SharePoint Site', last_seen: '2026-04-12', meta: { webUrl: 'https://contoso.sharepoint.com/sites/compliance' } },
  { external_id: 's03', name: 'Project Phoenix', type: 'Site', source: 'sharepoint', status: 'active', owner: 'kate@contoso.com', category: 'SharePoint Site', last_seen: '2026-06-08', meta: { webUrl: 'https://contoso.sharepoint.com/sites/phoenix' } },
  { external_id: 'd01', name: 'Microsoft Defender AV', type: 'Software', source: 'defender', status: 'active', owner: 'alex@contoso.com', category: 'Security Software', last_seen: '2026-06-10', meta: { version: '4.18.24060.7' } },
  { external_id: 'd02', name: 'SolarWinds Agent', type: 'Software', source: 'defender', status: 'active', owner: null, category: 'Monitoring', last_seen: '2026-06-07', meta: { version: '2024.2.1' } },
  { external_id: 'd03', name: 'Suspicious Login Alert', type: 'Alert', source: 'defender', status: 'active', owner: 'sarah@contoso.com', category: 'Security Alert', last_seen: '2026-06-10', meta: { severity: 'medium', category: 'AnomalousLogin' } },
  { external_id: 'd04', name: 'Malware Detected — Endpoint WKS-102', type: 'Alert', source: 'defender', status: 'active', owner: 'alex@contoso.com', category: 'Security Alert', last_seen: '2026-06-09', meta: { severity: 'high', category: 'Malware' } },
  { external_id: 'p01', name: 'Onboarding Flow', type: 'Flow', source: 'powerautomate', status: 'active', owner: 'kate@contoso.com', category: 'Power Automate', last_seen: '2026-06-08', meta: { state: 'Started', triggers: 'When a new user is added' } },
  { external_id: 'p02', name: 'Ticket Escalation Flow', type: 'Flow', source: 'powerautomate', status: 'unknown', owner: 'alex@contoso.com', category: 'Power Automate', last_seen: '2026-05-20', meta: { state: 'Suspended', triggers: 'When ticket priority is Critical' } },
  { external_id: 'p03', name: 'Leave Request Approval', type: 'Flow', source: 'powerautomate', status: 'active', owner: null, category: 'Power Automate', last_seen: '2026-06-01', meta: { state: 'Started', triggers: 'When a leave request is submitted' } },
];

const insertAsset = db.prepare(`
  INSERT OR IGNORE INTO assets (external_id, name, asset_type_id, source_id, status, owner_id, category, last_seen, metadata)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

for (const a of assets) {
  insertAsset.run(a.external_id, a.name, typesMap[a.type], sourcesMap[a.source], a.status, ownersMap[a.owner] || null, a.category, a.last_seen, JSON.stringify(a.meta));
}

// Create default sync jobs
const insertJob = db.prepare('INSERT OR IGNORE INTO sync_jobs (name, source_id, schedule, enabled) VALUES (?, ?, ?, ?)');
insertJob.run('Entra ID Daily Sync', sourcesMap.entra, '0 6 * * *', 1);
insertJob.run('SharePoint Daily Sync', sourcesMap.sharepoint, '30 6 * * *', 1);
insertJob.run('Defender Hourly Sync', sourcesMap.defender, '0 * * * *', 1);
insertJob.run('Power Automate Daily Sync', sourcesMap.powerautomate, '0 7 * * *', 1);

// Create sample business rules
const insertRule = db.prepare(`
  INSERT OR IGNORE INTO business_rules (name, description, asset_type_id, source_id, condition_type, condition_config, action_type, action_config, enabled)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

insertRule.run(
  'Flag stale assets', 'Assets not seen in 90+ days → inactive',
  null, null, 'last_seen',
  JSON.stringify({ days: 90 }),
  'update_status', JSON.stringify({ status: 'inactive' }), 1
);

insertRule.run(
  'Flag unassigned critical assets', 'Unassigned assets from Defender → flag for review',
  typesMap['Alert'], sourcesMap.defender, 'unassigned',
  JSON.stringify({}),
  'tag', JSON.stringify({ tag: 'needs-owner' }), 1
);

console.log('Seed complete.');
console.log(`  ${sources.length} sources`);
console.log(`  ${assetTypes.length} asset types`);
console.log(`  ${owners.length} owners`);
console.log(`  ${assets.length} sample assets`);
console.log(`  4 sync jobs`);
console.log(`  2 business rules`);
