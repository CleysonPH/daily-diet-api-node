import { FastifyInstance } from 'fastify'

import { ping } from './controllers/ping'
import { login, register } from './controllers/auth'
import { createMeal } from './controllers/meals'
import { requireAuthentication } from './middlewares/require-authentication'

export async function appRoutes(app: FastifyInstance) {
  app.get('/api/ping', ping)

  app.post('/api/auth/register', register)
  app.post('/api/auth/login', login)

  app.post('/api/meals', { preHandler: [requireAuthentication] }, createMeal)
}
