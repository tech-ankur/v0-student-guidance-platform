import type { ObjectId } from "mongodb"

export interface User {
  _id?: ObjectId
  name: string
  email: string
  password: string
  role: "student" | "parent" | "counselor" | "admin"
  createdAt: Date
  updatedAt: Date
  profile?: {
    phone?: string
    grade?: string
    stream?: string
    interests?: string[]
  }
}

export interface UserResponse {
  _id: string
  name: string
  email: string
  role: string
  createdAt: Date
  updatedAt: Date
  profile?: {
    phone?: string
    grade?: string
    stream?: string
    interests?: string[]
  }
}
