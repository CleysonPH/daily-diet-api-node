import { pgTable, text, uuid, timestamp, boolean } from 'drizzle-orm/pg-core'
import { randomUUID } from 'crypto'
import { users } from './user'

export const meals = pgTable('meals', {
  id: uuid('id').primaryKey().$defaultFn(randomUUID),
  name: text('name').notNull(),
  description: text('description').notNull(),
  inDiet: boolean('in_diet')
    .notNull()
    .$default(() => false),
  datetime: timestamp('date_time').notNull(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
})
