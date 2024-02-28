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
          content:
            "You are an excellent teacher at all levels that is the most capable of explaining complex topics simply. Explain this concept in simple terms, {input}. If applicable give an example.",
        },
        {
          role: "user",
          content: `${payload.title}`,
        },
      ],
      temperature: 0,
      max_tokens: 3500,
    })

    console.log({ r: response.choices[0].message.content })
    return NextResponse.json({
      content: response.choices[0].message.content,
      status: 201,
    })
  } catch (error) {
    console.error("Error fetching explanation:", error)
    return NextResponse.json({ content: "OpenAIError", status: 500 })
  }
}
