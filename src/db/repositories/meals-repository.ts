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
