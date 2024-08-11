import fastfy from 'fastify'
import { appRoutes } from './api/routes'

export const app = fastfy()

app.register(appRoutes)
