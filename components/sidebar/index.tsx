"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Users, Library, FolderKanban, MessageCircle, ChevronLeft, ChevronRight, Menu, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { NavItem } from "./nav-item"
import { ChatHistory } from "./chat-history"
import { Separator } from "@/components/ui/separator"
import { AccountMenu } from "./account-menu"

const SIDEBAR_WIDTH = 240
const COLLAPSED_WIDTH = 70

interface SidebarProps {
  className?: string
  isCollapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
}

export function Sidebar({ className, isCollapsed = false, onCollapsedChange }: SidebarProps) {
  const [activeChat, setActiveChat] = useState<string>()
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  const mockChats = [
    { id: "1", title: "React Components Discussion" },
    { id: "2", title: "API Integration Help" },
    { id: "3", title: "Database Schema Design" },
  ]

  return (
    <>
      {/* Mobile hamburger menu */}
      {isMobile && !isMobileOpen && (
        <button
          onClick={() => setIsMobileOpen(true)}
          className="fixed top-4 left-4 z-50 flex h-10 w-10 items-center justify-center rounded-lg bg-[#1a1a1a] text-gray-400 hover:text-gray-200 md:hidden"
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      )}

      {/* Sidebar overlay for mobile */}
      {isMobile && isMobileOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsMobileOpen(false)} />
      )}

      <AnimatePresence>
        {(!isMobile || (isMobile && isMobileOpen)) && (
          <motion.div
            className={cn(
              "fixed left-0 top-0 bottom-0 z-40 flex flex-col bg-[#121212] border-r border-gray-800",
              className,
            )}
            initial={isMobile ? { x: -SIDEBAR_WIDTH } : false}
            animate={
              isMobile
                ? { x: isMobileOpen ? 0 : -SIDEBAR_WIDTH }
                : {
                    width: isCollapsed ? COLLAPSED_WIDTH : SIDEBAR_WIDTH,
                    transition: { duration: 0.3, ease: "easeInOut" },
                  }
            }
            exit={isMobile ? { x: -SIDEBAR_WIDTH } : undefined}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="flex-1 overflow-y-auto scrollbar-none">
              {/* New Chat button */}
              <div className="p-3">
                <button
                  className={cn(
                    "w-full flex items-center bg-[#1a1a1a] hover:bg-[#252525] text-white rounded-lg transition-colors whitespace-nowrap overflow-hidden",
                    isCollapsed ? "justify-center p-2" : "px-3 py-2",
                  )}
                >
                  <Plus className="h-4 w-4 flex-shrink-0" />
                  {!isCollapsed && <span className="ml-2 text-sm">New Chat</span>}
                </button>
              </div>

              <div className="space-y-1 px-2 py-2">
                <NavItem
                  icon={Users}
                  label="Community"
                  href="#"
                  isCollapsed={isCollapsed}
                  className="font-semibold text-white text-xs"
                />
                <NavItem
                  icon={Library}
                  label="Library"
                  href="#"
                  isCollapsed={isCollapsed}
                  className="font-semibold text-white text-xs"
                />
                <NavItem
                  icon={FolderKanban}
                  label="Projects"
                  href="#"
                  isCollapsed={isCollapsed}
                  className="font-semibold text-white text-xs"
                />
                <NavItem
                  icon={MessageCircle}
                  label="Feedback"
                  href="#"
                  isCollapsed={isCollapsed}
                  className="font-semibold text-white text-xs"
                />
              </div>

              <Separator className="my-3 bg-gray-800" />

              <ChatHistory
                chats={mockChats}
                isCollapsed={isCollapsed}
                onSelectChat={setActiveChat}
                activeChat={activeChat}
              />
            </div>

            {/* Account Menu at bottom */}
            <div className="mt-auto border-t border-gray-800">
              <AccountMenu isCollapsed={isCollapsed} />
            </div>

            {/* Collapse button */}
            {!isMobile && (
              <button
                onClick={() => onCollapsedChange?.(!isCollapsed)}
                className={cn(
                  "absolute -right-3 top-1/2 -translate-y-1/2",
                  "flex h-6 w-6 items-center justify-center rounded-full bg-[#1a1a1a] border border-gray-700",
                  "text-gray-400 hover:text-gray-200 transition-colors",
                )}
              >
                {isCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Export these constants so they can be used in other components
export { SIDEBAR_WIDTH, COLLAPSED_WIDTH }

