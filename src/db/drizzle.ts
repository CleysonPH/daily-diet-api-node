import pg from 'pg'
import { drizzle } from 'drizzle-orm/node-postgres'
import { env } from '@/config/env'

const pool = new pg.Pool({
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  ssl: env.NODE_ENV === 'prod',
})

export const db = drizzle(pool)
