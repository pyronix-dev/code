"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { useChat } from "ai/react"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import { ChatMessage } from "@/components/chat-message"
import { Sidebar, SIDEBAR_WIDTH, COLLAPSED_WIDTH } from "@/components/sidebar"
import { motion } from "framer-motion"
import { useReducedMotion } from "@/lib/use-reduced-motion"
import { Code2 } from "lucide-react"
import { Mic, Search, ArrowUp } from "lucide-react"

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()
  const prefersReducedMotion = useReducedMotion()
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if running on the client-side and set isMobile based on screen width
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 768) // Adjust the breakpoint as needed
    }
  }, [])

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (input.trim() === "") {
      toast({
        title: "Empty prompt",
        description: "Please enter a prompt to continue.",
        variant: "destructive",
      })
      return
    }
    handleSubmit(e)
  }

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  }

  // Replace the single activeButton state with separate states for each button
  const [isDeepSearchActive, setIsDeepSearchActive] = useState(false)
  const [isThinkActive, setIsThinkActive] = useState(false)

  // Replace the ChatInputForm component with this updated version
  const ChatInputForm = ({
    input,
    handleInputChange,
    handleFormSubmit,
    isLoading,
  }: {
    input: string
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    isLoading: boolean
  }) => {
    return (
      <form onSubmit={handleFormSubmit} className="relative max-w-2xl mx-auto">
        <div className="bg-[#121212]/80 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden">
          <div className="flex items-center p-3">
            <button
              type="button"
              className="p-1.5 text-gray-400 hover:text-gray-300 transition-colors"
              aria-label="Voice input"
            >
              <Mic className="h-4 w-4" />
            </button>

            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="What do you want to know?"
              className="flex-1 bg-transparent border-0 focus:ring-0 focus:outline-none text-gray-200 placeholder-gray-400 text-base px-2"
            />
          </div>

          <div className="flex items-center justify-between px-3 pb-3">
            <div className="flex items-center gap-2">
              {/* Search Button */}
              <button
                type="button"
                onClick={() => setIsDeepSearchActive(!isDeepSearchActive)}
                className={`flex items-center justify-center gap-2 h-9 px-4 text-sm rounded-full transition-colors ${
                  isDeepSearchActive ? "text-white bg-[#2a2a2a]" : "text-gray-300 bg-[#1a1a1a]"
                }`}
              >
                <Search className="h-4 w-4" />
                <span>Search</span>
              </button>

              {/* Think Button */}
              <button
                type="button"
                onClick={() => setIsThinkActive(!isThinkActive)}
                className={`flex items-center justify-center gap-2 h-9 px-4 text-sm rounded-full transition-colors ${
                  isThinkActive ? "text-white bg-[#2a2a2a]" : "text-gray-300 bg-[#1a1a1a]"
                }`}
              >
                {isThinkActive ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 2C12.5523 2 13 2.44772 13 3V4C13 4.55228 12.5523 5 12 5C11.4477 5 11 4.55228 11 4V3C11 2.44772 11.4477 2 12 2Z"
                      fill="currentColor"
                    />
                    <path
                      d="M12 7C9.23858 7 7 9.23858 7 12C7 13.3613 7.55086 14.5872 8.45501 15.4323C8.60401 15.7706 8.75894 16.0698 8.87843 16.2863C9.12048 16.7015 9.34846 17 9.5 17H14.5C14.6515 17 14.8795 16.7015 15.1216 16.2863C15.2411 16.0698 15.396 15.7706 15.545 15.4323C16.4491 14.5872 17 13.3613 17 12C17 9.23858 14.7614 7 12 7Z"
                      fill="currentColor"
                    />
                    <path
                      d="M9.5 18C9.5 18 9 19.5 9 20C9 20.5523 9.44772 21 10 21H14C14.5523 21 15 20.5523 15 20C15 19.5 14.5 18 14.5 18H9.5Z"
                      fill="currentColor"
                    />
                    <path
                      d="M5 11C5.55228 11 6 11.4477 6 12C6 12.5523 5.55228 13 5 13C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11Z"
                      fill="currentColor"
                    />
                    <path
                      d="M19 11C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13C18.4477 13 18 12.5523 18 12C18 11.4477 18.4477 11 19 11Z"
                      fill="currentColor"
                    />
                    <path
                      d="M7.05025 7.05025C7.44077 6.65973 8.07394 6.65973 8.46446 7.05025C8.85499 7.44077 8.85499 8.07394 8.46446 8.46446C8.07394 8.85499 7.44077 8.85499 7.05025 8.46446C6.65973 8.07394 6.65973 7.44077 7.05025 7.05025Z"
                      fill="currentColor"
                    />
                    <path
                      d="M15.5355 7.05025C15.9261 7.44077 15.9261 8.07394 15.5355 8.46446C15.145 8.85499 14.5118 8.85499 14.1213 8.46446C13.7308 8.07394 13.7308 7.44077 14.1213 7.05025C14.5118 6.65973 15.145 6.65973 15.5355 7.05025Z"
                      fill="currentColor"
                    />
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 2C12.5523 2 13 2.44772 13 3V4C13 4.55228 12.5523 5 12 5C11.4477 5 11 4.55228 11 4V3C11 2.44772 11.4477 2 12 2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 7C9.23858 7 7 9.23858 7 12C7 13.3613 7.55086 14.5872 8.45501 15.4323C8.60401 15.7706 8.75894 16.0698 8.87843 16.2863C9.12048 16.7015 9.34846 17 9.5 17H14.5C14.6515 17 14.8795 16.7015 15.1216 16.2863C15.2411 16.0698 15.396 15.7706 15.545 15.4323C16.4491 14.5872 17 13.3613 17 12C17 9.23858 14.7614 7 12 7Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.5 18C9.5 18 9 19.5 9 20C9 20.5523 9.44772 21 10 21H14C14.5523 21 15 20.5523 15 20C15 19.5 14.5 18 14.5 18H9.5Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5 11C5.55228 11 6 11.4477 6 12C6 12.5523 5.55228 13 5 13C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M19 11C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13C18.4477 13 18 12.5523 18 12C18 11.4477 18.4477 11 19 11Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.05025 7.05025C7.44077 6.65973 8.07394 6.65973 8.46446 7.05025C8.85499 7.44077 8.85499 8.07394 8.46446 8.46446C8.07394 8.85499 7.44077 8.85499 7.05025 8.46446C6.65973 8.07394 6.65973 7.44077 7.05025 7.05025Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15.5355 7.05025C15.9261 7.44077 15.9261 8.07394 15.5355 8.46446C15.145 8.85499 14.5118 8.85499 14.1213 8.46446C13.7308 8.07394 13.7308 7.44077 14.1213 7.05025C14.5118 6.65973 15.145 6.65973 15.5355 7.05025Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
                <span>Think</span>
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="p-1.5 text-gray-400 hover:text-gray-300 transition-colors disabled:opacity-50"
              aria-label="Submit"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </form>
    )
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-black">
      <Sidebar isCollapsed={isSidebarCollapsed} onCollapsedChange={setIsSidebarCollapsed} />

      <motion.main
        className="flex-1 flex flex-col w-full md:w-[calc(100%-var(--sidebar-width))] md:ml-[var(--sidebar-width)]"
        initial={false}
        animate={
          {
            "--sidebar-width": `${isSidebarCollapsed ? COLLAPSED_WIDTH : SIDEBAR_WIDTH}px`,
          } as any
        }
        style={{
          marginLeft: isMobile ? 0 : undefined,
        }}
      >
        {messages.length > 0 ? (
          <div className="flex-1 container max-w-4xl mx-auto px-4 py-4 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <ChatMessage key={index} message={message} index={index} />
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
        ) : (
          // In the empty state section, replace the ChatInputForm with a wrapped version that has the initial animation
          // but won't re-animate on button clicks
          <div className="flex-1 flex items-center justify-center">
            <div className="container max-w-4xl mx-auto px-4 py-4">
              <motion.div
                className="text-center space-y-4 w-full mb-8"
                initial={prefersReducedMotion ? {} : { opacity: 0 }}
                animate={prefersReducedMotion ? {} : { opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div className="flex justify-center" variants={cardVariants}>
                  <motion.div className="bg-gray-200 dark:bg-[#121212] p-2 rounded-full">
                    <Code2 className="h-8 w-8 text-gray-700 dark:text-gray-300" />
                  </motion.div>
                </motion.div>
                <motion.div className="space-y-1" variants={cardVariants}>
                  <h2 className="text-xl font-bold tracking-tight">Welcome to CodeAI</h2>
                  <p className="text-muted-foreground text-sm max-w-md mx-auto">
                    Your AI-powered coding assistant. Ask questions, get code examples, debug issues, and more.
                  </p>
                </motion.div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <ChatInputForm
                  input={input}
                  handleInputChange={handleInputChange}
                  handleFormSubmit={handleFormSubmit}
                  isLoading={isLoading}
                />
              </motion.div>
            </div>
          </div>
        )}
      </motion.main>
      <Toaster />
    </div>
  )
}