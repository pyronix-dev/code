import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = streamText({
    model: openai("gpt-4o"),
    system: `You are CodeAI, an expert coding assistant specialized in web development.
    - Provide clear, concise, and accurate code examples
    - Explain your code thoroughly
    - Format code blocks with proper syntax highlighting using markdown triple backticks
    - When appropriate, suggest best practices and potential improvements
    - Focus on modern web technologies like React, Next.js, TypeScript, and Tailwind CSS
    - Always provide complete, working solutions that follow best practices`,
    messages,
  })

  return result.toDataStreamResponse()
}

