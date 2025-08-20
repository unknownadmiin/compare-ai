"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, ThumbsUp, ThumbsDown, MoreHorizontal } from "lucide-react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface AIModel {
  id: string
  name: string
  icon: string
  description: string
  enabled: boolean
}

interface AIModelCardProps {
  model: AIModel
  response: string
  isLoading: boolean
}

export default function AIModelCard({ model, response, isLoading }: AIModelCardProps) {
  const [copied, setCopied] = useState(false)
  const [displayedResponse, setDisplayedResponse] = useState("")

  useEffect(() => {
    if (response && !isLoading) {
      let index = 0
      setDisplayedResponse("")
      const timer = setInterval(() => {
        if (index < response.length) {
          setDisplayedResponse(response.slice(0, index + 1))
          index++
        } else {
          clearInterval(timer)
        }
      }, 20)
      return () => clearInterval(timer)
    }
  }, [response, isLoading])

  const handleCopy = async () => {
    if (response) {
      await navigator.clipboard.writeText(response)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="bg-slate-800 border-slate-700 h-full flex flex-col hover:border-slate-600 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
              <motion.span
                className="text-lg"
                animate={{ rotate: isLoading ? 360 : 0 }}
                transition={{ duration: 2, repeat: isLoading ? Number.POSITIVE_INFINITY : 0, ease: "linear" }}
              >
                {model.icon}
              </motion.span>
              <div>
                <h3 className="text-white font-medium text-sm">{model.name}</h3>
                <p className="text-slate-400 text-xs">{model.description}</p>
              </div>
            </motion.div>
            <div className="flex items-center gap-1">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopy}
                  disabled={!response}
                  className="text-slate-400 hover:text-white transition-colors duration-200"
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-slate-400 hover:text-white transition-colors duration-200"
                >
                  <MoreHorizontal className="h-3 w-3" />
                </Button>
              </motion.div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col">
          <div className="flex-1 min-h-0">
            <AnimatePresence mode="wait">
              {isLoading && !response ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-2"
                >
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="h-3 bg-slate-700 rounded"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: i * 0.2 }}
                    />
                  ))}
                </motion.div>
              ) : response ? (
                <motion.div
                  key="response"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap overflow-y-auto"
                >
                  {displayedResponse}
                  {isLoading && (
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                      className="inline-block w-2 h-4 bg-blue-400 ml-1"
                    />
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-slate-500 text-sm italic"
                >
                  Send a message to see {model.name}'s response
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {response && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-between mt-4 pt-3 border-t border-slate-700"
              >
                <div className="flex items-center gap-2">
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-slate-400 hover:text-green-400 transition-colors duration-200"
                    >
                      <ThumbsUp className="h-3 w-3" />
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-slate-400 hover:text-red-400 transition-colors duration-200"
                    >
                      <ThumbsDown className="h-3 w-3" />
                    </Button>
                  </motion.div>
                </div>
                <AnimatePresence>
                  {copied && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="text-green-400 text-xs"
                    >
                      Copied!
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  )
}
