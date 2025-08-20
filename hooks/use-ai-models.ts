"use client"

import { useState, useCallback, useEffect } from "react"

interface AIModel {
  id: string
  name: string
  icon: string
  description: string
  enabled: boolean
  isPremium?: boolean
  provider: string
}

const DEFAULT_MODELS: AIModel[] = [
  {
    id: "grok",
    name: "Grok 4",
    icon: "🤖",
    description: "xAI's conversational AI",
    enabled: true,
    isPremium: false,
    provider: "xAI",
  },
  {
    id: "groq",
    name: "Groq Llama",
    icon: "⚡",
    description: "Lightning fast inference",
    enabled: true,
    isPremium: false,
    provider: "Groq",
  },
  {
    id: "chatgpt",
    name: "ChatGPT 5",
    icon: "🧠",
    description: "OpenAI's most capable model",
    enabled: false,
    isPremium: true,
    provider: "OpenAI",
  },
  {
    id: "claude",
    name: "Claude Sonnet 4",
    icon: "🎭",
    description: "Anthropic's advanced AI assistant",
    enabled: false,
    isPremium: true,
    provider: "Anthropic",
  },
  {
    id: "gemini",
    name: "Gemini 2.5 Pro",
    icon: "💎",
    description: "Google's multimodal AI model",
    enabled: false,
    isPremium: true,
    provider: "Google",
  },
  {
    id: "perplexity",
    name: "Perplexity Sonar Pro",
    icon: "🔍",
    description: "AI-powered search and reasoning",
    enabled: false,
    isPremium: true,
    provider: "Perplexity",
  },
]

export function useAIModels() {
  const [models, setModels] = useState<AIModel[]>(DEFAULT_MODELS)

  useEffect(() => {
    const savedModels = localStorage.getItem("ai-models-preferences")
    if (savedModels) {
      try {
        const parsed = JSON.parse(savedModels)
        setModels(parsed)
      } catch (error) {
        console.error("Error loading saved model preferences:", error)
      }
    }
  }, [])

  const toggleModel = useCallback((modelId: string, enabled: boolean) => {
    setModels((prev) => {
      const updated = prev.map((model) => (model.id === modelId ? { ...model, enabled } : model))
      localStorage.setItem("ai-models-preferences", JSON.stringify(updated))
      return updated
    })
  }, [])

  const enabledModels = models.filter((model) => model.enabled)
  const availableModels = models.filter((model) => !model.isPremium)
  const premiumModels = models.filter((model) => model.isPremium)

  return {
    models,
    enabledModels,
    availableModels,
    premiumModels,
    toggleModel,
  }
}
