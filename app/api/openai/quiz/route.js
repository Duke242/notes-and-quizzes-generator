import { NextResponse } from "next/server"
import OpenAI from "openai"
export async function POST(req) {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    const payload = await req.json()

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Give me a quiz about the user content, using 5 questions`,
        },
        {
          role: "user",
          content: `${payload.title}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
    })
    return NextResponse.json({ response }, { status: 201 })
  } catch (error) {
    console.error("Error fetching explanation:", error)
    NextResponse.json("OpenAIError")
  }
}
