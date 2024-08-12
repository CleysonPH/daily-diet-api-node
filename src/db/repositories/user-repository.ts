import { eq } from 'drizzle-orm'
import { db } from '../drizzle'
import { users } from '../schemas/user'

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert

export async function createUser(user: NewUser) {
  return await db.insert(users).values(user).returning({
    id: users.id,
    name: users.name,
    email: users.email,
  })
}

export async function getUserByEmail(email: string) {
  const result = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1)

  if (result.length === 0) {
    return null
  }

  return result[0]
}

export async function existsUserByEmail(email: string) {
  const user = await getUserByEmail(email)

  return user !== null
}
