import { FastifyInstance } from 'fastify'

import { ping } from './controllers/ping'
import { register } from './controllers/auth'

export async function appRoutes(app: FastifyInstance) {
  app.get('/api/ping', ping)

  app.post('/api/auth/register', register)
}
