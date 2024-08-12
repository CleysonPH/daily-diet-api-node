import { env } from '@/config/env'
import bcript from 'bcryptjs'

export async function hashPassword(password: string): Promise<string> {
  return await bcript.hash(password, env.BCRYPT_SALT_ROUNDS)
}

export async function comparePassword(
  rawPassword: string,
  hashPassword: string,
): Promise<boolean> {
  return await bcript.compare(rawPassword, hashPassword)
}
