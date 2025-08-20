"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"
import { Sparkles } from "lucide-react"

export default function LandingHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="absolute top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">AI Fiesta</span>
        </motion.div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="#features"
            className="text-slate-300 hover:text-white transition-colors duration-200"
          >
            Features
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="#pricing"
            className="text-slate-300 hover:text-white transition-colors duration-200"
          >
            Pricing
          </motion.a>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-3">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              asChild
              variant="ghost"
              className="text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-200"
            >
              <Link href="/auth/login">Sign In</Link>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              asChild
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 transition-all duration-300"
            >
              <Link href="/auth/signup">Get Started</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.header>
  )
}
