import { FastifyInstance } from 'fastify'

import { ping } from './controllers/ping'
import { login, register } from './controllers/auth'
import {
  createMeal,
  deleteMeal,
  getMeal,
  getMeals,
  updateMeal,
} from './controllers/meals'
import { requireAuthentication } from './middlewares/require-authentication'

export async function appRoutes(app: FastifyInstance) {
  app.get('/api/ping', ping)

  app.post('/api/auth/register', register)
  app.post('/api/auth/login', login)

  app.get('/api/meals', { preHandler: [requireAuthentication] }, getMeals)
  app.post('/api/meals', { preHandler: [requireAuthentication] }, createMeal)
  app.delete(
    '/api/meals/:id',
    { preHandler: [requireAuthentication] },
    deleteMeal,
  )
  app.get('/api/meals/:id', { preHandler: [requireAuthentication] }, getMeal)
  app.patch(
    '/api/meals/:id',
    { preHandler: [requireAuthentication] },
    updateMeal,
  )
}
