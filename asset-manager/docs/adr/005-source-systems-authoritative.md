# ADR-005: Source Systems Remain Authoritative

**Context:** Freshservice, Entra ID, and Defender are existing systems of record. The governance application should not create duplicate master records.

**Decision:** Treat source systems as authoritative for their fields. The governance application stores local governance fields (ownership, classification, risk, workflow) separately from synchronised source fields.

**Alternatives:** Two-way sync, governance app as sole source of truth.

**Consequences:**
- Clear separation: source fields vs. local governance fields
- Source provenance displayed on every synchronised field
- Cannot write back to source systems (MVP)
- Reconciliation needed when source records change or disappear
- ExternalSourceRecord table tracks all source-to-local mappings

**Risks:** Low. Aligns with least-privilege principle and avoids accidental data corruption.

**Revisiting:** If the organisation decides to deprecate Freshservice and use this application as the CMDB.
