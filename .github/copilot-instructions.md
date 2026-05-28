# Payroll Platform – Copilot Instructions

## Project Overview

Multi-tenant payroll web application. Next.js 16 App Router, React 19, TypeScript, Prisma 7 + PostgreSQL, NextAuth v5, Tailwind CSS 4, Zod 4, npm.

See [README.md](../README.md) for the full specification.

## Architecture

- `app/` — pages and API routes (React Server Components)
- `actions/` — all data mutations via Next.js Server Actions (`'use server'`)
- `components/` — reusable UI components
- `data/navigation.ts` — navigation tree; `data/roleMatrix.ts` — CRUD permission matrix
- `data/prisma/` — seed data files per entity
- `lib/` — singletons: `prisma.ts`, `auth.ts`, `authSendRequest.ts`
- `types/` — shared TypeScript types and enums
- `prisma/schema.prisma` — single source of truth for the data model

## Conventions

### Server Actions

Every action file starts with `'use server'` and follows this pattern:

1. Call `auth()` and check session + roles against `roleMatrix`
2. Validate input with a Zod schema; map errors via `MapErrorTree` from `@/lib`
3. Execute Prisma query
4. Return `ActionResult<T>` — always `{ success: boolean; errorTree?: ErrorTree; value?: T }`

```ts
'use server'
import { auth } from '@/lib/auth'
import { roleMatrix } from '@/data/roleMatrix'
import { MenuItemPath } from '@/types/enums/layout'
import { CRUD, UserRole } from '@/types/enums/roleMatrix'
import { ActionResult } from '@/types'
```

### Permissions

Always guard actions against the role matrix:

```ts
const session = await auth()
if (!session?.roles) return { success: false, errorTree: { errors: ['Unauthorized'] } }
if (!session.roles.some((role: UserRole) => !!roleMatrix[MenuItemPath.X]?.[role]?.[CRUD.READ]))
  return { success: false, errorTree: { errors: ['Forbidden'] } }
```

### Types

- Use `ActionResult<T>` for all server action return types
- Request/response models live in `types/models/` as `*Models.d.ts`
- UI types (`HeroIcon`, `ButtonState`, `ToolbarItem`, etc.) are in `types/index.d.ts`
- Enums live in `types/enums/`; import them — never use raw strings for roles, paths, or CRUD ops

### Path Aliases

Use `@/` for all internal imports. Never use relative paths that go above the project root.

### Validation

Use Zod schemas in action files. Convert Zod error trees with `MapErrorTree` from `@/lib`:

```ts
import { z } from 'zod'
import { MapErrorTree } from '@/lib'
const result = schema.safeParse(input)
if (!result.success) return { success: false, errorTree: MapErrorTree(result.error.format()) }
```

### Database

Use the Prisma client singleton from `@/lib/prisma`. Never instantiate `PrismaClient` directly.

### Roles

Four roles: `ADMINISTRATOR`, `MODERATOR`, `USER`, `UNAUTHORIZED` (from `types/enums/roleMatrix.ts`).
Check permissions via `roleMatrix[path][role][crud]` — do not hardcode role checks.

## Build & Run

```bash
npm run dev        # dev server (Turbopack)
npm run build      # production build
npm start          # production server
npm run lint       # ESLint

npx prisma migrate dev    # apply migrations
npx prisma migrate reset  # reset DB + re-seed
npx prisma db seed        # seed only
npx prisma studio         # DB GUI
```
