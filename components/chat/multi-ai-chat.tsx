"use client"

import type React from "react"

import { useState } from "react"
import type { User } from "@supabase/supabase-js"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send, Mic, Settings, ImageIcon, Copy, RefreshCw } from "lucide-react"
import AIModelCard from "./ai-model-card"
import ModelSettingsModal from "./model-settings-modal"
import { useAIModels } from "@/hooks/use-ai-models"
import { motion, AnimatePresence } from "framer-motion"

interface MultiAIChatProps {
  user: User
  chatId: string | null
  onNewChat: () => void
}

export default function MultiAIChat({ user, chatId, onNewChat }: MultiAIChatProps) {
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [responses, setResponses] = useState<Record<string, string>>({})
  const [showModelSettings, setShowModelSettings] = useState(false)

  const { models, enabledModels, toggleModel } = useAIModels()

  const handleSendMessage = async () => {
    if (!message.trim() || isLoading) return

    setIsLoading(true)
    const currentMessage = message
    setMessage("")

    // Clear previous responses
    setResponses({})

    // Send to all enabled models simultaneously
    const promises = enabledModels.map(async (model) => {
      try {
        const response = await fetch(`/api/ai/${model.id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: currentMessage }),
        })

        if (!response.ok) throw new Error(`Failed to get response from ${model.name}`)

        const reader = response.body?.getReader()
        if (!reader) throw new Error("No reader available")

        let fullResponse = ""
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = new TextDecoder().decode(value)
          const lines = chunk.split("\n")

          for (const line of lines) {
            if (line.startsWith("0:")) {
              const content = line.slice(2).replace(/^"|"$/g, "")
              fullResponse += content
              setResponses((prev) => ({
                ...prev,
                [model.id]: fullResponse,
              }))
            }
          }
        }
      } catch (error) {
        console.error(`Error with ${model.name}:`, error)
        setResponses((prev) => ({
          ...prev,
          [model.id]: `Error: Failed to get response from ${model.name}`,
        }))
      }
    })

    await Promise.all(promises)
    setIsLoading(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleUpgrade = () => {
    console.log("Upgrade to premium")
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="border-b border-slate-700 p-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <AnimatePresence>
              {enabledModels.map((model, index) => (
                <motion.div
                  key={model.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 px-3 py-1 bg-slate-800 rounded-full border border-slate-600 hover:border-slate-500 transition-colors duration-200"
                  >
                    <span className="text-sm">{model.icon}</span>
                    <span className="text-white text-sm font-medium">{model.name}</span>
                    <motion.div
                      className="w-2 h-2 bg-green-500 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-slate-400 hover:text-white transition-colors duration-200"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-slate-400 hover:text-white transition-colors duration-200"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="sm"
              className="text-slate-400 hover:text-white transition-colors duration-200"
              onClick={() => setShowModelSettings(true)}
            >
              <Settings className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Chat Area */}
      <div className="flex-1 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="h-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 p-4"
        >
          <AnimatePresence>
            {enabledModels.map((model, index) => (
              <motion.div
                key={model.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <AIModelCard model={model} response={responses[model.id] || ""} isLoading={isLoading} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Input Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="border-t border-slate-700 p-4"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div className="relative" whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
              className="min-h-[60px] bg-slate-800 border-slate-600 text-white placeholder:text-slate-400 pr-20 resize-none focus:border-blue-500 transition-colors duration-200"
              disabled={isLoading}
            />
            <div className="absolute bottom-3 right-3 flex items-center gap-2">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-slate-400 hover:text-white transition-colors duration-200"
                >
                  <ImageIcon className="h-4 w-4" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-slate-400 hover:text-white transition-colors duration-200"
                >
                  <Mic className="h-4 w-4" />
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={isLoading ? { rotate: 360 } : {}}
                transition={{ duration: 1, repeat: isLoading ? Number.POSITIVE_INFINITY : 0 }}
              >
                <Button
                  onClick={handleSendMessage}
                  disabled={!message.trim() || isLoading}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white transition-colors duration-200"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xs text-slate-500 mt-2 text-center"
          >
            Press Enter to send, Shift+Enter for new line
          </motion.div>
        </div>
      </motion.div>

      <ModelSettingsModal
        isOpen={showModelSettings}
        onClose={() => setShowModelSettings(false)}
        models={models}
        onModelToggle={toggleModel}
        onUpgrade={handleUpgrade}
      />
    </div>
  )
}
