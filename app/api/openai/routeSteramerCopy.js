import { NextResponse } from "next/server"
import OpenAI from "openai"
import { createSession } from "better-sse"

export async function POST(req, res) {
  try {
    const payload = req.json()
    console.log({ payload })
    // console.log({ req })
    // const { query } = req
    // if (!query) {
    //   throw new Error("Query parameters are missing")
    // }
    // const { title } = query
    // if (!title) {
    //   throw new Error("Title parameter is missing")
    // }
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
    // const session = await createSession(req, res)
    // if (!session.isConnected) throw new Error("Not connected")

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Explain this topic like I am 5 years old in 100 words.",
        },
        {
          role: "user",
          content: `${payload.title}`,
        },
      ],
      stream: false,
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
    })
    NextResponse.json({ response: completion.choices[0] })
  } catch (error) {
    console.error("Error processing request", error)
    NextResponse.error("Internal Server Error")
  }
}

// data.on("data", (text) => {
//   const lines = text
//     .toString()
//     .split("\n")
//     .filter((line) => line.trim() !== "")
//   for (const line of lines) {
//     const message = line.replace(/^data:  /, "")
//     if (message === "[DONE]") {
//       session.push("DONE", "error")
//       return
//     }

// try {
//   const { choices } = JSON.parse(message)
//   session.push({ text: choices[0].text })
//   console.log({ choices })
// } catch (err) {
//   console.log(err)
// }

// Connection is closed
//   data.on("close", () => {
//     console.log("close")
//     res.end()
//   })

//   data.on("error", (err) => {
//     console.error(err)
//   })
// } catch (error) {
//   console.error(error)
//   res.status(500).end()
// }
