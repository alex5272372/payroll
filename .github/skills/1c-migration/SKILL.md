
---
description: >
  Specialized knowledge for migrating 1C:Enterprise functionality to the Next.js payroll platform.
  Covers domain modeling, document workflows, register patterns, period management, and preservation
  of business logic from legacy systems.
tags:
  - 1c-enterprise
  - migration
  - domain-modeling
  - payroll
  - data-mapping
---

# 1C:Enterprise Migration Skill

## Purpose
This skill provides expert guidance for translating 1C:Enterprise configurations, business workflows, and data structures into modern Next.js/React/Prisma patterns while preserving payroll business logic and audit requirements.

Use this skill when:
- Migrating functionality from 1C to the payroll platform
- Modeling complex payroll workflows (salary changes, period close, posting)
- Designing history/balance tables and audit trails
- Choosing between CRUD vs. document workflows
- Ensuring data immutability and tenant isolation in multi-tenant contexts

---

## Knowledge Base: 1C → Web App Mapping

### 1. Catalogs → Reference/Master Entities

**1C Pattern:** Catalogs are master data (Company, Department, Country, Employee, Person). They are created, read, updated, but not heavily transactional. They are the backbone of reference dimensions.

**Web App Pattern:** Map catalogs one-to-one to Prisma models. They are typically managed via straightforward CRUD server actions with role-based guards.

**Key Rules:**
- Validate immutability constraints: once an employee appears in closed payroll periods, their Person cannot be deleted.
- Similarly, a Country or Department in finalized periods cannot be removed without explicit reversal logic.
- Use `onDelete: NoAction` in Prisma for foreign keys that reference historically-sensitive catalogs.
- Historical tracking (audit log: who changed what, when) is not yet implemented but is required for compliance.

**Example:**
```prisma
model Employee {
  id              String    @id @default(cuid())
  personId        String
  person          Person    @relation(fields: [personId], references: [id], onDelete: NoAction)
  companyId       String
  company         Company   @relation(fields: [companyId], references: [id], onDelete: NoAction)
  departmentId    String
  department      Department @relation(fields: [departmentId], references: [id], onDelete: NoAction)
  countryId       String
  country         Country   @relation(fields: [countryId], references: [id], onDelete: NoAction)
  salaryHistory   EmployeeSalaryMovement[]
  
  @@index([personId])
  @@index([companyId])
}
```

---

### 2. Documents → Transactional Aggregates

**1C Pattern:** Documents are workflows that encapsulate multiple related changes. They have explicit status (draft → approved → posted) and produce immutable records in registers upon posting. Examples: EmployeeSalaryChange, PayrollCalculation, PayslipBatch.

**Web App Pattern:** Model documents as Prisma models with explicit state transitions via Server Actions. Each transition (draft → approved, approved → posted) is a separate action with authorization, validation, and side effects.

**Key Rules:**
- Documents are NOT simple CRUD; they carry business logic, approval workflows, and downstream side effects.
- Status fields must enforce state machines: only allowed transitions are (draft → approved) and (approved → posted).
- Once posted, a document is immutable; corrections require a separate reversal document.
- Each state transition is a distinct Server Action with its own authorization and validation.

**Example: EmployeeSalaryChange Workflow**

```prisma
model EmployeeSalaryChange {
  id              String      @id @default(cuid())
  employeeId      String
  employee        Employee    @relation(fields: [employeeId], references: [id])
  oldSalary       Decimal     @db.Numeric(19,4)
  newSalary       Decimal     @db.Numeric(19,4)
  effectiveDate   DateTime    @db.Date
  reason          String
  status          String      @default("DRAFT") // DRAFT, APPROVED, POSTED
  approvedBy      String?
  approvedAt      DateTime?
  postedAt        DateTime?
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
  
  @@index([employeeId])
  @@index([status])
}
```

