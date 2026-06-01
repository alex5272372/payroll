
---
applyTo: "app/**/*.ts,app/**/*.tsx,components/**/*.ts,components/**/*.tsx"
---

# App Router and UI Rules
- Prefer React Server Components by default.
- Use Client Components only when interactivity truly requires them.
- Keep data fetching on the server where practical.
- Do not duplicate business rules in UI components.
- Forms should prefer server actions unless there is a clear reason otherwise.
- Preserve business behavior from 1C, but do not copy 1C forms literally.
- Optimize for task-focused UX, clear validation, and predictable workflows.
- Reuse existing components and patterns before creating new abstractions.
- Keep components small, readable, and domain-oriented.
- Use `@/` imports only.
- If a screen represents a 1C document-like process, preserve status flow, validation, and audit-relevant fields.
