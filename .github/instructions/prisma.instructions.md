
---
applyTo: "prisma/**/*.prisma,lib/prisma.ts,actions/**/*.ts,actions/**/*.tsx"
---

# Prisma and Database Rules
- `prisma/schema.prisma` is the source of truth for persistence design.
- Use the Prisma singleton from `@/lib/prisma`.
- Never instantiate `PrismaClient` directly in feature code.
- Preserve tenant isolation in every query and mutation.
- Prefer explicit relations, indexes, and enum usage.
- Use transactions for multi-step mutations that must succeed or fail together.
- Avoid destructive updates for finalized or audit-sensitive payroll data.
- Prefer status transitions or soft delete when history matters.
- When changing schema, keep naming aligned to domain language, not UI labels.
- For 1C-derived features:
  - catalogs map to reference entities
  - documents map to transactional aggregates
  - registers map to history, movement, or balance tables
- Flag risks around period-sensitive logic, recalculation, and hidden dependencies.