**Server Actions Pattern:**
```typescript
// 1. Create (DRAFT state)
export async function createEmployeeSalaryChange(input: CreateSalaryChangeInput): Promise<ActionResult<EmployeeSalaryChange>> {
  const auth = await auth();
  await authorize("payroll.salary.create");
  
  const validated = salaryChangeSchema.parse(input);
  const result = await prisma.employeeSalaryChange.create({
    data: {
      employeeId: validated.employeeId,
      oldSalary: validated.oldSalary,
      newSalary: validated.newSalary,
      effectiveDate: validated.effectiveDate,
      reason: validated.reason,
      status: "DRAFT"
    }
  });
  return { success: true, data: result };
}

// 2. Approve (DRAFT → APPROVED)
export async function approveEmployeeSalaryChange(id: string): Promise<ActionResult<EmployeeSalaryChange>> {
  const auth = await auth();
  await authorize("payroll.salary.approve"); // Typically Moderator
  
  const doc = await prisma.employeeSalaryChange.findUnique({ where: { id } });
  if (doc?.status !== "DRAFT") throw new Error("Can only approve DRAFT documents");
  
  const result = await prisma.employeeSalaryChange.update({
    where: { id },
    data: {
      status: "APPROVED",
      approvedBy: auth.user.id,
      approvedAt: new Date()
    }
  });
  return { success: true, data: result };
}

// 3. Post (APPROVED → POSTED, triggers register update)
export async function postEmployeeSalaryChange(id: string): Promise<ActionResult<EmployeeSalaryChange>> {
  const auth = await auth();
  await authorize("payroll.salary.post");
  
  const doc = await prisma.employeeSalaryChange.findUnique({ where: { id } });
  if (doc?.status !== "APPROVED") throw new Error("Can only post APPROVED documents");
  
  // Check period status
  const period = await getCurrentPayrollPeriod(doc.effectiveDate);
  if (!period || period.status === "POSTED") throw new Error("Period is closed for posting");
  
  // Transaction: update document + create register entry
  const result = await prisma.$transaction(async (tx) => {
    const posted = await tx.employeeSalaryChange.update({
      where: { id },
      data: {
        status: "POSTED",
        postedAt: new Date()
      }
    });
    
    // Append immutable record to register
    await tx.employeeSalaryMovement.create({
      data: {
        employeeId: doc.employeeId,
        salaryChangeId: id,
        amount: doc.newSalary,
        effectiveDate: doc.effectiveDate,
        periodId: period.id
      }
    });
    
    return posted;
  });
  
  return { success: true, data: result };
}
```

---

### 3. Registers → History and Balance Tables

**1C Pattern:** Registers store the results of posting. They are immutable snapshots used for reporting, tax compliance, and audit trails. Common types:
- **Movement registers:** who earned what (each payroll entry)
- **Balance registers:** cumulative totals per employee
- **Accumulation registers:** running balances over time

**Web App Pattern:** Explicit history and balance tables in Prisma schema. These are append-only or soft-versioned, never updated in-place.

**Key Rules:**
- Registers are populated at period-close or posting time, not during data entry.
- If it appeared in a 1C register, it must be queryable and immutable in the web app.
- Design for append-only access: new entries, never edits.
- Use soft deletes if reversals are needed; add a `reversedAt` timestamp or `reversalId` foreign key.

**Example:**

