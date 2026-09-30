import 'dotenv/config'
import { defineConfig, env } from 'prisma/config'

const config = defineConfig({
  schema: './schema.prisma',
  migrations: {
    seed: 'ts-node -r tsconfig-paths/register ./prisma/onec/seed.ts',
  },
  datasource: {
    url: env('ONEC_DATABASE_URL'),
  },
})

export default config
