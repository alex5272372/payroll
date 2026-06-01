
---
applyTo: "actions/**/*.ts,actions/**/*.tsx"
---

# Server Action Rules
- Every file must start with `'use server'`.
- All external input must be validated with Zod.
- Convert validation errors with `MapErrorTree` from `@/lib`.
- Return `ActionResult<T>` from every action.
- Authenticate with `auth()`.
- Authorize with `authorize(...)` or `roleMatrix`; never hardcode role checks.
- Use enums for roles, CRUD operations, and menu paths.
- Keep actions thin; move reusable business logic into `lib/` or domain modules.
- Prefer deterministic return values over thrown validation errors.
- Never trust client-provided tenant, role, or permission data.
- If a mutation affects payroll totals, statuses, or closed periods, call out the business impact explicitly.
