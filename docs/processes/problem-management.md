---
sidebar_position: 5
---

# Problem Management

Identify and resolve the root causes of incidents to prevent recurrence.

## Problem vs Incident

| Aspect | Incident | Problem |
|---|---|---|
| Focus | Restore service | Find root cause |
| Trigger | User report or alert | Trend analysis or major incident |
| Outcome | Workaround or fix | Permanent resolution |
| Timeline | SLA-driven | Continuous improvement |

## Workflow

### 1. Problem Detection

- Analysis of recurring incidents (3+ similar incidents in 30 days)
- Major incident post-mortem
- Proactive identification from monitoring trends
- Supplier/vendor notification

### 2. Logging

- Create problem record in ticketing system
- Link related incidents
- Assign priority based on business impact

### 3. Root Cause Analysis

| Method | When to Use |
|---|---|
| 5 Whys | Simple or moderate problems |
| Fishbone / Ishikawa | Complex problems with multiple causes |
| Kepner-Tregoe | High-impact, time-sensitive problems |
| Timeline analysis | Problems with temporal patterns |

### 4. Known Error

- Document the root cause
- Identify workaround if permanent fix is delayed
- Publish to the knowledge base
- Link to related incidents

### 5. Resolution

- Implement permanent fix via Change Management
- Verify fix in test environment first
- Deploy to production per change process
- Monitor for recurrence

## Problem Prioritisation

| Priority | Business Impact | Number of Incidents | Response |
|---|---|---|---|
| P1 | Critical | 10+ in 30 days | Immediate RCA |
| P2 | High | 5-9 in 30 days | RCA within 5 days |
| P3 | Medium | 3-4 in 30 days | RCA within 10 days |
| P4 | Low | < 3 in 30 days | Log and monitor |
