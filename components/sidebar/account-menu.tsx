"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CreditCard, Settings, LogOut, ChevronDown, Monitor, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

interface AccountMenuProps {
  isCollapsed?: boolean
  email?: string
  username?: string
  plan?: string
}

export function AccountMenu({
  isCollapsed = false,
  email = "xelase2948@kaiav.com",
  username = "xelase2948-kaiavcom",
  plan = "Free",
}: AccountMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  const menuVariants = {
    hidden: {
      opacity: 0,
      y: 10,
      transition: { duration: 0.2 },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2 },
    },
  }

  return (
    <div className="relative">
      {/* Account Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center gap-2 p-2 hover:bg-[#1a1a1a] transition-colors",
          isOpen && "bg-[#1a1a1a]",
          isCollapsed && "justify-center",
        )}
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-lime-300 flex-shrink-0">
          <span className="text-xs font-medium text-white">{username.charAt(0).toUpperCase()}</span>
        </div>

        {!isCollapsed && (
          <>
            <div className="flex-1 text-left overflow-hidden">
              <div className="text-xs font-semibold text-white truncate">{username}</div>
              <div className="text-xs text-gray-500">{plan}</div>
            </div>
            <ChevronDown
              className={cn("h-3 w-3 text-gray-400 transition-transform flex-shrink-0", isOpen && "rotate-180")}
            />
          </>
        )}
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && !isCollapsed && (
          <>
            <div className="fixed inset-0 z-50" onClick={() => setIsOpen(false)} />
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={menuVariants}
              className="absolute bottom-full left-0 z-50 w-full mb-1 rounded-lg border border-gray-800 bg-[#121212] shadow-lg"
            >
              <div className="p-2">
                <div className="text-xs text-gray-400 mb-2">{email}</div>

                <div className="flex items-center gap-2 mb-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-lime-300">
                    <span className="text-xs font-medium text-white">{username.charAt(0).toUpperCase()}</span>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">{username}</div>
                    <div className="text-xs text-gray-500">{plan}</div>
                  </div>
                </div>

                <button
                  onClick={() => {}}
                  className="w-full py-1.5 text-xs font-semibold text-white bg-[#1a1a1a] hover:bg-[#252525] rounded-md transition-colors mb-2"
                >
                  Switch Team
                </button>

                <div className="space-y-0.5">
                  <button
                    onClick={() => {}}
                    className="w-full flex items-center gap-2 px-1 py-1.5 text-xs font-semibold text-gray-300 hover:text-white transition-colors"
                  >
                    <CreditCard className="h-4 w-4" />
                    <span>Billing</span>
                  </button>
                  <button
                    onClick={() => {}}
                    className="w-full flex items-center gap-2 px-1 py-1.5 text-xs font-semibold text-gray-300 hover:text-white transition-colors"
                  >
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </button>
                  <button
                    onClick={() => {}}
                    className="w-full flex items-center gap-2 px-1 py-1.5 text-xs font-semibold text-gray-300 hover:text-white transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-800 mt-1">
                <div className="p-3 space-y-3">
                  <div className="text-sm text-gray-500">Preferences</div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="text-[15px] text-white">Theme</div>
                      <div className="flex bg-[#1a1a1a] rounded-full p-0.5">
                        <button
                          onClick={() => setTheme("system")}
                          className={cn(
                            "flex items-center justify-center h-7 w-7 rounded-full transition-colors",
                            theme === "system" ? "bg-[#252525] text-white" : "text-gray-400 hover:text-white",
                          )}
                        >
                          <Monitor className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setTheme("light")}
                          className={cn(
                            "flex items-center justify-center h-7 w-7 rounded-full transition-colors",
                            theme === "light" ? "bg-[#252525] text-white" : "text-gray-400 hover:text-white",
                          )}
                        >
                          <Sun className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setTheme("dark")}
                          className={cn(
                            "flex items-center justify-center h-7 w-7 rounded-full transition-colors",
                            theme === "dark" ? "bg-[#252525] text-white" : "text-gray-400 hover:text-white",
                          )}
                        >
                          <Moon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-[15px] text-white">Language</div>
                      <button
                        onClick={() => {}}
                        className="flex items-center gap-1 py-1.5 px-3 text-sm text-white bg-[#1a1a1a] rounded-lg"
                      >
                        <span>English</span>
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-2">
                <button
                  onClick={() => {}}
                  className="w-full py-1.5 text-xs font-semibold text-[#121212] bg-white hover:bg-gray-100 rounded-md transition-colors"
                >
                  Upgrade Plan
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

