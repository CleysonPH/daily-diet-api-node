import { pgTable, text, uuid, timestamp } from 'drizzle-orm/pg-core'
import { randomUUID } from 'crypto'
import { relations } from 'drizzle-orm'
import { users } from './user'

export const meals = pgTable('meals', {
  id: uuid('id').primaryKey().$defaultFn(randomUUID),
  name: text('name').notNull(),
  description: text('description').notNull(),
  dateTime: timestamp('date_time').notNull(),
  userId: uuid('user_id').notNull(),
})

export const mealsRelations = relations(meals, ({ one }) => ({
  user: one(users, {
    fields: [meals.userId],
    references: [users.id],
  }),
}))
