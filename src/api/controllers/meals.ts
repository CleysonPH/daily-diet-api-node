import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import {
  createMeal as createMealDb,
  deleteMealByIdAndUserId,
  getMealByIdAndUserId,
  getMealsByUserId,
} from '@/db/repositories/meals-repository'

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

export async function deleteMeal(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = paramsSchema.parse(request.params)

  await deleteMealByIdAndUserId(id, request.user?.id ?? '')

  reply.status(204).send()
}

export async function getMeals(request: FastifyRequest, reply: FastifyReply) {
  const meals = await getMealsByUserId(request.user?.id ?? '')

  reply.send(meals)
}

export async function getMeal(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = paramsSchema.parse(request.params)

  const meal = await getMealByIdAndUserId(id, request.user?.id ?? '')

  if (!meal) {
    reply.status(404).send({ message: 'Meal not found' })
    return
  }

  reply.send(meal)
}
