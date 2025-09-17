import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { withAuth } from "@/lib/middleware"
import type { Course } from "@/lib/models/Course"
import { ObjectId } from "mongodb"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const subject = searchParams.get("subject")
    const stream = searchParams.get("stream")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    const client = await clientPromise
    const db = client.db("guidance_platform")
    const courses = db.collection<Course>("courses")

    // Build filter query
    const filter: any = {}
    if (subject) filter.subject = { $regex: subject, $options: "i" }
    if (stream) filter.stream = stream

    const skip = (page - 1) * limit
    const totalCourses = await courses.countDocuments(filter)
    const courseList = await courses.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 }).toArray()

    return NextResponse.json({
      courses: courseList.map((course) => ({
        ...course,
        _id: course._id?.toString(),
      })),
      pagination: {
        page,
        limit,
        total: totalCourses,
        pages: Math.ceil(totalCourses / limit),
      },
    })
  } catch (error) {
    console.error("Get courses error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

async function createCourseHandler(req: NextRequest & { user: { userId: string; role: string } }) {
  try {
    const courseData = await req.json()
    const {
      name,
      description,
      subject,
      stream,
      duration,
      eligibility,
      careerOpportunities,
      averageSalary,
      topColleges,
      entranceExams,
      skills,
    } = courseData

    if (!name || !description || !subject || !stream) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("guidance_platform")
    const courses = db.collection<Course>("courses")

    const newCourse: Course = {
      name,
      description,
      subject,
      stream,
      duration,
      eligibility,
      careerOpportunities: careerOpportunities || [],
      averageSalary: averageSalary || { min: 0, max: 0 },
      topColleges: topColleges || [],
      entranceExams: entranceExams || [],
      skills: skills || [],
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: new ObjectId(req.user.userId),
    }

    const result = await courses.insertOne(newCourse)
    const course = await courses.findOne({ _id: result.insertedId })

    return NextResponse.json(
      {
        message: "Course created successfully",
        course: {
          ...course,
          _id: course?._id?.toString(),
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Create course error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export const POST = withAuth(createCourseHandler, ["admin"])
