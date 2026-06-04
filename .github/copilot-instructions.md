# Payroll Platform – Copilot Instructions
## Project Overview
Multi-tenant payroll web application built with Next.js 16 App Router, React 19, TypeScript, Prisma 7, PostgreSQL, NextAuth v5, Tailwind CSS 4, Zod 4, and npm.

This project also migrates selected functionality from 1C:Enterprise to a modern web application.
 
## Core Rules
- Preserve business behavior from 1C, not its UI.
- Prefer explicit domain modeling over generic CRUD.
- Protect payroll, period-close, and audit-sensitive logic from simplification.
- Use existing project conventions before introducing new patterns.
- If source behavior is unclear, state assumptions instead of inventing rules.

## Architecture: Manager-Only Pattern

Colocated structure (no repository layer):
- **`app/segment/object/`** — domain colocated with routes
  - `manager.ts` — business logic, caching, Prisma queries (called by Server Components and actions)
  - `actions.ts` — mutations with auth/authorization (RPC boundary, `'use server'`)
  - `(group)/`, etc. — route groups for different views (no URL impact)
  - `create/`, `[id]/`, etc. — nested forms or workflows
- **`app/`** — pages, layouts, Server Components (call managers directly, no auth)
- **`components/`** — reusable UI
- **`lib/`** — shared helpers and singletons
- **`types/`** — shared types and enums (global + payroll-specific in domain/)
- **`data/roleMatrix.ts`** — permission matrix
- **`prisma/schema.prisma`** — source of truth for data model
- **`docs/`** — business rules, 1C mapping, architecture decisions

**Data Flow:**
- Server Component → calls `manager.ts` (direct) → Prisma
- Client Component → calls `actions.ts` (RPC) → calls `manager.ts` → Prisma
- `actions.ts` owns auth/authorization; `manager.ts` owns caching + domain logic

## Server Actions (mutations layer)
Every `actions.ts` file must:
1. Start with `'use server'` (RPC boundary)
2. Authenticate with `auth()`
3. Authorize with `authorize(...)` or `roleMatrix`
4. Validate input with Zod
5. Map validation errors with `MapErrorTree`
6. Call manager methods, NOT Prisma directly
7. Return `ActionResult<T>`

Example: `app/catalog/companies/actions.ts` → calls `manager.ts` → Prisma

## Permissions
- Always enforce permissions server-side.
- Never hardcode roles or CRUD strings.
- Use enums and `authorize(...)`.

## Validation and Types
- Validate all external input with Zod.
- Return `ActionResult<T>` from all server actions.
- Use types and enums from `types/`; avoid `any` and raw strings.

## Database
- Use the Prisma singleton from `@/lib/prisma`.
- Never instantiate `PrismaClient` directly.
- Use transactions for multi-step mutations.
- Preserve tenant isolation in every query.
- Avoid destructive updates for finalized payroll data.

## 1C Migration Rules
- Catalogs → reference/master entities
- Documents → transactional aggregates
- Registers → explicit history, balances, or movement models
- Do not copy 1C forms literally into React
- Preserve status flows, recalculations, and period-sensitive behavior
- Keep source-to-target traceability when practical

## UI Rules
- Prefer Server Components by default (call `manager.ts` directly).
- Use Client Components only when needed (call `actions.ts` via form action or `useTransition`).
- Keep business rules out of UI; move to `manager.ts`.
- Prefer server actions for mutations; use `manager.ts` for reads in Server Components.
- Use route groups `(group)` to organize views without URL structure impact.

## Review Priorities
Flag these issues aggressively:
- cross-tenant data leaks
- missing authorization
- missing Zod validation
- raw string roles/permissions
- direct `PrismaClient` usage
- silent business-rule changes
- destructive changes to closed/finalized payroll periods

## Knowledge Sources
Prefer repo knowledge in this order:
1. `docs/`
2. `README.md`
3. existing code patterns

## Skills
- **1C:Enterprise Migration:** `.github/skills/1c-migration/SKILL.md` — Comprehensive guide for mapping 1C:Enterprise concepts (catalogs, documents, registers, periods) to Next.js/Prisma patterns. Reference when migrating payroll workflows, designing state machines, or establishing historical data models.

## Output Expectations
For non-trivial changes:
- explain intent briefly
- name affected entities
- state key assumptions
- keep changes small and composable
