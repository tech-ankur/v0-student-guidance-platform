import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { withAuth } from "@/lib/middleware"
import type { Counselor } from "@/lib/models/Counselor"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const specialization = searchParams.get("specialization")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    const client = await clientPromise
    const db = client.db("guidance_platform")
    const counselors = db.collection<Counselor>("counselors")

    // Build filter query
    const filter: any = {}
    if (specialization) {
      filter.specialization = { $in: [specialization] }
    }

    const skip = (page - 1) * limit
    const totalCounselors = await counselors.countDocuments(filter)
    const counselorList = await counselors
      .find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ rating: -1, experience: -1 })
      .toArray()

    return NextResponse.json({
      counselors: counselorList.map((counselor) => ({
        ...counselor,
        _id: counselor._id?.toString(),
      })),
      pagination: {
        page,
        limit,
        total: totalCounselors,
        pages: Math.ceil(totalCounselors / limit),
      },
    })
  } catch (error) {
    console.error("Get counselors error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

async function createCounselorHandler(req: NextRequest & { user: { userId: string; role: string } }) {
  try {
    const counselorData = await req.json()
    const { name, email, phone, specialization, experience, qualification, availability, bio, profileImage } =
      counselorData

    if (!name || !email || !phone || !specialization || !experience || !qualification) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("guidance_platform")
    const counselors = db.collection<Counselor>("counselors")

    // Check if counselor already exists
    const existingCounselor = await counselors.findOne({ email })
    if (existingCounselor) {
      return NextResponse.json({ error: "Counselor already exists" }, { status: 400 })
    }

    const newCounselor: Counselor = {
      name,
      email,
      phone,
      specialization,
      experience,
      qualification,
      rating: 0,
      availability: availability || { days: [], timeSlots: [] },
      bio,
      profileImage,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await counselors.insertOne(newCounselor)
    const counselor = await counselors.findOne({ _id: result.insertedId })

    return NextResponse.json(
      {
        message: "Counselor created successfully",
        counselor: {
          ...counselor,
          _id: counselor?._id?.toString(),
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Create counselor error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export const POST = withAuth(createCounselorHandler, ["admin"])