```prisma
// Immutable movement register: tracks each salary change
model EmployeeSalaryMovement {
  id                  String    @id @default(cuid())
  employeeId          String
  employee            Employee  @relation(fields: [employeeId], references: [id])
  salaryChangeId      String
  salaryChange        EmployeeSalaryChange @relation(fields: [salaryChangeId], references: [id])
  amount              Decimal   @db.Numeric(19,4)
  effectiveDate       DateTime  @db.Date
  periodId            String
  period              PayrollPeriod @relation(fields: [periodId], references: [id])
  createdAt           DateTime  @default(now())
  reversalId          String?   // Reference to reversal document if reversed
  reversedAt          DateTime?
  
  @@index([employeeId, periodId])
  @@index([createdAt])
}

// Balance snapshot: cumulative per employee, per period
model EmployeeBalanceSnapshot {
  id                  String    @id @default(cuid())
  employeeId          String
  employee            Employee  @relation(fields: [employeeId], references: [id])
  periodId            String
  period              PayrollPeriod @relation(fields: [periodId], references: [id])
  grossSalary         Decimal   @db.Numeric(19,4)
  deductions          Decimal   @db.Numeric(19,4)
  netSalary           Decimal   @db.Numeric(19,4)
  snapshotDate        DateTime  @default(now())
  
  @@unique([employeeId, periodId])
  @@index([periodId])
}

// Immutable payslip history
model PayslipHistory {
  id                  String    @id @default(cuid())
  employeeId          String
  employee            Employee  @relation(fields: [employeeId], references: [id])
  periodId            String
  period              PayrollPeriod @relation(fields: [periodId], references: [id])
  grossAmount         Decimal   @db.Numeric(19,4)
  deductionsAmount    Decimal   @db.Numeric(19,4)
  netAmount           Decimal   @db.Numeric(19,4)
  issuedDate          DateTime
  createdAt           DateTime  @default(now())
  
  @@index([employeeId, periodId])
  @@index([issuedDate])
}
```

**Query Pattern (read-only):**
```typescript
export async function getEmployeeBalance(employeeId: string, periodId: string) {
  return await prisma.employeeBalanceSnapshot.findUniqueOrThrow({
    where: { employeeId_periodId: { employeeId, periodId } }
  });
}

export async function getPayslipHistory(employeeId: string) {
  return await prisma.payslipHistory.findMany({
    where: { employeeId },
    orderBy: { issuedDate: "desc" }
  });
}
```

---

### 4. Periods and Posting Rules

**1C Pattern:** Payroll periods transition through discrete states:
- **Open:** Data entry allowed, no restrictions
- **Locked:** Employee changes require review, salary changes logged
- **Verified:** Payroll calculated and approved by authorities
- **Posted:** Final accounting entries recorded, immutable

**Web App Pattern:** A `PayrollPeriod` entity with a status field; all mutations check this status before proceeding.

**Key Rules:**
- You cannot post payroll with incomplete data.
- You cannot modify an employee's salary in a Locked/Verified/Posted period without explicit approval.
- Corrections to posted periods are traceable: new entries, never edits.
- Each status transition is an explicit business event (may trigger notifications, audit logging).

**Example:**

```prisma
model PayrollPeriod {
  id              String      @id @default(cuid())
  name            String      // e.g., "January 2025"
  startDate       DateTime    @db.Date
  endDate         DateTime    @db.Date
  status          String      @default("OPEN") // OPEN, LOCKED, VERIFIED, POSTED
  lockedAt        DateTime?
  verifiedAt      DateTime?
  postedAt        DateTime?
  lockedBy        String?
  verifiedBy      String?
  postedBy        String?
  createdAt       DateTime    @default(now())
  
  salaryMovements EmployeeSalaryMovement[]
  balanceSnapshots EmployeeBalanceSnapshot[]
  payslips        PayslipHistory[]
  
  @@index([status])
  @@index([startDate, endDate])
}
```

