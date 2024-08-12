import { and, eq } from 'drizzle-orm'
import { db } from '../drizzle'
import { meals } from '../schemas/meals'

export type Meal = typeof meals.$inferSelect
export type NewMeal = typeof meals.$inferInsert

export async function createMeal(meal: NewMeal) {
  return await db.insert(meals).values(meal).returning({
    id: meals.id,
    name: meals.name,
    description: meals.description,
    dateTime: meals.datetime,
    userId: meals.userId,
  })
}

export async function deleteMealByIdAndUserId(id: string, userId: string) {
  return await db
    .delete(meals)
    .where(and(eq(meals.id, id), eq(meals.userId, userId)))
}
