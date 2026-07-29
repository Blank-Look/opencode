# ICT Asset Governance Manager — Project Context

## Overview

ASP.NET Core modular monolith for ICT asset lifecycle governance. Hosted in Azure Container Apps with PostgreSQL, Entra ID auth, and read-only integrations (Freshservice, Microsoft Graph, Defender XDR).

## Commands

```bash
# From asset-manager/ directory

# Build
dotnet build

# Test
dotnet test

# Run (development)
dotnet run --project src/AssetGovernance.Web

# Database migrations
dotnet ef migrations add <name> --project src/AssetGovernance.Infrastructure --startup-project src/AssetGovernance.Web
dotnet ef database update --project src/AssetGovernance.Infrastructure --startup-project src/AssetGovernance.Web

# Seed data
dotnet run --project src/AssetGovernance.Web --seed
```

## Architecture

- **Modular monolith** — no microservices
- Server-rendered ASP.NET Core (Razor Pages or Blazor)
- EF Core + PostgreSQL
- `src/` structured: `Web`, `Application`, `Domain`, `Infrastructure`
- `tests/` structured: `UnitTests`, `IntegrationTests`, `EndToEndTests`
- `infra/` — Bicep templates
- `docs/` — architecture, data model, integrations, security, ADRs

## Key Decisions

- Role-based governance, not person-based
- Source systems remain authoritative (Freshservice, Entra, Defender)
- Deterministic risk scoring (not AI)
- Internal workflow engine (state machine)
- Read-only external integrations for MVP
- Built-in reporting before analytics platform
- Append-only audit events

## Current Phase

Phase 0 complete — architecture reviewed and approved. Ready for Phase 1 implementation.

## External Integrations

| System | Permission | MVP |
|---|---|---|
| Freshservice | Read-only API | Phase 2 |
| Microsoft Graph | Application.Read.All, Directory.Read.All, Group.Read.All, User.Read.All | Phase 3 |
| Defender XDR | Alert.Read.All, Incident.Read.All, AdvancedHunting.Read.All | Phase 4 |

## Configuration

Copy `src/AssetGovernance.Web/appsettings.Development.example.json` to `appsettings.Development.json` and fill in:

```json
{
  "AzureAd": {
    "TenantId": "",
    "ClientId": "",
    "ClientSecret": ""
  },
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=assetgovernance;Username=postgres;Password="
  }
}
```

## Database

Local development uses PostgreSQL. Run with Docker:

```bash
docker run -d --name assetgovernance-db -e POSTGRES_PASSWORD=dev -p 5432:5432 postgres:16-alpine
```
