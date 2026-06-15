# Payroll Platform - Copilot Instructions

## Scope
These instructions govern code generation and code review for this repository.

## Stack Snapshot (2026-06)
- Next.js 16 App Router
- React 19
- TypeScript
- Prisma 7 + PostgreSQL
- NextAuth v5
- Tailwind CSS 4
- Zod 4
- npm

The product is a multi-tenant payroll platform and includes migration of selected logic from 1C:Enterprise.

## Non-Negotiables
- Preserve business behavior from 1C, not 1C UI forms.
- Prioritize payroll correctness, period integrity, and auditability over convenience.
- Do not simplify lifecycle-driven workflows into generic CRUD.
- Do not invent unclear business rules; state assumptions explicitly.
- Keep changes small, composable, and traceable to domain intent.

## Source of Truth Order
Use repository knowledge in this order:
1. `docs/`
2. `README.md`
3. Existing implementation patterns

## Architecture Contract (Three-Layer Pattern)
Colocation under `app/segment/object/`:
- `repository.ts`: Prisma queries, data transformation, no business logic
- `manager.ts`: domain logic, caching with `'use cache'` + `cacheLife()`, calls repository methods
- `actions.ts`: mutation RPC boundary (`'use server'`), authn/authz, input validation, calls manager methods
- route groups and nested routes for UX workflows only

Data flow contract:
- Server Components call `manager.ts` directly for reads (cached).
- Client Components call `actions.ts` for writes.
- `actions.ts` calls `manager.ts`, which calls `repository.ts`.
- `repository.ts` is the only layer with direct Prisma access.
- Never call `repository.ts` or Prisma directly from `actions.ts` or Server Components.

## Mandatory Rules for `actions.ts`
Every server action must:
1. Start with `'use server'`
2. Authenticate via `auth()`
3. Authorize via `authorize(...)` or `roleMatrix`
4. Validate all external input with Zod
5. Map validation failures via `MapErrorTree`
6. Call manager methods only (no direct repository or Prisma access)
7. Return `ActionResult<T>`

## Mandatory Rules for `manager.ts`
Every manager function must:
1. Call `repository.ts` methods for Prisma access (never direct Prisma calls).
2. Use `'use cache'` + `cacheLife('minutes')` for read operations.
3. Contain business logic and domain transformations.
4. Be callable from Server Components and `actions.ts`.

## Mandatory Rules for `repository.ts`
Every repository function must:
1. Contain only Prisma queries and data transformation.
2. Accept domain parameters (no framework-specific cache directives).
3. Return transformed/mapped data, not raw Prisma results.
4. Never contain business logic or authorization checks.
5. Be the only layer with direct `PrismaClient` access.

## Data and Tenant Safety
- All Prisma access must flow through `repository.ts`.
- Always use the Prisma singleton from `@/lib/prisma` (repository-only).
- Never instantiate `PrismaClient` directly outside `repository.ts`.
- Enforce tenant isolation in every repository query and mutation.
- Use explicit transactions for multi-step mutations in `repository.ts`.
- Avoid destructive updates for finalized or closed payroll periods.
- Use `'use cache'` in `manager.ts` for read performance, not in `repository.ts`.

## Domain Modeling and 1C Migration
- Catalogs -> reference/master entities.
- Documents -> transactional aggregates and status flows.
- Registers -> explicit history/balance/movement models.
- Preserve recalculation and period boundary behavior.
- Maintain source-to-target traceability when practical.

## UI and Routing
- Prefer Server Components unless interactivity requires a Client Component.
- Keep business rules out of UI; place them in `manager.ts`.
- Use route groups to structure views without changing URL semantics.

## Review Priorities (Blockers)
Treat the following as high-severity defects:
- Cross-tenant data leakage
- Missing authorization in `actions.ts`
- Missing Zod validation for external inputs
- Hardcoded role or permission strings
- Direct Prisma access outside `repository.ts`
- Calling `repository.ts` or Prisma from `actions.ts` (must call `manager.ts`)
- Calling `repository.ts` or Prisma directly from Server Components (must call `manager.ts`)
- Missing business logic in `manager.ts` or `repository.ts`
- Silent changes to payroll invariants
- Mutations affecting closed/finalized periods without explicit rules

## Working Expectations for Non-Trivial Changes
When generating substantial updates:
- Briefly state intent
- List affected entities/modules
- Call out assumptions and invariants
- Note side effects and migration impact
- Keep diffs focused and reviewable

## Related Local Instruction Files
- `.github/instructions/next.instructions.md` (Next.js patterns)
- `.github/instructions/payroll-domain.instructions.md` (domain rules for `manager.ts`)
- `.github/instructions/prisma.instructions.md` (Prisma rules for `repository.ts`)

Apply relevant rule files based on edited path patterns.
