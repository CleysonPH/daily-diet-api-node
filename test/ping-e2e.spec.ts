import { describe, it, beforeAll, afterAll, expect } from 'vitest'

import request from 'supertest'
import { app } from '../src/app'

describe('ping e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('get ping should return pong', async () => {
    const response = await request(app.server).get('/api/ping').send()

    expect(response.status).toBe(200)
    expect(response.body).toMatchObject({
      message: expect.any(String),
    })
  })
})
