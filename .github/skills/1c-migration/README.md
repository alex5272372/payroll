# 1C:Enterprise Migration Skill

A specialized knowledge base for migrating functionality from 1C:Enterprise to the Next.js payroll platform.

## What's Included

**SKILL.md** contains:

### 1. **Mapping Fundamentals**

- Catalogs → Reference/Master Entities (Company, Department, Employee, etc.)
- Documents → Transactional Aggregates (EmployeeSalaryChange, PayrollCalculation)
- Registers → History and Balance Tables (append-only, immutable records)
- Periods → State Management (Open, Locked, Verified, Posted)

### 2. **Implementation Patterns**

- Server Actions structure for document workflows
- State machine enforcement (draft → approved → posted)
- Period-sensitive mutations and validation
- Authorization and tenant isolation

### 3. **Code Examples**

- Prisma schema patterns for each entity type
- Complete Server Action examples with auth/validation
- Query helpers for immutability checks
- Reversal and correction patterns

### 4. **Checklists & Patterns**

- Migration checklist for each feature
- Pattern for checking period status before mutations
- Pattern for validating catalog immutability
- Multi-tenancy and isolation practices

## How to Use

### In Chat

Ask Copilot to help with 1C migration tasks:

- *"Help me model an EmployeeSalaryChange document following 1C patterns"*
- *"How should I structure the payroll period state machine?"*
- *"Show me the pattern for immutable register entries"*
- *"What's the difference between a catalog and a document?"*

### Reference

The skill is organized by domain concept:

1. Read the relevant section in SKILL.md
2. Use the provided Prisma schema and Server Actions examples
3. Apply the patterns to your specific feature

## Key Principles

✅ **Preserve 1C business logic** — migrate behavior, not UI
✅ **Explicit state machines** — documents flow through clear transitions  
✅ **Immutable historical data** — append-only registers, no in-place edits
✅ **Authorization first** — check permissions before DB access
✅ **Tenant isolation** — filter every query by tenant
✅ **Period sensitivity** — respect open/locked/posted states

## When to Update

Add to this skill when:

- New 1C concepts need to be migrated
- Complex business rules are discovered and formalized
- New patterns or anti-patterns emerge
- Schema or Server Actions best practices evolve

## Related Resources

- **Schema:** [prisma/schema.prisma](../../prisma/schema.prisma)
- **Docs:** [docs/1c-mapping/](../../docs/1c-mapping/) and [docs/business-rules/](../../docs/business-rules/)
- **Examples:** [docs/examples/document-mapping-example.md](../../docs/examples/document-mapping-example.md)
- **Role Matrix:** [data/roleMatrix.ts](../../data/roleMatrix.ts)
- **Server Actions:** [actions/](../../actions/) directory
