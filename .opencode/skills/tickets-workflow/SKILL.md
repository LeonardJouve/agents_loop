---
name: tickets-workflow
description: Use ONLY when the user asks about the ticket lifecycle, how tickets move between board columns, what each agent does, or how to bootstrap a new feature from idea to shipped code. Describes the full workflow from initialisation through review.
---

# Tickets Workflow

This document describes the complete ticket lifecycle from raw idea to merged code. Each stage is handled by a specific agent or skill.

## Overview

```
User Idea
    |
    v
/init agent (grilling → to-spec → to-tickets)
    |
    v
Tickets created in tracker, moved to `toplan`
    |
    v
/plan command → planner agent
    |
    v
Tickets moved to `planned` with structured JSON plans
    |
    v
/dev command → developer agent
    |
    v
Tickets moved to `todev` and implemented
    |
    v
PRs opened, tickets moved to `toreview`
    |
    v
/review command → reviewer agent
    |
    v
PRs reviewed, approved or changes requested
    |
    v
Merged / shipped
```

## Stage-by-stage

### 1. Initialisation (`/init`)
**Agent:** `init`  
**Skills:** `grilling`, `to-spec`, `to-tickets`

Turns a raw idea into a fully planned set of tickets:
- **Grilling** — stress-test the idea, surface all decisions and assumptions.
- **To Spec** — synthesise the grilled output into a formal spec with problem statement, user stories, implementation decisions, testing decisions, and scope boundaries.
- **To Tickets** — break the spec into vertical-slice tracer-bullet tickets with blocking edges, publish to the tracker.

### 2. Planning (`/plan`)
**Agent:** `planner`  
**Skills:** `codebase-design`

Picks up tickets in `toplan` and writes structured JSON implementation plans:
- `detailed_changes`: step-by-step implementation steps.
- `expected_result`: final outcome description.
- `modifications_needed`: docs, tests, CI, etc.

The planner uses `codebase-design` vocabulary (module, interface, depth, seam, adapter, leverage, locality) when reasoning about dependencies and affected code.

### 3. Development (`/dev`)
**Agent:** `developer`  
**Skills:** `codebase-design`, `tdd`, `implement`

Picks up tickets in `todev` and implements them:
- Follows the planner's structured plan precisely.
- Uses `codebase-design` vocabulary to keep modules deep and seams clean.
- Uses `tdd` at pre-agreed seams (red → green loop, vertical slices).
- Uses `implement` as the overall implementation reference.
- Opens PRs, moves cards to `toreview`, links PRs in issue comments.

### 4. Review (`/review`)
**Agent:** `reviewer`  
**Skills:** `codebase-design`, `code-review`

Picks up PRs in `toreview` and reviews them:
- Uses `codebase-design` vocabulary to assess module depth, seam cleanliness, and testability.
- Uses `code-review` for the two-axis review (Standards vs Spec).
- Posts structured reviews: Summary, Issues Found, Suggestions, Approval Status.
- Does not merge; merging is handled after review.

## Board Columns

| Column      | Meaning                                           | Agent   |
|-------------|---------------------------------------------------|---------|
| `toplan`    | Ticket needs a structured implementation plan     | planner |
| `planned`   | Ticket has a plan, ready for implementation       | —       |
| `todev`     | Ticket is being implemented                       | developer |
| `toreview`  | PR is ready for code review                         | reviewer |

## Guardrails
- No stage is skipped. Initialisation must happen before planning; planning before development.
- If a plan is unclear, the developer asks for clarification rather than guessing.
- If implementation reveals the plan needs adjustment, the developer comments on the issue with proposed changes.
- The reviewer does not modify code directly and does not approve PRs with critical security or correctness issues.
