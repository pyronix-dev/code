"use client"

import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface NavItemProps {
  icon: LucideIcon
  label: string
  href: string
  isActive?: boolean
  isCollapsed?: boolean
  onClick?: () => void
  className?: string
}

export function NavItem({
  icon: Icon,
  label,
  href,
  isActive = false,
  isCollapsed = false,
  onClick,
  className,
}: NavItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-white hover:bg-[#1a1a1a] rounded-md transition-colors",
        isActive && "text-white bg-[#1a1a1a]",
        isCollapsed && "justify-center px-2",
        className,
      )}
    >
      <Icon className="h-4 w-4 flex-shrink-0" />

      {!isCollapsed && <span className="text-sm whitespace-nowrap overflow-hidden">{label}</span>}
    </Link>
  )
}

