const fs = require('fs');
const path = require('path');
let marked;

async function initMarked() {
  marked = await import('marked');
}

const DOCS_SRC = path.join(__dirname, 'content');
const DOCS_DST = path.join(__dirname, 'docs');

const sidebar = [
  { label: 'COO', subsections: [
    { label: 'Policy & Governance', dir: 'coo/policy-and-governance', groups: [
      { label: null, pages: [
        { label: 'Overview', file: 'overview' },
        { label: 'IT Governance', file: 'it-governance' },
        { label: 'Data Governance', file: 'data-governance' },
        { label: 'Data Classification', file: 'data-classification' },
        { label: 'Compliance', file: 'compliance' },
        { label: 'Policies', file: 'policies' },
        { label: 'Risk Management', file: 'risk-management' },
        { label: 'Technology Roadmap', file: 'technology-roadmap' },
      ]},
    ]},
  ]},
  { label: 'Service Desk', subsections: [
    { label: 'Process & Runbooks', dir: 'service-desk/process-runbooks', groups: [
      { label: 'Incident & Request', pages: [
        { label: 'Incident Management', file: 'incident-management' },
        { label: 'Request Fulfillment', file: 'request-fulfillment' },
      ]},
      { label: 'Change & Problem', pages: [
        { label: 'Change Management', file: 'change-management' },
        { label: 'Problem Management', file: 'problem-management' },
      ]},
      { label: 'User Operations', pages: [
        { label: 'User Management', file: 'user-management' },
      ]},
    ]},
    { label: 'Config', dir: 'service-desk/config', groups: [
      { label: null, pages: [
        { label: 'Overview', file: 'overview' },
      ]},
    ]},
    { label: 'Projects', dir: 'service-desk/projects', groups: [
      { label: null, pages: [
        { label: 'Overview', file: 'overview' },
      ]},
    ]},
    { label: 'Standards', dir: 'service-desk/standards', groups: [
      { label: null, pages: [
        { label: 'Overview', file: 'overview' },
      ]},
    ]},
  ]},
  { label: 'Enterprise Apps', subsections: [
    { label: 'Process & Runbooks', dir: 'enterprise-apps/process-runbooks', groups: [
      { label: 'Governance', pages: [
        { label: 'Overview', file: 'overview' },
        { label: 'Governance Framework', file: 'governance-framework' },
      ]},
    ]},
    { label: 'Config', dir: 'enterprise-apps/config', groups: [
      { label: null, pages: [
        { label: 'Overview', file: 'overview' },
      ]},
    ]},
    { label: 'Projects', dir: 'enterprise-apps/projects', groups: [
      { label: null, pages: [
        { label: 'Overview', file: 'overview' },
      ]},
    ]},
    { label: 'Standards', dir: 'enterprise-apps/standards', groups: [
      { label: null, pages: [
        { label: 'Overview', file: 'overview' },
      ]},
    ]},
  ]},
  { label: 'Infrastructure & Security', subsections: [
    { label: 'Process & Runbooks', dir: 'infrastructure-and-security/process-runbooks', groups: [
      { label: 'Systems & Compute', pages: [
        { label: 'Server Provisioning', file: 'server-provisioning' },
      ]},
      { label: 'Data Protection', pages: [
        { label: 'Backup & Restore', file: 'backup-and-restore' },
      ]},
      { label: 'Monitoring', pages: [
        { label: 'Monitoring Setup', file: 'monitoring-setup' },
      ]},
      { label: 'Security Operations', pages: [
        { label: 'Incident Response', file: 'incident-response' },
        { label: 'Threat Management', file: 'threat-management' },
        { label: 'Vulnerability Management', file: 'vulnerability-management' },
      ]},
      { label: 'Governance & Control', pages: [
        { label: 'Sensitivity Control Model', file: 'sensitivity-control-model' },
        { label: 'Security Assessment', file: 'security-assessment' },
      ]},
    ]},
    { label: 'Config', dir: 'infrastructure-and-security/config', groups: [
      { label: 'Network', pages: [
        { label: 'Network Config', file: 'network-config' },
      ]},
      { label: 'Systems', pages: [
        { label: 'Server Config', file: 'server-config' },
      ]},
      { label: 'Software', pages: [
        { label: 'Software Config', file: 'software-config' },
      ]},
      { label: 'Security', pages: [
        { label: 'Security Config', file: 'security-config' },
      ]},
    ]},
    { label: 'Projects', dir: 'infrastructure-and-security/projects', groups: [
      { label: null, pages: [
        { label: 'Overview', file: 'overview' },
      ]},
    ]},
    { label: 'Standards', dir: 'infrastructure-and-security/standards', groups: [
      { label: 'Lifecycle Management', pages: [
        { label: 'Asset Lifecycle Policy', file: 'asset-lifecycle-policy' },
        { label: 'Procurement', file: 'procurement' },
        { label: 'Deployment', file: 'deployment' },
        { label: 'Maintenance', file: 'maintenance' },
        { label: 'Disposal', file: 'disposal' },
      ]},
      { label: 'Security Standards', pages: [
        { label: 'Access Control', file: 'access-control' },
        { label: 'Security Awareness', file: 'security-awareness' },
      ]},
    ]},
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
  const firstSub = sidebar[0].subsections[0];
  const firstGroup = firstSub.groups[0];
  const firstPage = firstGroup.pages[0];
  return relativeHref(firstSub.dir, firstSub.dir, firstPage.file);
}

function renderSidebar(currentDir, currentPageFile) {
  let html = '';
  for (const dept of sidebar) {
    html += `<div class="sidebar-section">`;
    html += `<div class="sidebar-section-title">${dept.label}</div>`;
    for (const sub of dept.subsections) {
      html += `<div class="sidebar-subsection-title">${sub.label}</div>`;
      for (const group of sub.groups) {
        if (group.label) {
          html += `<div class="sidebar-group-title">${group.label}</div>`;
        }
        for (const page of group.pages) {
          const href = relativeHref(currentDir, sub.dir, page.file);
          const active = sub.dir === currentDir && page.file === currentPageFile;
          html += `<a class="sidebar-item${active ? ' active' : ''}" href="${href}">${page.label}</a>`;
        }
      }
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
    <a href="${root}index.html" class="navbar-brand">
      <img src="${root}img/logo.svg" alt="ICT Logo" width="28" height="28">
      ICT Knowledge Base
    </a>
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
  for (const dept of sidebar) {
    for (const sub of dept.subsections) {
      meta[sub.dir] = {};
      for (const group of sub.groups) {
        for (const page of group.pages) {
          const filePath = path.join(DOCS_SRC, sub.dir, page.file + '.md');
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
          meta[sub.dir][page.file] = { title, description };
        }
      }
    }
  }
  return meta;
}

async function generate() {
  if (!marked) await initMarked();
  const pageMeta = buildPageMeta();

  for (const dept of sidebar) {
    for (const sub of dept.subsections) {
      const sectionDir = path.join(DOCS_DST, sub.dir);
      if (!fs.existsSync(sectionDir)) fs.mkdirSync(sectionDir, { recursive: true });

      for (const group of sub.groups) {
        for (const page of group.pages) {
          const srcFile = path.join(DOCS_SRC, sub.dir, page.file + '.md');
          const dstFile = path.join(sectionDir, page.file + '.html');

          if (!fs.existsSync(srcFile)) {
            console.warn(`Warning: ${srcFile} not found, skipping`);
            continue;
          }

          const markdown = fs.readFileSync(srcFile, 'utf-8');
          const body = stripFrontmatter(markdown);
          const htmlContent = mdToHtml(body);
          const meta = pageMeta[sub.dir][page.file];

          const output = pageHtml(meta.title, meta.description, sub.dir, page.file, htmlContent);
          fs.writeFileSync(dstFile, output, 'utf-8');
          console.log(`✓ ${sub.dir}/${page.file}.html`);
        }
      }
    }
  }

  console.log('\nDone! All pages generated.');
}

generate().catch(err => { console.error(err); process.exit(1); });
