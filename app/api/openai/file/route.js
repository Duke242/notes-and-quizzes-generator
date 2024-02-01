import { NextResponse } from "next/server"
import OpenAI from "openai"
export async function POST(req) {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    const payload = await req.json()
    console.log({ payload })

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Explain this topic like I am 5 years old in 100 words.`,
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
