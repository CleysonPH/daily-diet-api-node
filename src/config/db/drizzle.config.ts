import { env } from '@/config/env'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './src/db/schemas',
  out: './src/db/migrations/',
  dialect: 'postgresql',
  dbCredentials: {
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    ssl: env.NODE_ENV === 'prod',
  },
})