**Period State Machine:**
```typescript
export async function lockPayrollPeriod(periodId: string): Promise<ActionResult<PayrollPeriod>> {
  const auth = await auth();
  await authorize("payroll.period.lock"); // Moderator
  
  const period = await prisma.payrollPeriod.findUnique({ where: { id: periodId } });
  if (period?.status !== "OPEN") throw new Error("Can only lock OPEN periods");
  
  const result = await prisma.payrollPeriod.update({
    where: { id: periodId },
    data: {
      status: "LOCKED",
      lockedAt: new Date(),
      lockedBy: auth.user.id
    }
  });
  return { success: true, data: result };
}

export async function verifyPayrollPeriod(periodId: string): Promise<ActionResult<PayrollPeriod>> {
  const auth = await auth();
  await authorize("payroll.period.verify"); // Director
  
  const period = await prisma.payrollPeriod.findUnique({ where: { id: periodId } });
  if (period?.status !== "LOCKED") throw new Error("Can only verify LOCKED periods");
  
  // Validate payroll is complete
  const incomplete = await prisma.payslipHistory.findFirst({
    where: { periodId, netAmount: null }
  });
  if (incomplete) throw new Error("Payroll incomplete");
  
  const result = await prisma.payrollPeriod.update({
    where: { id: periodId },
    data: {
      status: "VERIFIED",
      verifiedAt: new Date(),
      verifiedBy: auth.user.id
    }
  });
  return { success: true, data: result };
}

export async function postPayrollPeriod(periodId: string): Promise<ActionResult<PayrollPeriod>> {
  const auth = await auth();
  await authorize("payroll.period.post"); // CFO
  
  const period = await prisma.payrollPeriod.findUnique({ where: { id: periodId } });
  if (period?.status !== "VERIFIED") throw new Error("Can only post VERIFIED periods");
  
  // Create accounting entries, tax reports, etc.
  // This is where final reconciliation happens
  
  const result = await prisma.payrollPeriod.update({
    where: { id: periodId },
    data: {
      status: "POSTED",
      postedAt: new Date(),
      postedBy: auth.user.id
    }
  });
  return { success: true, data: result };
}
```

---

## Architecture Principles

### Multi-Tenancy & Isolation
Every query and mutation must filter by tenant:
```typescript
const companyId = auth.user.companyId;
const employees = await prisma.employee.findMany({
  where: { companyId } // Never query across tenants
});
```

### Authorization Before DB Access
Always call `authorize()` before accessing the database:
```typescript
await authorize("payroll.salary.approve");
```

Leverage the role matrix in `data/roleMatrix.ts` and avoid hardcoding role strings.

### Server Actions Pattern
Every mutation must:
1. Start with `'use server'`
2. Call `auth()` for user context
3. Call `authorize()` for permission check
4. Validate input with Zod
5. Use Prisma singleton from `@/lib/prisma`
6. Return `ActionResult<T>`
7. Handle errors and map to user-friendly messages

```typescript
'use server'
import { auth } from '@/lib/auth'
import { authorize } from '@/lib/authorize'
import { prisma } from '@/lib/prisma'
import { salaryChangeSchema, type CreateSalaryChangeInput } from '@/types'

export async function createEmployeeSalaryChange(
  input: CreateSalaryChangeInput
): Promise<ActionResult<EmployeeSalaryChange>> {
  const session = await auth()
  if (!session) return { success: false, errors: { form: "Unauthorized" } }
  
  await authorize("payroll.salary.create")
  
  const validated = salaryChangeSchema.safeParse(input)
  if (!validated.success) {
    return { success: false, errors: MapErrorTree(validated.error.flatten()) }
  }
  
  try {
    const result = await prisma.employeeSalaryChange.create({
      data: {
        ...validated.data,
        status: "DRAFT"
      }
    })
    return { success: true, data: result }
  } catch (error) {
    return { success: false, errors: { form: "Failed to create salary change" } }
  }
}
```

### Immutability for Closed Periods
Never allow direct edits to finalized payroll data:
```typescript
// ❌ DON'T
await prisma.payslipHistory.update({
  where: { id },
  data: { netAmount: newAmount }
})

// ✅ DO - Create a reversal or adjustment document
const reversal = await prisma.payslipHistory.create({
  data: {
    ...originalPayslip,
    reversalId: originalPayslip.id, // Track what was reversed
    netAmount: newAmount
  }
})
```

---

