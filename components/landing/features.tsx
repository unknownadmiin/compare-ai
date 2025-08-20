"use client"

import { motion } from "framer-motion"
import { Brain, Zap, Shield, BarChart3, Clock, Users } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "Multiple AI Models",
    description: "Access ChatGPT, Claude, Gemini, Grok, and more AI models in one unified interface.",
  },
  {
    icon: BarChart3,
    title: "Side-by-Side Comparison",
    description: "Compare responses from different AI models to get the most comprehensive answers.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Get responses from multiple AI models simultaneously with optimized performance.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your conversations are encrypted and secure. We prioritize your privacy and data protection.",
  },
  {
    icon: Clock,
    title: "Save Time",
    description: "No need to switch between different AI platforms. Get all answers in one place.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Share and collaborate on AI conversations with your team members seamlessly.",
  },
]

export default function LandingFeatures() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Why Choose AI Fiesta?
          </h2>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
            Experience the power of multiple AI models working together to give you the best possible answers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group relative"
            >
              <div className="relative rounded-2xl bg-slate-800/30 p-8 backdrop-blur-sm border border-slate-700 hover:border-slate-600 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
                <div className="flex items-center gap-4 mb-4">
                  <motion.div
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <feature.icon className="h-6 w-6 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                </div>
                <p className="text-slate-300 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
