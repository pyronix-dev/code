"use client"

import { Code2, Sparkles, Lightbulb } from "lucide-react"
import { motion } from "framer-motion"
import { useReducedMotion } from "@/lib/use-reduced-motion"

export function EmptyState() {
  const prefersReducedMotion = useReducedMotion()

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  const iconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.1,
      },
    },
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

  return (
    <div className="text-center space-y-6 w-full">
      <motion.div className="flex justify-center" variants={itemVariants}>
        <motion.div className="bg-gray-200 dark:bg-gray-800 p-3 rounded-full" variants={iconVariants}>
          <Code2 className="h-10 w-10 text-gray-700 dark:text-gray-300" />
        </motion.div>
      </motion.div>
      <motion.div className="space-y-2" variants={itemVariants}>
        <h2 className="text-2xl font-bold tracking-tight">Welcome to CodeAI</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Your AI-powered coding assistant. Ask questions, get code examples, debug issues, and more.
        </p>
      </motion.div>

      <motion.div className="grid gap-4 md:grid-cols-3 max-w-3xl mx-auto">
        <motion.div
          className="bg-card border rounded-lg p-4 text-left"
          variants={cardVariants}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <Sparkles className="h-5 w-5 text-gray-600 dark:text-gray-400 mb-2" />
          <h3 className="font-medium">Code Generation</h3>
          <p className="text-sm text-muted-foreground">Generate code snippets, components, or entire applications</p>
        </motion.div>

        <motion.div
          className="bg-card border rounded-lg p-4 text-left"
          variants={cardVariants}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <Code2 className="h-5 w-5 text-gray-600 dark:text-gray-400 mb-2" />
          <h3 className="font-medium">Debugging Help</h3>
          <p className="text-sm text-muted-foreground">Identify and fix bugs in your code with detailed explanations</p>
        </motion.div>

        <motion.div
          className="bg-card border rounded-lg p-4 text-left"
          variants={cardVariants}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <Lightbulb className="h-5 w-5 text-gray-600 dark:text-gray-400 mb-2" />
          <h3 className="font-medium">Learning Resources</h3>
          <p className="text-sm text-muted-foreground">Get explanations and examples for programming concepts</p>
        </motion.div>
      </motion.div>
    </div>
  )
}

