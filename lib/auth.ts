import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import type { User } from "./models/User"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export function generateToken(userId: string, role: string) {
  return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: "7d" })
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string; role: string }
  } catch (error) {
    return null
  }
}

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 12)
}

export async function comparePassword(password: string, hashedPassword: string) {
  return await bcrypt.compare(password, hashedPassword)
}

export function sanitizeUser(user: User) {
  const { password, ...sanitizedUser } = user
  return {
    ...sanitizedUser,
    _id: user._id?.toString(),
  }
}
