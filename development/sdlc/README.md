# AI-Assisted Delivery Lifecycle

A consistent method for delivering technology initiatives with AI assistance — from capture through to operations.

> **Product landing pages:** [AI-Assisted Delivery Lifecycle](https://blank-look.github.io/opencode/development/sdlc/) · [Stage Gates](docs/governance/stage-gates.html) · [Project Sizing](docs/governance/project-sizing.html) · [Scaled Documentation](docs/governance/scaled-documentation.html)

## Design Mockup

N/A — this is a methodology and governance framework, not an application. See the [stage gates](docs/governance/stage-gates.html) and [lifecycle phases](docs/lifecycle/) for the canonical reference.

## Architecture

The lifecycle governs all technology initiatives through 7 phases: **Capture → Govern → Generate → Build → Assure → Release → Operate**. Each phase has defined inputs, outputs, and stage gates. Project sizing determines the level of rigour applied.

```
Capture → Govern → Generate → Build → Assure → Release → Operate
    │          │          │        │        │         │         │
    ▼          ▼          ▼        ▼        ▼         ▼         ▼
 Intake    Policy     Prompt     Code     Test +    Deploy    Monitor +
          alignment           generation  security            respond
```

## Documentation

| Doc | Description |
|---|---|
| [Capture](docs/lifecycle/capture.html) | Structured requirement capture with problem, outcome, users, constraints |
| [Govern](docs/lifecycle/govern.html) | Policy, data classification, security standards and agent permissions |
| [Generate](docs/lifecycle/generate.html) | ChatGPT produces a controlled OpenCode delivery prompt |
| [Build](docs/lifecycle/build.html) | OpenCode creates code, tests, infrastructure and documentation |
| [Assure](docs/lifecycle/assure.html) | Progressive environments from workspace through to test |
| [Release](docs/lifecycle/release.html) | Azure DevOps CI/CD with approval gates |
| [Operate](docs/lifecycle/operate.html) | Monitoring, incident response, access reviews, improvement |
| [Stage Gates](docs/governance/stage-gates.html) | Five gates from intake to operational acceptance |
| [Project Sizing](docs/governance/project-sizing.html) | Financial and risk-based project classification |
| [Scaled Documentation](docs/governance/scaled-documentation.html) | Repository-based documentation by project size |

### Usage

Edit markdown files in `content/`, then regenerate HTML:

```bash
cd sdlc
npm install
node generate.js
```

Browse the portal at [https://blank-look.github.io/opencode/development/sdlc/index.html](https://blank-look.github.io/opencode/development/sdlc/index.html)

## Status

**Active** — methodology established and applied across all projects.
