# ADR-012: Built-in Reporting Before Separate Analytics Platform

**Context:** The MVP needs 15+ standard reports. Introducing Power BI or another analytics platform adds cost, deployment complexity, and dependency.

**Decision:** Build reports as server-rendered HTML pages with CSV export. No separate analytics platform for MVP.

**Alternatives:** Power BI Embedded, Microsoft Fabric, Tableau, Metabase.

**Consequences:**
- No Power BI license cost for MVP
- Reports are within the application security boundary (permissions enforced)
- CSV export satisfies data portability requirement for spreadsheet users
- Limited interactive visualisation compared to Power BI
- Reports are code-defined, not ad-hoc queryable

**Risks:** Low. Reports can be migrated to Power BI later if richer visualisation is needed.

**Revisiting:** If users require ad-hoc querying, self-service reporting, or interactive dashboards beyond what server-rendered pages can provide.
