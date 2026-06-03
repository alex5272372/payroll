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

## Architecture
- `app/` — pages, layouts, route handlers, React Server Components
- `actions/` — all mutations via Next.js Server Actions
- `components/` — reusable UI
- `lib/` — shared helpers and singletons
- `types/` — shared types and enums
- `data/roleMatrix.ts` — permission matrix
- `prisma/schema.prisma` — source of truth for data model
- `docs/` — business rules, 1C mapping, architecture decisions

## Server Actions
Every action file must:
1. Start with `'use server'`
2. Authenticate with `auth()`
3. Authorize with `authorize(...)` or `roleMatrix`
4. Validate input with Zod
5. Map validation errors with `MapErrorTree`
6. Use Prisma via `@/lib/prisma`
7. Return `ActionResult<T>`

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
- Prefer Server Components by default.
- Use Client Components only when needed.
- Keep business rules out of UI when possible.
- Prefer server actions for forms.

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
