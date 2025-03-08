"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { User2, Settings, CreditCard, LogOut, Moon, Sun, Monitor, Languages } from "lucide-react"
import { useTheme } from "next-themes"

export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  const menuVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.1 },
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.2 },
    },
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1a1a1a] hover:bg-[#252525] transition-colors"
      >
        <User2 className="h-5 w-5 text-gray-400" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={menuVariants}
              className="absolute right-0 top-14 z-50 w-80 rounded-xl border border-gray-800 bg-[#121212] p-4 shadow-lg"
            >
              <div className="mb-4">
                <div className="flex items-center gap-3 pb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1a1a1a]">
                    <User2 className="h-5 w-5 text-gray-400" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-200">admin@example.com</div>
                    <div className="text-xs text-gray-400">Free Plan</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="mb-2 px-2 text-xs font-semibold text-gray-400">Account</div>
                  <div className="space-y-1">
                    <button
                      onClick={() => {}}
                      className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-gray-300 hover:bg-[#1a1a1a] transition-colors"
                    >
                      <CreditCard className="h-4 w-4" />
                      <span className="text-sm">Billing</span>
                    </button>
                    <button
                      onClick={() => {}}
                      className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-gray-300 hover:bg-[#1a1a1a] transition-colors"
                    >
                      <Settings className="h-4 w-4" />
                      <span className="text-sm">Settings</span>
                    </button>
                  </div>
                </div>

                <div>
                  <div className="mb-2 px-2 text-xs font-semibold text-gray-400">Appearance</div>
                  <div className="space-y-1">
                    <button
                      onClick={() => setTheme("light")}
                      className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-gray-300 hover:bg-[#1a1a1a] transition-colors"
                    >
                      <Sun className="h-4 w-4" />
                      <span className="text-sm">Light</span>
                    </button>
                    <button
                      onClick={() => setTheme("dark")}
                      className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-gray-300 hover:bg-[#1a1a1a] transition-colors"
                    >
                      <Moon className="h-4 w-4" />
                      <span className="text-sm">Dark</span>
                    </button>
                    <button
                      onClick={() => setTheme("system")}
                      className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-gray-300 hover:bg-[#1a1a1a] transition-colors"
                    >
                      <Monitor className="h-4 w-4" />
                      <span className="text-sm">System</span>
                    </button>
                  </div>
                </div>

                <div>
                  <div className="mb-2 px-2 text-xs font-semibold text-gray-400">Language</div>
                  <button
                    onClick={() => {}}
                    className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-gray-300 hover:bg-[#1a1a1a] transition-colors"
                  >
                    <Languages className="h-4 w-4" />
                    <span className="text-sm">English</span>
                  </button>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {}}
                    className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-gray-300 hover:bg-[#1a1a1a] transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="text-sm">Sign Out</span>
                  </button>
                </div>

                <div className="border-t border-gray-800 pt-4">
                  <button
                    onClick={() => {}}
                    className="w-full rounded-lg bg-[#1a1a1a] px-4 py-2 text-sm text-gray-200 hover:bg-[#252525] transition-colors"
                  >
                    Upgrade Plan
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

