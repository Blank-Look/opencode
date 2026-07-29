---
sidebar_position: 2
---

# Sensitivity-Based Control Model

The Sensitivity-Based Control Model ensures that applications and services are governed proportionally to their risk. It defines routing, ownership, and enforcement based on sensitivity classification.

## Ticket Routing by Sensitivity

| Sensitivity | Routing Model |
|---|---|
| **Low** | Service Desk → Apps (if needed) |
| **Medium** | Service Desk → Apps (primary owner) → Infra/Security (as required) |
| **High** | Service Desk → Apps → Infra + Security (mandatory governance path) |

## Ownership Model

| Sensitivity | Ownership Requirement |
|---|---|
| **Low** | Lightweight ownership |
| **Medium** | Ownership must be defined before onboarding |
| **High** | No ownership = hard stop |

## Enforcement Gates

| Stage | Enforcement |
|---|---|
| Pre-Onboarding | No sensitivity classification = no onboarding |
| Onboarding | No owner assigned = stop |
| Medium/High | No SSO or RBAC = stop |
| High | No security/privacy sign-off = stop |
| Retirement | No data decision = stop |

## Team Involvement

| Team | Primary Involvement by Sensitivity |
|---|---|
| Service Desk | Low (primary), Medium (support), High (triage only) |
| Applications | Low (oversight), Medium (primary), High (co-owner) |
| Infrastructure | Medium (support), High (core) |
| Security | Medium (consulted), High (mandatory control authority) |

## Classification Decision Tree

A simple model to determine sensitivity at intake:

- Does it store personal data? → **High**
- Does it integrate with core systems? → **Medium/High**
- Is it standalone + low risk? → **Low**