## Common Migration Patterns

### Choosing Between CRUD and Documents

| Scenario | Pattern | Reason |
|----------|---------|--------|
| Add/edit department | Simple CRUD Server Action | No status, no approval, straightforward | 
| Change employee salary | Document with approval workflow | Affects payroll, needs audit trail, approval |
| Create payroll batch | Transactional aggregate (Document) | Multi-step, status gates, register posting |
| Update employee address | CRUD (catalog) | Reference data, not business-critical |

### Handling Reversals and Corrections

1. **For open periods:** Direct edit via CRUD action (low risk)
2. **For locked/verified periods:** Create a new reversal document with explicit business reason
3. **For posted periods:** Never edit; create adjustment document

```typescript
// Example: Correct a payslip in a posted period
export async function createPayslipAdjustment(
  originalPayslipId: string,
  adjustmentReason: string,
  adjustmentAmount: Decimal
): Promise<ActionResult<PayslipHistory>> {
  const auth = await auth()
  await authorize("payroll.adjustment.create")
  
  const original = await prisma.payslipHistory.findUnique({
    where: { id: originalPayslipId }
  })
  if (!original) throw new Error("Original payslip not found")
  
  const result = await prisma.payslipHistory.create({
    data: {
      employeeId: original.employeeId,
      periodId: original.periodId,
      grossAmount: adjustmentAmount,
      deductionsAmount: 0,
      netAmount: adjustmentAmount,
      issuedDate: new Date(),
      // Link to original via field or separate AdjustmentLink model
    }
  })
  return { success: true, data: result }
}
```

---

## Migration Checklist

When migrating a 1C feature:

- [ ] **Identify entity type:** Catalog (reference), Document (workflow), Register (history)?
- [ ] **Define status machine:** What states? What transitions? Who can trigger each?
- [ ] **Determine authorization:** Which roles approve, post, or modify?
- [ ] **Plan period sensitivity:** Can this change in locked/posted periods? If not, validate.
- [ ] **Design immutability:** What data is historical? Add `onDelete: NoAction` or soft-delete fields.
- [ ] **Outline register logic:** What gets logged in history tables? When?
- [ ] **Validate tenant isolation:** Does every query filter by tenant?
- [ ] **Create Zod schemas:** Define input validation rules from 1C.
- [ ] **Build Server Actions:** One per state transition or logical mutation.
- [ ] **Write tests:** State transitions, authorization, edge cases (period locks, tenant boundaries).

---

## Useful Patterns

### Query Helper: Check Period Status Before Mutation

```typescript
export async function ensurePeriodAllowsMutation(
  periodId: string,
  requiredStatus?: "OPEN" | "LOCKED" | "VERIFIED"
): Promise<PayrollPeriod> {
  const period = await prisma.payrollPeriod.findUnique({
    where: { id: periodId }
  })
  if (!period) throw new Error("Period not found")
  
  const allowedStatuses = requiredStatus ? [requiredStatus] : ["OPEN", "LOCKED"]
  if (!allowedStatuses.includes(period.status)) {
    throw new Error(`Period in ${period.status} status; cannot modify`)
  }
  
  return period
}
```

### Validate Catalog Immutability

```typescript
export async function canDeleteCatalogItem(
  type: "Employee" | "Department" | "Country",
  id: string
): Promise<boolean> {
  const movements = await prisma.employeeSalaryMovement.count({
    where: {
      period: { status: "POSTED" },
      employee: { [type === "Employee" ? "id" : "departmentId"]: id }
    }
  })
  
  return movements === 0 // Safe to delete if no posted history
}
```

---

## References

- **Docs:** `docs/1c-mapping/`, `docs/business-rules/`
- **Examples:** `docs/examples/document-mapping-example.md`
- **Schema:** `prisma/schema.prisma`
- **Server Actions:** `actions/` directory
- **Authorization:** `data/roleMatrix.ts`
