import { streamText } from "ai"
import { xai } from "@ai-sdk/xai"
import type { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json()

    if (!prompt) {
      return new Response("Prompt is required", { status: 400 })
    }

    const result = streamText({
      model: xai("grok-beta", {
        apiKey: process.env.XAI_API_KEY,
      }),
      prompt: prompt,
      system:
        "You are Grok, a helpful and witty AI assistant created by xAI. Provide helpful, accurate, and engaging responses.",
    })

    return result.toTextStreamResponse()
  } catch (error) {
    console.error("Error generating text:", error)
    return new Response("Failed to generate response", { status: 500 })
  }
}
