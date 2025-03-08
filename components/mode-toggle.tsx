"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import { useReducedMotion } from "@/lib/use-reduced-motion"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()
  const prefersReducedMotion = useReducedMotion()

  const iconVariants = {
    initial: {
      rotate: -30,
      opacity: 0,
      scale: 0.5,
    },
    animate: {
      rotate: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      rotate: 30,
      opacity: 0,
      scale: 0.5,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            {theme !== "dark" ? (
              <motion.div
                key="sun"
                className="absolute inset-0 flex items-center justify-center"
                initial={prefersReducedMotion ? {} : iconVariants.initial}
                animate={prefersReducedMotion ? {} : iconVariants.animate}
                exit={prefersReducedMotion ? {} : iconVariants.exit}
              >
                <Sun className="h-[1.2rem] w-[1.2rem]" />
              </motion.div>
            ) : (
              <motion.div
                key="moon"
                className="absolute inset-0 flex items-center justify-center"
                initial={prefersReducedMotion ? {} : iconVariants.initial}
                animate={prefersReducedMotion ? {} : iconVariants.animate}
                exit={prefersReducedMotion ? {} : iconVariants.exit}
              >
                <Moon className="h-[1.2rem] w-[1.2rem]" />
              </motion.div>
            )}
          </AnimatePresence>
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

