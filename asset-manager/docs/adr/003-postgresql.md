# ADR-003: PostgreSQL as Single Operational Database

**Context:** Need a relational database with JSON support, good EF Core support, and managed Azure hosting.

**Decision:** Use PostgreSQL (Azure Database for PostgreSQL Flexible Server).

**Alternatives:** SQL Server (Azure SQL), Cosmos DB, SQLite.

**Consequences:**
- Single relational store simplifies data integrity
- JSONB columns for extensible metadata
- No separate document or cache store needed for MVP
- PostgreSQL Flexible Server provides automated backups, point-in-time restore
- Different query syntax from SQL Server (acceptable given EF Core abstraction)

**Risks:** Low. PostgreSQL is well-supported. The organisation may prefer SQL Server — if so, the model needs minor syntax adjustments.

**Revisiting:** If non-relational storage is needed for large documents or file storage (add Blob Storage, not replace PostgreSQL).
