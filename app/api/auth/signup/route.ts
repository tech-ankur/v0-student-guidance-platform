import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { hashPassword, generateToken, sanitizeUser } from "@/lib/auth"
import type { User } from "@/lib/models/User"

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, role = "student", profile } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("guidance_platform")
    const users = db.collection<User>("users")

    // Check if user already exists
    const existingUser = await users.findOne({ email })
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    // Hash password and create user
    const hashedPassword = await hashPassword(password)
    const newUser: User = {
      name,
      email,
      password: hashedPassword,
      role: role as "student" | "parent" | "counselor" | "admin",
      profile,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await users.insertOne(newUser)
    const user = await users.findOne({ _id: result.insertedId })

    if (!user) {
      return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
    }

    const token = generateToken(user._id.toString(), user.role)
    const sanitizedUser = sanitizeUser(user)

    return NextResponse.json(
      {
        message: "User created successfully",
        user: sanitizedUser,
        token,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
