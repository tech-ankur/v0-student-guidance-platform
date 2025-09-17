import type { ObjectId } from "mongodb"

export interface Counselor {
  _id?: ObjectId
  name: string
  email: string
  phone: string
  specialization: string[]
  experience: number
  qualification: string
  rating: number
  availability: {
    days: string[]
    timeSlots: string[]
  }
  bio: string
  profileImage?: string
  createdAt: Date
  updatedAt: Date
}
