import { MongoClient } from "mongodb"
import bcrypt from "bcryptjs"

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/guidance_platform"

async function seedDatabase() {
  const client = new MongoClient(MONGODB_URI)

  try {
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db("guidance_platform")

    // Clear existing data
    await db.collection("users").deleteMany({})
    await db.collection("courses").deleteMany({})
    await db.collection("counselors").deleteMany({})

    console.log("Cleared existing data")

    // Seed admin user
    const adminPassword = await bcrypt.hash("admin123", 12)
    const adminUser = {
      name: "Admin User",
      email: "admin@guidance.com",
      password: adminPassword,
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const adminResult = await db.collection("users").insertOne(adminUser)
    console.log("Created admin user:", adminResult.insertedId)

    // Seed sample courses
    const courses = [
      {
        name: "Computer Science Engineering",
        description:
          "Comprehensive program covering programming, algorithms, data structures, and software development.",
        subject: "Computer Science",
        stream: "science",
        duration: "4 years",
        eligibility: "12th with PCM, minimum 75% marks",
        careerOpportunities: ["Software Developer", "Data Scientist", "AI Engineer", "Cybersecurity Analyst"],
        averageSalary: { min: 400000, max: 1500000 },
        topColleges: ["IIT Delhi", "IIT Bombay", "BITS Pilani", "NIT Trichy"],
        entranceExams: ["JEE Main", "JEE Advanced", "BITSAT"],
        skills: ["Programming", "Problem Solving", "Mathematics", "Logic"],
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: adminResult.insertedId,
      },
      {
        name: "Bachelor of Commerce",
        description: "Comprehensive business education covering accounting, finance, economics, and management.",
        subject: "Commerce",
        stream: "commerce",
        duration: "3 years",
        eligibility: "12th with Commerce/Any stream, minimum 50% marks",
        careerOpportunities: ["Chartered Accountant", "Financial Analyst", "Investment Banker", "Business Consultant"],
        averageSalary: { min: 300000, max: 1200000 },
        topColleges: ["SRCC Delhi", "LSR Delhi", "Christ University", "Loyola College"],
        entranceExams: ["DU Entrance", "IPU CET", "SET"],
        skills: ["Analytical Thinking", "Communication", "Mathematics", "Business Acumen"],
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: adminResult.insertedId,
      },
      {
        name: "Bachelor of Arts in Psychology",
        description: "Study of human behavior, mental processes, and psychological theories.",
        subject: "Psychology",
        stream: "arts",
        duration: "3 years",
        eligibility: "12th with any stream, minimum 50% marks",
        careerOpportunities: ["Clinical Psychologist", "Counselor", "HR Specialist", "Research Analyst"],
        averageSalary: { min: 250000, max: 800000 },
        topColleges: ["JNU Delhi", "BHU Varanasi", "Jamia Millia", "Christ University"],
        entranceExams: ["DU Entrance", "JNU Entrance", "BHU UET"],
        skills: ["Empathy", "Communication", "Research", "Critical Thinking"],
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: adminResult.insertedId,
      },
    ]

    const courseResult = await db.collection("courses").insertMany(courses)
    console.log("Created courses:", courseResult.insertedIds)

    // Seed sample counselors
    const counselors = [
      {
        name: "Dr. Priya Sharma",
        email: "priya.sharma@guidance.com",
        phone: "+91-9876543210",
        specialization: ["Career Guidance", "Science Stream"],
        experience: 8,
        qualification: "PhD in Psychology, M.Ed",
        rating: 4.8,
        availability: {
          days: ["Monday", "Tuesday", "Wednesday", "Friday"],
          timeSlots: ["10:00-12:00", "14:00-16:00", "18:00-20:00"],
        },
        bio: "Experienced career counselor specializing in science stream guidance and engineering career paths.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Mr. Rajesh Kumar",
        email: "rajesh.kumar@guidance.com",
        phone: "+91-9876543211",
        specialization: ["Commerce Stream", "Business Careers"],
        experience: 12,
        qualification: "MBA Finance, CA",
        rating: 4.9,
        availability: {
          days: ["Monday", "Wednesday", "Thursday", "Saturday"],
          timeSlots: ["09:00-11:00", "15:00-17:00"],
        },
        bio: "Senior counselor with expertise in commerce education and business career guidance.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Ms. Anita Verma",
        email: "anita.verma@guidance.com",
        phone: "+91-9876543212",
        specialization: ["Arts Stream", "Creative Careers"],
        experience: 6,
        qualification: "MA Psychology, Certified Career Counselor",
        rating: 4.7,
        availability: {
          days: ["Tuesday", "Thursday", "Friday", "Saturday"],
          timeSlots: ["11:00-13:00", "16:00-18:00"],
        },
        bio: "Passionate about helping students explore creative and humanities career paths.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    const counselorResult = await db.collection("counselors").insertMany(counselors)
    console.log("Created counselors:", counselorResult.insertedIds)

    console.log("Database seeding completed successfully!")
  } catch (error) {
    console.error("Error seeding database:", error)
  } finally {
    await client.close()
  }
}

// Run the seeding function
seedDatabase()
