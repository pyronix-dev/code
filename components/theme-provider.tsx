"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"
import { AnimatePresence } from "framer-motion"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <AnimatePresence mode="wait">{children}</AnimatePresence>
    </NextThemesProvider>
  )
}

