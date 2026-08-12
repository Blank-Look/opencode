# Security Standards (Knowledge Base category)

An anonymised, institution-branded "Minimum Security Standards" portal — endpoints, servers, applications, SaaS/PaaS, IaaS, IoT, definitions, cookbooks, and FAQ. Part of the ICT Knowledge Base governance documentation.

> **Portal:** [Minimum Security Standards](../docs/security-standards/index.html)

## Workflow — hand-authored static category

Unlike the markdown categories under `content/`, this category is **hand-authored HTML** (styled risk tables, check cells, and risk-tier cards that markdown tables can't express). `generate.js` copies this directory verbatim into `docs/security-standards/` and adds a *Security Standards* section to the sidebar of every Knowledge Base page.

- Edit pages in this directory, then run `node knowledgebase/generate.js`
- `docs/security-standards/` is git-tracked (generated output, committed alongside source)
- Keep the shared sidebar/nav consistent across all six pages

## Pages

| Page | Description |
|---|---|
| [index.html](index.html) | Minimum Security Standards — Endpoints, Servers, Applications tables, Definitions, Contact |
| [saas-paas.html](saas-paas.html) | SaaS and PaaS standards |
| [iaas.html](iaas.html) | IaaS and containerized solutions standards |
| [iot.html](iot.html) | Internet of Things (IoT) device standards |
| [cookbooks.html](cookbooks.html) | Step-by-step adoption guides for Windows and Linux servers |
| [faq.html](faq.html) | Frequently asked questions |

## Anonymisation

All content is fictional demonstration material:

- No real organisation names — replaced with "the Institution" / "ICT"
- No real product or service names — generic terms such as "approved endpoint management agent", "centralized logging service", "approved vulnerability scanning service"
- No real links or identifiers

## Look & Feel

- Maroon accent (`--maroon: #7A1B2C`), Inter font, SchoolCode nav bar
- Left sidebar (Standards / Related Guides / Contact) shared across the six pages
- Risk-column headers color-coded green (Low), amber (Moderate), red (High); check-circle cells for required standards
- `css/style.css` is self-contained within the category
