# ADR-009: Read-Only External Integrations for MVP

**Context:** The application must not accidentally modify source systems during initial deployment. Least-privilege access is required.

**Decision:** All external integrations (Freshservice, Microsoft Graph, Defender) use read-only permissions for the MVP.

**Alternatives:** Read-write integrations, write-back to source systems.

**Consequences:**
- No risk of accidental data corruption in source systems
- Limited ability to update Freshservice or Entra from governance workflows (future phase)
- Clear separation: governance fields are local, source fields are synchronised
- Freshservice remains the authoritative CMDB

**Risks:** None for MVP. This is the safest approach.

**Revisiting:** After MVP validation, if the organisation wants to write governance outcomes back to source systems (e.g., update Freshservice status when an asset is retired).
