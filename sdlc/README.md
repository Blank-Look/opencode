# AI-Assisted Delivery Lifecycle

A consistent method for delivering technology initiatives with AI assistance — from capture through to operations.

**Capture → Govern → Generate → Build → Assure → Release → Operate**

## Contents

| Phase | Description |
|---|---|
| [1. Capture](docs/lifecycle/capture.html) | Structured requirement capture with problem, outcome, users, constraints |
| [2. Govern](docs/lifecycle/govern.html) | Policy, data classification, security standards and agent permissions |
| [3. Generate](docs/lifecycle/generate.html) | ChatGPT produces a controlled OpenCode delivery prompt |
| [4. Build](docs/lifecycle/build.html) | OpenCode creates code, tests, infrastructure and documentation |
| [5. Assure](docs/lifecycle/assure.html) | Progressive environments from workspace through to test |
| [6. Release](docs/lifecycle/release.html) | Azure DevOps CI/CD with approval gates |
| [7. Operate](docs/lifecycle/operate.html) | Monitoring, incident response, access reviews, improvement |
| [Stage Gates](docs/governance/stage-gates.html) | Five gates from intake to operational acceptance |
| [Project Sizing](docs/governance/project-sizing.html) | Financial and risk-based project classification |
| [Scaled Documentation](docs/governance/scaled-documentation.html) | Repository-based documentation by project size |

## Usage

Edit markdown files in `content/`, then regenerate HTML:

```bash
cd sdlc
npm install
node generate.js
```

Browse the portal at [https://blank-look.github.io/opencode/sdlc/index.html](https://blank-look.github.io/opencode/sdlc/index.html)
