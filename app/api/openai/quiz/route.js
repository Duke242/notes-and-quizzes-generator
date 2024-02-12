import { NextResponse } from "next/server"
import OpenAI from "openai"
export async function POST(req) {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    const payload = await req.json()

    console.log({ QUIZ: payload })

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are an excellent teacher. This is what I know about ${payload.title}, ${payload.explanation}. Give me a short quiz to reinforce my learning. Only return the questions and nothing else."
          `,
        },
        {
          role: "user",
          content: `Title: ${payload.title} and content: ${payload.explanation}`,
        },
      ],
      temperature: 0,
      max_tokens: 3500,
    })
    return NextResponse.json({ response }, { status: 201 })
  } catch (error) {
    console.error("Error fetching explanation:", error)
    NextResponse.json("OpenAIError")
  }
}
