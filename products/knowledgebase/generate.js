const fs = require('fs');
const path = require('path');
let marked;

async function initMarked() {
  marked = await import('marked');
}

const DOCS_SRC = path.join(__dirname, 'content');
const DOCS_DST = path.join(__dirname, 'docs');

// Hand-authored HTML category (Security Standards) copied verbatim into docs/.
const STATIC_DIR = 'security-standards';
const STATIC_SRC = path.join(__dirname, STATIC_DIR);
const STATIC_DST = path.join(__dirname, 'docs', STATIC_DIR);

const sidebar = [
  { label: 'Policy & Governance', dir: 'policy-and-governance', pages: [
    { label: 'Overview', file: 'overview' },
    { label: 'Compliance', file: 'compliance' },
    { label: 'Data Classification', file: 'data-classification' },
    { label: 'Data Governance', file: 'data-governance' },
    { label: 'Innovation Governance', file: 'innovation-governance' },
    { label: 'IT Governance', file: 'it-governance' },
    { label: 'Policies', file: 'policies' },
    { label: 'Risk Management', file: 'risk-management' },
    { label: 'Technology Roadmap', file: 'technology-roadmap' },
  ]},
  { label: 'Security Standards', dir: 'security-standards', pages: [
    { label: 'Minimum Security Standards', file: 'index' },
    { label: 'SaaS & PaaS', file: 'saas-paas' },
    { label: 'IaaS & Containers', file: 'iaas' },
    { label: 'IoT Devices', file: 'iot' },
    { label: 'Cookbooks', file: 'cookbooks' },
    { label: 'FAQ', file: 'faq' },
  ]},
  { label: 'Service Operations', dir: 'service-operations', pages: [
    { label: 'Overview', file: 'overview' },
    { label: 'Change Management', file: 'change-management' },
    { label: 'Incident Management', file: 'incident-management' },
    { label: 'Problem Management', file: 'problem-management' },
    { label: 'Request Fulfillment', file: 'request-fulfillment' },
    { label: 'User Management', file: 'user-management' },
  ]},
  { label: 'Enterprise Applications', dir: 'enterprise-applications', pages: [
    { label: 'Overview', file: 'overview' },
    { label: 'Governance Framework', file: 'governance-framework' },
    { label: 'Engineering Delivery Model', file: 'engineering-delivery-model' },
  ]},
  { label: 'Systems & Infrastructure', dir: 'systems-and-infrastructure', pages: [
    { label: 'Overview', file: 'overview' },
    { label: 'Network Config', file: 'network-config' },
    { label: 'Security Config', file: 'security-config' },
    { label: 'Server Config', file: 'server-config' },
    { label: 'Server Provisioning', file: 'server-provisioning' },
    { label: 'Software Config', file: 'software-config' },
  ]},
  { label: 'Data & Protection', dir: 'data-and-protection', pages: [
    { label: 'Overview', file: 'overview' },
    { label: 'Access Control', file: 'access-control' },
    { label: 'Asset Lifecycle Policy', file: 'asset-lifecycle-policy' },
    { label: 'Backup & Restore', file: 'backup-and-restore' },
    { label: 'Deployment', file: 'deployment' },
    { label: 'Disposal', file: 'disposal' },
    { label: 'Maintenance', file: 'maintenance' },
    { label: 'Monitoring Setup', file: 'monitoring-setup' },
    { label: 'Procurement', file: 'procurement' },
    { label: 'Security Awareness', file: 'security-awareness' },
  ]},
  { label: 'Security', dir: 'security', pages: [
    { label: 'Overview', file: 'overview' },
    { label: 'Incident Response', file: 'incident-response' },
    { label: 'Security Assessment', file: 'security-assessment' },
    { label: 'Sensitivity Control Model', file: 'sensitivity-control-model' },
    { label: 'Threat Management', file: 'threat-management' },
    { label: 'Vulnerability Management', file: 'vulnerability-management' },
  ]},
];

function depth(dir) {
  return dir.split('/').length;
}

function relativeHref(fromDir, toDir, toFile) {
  return '../'.repeat(depth(fromDir)) + toDir + '/' + toFile + '.html';
}

function upToRoot(dir) {
  return '../'.repeat(depth(dir) + 1);
}

function getFirstDocHref() {
  const first = sidebar[0];
  return relativeHref(first.dir, first.dir, first.pages[0].file);
}

function renderSidebar(currentDir, currentPageFile) {
  let html = '';
  for (const cat of sidebar) {
    html += `<div class="sidebar-section">`;
    html += `<div class="sidebar-section-title">${cat.label}</div>`;
    for (const page of cat.pages) {
      const href = relativeHref(currentDir, cat.dir, page.file);
      const active = cat.dir === currentDir && page.file === currentPageFile;
      html += `<a class="sidebar-item${active ? ' active' : ''}" href="${href}">${page.label}</a>`;
    }
    html += `</div>`;
  }
  return html;
}

