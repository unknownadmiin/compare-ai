"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Lock, Crown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface AIModel {
  id: string
  name: string
  icon: string
  description: string
  enabled: boolean
  isPremium?: boolean
  provider: string
}

interface ModelSettingsModalProps {
  isOpen: boolean
  onClose: () => void
  models: AIModel[]
  onModelToggle: (modelId: string, enabled: boolean) => void
  onUpgrade: () => void
}

export default function ModelSettingsModal({
  isOpen,
  onClose,
  models,
  onModelToggle,
  onUpgrade,
}: ModelSettingsModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold">Customize your chat AI model preferences</DialogTitle>
                <p className="text-slate-400 text-sm">Easily update your selections anytime in the settings</p>
              </DialogHeader>

              <div className="space-y-4 max-h-96 overflow-y-auto">
                {models.map((model, index) => (
                  <motion.div
                    key={model.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
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
                              transition={{ delay: 0.2 }}
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
                            onCheckedChange={(enabled) => onModelToggle(model.id, enabled)}
                          />
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="border-t border-slate-700 pt-4"
              >
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={onUpgrade}
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

              <div className="flex justify-end gap-2">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    onClick={onClose}
                    className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent transition-colors duration-200"
                  >
                    Cancel
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={onClose}
                    className="bg-slate-700 hover:bg-slate-600 text-white transition-colors duration-200"
                  >
                    Update preferences
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  )
}
