const API = '/api';
let searchTimeout;

function debounceSearch() { clearTimeout(searchTimeout); searchTimeout = setTimeout(loadAssets, 300); }

function toast(msg, type = 'success') {
  const container = document.getElementById('toast-container');
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.textContent = msg;
  container.appendChild(el);
  setTimeout(() => el.remove(), 3000);
}

function api(path, opts = {}) {
  return fetch(API + path, {
    headers: { 'Content-Type': 'application/json', ...opts.headers },
    ...opts,
  }).then(r => {
    if (!r.ok) return r.json().then(e => { throw new Error(e.error || 'Request failed'); });
    return r.json();
  });
}

function closeModals() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.getElementById('modal').classList.remove('open');
}

function openModal(html) {
  document.getElementById('modal-body').innerHTML = html;
  document.getElementById('modal-overlay').classList.add('open');
  document.getElementById('modal').classList.add('open');
}

/* === Tab Switching === */
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('view-' + tab.dataset.view).classList.add('active');
    const loaders = { assets: loadAssets, types: loadTypes, sources: loadSources, jobs: loadJobs, rules: loadRules, owners: loadOwners };
    if (loaders[tab.dataset.view]) loaders[tab.dataset.view]();
  });
});

/* === Stats === */
function loadStats() {
  api('/stats').then(data => {
    document.getElementById('stats').innerHTML = `
      <div class="stat-card"><div class="label">Total Assets</div><div class="value">${data.totalAssets}</div><div class="sub">across ${Object.keys(data.totalBySource).length} sources</div></div>
      <div class="stat-card"><div class="label">Unassigned</div><div class="value">${data.unassigned}</div><div class="sub">needs owner</div></div>
      <div class="stat-card"><div class="label">Active</div><div class="value">${data.active}</div><div class="sub">of ${data.totalAssets} total</div></div>
      <div class="stat-card"><div class="label">Last Sync</div><div class="value">${data.lastSync ? timeAgo(data.lastSync) : '—'}</div><div class="sub">ago</div></div>
    `;
  }).catch(console.error);
}

