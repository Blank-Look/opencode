# Invoice Intake

Automated accounts payable — from supplier email to finance-ready queue. Powered by Power Automate, AI Builder extraction, and SharePoint.

> **Product landing pages:** [Invoice Intake](https://blank-look.github.io/opencode/products/invoice-intake/) · [App Mockup](https://blank-look.github.io/opencode/products/invoice-intake/app-mockup.html)

## Design Mockup

[App Mockup →](https://blank-look.github.io/opencode/products/invoice-intake/app-mockup.html)
Interactive HTML mockup covering invoice queue, processing dashboard, supplier view, approval workflow, and reporting.

## Architecture

[Architecture docs →](https://github.com/Blank-Look/opencode/tree/master/products/invoice-intake) *(in progress)*
Supplier email → Shared Mailbox → Power Automate → AI Builder extraction → SharePoint queue → approval workflow → finance system.

## Documentation

| Doc | Description |
|---|---|
| [Product Requirements](docs/product-requirements.md) | Functional and non-functional requirements, user personas, MVP scope |
| [Architecture](docs/architecture.md) | Component architecture, flow diagram, integration points |
| [Detection Methods](index.html#detection-methods) | Simple, Recommended, and Enterprise AP automation approaches |
| [Security Controls](index.html#security-controls) | Supplier allow list, malware scan, duplicate detection, fraud controls |

### Architecture Decision Records

| ADR | Decision |
|---|---|
| [001](docs/adr/001-shared-mailbox-ingest.md) | Shared mailbox over direct supplier portal for invoice capture |
| [002](docs/adr/002-ai-builder-extraction.md) | AI Builder over custom ML for document extraction |
| [003](docs/adr/003-sharepoint-queue.md) | SharePoint List over Dataverse for MVP queue storage |
| [004](docs/adr/004-approval-workflow.md) | Power Automate approval over custom workflow engine |

## Status

**Phase 0: Discovery** — in progress. Architecture and requirements being defined.
