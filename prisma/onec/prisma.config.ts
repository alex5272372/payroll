import 'dotenv/config'
import process from 'node:process'
import { defineConfig } from 'prisma/config'

const onecDatabaseUrl = process.env.ONEC_DATABASE_URL

const config = defineConfig({
  schema: './schema.prisma',
  migrations: {
    seed: 'ts-node -r tsconfig-paths/register ./prisma/onec/seed.ts',
  },
  ...(onecDatabaseUrl ? { datasource: { url: onecDatabaseUrl }} : {}),
})

export default config
