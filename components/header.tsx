"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { AnimatedButton } from "@/components/animated-button"
import { ModeToggle } from "@/components/mode-toggle"
import { useReducedMotion } from "@/lib/use-reduced-motion"

export function Header() {
  const prefersReducedMotion = useReducedMotion()

  const headerVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  const logoVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        delay: 0.3,
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  const buttonsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.4,
        staggerChildren: 0.1,
      },
    },
  }

  const buttonVariants = {
    hidden: { y: -10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.header
      className="border-b bg-white dark:bg-black"
      initial={prefersReducedMotion ? {} : headerVariants.hidden}
      animate={prefersReducedMotion ? {} : headerVariants.visible}
    >
      <div className="container flex h-16 items-center justify-between px-4">
        <motion.div
          className="flex items-center gap-2"
          initial={prefersReducedMotion ? {} : logoVariants.hidden}
          animate={prefersReducedMotion ? {} : logoVariants.visible}
        >
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold">CodeAI</span>
          </Link>
        </motion.div>
        <motion.div
          className="flex items-center gap-2"
          initial={prefersReducedMotion ? {} : buttonsContainerVariants.hidden}
          animate={prefersReducedMotion ? {} : buttonsContainerVariants.visible}
          variants={buttonsContainerVariants}
        >
          <motion.div variants={buttonVariants}>
            <ModeToggle />
          </motion.div>
          <motion.div variants={buttonVariants}>
            <AnimatedButton variant="outline" size="sm" asChild>
              <Link href="#">Sign In</Link>
            </AnimatedButton>
          </motion.div>
          <motion.div variants={buttonVariants}>
            <AnimatedButton size="sm" asChild>
              <Link href="#">Sign Up</Link>
            </AnimatedButton>
          </motion.div>
        </motion.div>
      </div>
    </motion.header>
  )
}

