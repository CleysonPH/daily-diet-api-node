import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { createMeal as createMealDb } from '@/db/repositories/meals-repository'

export async function createMeal(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    name: z.string().min(3).max(30),
    description: z.string().min(10).max(255),
    datetime: z.coerce.date(),
    inDiet: z.boolean(),
  })

  const body = bodySchema.parse(request.body)

  const meal = await createMealDb({
    name: body.name,
    description: body.description,
    datetime: body.datetime,
    inDiet: body.inDiet,
    userId: request.user?.id ?? '',
  })

  reply.status(201).send(meal)
}
