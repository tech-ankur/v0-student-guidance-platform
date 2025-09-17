import type { ObjectId } from "mongodb"

export interface Course {
  _id?: ObjectId
  name: string
  description: string
  subject: string
  stream: "science" | "commerce" | "arts"
  duration: string
  eligibility: string
  careerOpportunities: string[]
  averageSalary: {
    min: number
    max: number
  }
  topColleges: string[]
  entranceExams: string[]
  skills: string[]
  createdAt: Date
  updatedAt: Date
  createdBy: ObjectId
}
