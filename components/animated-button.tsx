"use client"

import { forwardRef } from "react"
import { motion } from "framer-motion"
import { Button, type ButtonProps } from "@/components/ui/button"
import { buttonTap } from "@/lib/animation-variants"
import { useReducedMotion } from "@/lib/use-reduced-motion"

export const AnimatedButton = forwardRef<HTMLButtonElement, ButtonProps>(({ children, ...props }, ref) => {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return (
      <Button ref={ref} {...props}>
        {children}
      </Button>
    )
  }

  return (
    <motion.div
      whileTap={buttonTap.tap}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Button ref={ref} {...props}>
        {children}
      </Button>
    </motion.div>
  )
})

AnimatedButton.displayName = "AnimatedButton"

