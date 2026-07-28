# ICT Knowledge Base

A static documentation portal for a small ICT team covering governance, runbooks, processes, configuration, and asset life cycle management.

Built with markdown + a simple Node.js generator.

## Structure

```
content/       ← Markdown source files (edit these)
docs/          ← Generated HTML pages
css/style.css  ← Shared stylesheet
generate.js    ← Markdown → HTML generator
index.html     ← Homepage
```

## Edit Content

Edit the `.md` files in `content/`, then regenerate:

```bash
node generate.js
```

## Deploy

The site is pure HTML/CSS — just push to GitHub. Configure GitHub Pages to serve from the `knowledgebase/` directory (or browse it directly at the path below).

**Live**: https://blank-look.github.io/opencode/knowledgebase/