function pageHtml(title, description, sectionDir, pageFile, contentHtml) {
  const root = upToRoot(sectionDir);
  const docsHref = getFirstDocHref();
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title} — ICT Knowledge Base</title>
<meta name="description" content="${description}">
<link rel="icon" href="${root}img/favicon.ico">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${root}css/style.css">
</head>
<body>

<nav class="navbar">
  <div class="navbar-inner">
    <div class="navbar-left">
      <a href="${root}../../index.html" class="navbar-schoolcode">SchoolCode</a>
      <a href="${root}index.html" class="navbar-brand">
        <img src="${root}img/logo.svg" alt="ICT Logo" width="28" height="28">
        ICT Knowledge Base
      </a>
    </div>
    <div class="navbar-links">
      <a href="${docsHref}">Docs</a>
      <a href="https://github.com/Blank-Look/opencode">GitHub</a>
    </div>
  </div>
</nav>

<div class="layout">
  <aside class="sidebar">
    ${renderSidebar(sectionDir, pageFile)}
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

function parseTitle(markdown) {
  const match = markdown.match(/^---\s*\n[\s\S]*?\n---\s*\n/);
  if (match) {
    const frontmatter = match[0];
    const titleMatch = frontmatter.match(/^title:\s*(.+)$/m);
    return titleMatch ? titleMatch[1].trim() : null;
  }
  return null;
}

function stripFrontmatter(markdown) {
  return markdown.replace(/^---\s*\n[\s\S]*?\n---\s*\n/, '');
}

function buildPageMeta() {
  const meta = {};
  for (const cat of sidebar) {
    meta[cat.dir] = {};
    for (const page of cat.pages) {
      const filePath = path.join(DOCS_SRC, cat.dir, page.file + '.md');
      let title = page.label;
      let description = '';
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        const ftitle = parseTitle(content);
        if (ftitle) title = ftitle;
        const body = stripFrontmatter(content);
        const firstLine = body.split('\n').find(l => l.trim().length > 0 && !l.startsWith('#'));
        if (firstLine) description = firstLine.replace(/[#*`]/g, '').trim().slice(0, 160);
      }
      meta[cat.dir][page.file] = { title, description };
    }
  }
  return meta;
}

function copyStatic() {
  if (!fs.existsSync(STATIC_DST)) fs.mkdirSync(STATIC_DST, { recursive: true });
  for (const file of fs.readdirSync(STATIC_SRC)) {
    if (file.endsWith('.html')) {
      fs.copyFileSync(path.join(STATIC_SRC, file), path.join(STATIC_DST, file));
      console.log(`✓ ${STATIC_DIR}/${file} (static)`);
    }
  }
  const cssSrc = path.join(STATIC_SRC, 'css');
  if (fs.existsSync(cssSrc)) {
    const cssDst = path.join(STATIC_DST, 'css');
    if (!fs.existsSync(cssDst)) fs.mkdirSync(cssDst, { recursive: true });
    for (const file of fs.readdirSync(cssSrc)) {
      fs.copyFileSync(path.join(cssSrc, file), path.join(cssDst, file));
    }
  }
}

async function generate() {
  if (!marked) await initMarked();
  const pageMeta = buildPageMeta();
  copyStatic();

  for (const cat of sidebar) {
    const sectionDir = path.join(DOCS_DST, cat.dir);
    if (!fs.existsSync(sectionDir)) fs.mkdirSync(sectionDir, { recursive: true });

    for (const page of cat.pages) {
      if (cat.dir === STATIC_DIR) continue;
      const srcFile = path.join(DOCS_SRC, cat.dir, page.file + '.md');
      const dstFile = path.join(sectionDir, page.file + '.html');

      if (!fs.existsSync(srcFile)) {
        console.warn(`Warning: ${srcFile} not found, skipping`);
        continue;
      }

      const markdown = fs.readFileSync(srcFile, 'utf-8');
      const body = stripFrontmatter(markdown);
      const htmlContent = mdToHtml(body);
      const meta = pageMeta[cat.dir][page.file];

      const output = pageHtml(meta.title, meta.description, cat.dir, page.file, htmlContent);
      fs.writeFileSync(dstFile, output, 'utf-8');
      console.log(`✓ ${cat.dir}/${page.file}.html`);
    }
  }

  console.log('\nDone! All pages generated.');
}

generate().catch(err => { console.error(err); process.exit(1); });
