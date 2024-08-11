import { FastifyInstance } from 'fastify'

import { ping } from './controllers/ping'

export async function appRoutes(app: FastifyInstance) {
  app.get('/api/ping', ping)
}
