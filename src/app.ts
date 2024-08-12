import fastfy from 'fastify'
import { appRoutes } from './api/routes'
import { ZodError } from 'zod'
import { InvalidCredentialsError } from './api/errors/invalid-credentials-error'
import { env } from './config/env'

export const app = fastfy()

app.register(appRoutes)

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    reply
      .status(400)
      .send({ message: 'Invalid request body', errors: error.format() })
  } else if (error instanceof InvalidCredentialsError) {
    reply.status(401).send({ message: error.message })
  }

  if (env.NODE_ENV === 'dev') {
    console.error(error)
  }

  reply.status(500).send({ message: 'Internal server error' })
})
