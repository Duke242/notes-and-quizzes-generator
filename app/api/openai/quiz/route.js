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
          content: `You are an excellent teacher. Give me a quiz based on the title and notes, using 3 questions and do not use more than 500 words. And use short answer questions. Single space the answer. Do not give the answers. Do not restate the notes, just give the quiz questions.`,
        },
        {
          role: "user",
          content: `Title: ${payload.title} and content: ${payload.explanation}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
      top_p: 1,
    })
    return NextResponse.json({ response }, { status: 201 })
  } catch (error) {
    console.error("Error fetching explanation:", error)
    NextResponse.json("OpenAIError")
  }
}
