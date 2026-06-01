# Architecture Overview

This is a multi-tenant payroll platform migrating from 1C:Enterprise to Next.js 16, built on React 19, TypeScript, Prisma 7, PostgreSQL, and NextAuth v5. The application preserves 1C business logic—especially period-close and payroll-sensitive workflows—while modernizing the UI and shifting toward task-focused, explicit domain modeling rather than generic CRUD.

**Core layers:** App Router (pages/layouts), Server Actions (mutations), React components (mostly Server Components), domain logic in `lib/` and `actions/`, Prisma ORM with centralized singleton, and type safety via TypeScript and Zod. The Prisma schema is the source of truth; it enforces tenant isolation, references, and enums at the database level.

**Key principles:** Correctness over convenience; preserve audit trails and history; explicit business rules (approvals, statuses, period boundaries) as first-class; never trust client data for tenant/role/permission validation. See `docs/` for deep dives on 1C mapping, business rules, and data modeling.
