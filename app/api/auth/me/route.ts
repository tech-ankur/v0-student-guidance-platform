import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { withAuth } from "@/lib/middleware"
import { sanitizeUser } from "@/lib/auth"
import type { User } from "@/lib/models/User"
import { ObjectId } from "mongodb"

async function handler(req: NextRequest & { user: { userId: string; role: string } }) {
  try {
    const client = await clientPromise
    const db = client.db("guidance_platform")
    const users = db.collection<User>("users")

    const user = await users.findOne({ _id: new ObjectId(req.user.userId) })
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const sanitizedUser = sanitizeUser(user)
    return NextResponse.json({ user: sanitizedUser })
  } catch (error) {
    console.error("Get user error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export const GET = withAuth(handler)
