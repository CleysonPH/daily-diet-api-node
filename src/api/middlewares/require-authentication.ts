import { getSubject } from '@/services/jwt'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function requireAuthentication(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    reply.code(401).send({ message: 'Authorization header is missing' })
    return
  }

  if (!authHeader.startsWith('Bearer ')) {
    reply.code(401).send({ message: 'Invalid token' })
    return
  }

  const token = authHeader.replace('Bearer ', '')
  const sub = getSubject(token)

  if (!sub) {
    reply.code(401).send({ message: 'Invalid token' })
    return
  }

  request.user = { id: sub }
}
