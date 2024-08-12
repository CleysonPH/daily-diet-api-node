import { createUser, getUserByEmail } from '@/db/repositories/user-repository'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { randomUUID } from 'crypto'
import { comparePassword, hashPassword } from '@/services/hash'
import { createToken } from '@/services/jwt'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

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
    password: await hashPassword(body.password),
  })

  reply.status(201).send(user)
}

export async function login(request: FastifyRequest) {
  const bodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  })

  const body = bodySchema.parse(request.body)

  const user = await getUserByEmail(body.email)

  if (!user) {
    throw new InvalidCredentialsError()
  }

  const passwordMatch = await comparePassword(body.password, user.password)

  if (!passwordMatch) {
    throw new InvalidCredentialsError()
  }

  return {
    accessToken: await createToken(user.id),
  }
}
