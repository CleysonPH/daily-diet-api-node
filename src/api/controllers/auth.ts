import { createUser } from '@/db/repositories/user-repository'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { randomUUID } from 'crypto'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    name: z.string().min(3).max(255),
    email: z.string().email(),
    password: z.string().min(8),
  })

  const body = bodySchema.parse(request.body)

  const user = await createUser({
    id: randomUUID(),
    name: body.name,
    email: body.email,
    password: body.password,
  })

  reply.status(201).send(user)
}
