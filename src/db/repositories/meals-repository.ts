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

export async function getMealsByUserId(userId: string) {
  return await db
    .select({
      id: meals.id,
      name: meals.name,
      description: meals.description,
      datetime: meals.datetime,
    })
    .from(meals)
    .where(eq(meals.userId, userId))
}

export async function getMealByIdAndUserId(id: string, userId: string) {
  const result = await db
    .select({
      id: meals.id,
      name: meals.name,
      description: meals.description,
      datetime: meals.datetime,
    })
    .from(meals)
    .where(and(eq(meals.id, id), eq(meals.userId, userId)))

  if (result.length === 0) {
    return null
  }

  return result[0]
}

export async function updateMealByIdAndUserId(
  id: string,
  userId: string,
  meal: Partial<NewMeal>,
) {
  const result = await db
    .update(meals)
    .set(meal)
    .where(and(eq(meals.id, id), eq(meals.userId, userId)))
    .returning({
      id: meals.id,
      name: meals.name,
      description: meals.description,
      datetime: meals.datetime,
    })

  if (result.length === 0) {
    return null
  }

  return result[0]
}

export async function existsMealByIdAndUserId(id: string, userId: string) {
  const result = await db
    .select({
      id: meals.id,
    })
    .from(meals)
    .where(and(eq(meals.id, id), eq(meals.userId, userId)))

  return result.length > 0
}
