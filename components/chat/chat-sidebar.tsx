"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Settings, LogOut, MessageSquare } from "lucide-react"
import type { User } from "@supabase/supabase-js"
import { signOut } from "@/lib/actions"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

interface ChatSidebarProps {
  user: User
  currentChatId: string | null
  onChatSelect: (chatId: string | null) => void
}

export default function ChatSidebar({ user, currentChatId, onChatSelect }: ChatSidebarProps) {
  const [chats] = useState([{ id: "1", title: "Hello", date: "Monday, 18th" }])

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col"
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-700">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-2 mb-4"
        >
          <motion.div
            className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-white font-bold text-sm">AF</span>
          </motion.div>
          <span className="text-white font-semibold">AI Fiesta</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            onClick={() => onChatSelect(null)}
            className="w-full bg-slate-700 hover:bg-slate-600 text-white justify-start transition-colors duration-200"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Chat
          </Button>
        </motion.div>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mb-4">
          <h3 className="text-slate-400 text-sm font-medium mb-2">Projects</h3>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="ghost"
              className="w-full justify-start text-slate-300 hover:bg-slate-700 transition-colors duration-200"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Project
            </Button>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mb-4">
          <h3 className="text-slate-400 text-sm font-medium mb-2">Monday, 18th</h3>
          <AnimatePresence>
            {chats.map((chat, index) => (
              <motion.div
                key={chat.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-slate-300 hover:bg-slate-700 mb-1 transition-all duration-200 ${
                    currentChatId === chat.id ? "bg-slate-700 border-l-2 border-blue-500" : ""
                  }`}
                  onClick={() => onChatSelect(chat.id)}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  {chat.title}
                </Button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="p-4 border-t border-slate-700 space-y-2"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-slate-700 rounded-lg p-3 hover:bg-slate-600 transition-colors duration-200"
        >
          <div className="text-white font-medium text-sm">Free Plan</div>
          <div className="text-slate-400 text-xs">2 / 3 messages used</div>
          <div className="w-full bg-slate-600 rounded-full h-1 mt-2">
            <motion.div
              className="bg-blue-500 h-1 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "66%" }}
              transition={{ duration: 1, delay: 0.7 }}
            />
          </div>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-300">
            <Plus className="h-4 w-4 mr-2" />
            Upgrade Plan
          </Button>
        </motion.div>

        <div className="flex gap-2">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="flex-1">
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-slate-400 hover:text-white transition-colors duration-200"
              asChild
            >
              <Link href="/settings">
                <Settings className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="flex-1">
            <form action={signOut}>
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-slate-400 hover:text-white transition-colors duration-200"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}
