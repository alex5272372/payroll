import 'dotenv/config'
import { defineConfig, env } from 'prisma/config'

export default defineConfig({
  schema: 'prisma/default/schema.prisma',
  migrations: {
    path: 'prisma/default/migrations',
    seed: 'ts-node -r tsconfig-paths/register prisma/default/seed.ts',
  },
  datasource: {
    url: env('DATABASE_URL'),
  },
})
