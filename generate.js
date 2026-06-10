const fs = require('fs');
const path = require('path');
let marked;

async function initMarked() {
  marked = await import('marked');
}

const DOCS_SRC = path.join(__dirname, 'content');
const DOCS_DST = path.join(__dirname, 'docs');

const sidebar = [
  { label: 'Governance', id: 'governance', pages: [
    { label: 'Overview', file: 'overview' },
    { label: 'Policies', file: 'policies' },
    { label: 'Compliance', file: 'compliance' },
    { label: 'Risk Management', file: 'risk-management' },
  ]},
  { label: 'Runbooks', id: 'runbooks', pages: [
    { label: 'Overview', file: 'overview' },
    { label: 'Server Provisioning', file: 'server-provisioning' },
    { label: 'Backup & Restore', file: 'backup-and-restore' },
    { label: 'Incident Response', file: 'incident-response' },
    { label: 'User Management', file: 'user-management' },
    { label: 'Monitoring Setup', file: 'monitoring-setup' },
  ]},
  { label: 'Processes', id: 'processes', pages: [
    { label: 'Overview', file: 'overview' },
    { label: 'Change Management', file: 'change-management' },
    { label: 'Incident Management', file: 'incident-management' },
    { label: 'Request Fulfillment', file: 'request-fulfillment' },
    { label: 'Problem Management', file: 'problem-management' },
  ]},
  { label: 'Configuration', id: 'configuration', pages: [
    { label: 'Overview', file: 'overview' },
    { label: 'Network Config', file: 'network-config' },
    { label: 'Server Config', file: 'server-config' },
    { label: 'Software Config', file: 'software-config' },
    { label: 'Security Config', file: 'security-config' },
  ]},
  { label: 'Asset Life Cycle', id: 'asset-life-cycle', pages: [
    { label: 'Overview', file: 'overview' },
    { label: 'Procurement', file: 'procurement' },
    { label: 'Deployment', file: 'deployment' },
    { label: 'Maintenance', file: 'maintenance' },
    { label: 'Disposal', file: 'disposal' },
  ]},
  { label: 'Security', id: 'security', pages: [
    { label: 'Overview', file: 'overview' },
    { label: 'Threat Management', file: 'threat-management' },
    { label: 'Access Control', file: 'access-control' },
    { label: 'Vulnerability Management', file: 'vulnerability-management' },
    { label: 'Security Awareness', file: 'security-awareness' },
  ]},
];

function renderSidebar(currentSectionId, currentPageFile) {
  let html = '';
  for (const section of sidebar) {
    html += `<div class="sidebar-section">`;
    html += `<div class="sidebar-section-title">${section.label}</div>`;
    for (const page of section.pages) {
      const href = `../${section.id}/${page.file}.html`;
      const active = section.id === currentSectionId && page.file === currentPageFile;
      html += `<a class="sidebar-item${active ? ' active' : ''}" href="${href}">${page.label}</a>`;
    }
    html += `</div>`;
  }
  return html;
}

function pageHtml(title, description, sectionId, pageFile, contentHtml) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title} — ICT Knowledge Base</title>
<meta name="description" content="${description}">
<link rel="icon" href="../../img/favicon.ico">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../../css/style.css">
</head>
<body>

<nav class="navbar">
  <div class="navbar-inner">
    <a href="../../index.html" class="navbar-brand">
      <img src="../../img/logo.svg" alt="ICT Logo" width="28" height="28">
      ICT Knowledge Base
    </a>
    <div class="navbar-links">
      <a href="../governance/overview.html">Docs</a>
      <a href="https://github.com/Blank-Look/opencode">GitHub</a>
    </div>
  </div>
</nav>

<div class="layout">
  <aside class="sidebar">
    ${renderSidebar(sectionId, pageFile)}
  </aside>
  <main class="main">
    <div class="content">
      ${contentHtml}
    </div>
  </main>
</div>

<footer class="footer">
  <p>Copyright &copy; 2026 ICT Team. Built with purpose.</p>
</footer>

</body>
</html>`;
}

function mdToHtml(markdown) {
  return marked.marked.parse(markdown, { breaks: true, gfm: true });
}

// Helper: extract frontmatter title
function parseTitle(markdown) {
  const match = markdown.match(/^---\s*\n[\s\S]*?\n---\s*\n/);
  if (match) {
    const frontmatter = match[0];
    const titleMatch = frontmatter.match(/^title:\s*(.+)$/m);
    return titleMatch ? titleMatch[1].trim() : null;
  }
  return null;
}

// Helper: strip frontmatter
function stripFrontmatter(markdown) {
  return markdown.replace(/^---\s*\n[\s\S]*?\n---\s*\n/, '');
}

// Build a map: sectionId -> { pageFile -> { title, description } }
function buildPageMeta() {
  const meta = {};
  for (const section of sidebar) {
    meta[section.id] = {};
    for (const page of section.pages) {
      const filePath = path.join(DOCS_SRC, section.id, page.file + '.md');
      let title = page.label;
      let description = '';
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        const ftitle = parseTitle(content);
        if (ftitle) title = ftitle;
        // Take first sentence as description
        const body = stripFrontmatter(content);
        const firstLine = body.split('\n').find(l => l.trim().length > 0 && !l.startsWith('#'));
        if (firstLine) description = firstLine.replace(/[#*`]/g, '').trim().slice(0, 160);
      }
      meta[section.id][page.file] = { title, description };
    }
  }
  return meta;
}

async function generate() {
  if (!marked) await initMarked();
  const pageMeta = buildPageMeta();

  for (const section of sidebar) {
    const sectionDir = path.join(DOCS_DST, section.id);
    if (!fs.existsSync(sectionDir)) fs.mkdirSync(sectionDir, { recursive: true });

    for (const page of section.pages) {
      const srcFile = path.join(DOCS_SRC, section.id, page.file + '.md');
      const dstFile = path.join(sectionDir, page.file + '.html');

      if (!fs.existsSync(srcFile)) {
        console.warn(`Warning: ${srcFile} not found, skipping`);
        continue;
      }

      const markdown = fs.readFileSync(srcFile, 'utf-8');
      const body = stripFrontmatter(markdown);
      const htmlContent = mdToHtml(body);
      const meta = pageMeta[section.id][page.file];

      const output = pageHtml(meta.title, meta.description, section.id, page.file, htmlContent);
      fs.writeFileSync(dstFile, output, 'utf-8');
      console.log(`✓ ${section.id}/${page.file}.html`);
    }
  }

  console.log('\nDone! All pages generated.');
}

generate().catch(err => { console.error(err); process.exit(1); });
