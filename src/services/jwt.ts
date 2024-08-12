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

export function getSubject(token: string): string {
  const decoded = jsonwebtoken.verify(token, env.JWT_SECRET)
  return decoded.sub as string
}
