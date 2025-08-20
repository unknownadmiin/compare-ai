"use client"

import { useState } from "react"
import type { User } from "@supabase/supabase-js"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Crown, Lock } from "lucide-react"
import Link from "next/link"
import { useAIModels } from "@/hooks/use-ai-models"
import { motion, AnimatePresence } from "framer-motion"

interface SettingsPageProps {
  user: User
}

export default function SettingsPage({ user }: SettingsPageProps) {
  const [email, setEmail] = useState(user.email || "")
  const [fullName, setFullName] = useState(user.user_metadata?.full_name || "")
  const [isUpdating, setIsUpdating] = useState(false)

  const { models, toggleModel } = useAIModels()

  const handleUpdateProfile = async () => {
    setIsUpdating(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsUpdating(false)
  }

  const handleUpgrade = () => {
    console.log("Upgrade to premium")
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-slate-900"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="border-b border-slate-700 bg-slate-800"
      >
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="text-slate-400 hover:text-white transition-colors duration-200"
              >
                <Link href="/dashboard">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              <h1 className="text-2xl font-bold text-white">Profile Settings</h1>
              <p className="text-slate-400">Manage your profile information and AI model preferences.</p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {/* Profile Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-colors duration-300">
            <CardHeader>
              <CardTitle className="text-white">Profile information</CardTitle>
              <CardDescription className="text-slate-400">Manage your basic profile details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-900 border-slate-600 text-white focus:border-blue-500 transition-colors duration-200"
                  disabled
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="fullName" className="block text-sm font-medium text-slate-300">
                  Full name
                </label>
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  className="bg-slate-900 border-slate-600 text-white focus:border-blue-500 transition-colors duration-200"
                />
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={handleUpdateProfile}
                  disabled={isUpdating}
                  className="bg-slate-700 hover:bg-slate-600 text-white transition-colors duration-200"
                >
                  {isUpdating ? (
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="inline-block mr-2"
                    >
                      ⟳
                    </motion.span>
                  ) : null}
                  {isUpdating ? "Updating..." : "Update profile"}
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* AI Model Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-colors duration-300">
            <CardHeader>
              <CardTitle className="text-white">Customize your chat AI model preferences</CardTitle>
              <CardDescription className="text-slate-400">
                Easily update your selections anytime in the settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <AnimatePresence>
                {models.map((model, index) => (
                  <motion.div
                    key={model.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center justify-between p-4 rounded-lg bg-slate-900/50 border border-slate-700 hover:border-slate-600 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <motion.div
                        className="text-xl"
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {model.icon}
                      </motion.div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-white">{model.name}</h3>
                          {model.isPremium && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.1 }}
                            >
                              <Badge variant="secondary" className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                                <Crown className="h-3 w-3 mr-1" />
                                Premium
                              </Badge>
                            </motion.div>
                          )}
                        </div>
                        <p className="text-sm text-slate-400">{model.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {model.isPremium ? (
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                          <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white" disabled>
                            <Lock className="h-4 w-4" />
                          </Button>
                        </motion.div>
                      ) : (
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Switch
                            checked={model.enabled}
                            onCheckedChange={(enabled) => toggleModel(model.id, enabled)}
                          />
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="border-t border-slate-700 pt-4"
              >
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={handleUpgrade}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                  >
                    <Crown className="h-4 w-4 mr-2" />
                    Upgrade and Unlock Premium AI Models
                  </Button>
                </motion.div>
                <p className="text-center text-sm text-slate-400 mt-2">
                  Access all six top AI models and enhance your experience for just $12 a month.
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Account Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-colors duration-300">
            <CardHeader>
              <CardTitle className="text-white">Account Management</CardTitle>
              <CardDescription className="text-slate-400">
                Manage your account settings and preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-white">Email Notifications</h3>
                  <p className="text-sm text-slate-400">Receive updates about new features and improvements</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-white">Usage Analytics</h3>
                  <p className="text-sm text-slate-400">Help us improve by sharing anonymous usage data</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="border-t border-slate-700 pt-4">
                <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
                  Delete Account
                </Button>
                <p className="text-xs text-slate-500 mt-2">
                  This action cannot be undone. All your data will be permanently deleted.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
