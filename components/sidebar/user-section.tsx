"use client"

interface UserSectionProps {
  email?: string
  teamName?: string
  isCollapsed?: boolean
}

export function UserSection({
  email = "admin@example.com",
  teamName = "CodeAI",
  isCollapsed = false,
}: UserSectionProps) {
  return null
}

