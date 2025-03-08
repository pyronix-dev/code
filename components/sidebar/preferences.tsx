"use client"

import { Monitor, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PreferencesProps {
  isCollapsed?: boolean
}

export function Preferences({ isCollapsed = false }: PreferencesProps) {
  const { theme, setTheme } = useTheme()

  return (
    <div className="space-y-4 px-4">
      <div className={cn("text-xs font-semibold text-gray-400", isCollapsed && "text-center")}>
        {!isCollapsed && "Preferences"}
      </div>

      <div className="space-y-3">
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="space-y-2"
          >
            <div className="text-sm text-gray-400">Theme</div>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setTheme("light")}
                className={cn(
                  "flex items-center justify-center p-2 rounded-md transition-colors",
                  "hover:bg-gray-800/50 dark:hover:bg-gray-700/50",
                  theme === "light"
                    ? "bg-gray-800/50 text-gray-200 dark:bg-gray-700/50"
                    : "text-gray-400 dark:text-gray-500",
                )}
              >
                <Sun className="h-4 w-4" />
              </button>
              <button
                onClick={() => setTheme("dark")}
                className={cn(
                  "flex items-center justify-center p-2 rounded-md transition-colors",
                  "hover:bg-gray-800/50 dark:hover:bg-gray-700/50",
                  theme === "dark"
                    ? "bg-gray-800/50 text-gray-200 dark:bg-gray-700/50"
                    : "text-gray-400 dark:text-gray-500",
                )}
              >
                <Moon className="h-4 w-4" />
              </button>
              <button
                onClick={() => setTheme("system")}
                className={cn(
                  "flex items-center justify-center p-2 rounded-md transition-colors",
                  "hover:bg-gray-800/50 dark:hover:bg-gray-700/50",
                  theme === "system"
                    ? "bg-gray-800/50 text-gray-200 dark:bg-gray-700/50"
                    : "text-gray-400 dark:text-gray-500",
                )}
              >
                <Monitor className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}

        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="space-y-2"
          >
            <div className="text-sm text-gray-400">Language</div>
            <Select defaultValue="en">
              <SelectTrigger
                className={cn(
                  "w-full border-gray-800",
                  "bg-gray-900 dark:bg-gray-800",
                  "text-gray-400 dark:text-gray-400",
                  "hover:bg-gray-800/50 dark:hover:bg-gray-700/50",
                  "focus:ring-gray-700 dark:focus:ring-gray-600",
                )}
              >
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 dark:bg-gray-800 border-gray-800">
                <SelectItem
                  value="en"
                  className="text-gray-400 dark:text-gray-400 focus:bg-gray-800 dark:focus:bg-gray-700"
                >
                  English
                </SelectItem>
                <SelectItem
                  value="es"
                  className="text-gray-400 dark:text-gray-400 focus:bg-gray-800 dark:focus:bg-gray-700"
                >
                  Español
                </SelectItem>
                <SelectItem
                  value="fr"
                  className="text-gray-400 dark:text-gray-400 focus:bg-gray-800 dark:focus:bg-gray-700"
                >
                  Français
                </SelectItem>
              </SelectContent>
            </Select>
          </motion.div>
        )}
      </div>
    </div>
  )
}

