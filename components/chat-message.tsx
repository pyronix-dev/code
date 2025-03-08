"use client"

import type { Message } from "ai"
import { User, Bot } from "lucide-react"
import { cn } from "@/lib/utils"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"
import { useReducedMotion } from "@/lib/use-reduced-motion"

interface ChatMessageProps {
  message: Message
  index: number
}

export function ChatMessage({ message, index }: ChatMessageProps) {
  const { toast } = useToast()
  const isUser = message.role === "user"
  const prefersReducedMotion = useReducedMotion()

  // Function to extract code blocks from markdown
  const renderMessageContent = (content: string) => {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g
    const parts = []
    let lastIndex = 0
    let match

    while ((match = codeBlockRegex.exec(content)) !== null) {
      // Add text before code block
      if (match.index > lastIndex) {
        parts.push(
          <p key={`text-${lastIndex}`} className="whitespace-pre-wrap">
            {content.slice(lastIndex, match.index)}
          </p>,
        )
      }

      // Add code block
      const language = match[1] || "javascript"
      const code = match[2]

      parts.push(
        <motion.div
          key={`code-${match.index}`}
          className="relative my-4 rounded-md overflow-hidden"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
          animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <div className="bg-gray-800 text-gray-200 text-xs py-1 px-4 flex justify-between items-center">
            <span>{language}</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 text-xs"
              onClick={() => {
                navigator.clipboard.writeText(code)
                toast({
                  title: "Code copied to clipboard",
                  duration: 2000,
                })
              }}
            >
              Copy
            </Button>
          </div>
          <SyntaxHighlighter
            language={language}
            style={vscDarkPlus}
            customStyle={{ margin: 0, borderRadius: "0 0 0.375rem 0.375rem" }}
          >
            {code}
          </SyntaxHighlighter>
        </motion.div>,
      )

      lastIndex = match.index + match[0].length
    }

    // Add remaining text
    if (lastIndex < content.length) {
      parts.push(
        <p key={`text-${lastIndex}`} className="whitespace-pre-wrap">
          {content.slice(lastIndex)}
        </p>,
      )
    }

    return parts
  }

  return (
    <motion.div
      className={cn(
        "flex gap-3 p-4 rounded-lg",
        isUser ? "bg-gray-200/80 dark:bg-gray-900/50" : "bg-gray-100/80 dark:bg-gray-800/50",
      )}
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: index * 0.1,
        ease: "easeOut",
      }}
    >
      <motion.div
        className="flex-shrink-0"
        initial={prefersReducedMotion ? {} : { scale: 0.8, opacity: 0 }}
        animate={prefersReducedMotion ? {} : { scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: index * 0.1 + 0.1 }}
      >
        {isUser ? (
          <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white">
            <User className="h-5 w-5" />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-gray-100">
            <Bot className="h-5 w-5" />
          </div>
        )}
      </motion.div>
      <div className="flex-1 space-y-2">
        <div className="font-medium">{isUser ? "You" : "CodeAI"}</div>
        <motion.div
          className="prose dark:prose-invert max-w-none"
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          animate={prefersReducedMotion ? {} : { opacity: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
        >
          {renderMessageContent(message.content)}
        </motion.div>
      </div>
    </motion.div>
  )
}

