# Tenant Isolation

Each organization (tenant) is implicitly defined by its Company and related entities (departments, employees, users). A user's role and company affiliation—derived from UserRole and Person relationships—determine what data they can access. All Prisma queries and mutations must filter by the authenticated user's company scope to prevent cross-tenant data leaks.

Currently, tenant context is enforced via the `authorize()` function in Server Actions and middleware. User's company is resolved from the session, and all database operations must explicitly filter by that company. This is checked at the application layer; the database schema does not force this (no row-level security), so developer discipline is critical.

Future hardening: Row-Level Security (RLS) policies in PostgreSQL, or a dedicated TenantContext wrapper around Prisma queries. All new features must validate this invariant in code review: does this query filter by the authenticated user's company? Flag any feature that breaks this contract.
