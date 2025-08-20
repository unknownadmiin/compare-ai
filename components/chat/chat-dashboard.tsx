"use client"

import { useState } from "react"
import type { User } from "@supabase/supabase-js"
import ChatSidebar from "./chat-sidebar"
import MultiAIChat from "./multi-ai-chat"

interface ChatDashboardProps {
  user: User
}

export default function ChatDashboard({ user }: ChatDashboardProps) {
  const [currentChatId, setCurrentChatId] = useState<string | null>(null)

  return (
    <div className="flex h-screen bg-slate-900">
      <ChatSidebar user={user} currentChatId={currentChatId} onChatSelect={setCurrentChatId} />
      <MultiAIChat user={user} chatId={currentChatId} onNewChat={() => setCurrentChatId(null)} />
    </div>
  )
}
