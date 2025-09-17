import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: NextRequest) {
  try {
    const { message, context } = await req.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    const systemPrompt = `You are an AI career guidance counselor for students in India. You help students with:
    - Career guidance and course selection
    - Subject stream recommendations (Science, Commerce, Arts)
    - College and university information
    - Entrance exam guidance
    - Scholarship opportunities
    - Study tips and academic advice

    Provide helpful, accurate, and encouraging responses. Keep answers concise but informative.
    Focus on Indian education system, colleges, and career opportunities.
    
    ${context ? `Additional context: ${context}` : ""}`

    const { text } = await generateText({
      model: openai("gpt-3.5-turbo"),
      system: systemPrompt,
      prompt: message,
      maxTokens: 500,
      temperature: 0.7,
    })

    return NextResponse.json({
      response: text,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Chat error:", error)
    return NextResponse.json(
      {
        error: "Failed to process chat message",
        response: "I apologize, but I'm having trouble processing your request right now. Please try again later.",
      },
      { status: 500 },
    )
  }
}
