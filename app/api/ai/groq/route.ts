import { streamText } from "ai"
import { groq } from "@ai-sdk/groq"
import type { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json()

    if (!prompt) {
      return new Response("Prompt is required", { status: 400 })
    }

    const result = streamText({
      model: groq("llama-3.3-70b-versatile", {
        apiKey: process.env.GROQ_API_KEY,
      }),
      prompt: prompt,
      system:
        "You are a helpful AI assistant powered by Groq's lightning-fast inference. Provide accurate, helpful, and concise responses.",
    })

    return result.toTextStreamResponse()
  } catch (error) {
    console.error("Error generating text:", error)
    return new Response("Failed to generate response", { status: 500 })
  }
}