function timeAgo(dateStr) {
  if (!dateStr) return 'never';
  const diff = Date.now() - new Date(dateStr + 'Z').getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins} min`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  return `${Math.floor(hrs / 24)}d`;
}

/* === Assets === */
let currentPage = 1;

function loadAssets() {
  const search = document.getElementById('search').value;
  const source = document.getElementById('filter-source').value;
  const status = document.getElementById('filter-status').value;
  const type = document.getElementById('filter-type').value;
  const params = new URLSearchParams({ page: currentPage, limit: 25 });
  if (search) params.set('search', search);
  if (source) params.set('source', source);
  if (status) params.set('status', status);
  if (type) params.set('type', type);

  api('/assets?' + params).then(data => {
    const tbody = document.getElementById('assets-tbody');
    tbody.innerHTML = data.assets.map(a => `
      <tr>
        <td><span class="type-icon"><span class="emoji">${a.type?.icon || '📦'}</span> ${esc(a.name)}</span></td>
        <td><span class="source-badge ${a.source?.name}">${a.source?.display || a.source?.name || '?'}</span></td>
        <td><span class="status-dot ${a.status}">${a.status}</span></td>
        <td>${a.owner ? `<span class="owner-tag"><span class="avatar initials">${esc(a.owner.initials || '?')}</span> ${esc(a.owner.name)}</span>` : '<span style="color:var(--gray-400)"><em>Unassigned</em></span>'}</td>
        <td><span style="color:var(--gray-500)">${esc(a.category || '—')}</span></td>
        <td><span style="color:var(--gray-500)">${a.lastSeen || '—'}</span></td>
        <td>
          <button class="btn btn-sm btn-icon" onclick="showEditAssetModal(${a.id})" title="Edit">✎</button>
          <button class="btn btn-sm btn-icon" onclick="showAssignOwnerModal(${a.id})" title="Assign owner">👤</button>
          <button class="btn btn-sm btn-icon" onclick="deleteAsset(${a.id})" title="Delete">✕</button>
        </td>
      </tr>
    `).join('');

    const totalPages = Math.ceil(data.total / data.limit);
    document.getElementById('pagination').innerHTML = totalPages > 1 ? `
      <button onclick="goPage(${currentPage - 1})" ${currentPage <= 1 ? 'disabled' : ''}>←</button>
      <span class="page-info">Page ${currentPage} of ${totalPages} (${data.total} assets)</span>
      <button onclick="goPage(${currentPage + 1})" ${currentPage >= totalPages ? 'disabled' : ''}>→</button>
    ` : '';
  }).catch(err => { document.getElementById('assets-tbody').innerHTML = `<tr><td colspan="7" style="color:var(--red);padding:2rem;text-align:center">${err.message}</td></tr>`; });
}

function goPage(p) { currentPage = p; loadAssets(); }

function showEditAssetModal(id) {
  api('/assets/' + id).then(a => {
    openModal(`
      <h3>Edit Asset</h3>
      <form onsubmit="saveAsset(event, ${id})">
        <div class="form-group"><label>Name</label><input name="name" value="${esc(a.name)}" required></div>
        <div class="form-group"><label>Description</label><textarea name="description">${esc(a.description || '')}</textarea></div>
        <div class="form-group"><label>Category</label><input name="category" value="${esc(a.category || '')}"></div>
        <div class="form-group"><label>Status</label><select name="status"><option ${a.status === 'active' ? 'selected' : ''}>active</option><option ${a.status === 'inactive' ? 'selected' : ''}>inactive</option><option ${a.status === 'unknown' ? 'selected' : ''}>unknown</option></select></div>
        <div class="form-group"><label>Last Seen</label><input name="last_seen" type="date" value="${a.lastSeen || ''}"></div>
        <div class="form-actions">
          <button type="button" class="btn btn-sm" onclick="closeModals()">Cancel</button>
          <button type="submit" class="btn btn-sm btn-primary">Save</button>
        </div>
      </form>
    `);
  });
}

function saveAsset(e, id) {
  e.preventDefault();
  const fd = new FormData(e.target);
  const body = Object.fromEntries(fd);
  api('/assets/' + id, { method: 'PUT', body: JSON.stringify(body) }).then(() => {
    closeModals(); toast('Asset updated'); loadAssets(); loadStats();
  }).catch(err => toast(err.message, 'error'));
}

function showAssignOwnerModal(assetId) {
  api('/owners').then(owners => {
    api('/assets/' + assetId).then(asset => {
      openModal(`
        <h3>Assign Owner</h3>
        <form onsubmit="assignOwner(event, ${assetId})">
          <div class="form-group"><label>Asset</label><div style="padding:0.5rem 0">${esc(asset.name)}</div></div>
          <div class="form-group"><label>Owner</label><select name="owner_id">
            <option value="">— Unassigned —</option>
            ${owners.map(o => `<option value="${o.id}" ${asset.owner?.id === o.id ? 'selected' : ''}>${esc(o.name)} (${esc(o.email || '')})</option>`).join('')}
          </select></div>
          <div class="form-actions">
            <button type="button" class="btn btn-sm" onclick="closeModals()">Cancel</button>
            <button type="submit" class="btn btn-sm btn-primary">Assign</button>
          </div>
        </form>
      `);
    });
  });
}

function assignOwner(e, assetId) {
  e.preventDefault();
  const fd = new FormData(e.target);
  api('/assets/' + assetId + '/owner', { method: 'PATCH', body: JSON.stringify({ owner_id: parseInt(fd.get('owner_id')) || null }) }).then(() => {
    closeModals(); toast('Owner assigned'); loadAssets();
  }).catch(err => toast(err.message, 'error'));
}

function deleteAsset(id) {
  if (!confirm('Delete this asset?')) return;
  api('/assets/' + id, { method: 'DELETE' }).then(() => { toast('Asset deleted'); loadAssets(); loadStats(); }).catch(err => toast(err.message, 'error'));
}

function showAddAssetModal() {
  Promise.all([api('/sources'), api('/asset-types'), api('/owners')]).then(([sources, types, owners]) => {
    openModal(`
      <h3>Add Asset</h3>
      <form onsubmit="addAsset(event)">
        <div class="form-group"><label>Name *</label><input name="name" required></div>
        <div class="form-group"><label>External ID</label><input name="external_id"></div>
        <div class="form-group"><label>Description</label><textarea name="description"></textarea></div>
        <div class="form-group"><label>Type</label><select name="asset_type_id"><option value="">— Select —</option>${types.map(t => `<option value="${t.id}">${t.icon || ''} ${esc(t.name)}</option>`).join('')}</select></div>
        <div class="form-group"><label>Source</label><select name="source_id"><option value="">— Select —</option>${sources.map(s => `<option value="${s.id}">${esc(s.display_name)}</option>`).join('')}</select></div>
        <div class="form-group"><label>Status</label><select name="status"><option value="active">Active</option><option value="inactive">Inactive</option><option value="unknown">Unknown</option></select></div>
        <div class="form-group"><label>Category</label><input name="category"></div>
        <div class="form-group"><label>Owner</label><select name="owner_id"><option value="">— None —</option>${owners.map(o => `<option value="${o.id}">${esc(o.name)}</option>`).join('')}</select></div>
        <div class="form-actions">
          <button type="button" class="btn btn-sm" onclick="closeModals()">Cancel</button>
          <button type="submit" class="btn btn-sm btn-primary">Add Asset</button>
        </div>
      </form>
    `);
  });
}

function addAsset(e) {
  e.preventDefault();
  const fd = new FormData(e.target);
  const body = {};
  fd.forEach((v, k) => { if (v) body[k] = isNaN(v) ? v : parseInt(v, 10); });
  api('/assets', { method: 'POST', body: JSON.stringify(body) }).then(() => {
    closeModals(); toast('Asset added'); loadAssets(); loadStats();
  }).catch(err => toast(err.message, 'error'));
}

/* === Asset Types === */
function loadTypes() {
  api('/asset-types').then(types => {
    document.getElementById('types-tbody').innerHTML = types.map(t => `
      <tr>
        <td style="font-size:1.25rem">${t.icon || '📦'}</td>
        <td><strong>${esc(t.name)}</strong></td>
        <td style="color:var(--gray-500)">${esc(t.description || '')}</td>
        <td>${t.asset_count || 0}</td>
        <td>
          <button class="btn btn-sm btn-icon" onclick="showEditTypeModal(${t.id}, '${esc(t.name)}', '${esc(t.icon || '')}', '${esc(t.description || '')}')" title="Edit">✎</button>
          <button class="btn btn-sm btn-icon" onclick="deleteType(${t.id})" title="Delete">✕</button>
        </td>
      </tr>
    `).join('');
  });
}

function showEditTypeModal(id, name, icon, desc) {
  openModal(`
    <h3>Edit Asset Type</h3>
    <form onsubmit="saveType(event, ${id})">
      <div class="form-group"><label>Name</label><input name="name" value="${name}" required></div>
      <div class="form-group"><label>Icon (emoji)</label><input name="icon" value="${icon}"></div>
      <div class="form-group"><label>Description</label><textarea name="description">${desc}</textarea></div>
      <div class="form-actions">
        <button type="button" class="btn btn-sm" onclick="closeModals()">Cancel</button>
        <button type="submit" class="btn btn-sm btn-primary">Save</button>
      </div>
    </form>
  `);
}

function saveType(e, id) {
  e.preventDefault();
  const fd = new FormData(e.target);
  api('/asset-types/' + id, { method: 'PUT', body: JSON.stringify(Object.fromEntries(fd)) }).then(() => {
    closeModals(); toast('Asset type updated'); loadTypes();
  }).catch(err => toast(err.message, 'error'));
}

function deleteType(id) {
  if (!confirm('Delete this asset type?')) return;
  api('/asset-types/' + id, { method: 'DELETE' }).then(() => { toast('Type deleted'); loadTypes(); }).catch(err => toast(err.message, 'error'));
}

function showAddTypeModal() {
  openModal(`
    <h3>Add Asset Type</h3>
    <form onsubmit="addType(event)">
      <div class="form-group"><label>Name *</label><input name="name" required></div>
      <div class="form-group"><label>Icon (emoji)</label><input name="icon" value="📦"></div>
      <div class="form-group"><label>Description</label><textarea name="description"></textarea></div>
      <div class="form-actions">
        <button type="button" class="btn btn-sm" onclick="closeModals()">Cancel</button>
        <button type="submit" class="btn btn-sm btn-primary">Add Type</button>
      </div>
    </form>
  `);
}

function addType(e) {
  e.preventDefault();
  const fd = new FormData(e.target);
  api('/asset-types', { method: 'POST', body: JSON.stringify(Object.fromEntries(fd)) }).then(() => {
    closeModals(); toast('Asset type added'); loadTypes(); loadStats();
  }).catch(err => toast(err.message, 'error'));
}

/* === Sources === */
function loadSources() {
  api('/sources').then(sources => {
    document.getElementById('sources-tbody').innerHTML = sources.map(s => `
      <tr>
        <td><strong>${esc(s.name)}</strong></td>
        <td>${esc(s.display_name)}</td>
        <td>${s.enabled ? '<span style="color:var(--green)">✓ Enabled</span>' : '<span style="color:var(--gray-400)">✕ Disabled</span>'}</td>
        <td>${s.asset_count || 0}</td>
        <td>
          <button class="btn btn-sm btn-icon" onclick="toggleSource(${s.id}, ${s.enabled ? 0 : 1})" title="Toggle">${s.enabled ? '⏸' : '▶'}</button>
          <button class="btn btn-sm btn-icon" onclick="deleteSource(${s.id})" title="Delete">✕</button>
        </td>
      </tr>
    `).join('');
  });
}

function toggleSource(id, enabled) {
  api('/sources/' + id, { method: 'PUT', body: JSON.stringify({ enabled }) }).then(() => { loadSources(); toast(enabled ? 'Source enabled' : 'Source disabled'); }).catch(err => toast(err.message, 'error'));
}

function deleteSource(id) {
  if (!confirm('Delete this source?')) return;
  api('/sources/' + id, { method: 'DELETE' }).then(() => { toast('Source deleted'); loadSources(); }).catch(err => toast(err.message, 'error'));
}

function showAddSourceModal() {
  openModal(`
    <h3>Add Source</h3>
    <form onsubmit="addSource(event)">
      <div class="form-group"><label>Name * (slug, e.g. "my-source")</label><input name="name" required></div>
      <div class="form-group"><label>Display Name *</label><input name="display_name" required></div>
      <div class="form-group"><label>Description</label><textarea name="description"></textarea></div>
      <div class="form-actions">
        <button type="button" class="btn btn-sm" onclick="closeModals()">Cancel</button>
        <button type="submit" class="btn btn-sm btn-primary">Add Source</button>
      </div>
    </form>
  `);
}

function addSource(e) {
  e.preventDefault();
  const fd = new FormData(e.target);
  api('/sources', { method: 'POST', body: JSON.stringify(Object.fromEntries(fd)) }).then(() => {
    closeModals(); toast('Source added'); loadSources(); loadFilterOptions();
  }).catch(err => toast(err.message, 'error'));
}

/* === Jobs === */
function loadJobs() {
  api('/jobs').then(jobs => {
    document.getElementById('jobs-tbody').innerHTML = jobs.map(j => `
      <tr>
        <td><strong>${esc(j.name)}</strong></td>
        <td><span class="source-badge-small ${j.source_name || ''}">${esc(j.source_display || j.source_name || '—')}</span></td>
        <td><code style="font-size:0.75rem;background:var(--gray-100);padding:0.125rem 0.375rem;border-radius:4px">${esc(j.schedule || 'manual')}</code></td>
        <td>${j.enabled ? '<span class="job-status completed">● Active</span>' : '<span class="job-status paused">● Paused</span>'}</td>
        <td style="color:var(--gray-500)">${timeAgo(j.last_run_at)}${j.last_status ? ` <span class="job-status ${j.last_status}">(${j.last_status})</span>` : ''}</td>
        <td>
          <button class="btn btn-sm btn-icon" onclick="triggerJob(${j.id})" title="Run now">▶</button>
          ${j.enabled ? `<button class="btn btn-sm btn-icon" onclick="pauseJob(${j.id})" title="Pause">⏸</button>` : `<button class="btn btn-sm btn-icon" onclick="resumeJob(${j.id})" title="Resume">▶</button>`}
          <button class="btn btn-sm btn-icon" onclick="showEditJobModal(${j.id})" title="Edit">✎</button>
          <button class="btn btn-sm btn-icon" onclick="deleteJob(${j.id})" title="Delete">✕</button>
        </td>
      </tr>
    `).join('');
  });
}

function triggerJob(id) {
  api('/jobs/' + id + '/trigger', { method: 'POST' }).then(() => { toast('Job triggered'); loadJobs(); }).catch(err => toast(err.message, 'error'));
}

function pauseJob(id) {
  api('/jobs/' + id + '/pause', { method: 'POST' }).then(() => { toast('Job paused'); loadJobs(); }).catch(err => toast(err.message, 'error'));
}

function resumeJob(id) {
  api('/jobs/' + id + '/resume', { method: 'POST' }).then(() => { toast('Job resumed'); loadJobs(); }).catch(err => toast(err.message, 'error'));
}

function deleteJob(id) {
  if (!confirm('Delete this job?')) return;
  api('/jobs/' + id, { method: 'DELETE' }).then(() => { toast('Job deleted'); loadJobs(); }).catch(err => toast(err.message, 'error'));
}

function showAddJobModal() {
  api('/sources').then(sources => {
    openModal(`
      <h3>Add Sync Job</h3>
      <form onsubmit="addJob(event)">
        <div class="form-group"><label>Name *</label><input name="name" required></div>
        <div class="form-group"><label>Source</label><select name="source_id">${sources.map(s => `<option value="${s.id}">${esc(s.display_name)}</option>`).join('')}</select></div>
        <div class="form-group"><label>Schedule (cron expression)</label><input name="schedule" placeholder="0 6 * * *" value="0 6 * * *"></div>
        <div class="form-actions">
          <button type="button" class="btn btn-sm" onclick="closeModals()">Cancel</button>
          <button type="submit" class="btn btn-sm btn-primary">Add Job</button>
        </div>
      </form>
    `);
  });
}

function addJob(e) {
  e.preventDefault();
  const fd = new FormData(e.target);
  const body = { name: fd.get('name'), source_id: parseInt(fd.get('source_id')), schedule: fd.get('schedule') };
  api('/jobs', { method: 'POST', body: JSON.stringify(body) }).then(() => {
    closeModals(); toast('Job added'); loadJobs();
  }).catch(err => toast(err.message, 'error'));
}

function showEditJobModal(id) {
  api('/jobs').then(jobs => {
    const j = jobs.find(x => x.id === id);
    if (!j) return;
    api('/sources').then(sources => {
      openModal(`
        <h3>Edit Job</h3>
        <form onsubmit="editJob(event, ${id})">
          <div class="form-group"><label>Name</label><input name="name" value="${esc(j.name)}"></div>
          <div class="form-group"><label>Source</label><select name="source_id">${sources.map(s => `<option value="${s.id}" ${s.id === j.source_id ? 'selected' : ''}>${esc(s.display_name)}</option>`).join('')}</select></div>
          <div class="form-group"><label>Schedule (cron)</label><input name="schedule" value="${esc(j.schedule || '')}"></div>
          <div class="form-actions">
            <button type="button" class="btn btn-sm" onclick="closeModals()">Cancel</button>
            <button type="submit" class="btn btn-sm btn-primary">Save</button>
          </div>
        </form>
      `);
    });
  });
}

function editJob(e, id) {
  e.preventDefault();
  const fd = new FormData(e.target);
  const body = { name: fd.get('name'), source_id: parseInt(fd.get('source_id')), schedule: fd.get('schedule') };
  api('/jobs/' + id, { method: 'PUT', body: JSON.stringify(body) }).then(() => {
    closeModals(); toast('Job updated'); loadJobs();
  }).catch(err => toast(err.message, 'error'));
}

/* === Business Rules === */
function loadRules() {
  api('/business-rules').then(rules => {
    document.getElementById('rules-tbody').innerHTML = rules.map(r => `
      <tr>
        <td><strong>${esc(r.name)}</strong>${r.description ? `<br><span style="color:var(--gray-500);font-size:0.75rem">${esc(r.description)}</span>` : ''}</td>
        <td><code style="font-size:0.75rem;background:var(--gray-100);padding:0.125rem 0.375rem;border-radius:4px">${esc(r.condition_type)}</code> ${esc(JSON.stringify(r.condition_config))}</td>
        <td><code style="font-size:0.75rem;background:var(--gray-100);padding:0.125rem 0.375rem;border-radius:4px">${esc(r.action_type)}</code></td>
        <td>${r.enabled ? '<span style="color:var(--green)">Enabled</span>' : '<span style="color:var(--gray-400)">Disabled</span>'}</td>
        <td>
          <button class="btn btn-sm btn-icon" onclick="toggleRule(${r.id}, ${r.enabled ? 0 : 1})" title="Toggle">${r.enabled ? '⏸' : '▶'}</button>
          <button class="btn btn-sm btn-icon" onclick="evaluateRule(${r.id})" title="Run now">⚡</button>
          <button class="btn btn-sm btn-icon" onclick="deleteRule(${r.id})" title="Delete">✕</button>
        </td>
      </tr>
    `).join('');
  });
}

function toggleRule(id, enabled) {
  api('/business-rules/' + id, { method: 'PUT', body: JSON.stringify({ enabled }) }).then(() => { loadRules(); }).catch(err => toast(err.message, 'error'));
}

function evaluateRule(id) {
  api('/business-rules/' + id + '/evaluate', { method: 'POST' }).then(r => {
    toast(`Rule evaluated: ${r.affected} assets affected`); loadRules(); loadAssets();
  }).catch(err => toast(err.message, 'error'));
}

function deleteRule(id) {
  if (!confirm('Delete this rule?')) return;
  api('/business-rules/' + id, { method: 'DELETE' }).then(() => { toast('Rule deleted'); loadRules(); }).catch(err => toast(err.message, 'error'));
}

function showAddRuleModal() {
  Promise.all([api('/asset-types'), api('/sources')]).then(([types, sources]) => {
    openModal(`
      <h3>Add Business Rule</h3>
      <form onsubmit="addRule(event)">
        <div class="form-group"><label>Name *</label><input name="name" required></div>
        <div class="form-group"><label>Description</label><textarea name="description"></textarea></div>
        <div class="form-group"><label>Scope — Asset Type (optional)</label><select name="asset_type_id"><option value="">All Types</option>${types.map(t => `<option value="${t.id}">${esc(t.name)}</option>`).join('')}</select></div>
        <div class="form-group"><label>Scope — Source (optional)</label><select name="source_id"><option value="">All Sources</option>${sources.map(s => `<option value="${s.id}">${esc(s.display_name)}</option>`).join('')}</select></div>
        <div class="form-group"><label>Condition Type</label><select name="condition_type">
          <option value="last_seen">Last Seen (older than N days)</option>
          <option value="age">Age (created more than N days ago)</option>
          <option value="status">Status equals</option>
          <option value="unassigned">Unassigned (no owner)</option>
        </select></div>
        <div class="form-group"><label>Condition Config (JSON)</label><textarea name="condition_config" rows="2">{"days": 90}</textarea></div>
        <div class="form-group"><label>Action Type</label><select name="action_type">
          <option value="update_status">Update Status</option>
          <option value="tag">Add Tag</option>
          <option value="assign_owner">Assign Owner</option>
        </select></div>
        <div class="form-group"><label>Action Config (JSON)</label><textarea name="action_config" rows="2">{"status": "inactive"}</textarea></div>
        <div class="form-actions">
          <button type="button" class="btn btn-sm" onclick="closeModals()">Cancel</button>
          <button type="submit" class="btn btn-sm btn-primary">Add Rule</button>
        </div>
      </form>
    `);
  });
}

function addRule(e) {
  e.preventDefault();
  const fd = new FormData(e.target);
  const body = {};
  fd.forEach((v, k) => {
    if (k === 'asset_type_id' || k === 'source_id') body[k] = v ? parseInt(v, 10) : null;
    else if ((k === 'condition_config' || k === 'action_config') && v) body[k] = JSON.parse(v);
    else body[k] = v || null;
  });
  api('/business-rules', { method: 'POST', body: JSON.stringify(body) }).then(() => {
    closeModals(); toast('Rule added'); loadRules();
  }).catch(err => toast(err.message, 'error'));
}

/* === Owners === */
function loadOwners() {
  api('/owners').then(owners => {
    document.getElementById('owners-tbody').innerHTML = owners.map(o => `
      <tr>
        <td><span class="owner-tag"><span class="avatar initials">${esc(o.initials || '?')}</span> <strong>${esc(o.name)}</strong></span></td>
        <td>${esc(o.email || '—')}</td>
        <td>${esc(o.department || '—')}</td>
        <td>${o.asset_count || 0}</td>
        <td>
          <button class="btn btn-sm btn-icon" onclick="showEditOwnerModal(${o.id}, '${esc(o.name)}', '${esc(o.email || '')}', '${esc(o.initials || '')}', '${esc(o.department || '')}')" title="Edit">✎</button>
          <button class="btn btn-sm btn-icon" onclick="deleteOwner(${o.id})" title="Delete">✕</button>
        </td>
      </tr>
    `).join('');
  });
}

function showEditOwnerModal(id, name, email, initials, department) {
  openModal(`
    <h3>Edit Owner</h3>
    <form onsubmit="saveOwner(event, ${id})">
      <div class="form-group"><label>Name</label><input name="name" value="${name}" required></div>
      <div class="form-group"><label>Email</label><input name="email" value="${email}"></div>
      <div class="form-group"><label>Initials</label><input name="initials" value="${initials}"></div>
      <div class="form-group"><label>Department</label><input name="department" value="${department}"></div>
      <div class="form-actions">
        <button type="button" class="btn btn-sm" onclick="closeModals()">Cancel</button>
        <button type="submit" class="btn btn-sm btn-primary">Save</button>
      </div>
    </form>
  `);
}

function saveOwner(e, id) {
  e.preventDefault();
  const fd = new FormData(e.target);
  api('/owners/' + id, { method: 'PUT', body: JSON.stringify(Object.fromEntries(fd)) }).then(() => {
    closeModals(); toast('Owner updated'); loadOwners();
  }).catch(err => toast(err.message, 'error'));
}

function deleteOwner(id) {
  if (!confirm('Delete this owner? Assets will be unassigned.')) return;
  api('/owners/' + id, { method: 'DELETE' }).then(() => { toast('Owner deleted'); loadOwners(); loadAssets(); }).catch(err => toast(err.message, 'error'));
}

function showAddOwnerModal() {
  openModal(`
    <h3>Add Owner</h3>
    <form onsubmit="addOwner(event)">
      <div class="form-group"><label>Name *</label><input name="name" required></div>
      <div class="form-group"><label>Email</label><input name="email" type="email"></div>
      <div class="form-group"><label>Initials</label><input name="initials"></div>
      <div class="form-group"><label>Department</label><input name="department"></div>
      <div class="form-actions">
        <button type="button" class="btn btn-sm" onclick="closeModals()">Cancel</button>
        <button type="submit" class="btn btn-sm btn-primary">Add Owner</button>
      </div>
    </form>
  `);
}

function addOwner(e) {
  e.preventDefault();
  const fd = new FormData(e.target);
  api('/owners', { method: 'POST', body: JSON.stringify(Object.fromEntries(fd)) }).then(() => {
    closeModals(); toast('Owner added'); loadOwners();
  }).catch(err => toast(err.message, 'error'));
}

/* === Helpers === */
function esc(s) {
  if (!s) return '';
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

function loadFilterOptions() {
  api('/sources').then(sources => {
    const sel = document.getElementById('filter-source');
    sel.innerHTML = '<option value="">All Sources</option>' + sources.map(s => `<option value="${s.name}">${esc(s.display_name)}</option>`).join('');
  });
  api('/asset-types').then(types => {
    const sel = document.getElementById('filter-type');
    sel.innerHTML = '<option value="">All Types</option>' + types.map(t => `<option value="${t.name}">${t.icon || ''} ${esc(t.name)}</option>`).join('');
  });
}

/* === Init === */
loadStats();
loadAssets();
loadFilterOptions();
