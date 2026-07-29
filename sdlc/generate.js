const fs = require('fs');
const path = require('path');
let marked;

async function initMarked() {
  marked = await import('marked');
}

const DOCS_SRC = path.join(__dirname, 'content');
const DOCS_DST = path.join(__dirname, 'docs');

const sidebar = [
  { label: 'Overview', dir: 'overview', pages: [
    { label: 'Introduction', file: 'introduction' },
  ]},
  { label: 'The Lifecycle', dir: 'lifecycle', pages: [
    { label: '1. Capture', file: 'capture' },
    { label: '2. Govern', file: 'govern' },
    { label: '3. Generate', file: 'generate' },
    { label: '4. Build', file: 'build' },
    { label: '5. Assure', file: 'assure' },
    { label: '6. Release', file: 'release' },
    { label: '7. Operate', file: 'operate' },
  ]},
  { label: 'Governance', dir: 'governance', pages: [
    { label: 'Stage Gates', file: 'stage-gates' },
    { label: 'Project Sizing', file: 'project-sizing' },
    { label: 'Scaled Documentation', file: 'scaled-documentation' },
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
<title>${title} — SDLC</title>
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
      <img src="${root}img/logo.svg" alt="SDLC Logo" width="28" height="28">
      AI-Assisted Delivery Lifecycle
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
  <p>Copyright &copy; 2026 Infrastructure & Security. Built with purpose.</p>
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

async function generate() {
  if (!marked) await initMarked();
  const pageMeta = buildPageMeta();

  for (const cat of sidebar) {
    const sectionDir = path.join(DOCS_DST, cat.dir);
    if (!fs.existsSync(sectionDir)) fs.mkdirSync(sectionDir, { recursive: true });

    for (const page of cat.pages) {
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
