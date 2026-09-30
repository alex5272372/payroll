import 'dotenv/config'
import { defineConfig, env } from 'prisma/config'

export default defineConfig({
  schema: './schema.prisma',
  migrations: {
    seed: 'ts-node -r tsconfig-paths/register ./prisma/onec/seed.ts',
  },
  datasource: {
    url: env('ONEC_DATABASE_URL'),
  },
})
