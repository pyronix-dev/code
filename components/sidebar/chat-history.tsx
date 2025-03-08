"use client"

import { MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatHistoryProps {
  chats: Array<{ id: string; title: string }>
  isCollapsed?: boolean
  onSelectChat: (id: string) => void
  activeChat?: string
}

export function ChatHistory({ chats, isCollapsed = false, onSelectChat, activeChat }: ChatHistoryProps) {
  return (
    <div className="px-2">
      <div className={cn("text-xs font-semibold text-gray-400 px-2 py-2", isCollapsed && "text-center")}>
        {!isCollapsed && "Recent Chats"}
      </div>
      <div className="space-y-1">
        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={cn(
              "w-full flex items-center gap-2 px-2 py-1.5 text-gray-400 hover:text-white hover:bg-[#1a1a1a] rounded-md transition-colors text-xs",
              activeChat === chat.id && "text-white bg-[#1a1a1a]",
              isCollapsed && "justify-center",
            )}
          >
            <MessageSquare className="h-3.5 w-3.5 flex-shrink-0" />
            {!isCollapsed && <span className="truncate text-left whitespace-nowrap overflow-hidden">{chat.title}</span>}
          </button>
        ))}
      </div>
    </div>
  )
}

