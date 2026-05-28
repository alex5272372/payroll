# Payroll Platform

A multi-tenant web application for performing complex periodic payroll calculations across multiple companies, departments, and countries.

- **Version:** 0.1.1
- **License:** MIT
- **Author:** Oleksii Nikolaienko
- **Repository:** <https://github.com/alex5272372/payroll.git>

---

## Table of Contents

1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Architecture](#architecture)
4. [Data Model](#data-model)
5. [Features](#features)
6. [Access Control](#access-control)
7. [Project Structure](#project-structure)
8. [Getting Started](#getting-started)
9. [Scripts](#scripts)
10. [References](#references)

---

## Overview

The Payroll Platform automates payroll workflows for organizations operating in multiple countries. It manages the full lifecycle from organizational structure setup through calendar configuration, payroll calculation, and report generation.

Key capabilities:

- Multi-company and multi-country organizational hierarchy
- Working time calendars at country, company, department, and employee levels
- Payroll calculation templates and batch calculations
- Payslip and payment statement reports
- Role-based access control with four permission levels

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| Runtime | Node.js |
| Language | TypeScript |
| Framework | Next.js 16 (App Router, Turbopack) |
| UI library | React 19 |
| Styling | Tailwind CSS 4 |
| UI components | Headless UI 2, Heroicons 2 |
| ORM | Prisma 7 |
| Database | PostgreSQL |
| Authentication | NextAuth.js v5 (Auth.js) with Prisma adapter |
| Password hashing | bcryptjs |
| Validation | Zod 4 |
| Package manager | npm |
| Deployment | Vercel |

---

## Architecture

The application follows the **Next.js App Router** conventions:

- **`app/`** — pages and API routes using React Server Components
- **`actions/`** — Next.js Server Actions for all data mutations
- **`components/`** — reusable UI components (layout, modals, inputs, data tables, calendars)
- **`data/`** — static configuration (navigation tree, role-permission matrix, Prisma query helpers)
- **`lib/`** — shared utilities (Prisma client singleton, NextAuth config, email transport)
- **`prisma/`** — database schema, migrations, and seed script
- **`types/`** — TypeScript type definitions and enums

Authentication uses **email/password** with optional email verification. Sessions are persisted in the database via the Prisma adapter.

---

## Data Model

```text
Country ──< Company ──< Department ──< Employee >── Person >── User
                                                                │
                                                            UserRole[]
                                                            Session[]
```

| Model | Description |
| --- | --- |
| `Country` | Reference catalog. ISO 2-letter code, name. |
| `Company` | Belongs to one country. |
| `Department` | Belongs to one company and one country. |
| `Person` | Physical person (first name, last name, middle name, gender, birthdate). |
| `Employee` | Links a person to a department. |
| `User` | Authentication account linked to a person. Has email, optional password, email-verified flag. |
| `UserRole` | Many-to-many: a user may hold multiple roles (`ADMINISTRATOR`, `MODERATOR`, `USER`). |
| `Session` | Database-persisted NextAuth session. |
| `VerificationToken` | Email verification / password-reset tokens. |

### Enums

| Enum | Values |
| --- | --- |
| `Role` | `ADMINISTRATOR`, `MODERATOR`, `USER` |
| `Gender` | `MALE`, `FEMALE`, `OTHER` |

---

## Features

### Calendars

Working-time calendars are defined at four hierarchy levels. Lower levels inherit from and can override higher levels.

| Calendar | Path |
| --- | --- |
| Country calendar | `/calendar/country-calendar` |
| Company calendar | `/calendar/company-calendar` |
| Department calendar | `/calendar/department-calendar` |
| Employee calendar | `/calendar/employee-calendar` |

### Catalogs

Reference data management:

| Catalog | Path |
| --- | --- |
| Countries | `/catalog/countries` |
| Companies | `/catalog/companies` |
| Departments | `/catalog/departments` |
| Employees | `/catalog/employees` |
| People | `/catalog/people` |
| Users | `/catalog/users` |

### Documents

| Document | Path | Description |
| --- | --- | --- |
| Calendar filling | `/document/calendar-filling` | Populate working-day rules for a period |
| Calculation template | `/document/calculation-template` | Define formulas and accrual rules |
| Payroll calculation | `/document/payroll-calculation` | Run batch payroll for a period |

### Reports

| Report | Path |
| --- | --- |
| Payslip | `/report/payslip` |
| Payment statement | `/report/payment-statement` |

### User account

- Sign up / sign in / sign out
- Email verification
- Password reset via email link
- Profile management

---

## Access Control

Permissions are defined per route and per role as a CRUD matrix.

| Role | Description |
| --- | --- |
| `ADMINISTRATOR` | Full CRUD on all resources |
| `MODERATOR` | Full CRUD on most catalogs and documents; read-only on Countries and Users |
| `USER` | Read-only on calendars and reports; no catalog/document write access |
| `UNAUTHORIZED` | Read-only on Country calendar; access to sign-in/sign-up only |

Selected permission highlights:

| Resource | Admin | Moderator | User | Unauthorized |
| --- | --- | --- | --- | --- |
| Countries | CRUD | Read | — | — |
| Companies / Departments / Employees / People | CRUD | CRUD | — | — |
| Users | CRUD | Read | — | — |
| Calendars | Read | Read | Read | Country only |
| Documents | CRUD | CRUD | — | — |
| Payslip | Read | Read | Read | — |
| Payment statement | Read | Read | — | — |
| User profile | CRUD | CRUD | CRUD | — |

---

## Project Structure

```text
payroll/
├── actions/            # Server Actions (CRUD per entity)
├── app/                # Next.js App Router
│   ├── api/auth/       # NextAuth.js API route
│   ├── calendar/       # Calendar pages
│   ├── catalog/        # Catalog pages
│   ├── document/       # Document pages
│   ├── report/         # Report pages
│   └── user/           # Auth pages (profile, verify, error)
├── components/
│   ├── calendar/       # CalendarDay, CalendarHour
│   ├── dataDisplay/    # DataTable, PasswordPolicy
│   ├── inputs/         # TextField, PasswordField
│   ├── Layout/         # Shell, tabs, dropdowns
│   ├── ModalDialog/    # Modal primitives
│   ├── Toolbar/        # Page toolbars
│   └── user/           # SignIn, SignUp, SignOut, ResetPassword, VerifyEmail
├── data/
│   ├── navigation.ts   # App navigation tree
│   ├── roleMatrix.ts   # Role-permission matrix
│   └── prisma/         # Prisma query helpers per entity
├── lib/                # auth.ts, prisma.ts, authSendRequest.ts
├── prisma/
│   ├── schema.prisma
│   ├── seed.ts
│   └── migrations/
├── types/              # TypeScript types and enums
└── public/
```

---

## Getting Started

### Prerequisites

- Node.js ≥ 20
- npm
- PostgreSQL instance

### Installation

```bash
git clone https://github.com/alex5272372/payroll.git
cd payroll
npm install
```

### Environment

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DB_NAME"
AUTH_SECRET="your-nextauth-secret"
AUTH_EMAIL_FROM="noreply@example.com"
# SMTP settings for email verification / password reset
EMAIL_SERVER_HOST="smtp.example.com"
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER="user"
EMAIL_SERVER_PASSWORD="password"
```

### Database setup

```bash
# Run migrations
npx prisma migrate dev

# (Optional) Seed initial data
npx prisma db seed
```

### Development server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

### Production build

```bash
npm run build
npm start
```

### Database maintenance

Drop all active connections before dropping or restoring a database:

```sql
SELECT pg_terminate_backend(pid)
FROM pg_stat_activity
WHERE datname = 'TARGET_DB_NAME' AND leader_pid IS NULL;
```

---

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Generate Prisma client and start dev server (Turbopack) |
| `npm run build` | Generate Prisma client and build for production |
| `npm start` | Start the production server |
| `npm run lint` | Run ESLint |
| `npx prisma migrate dev` | Apply pending migrations and generate client |
| `npx prisma migrate reset` | Drop the database, re-apply all migrations, and re-seed |
| `npx prisma db seed` | Seed the database |
| `npx prisma studio` | Open Prisma Studio (database GUI) |

---

## References

### Templates used

- [Vercel Postgres + Prisma Next.js Starter](https://vercel.com/templates/next.js/postgres-prisma)
- [Tailwind Application UI Stacked Layout](https://tailwindcss.com/plus/ui-blocks/application-ui/application-shells/stacked)
- [Tailwind CSS Cards](https://tw-elements.com/docs/standard/components/cards/)

### Documentation

- [Visual Studio Code](https://code.visualstudio.com/docs)
- [Node.js](https://nodejs.org/docs/latest/api/)
- [npm](https://docs.npmjs.com/)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [PostgreSQL](https://www.postgresql.org/docs/16/index.html)
- [Prisma ORM](https://www.prisma.io/docs/orm)
- [Vercel](https://vercel.com/docs)
- [Next.js](https://nextjs.org/docs)
- [React](https://react.dev/reference/react)
- [Tailwind CSS](https://tailwindcss.com/docs/installation)
- [Headless UI](https://headlessui.com/)
- [Auth.js (NextAuth v5)](https://authjs.dev/)
- [Heroicons SVG icons](https://heroicons.com/)
