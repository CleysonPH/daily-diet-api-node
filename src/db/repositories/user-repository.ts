import { db } from '../drizzle'
import { users } from '../schemas/user'

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert

export async function createUser(user: NewUser) {
  return await db
    .insert(users)
    .values(user)
    .returning({
      id: users.id,
      name: users.name,
      email: users.email,
    })
    .execute()
}
