import { env } from '@/config/env'
import jsonwebtoken from 'jsonwebtoken'

export async function createToken(subject: string): Promise<string> {
  return jsonwebtoken.sign(
    {
      sub: subject,
    },
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRES_IN },
  )
}
