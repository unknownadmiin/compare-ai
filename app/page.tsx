import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import LandingHero from "@/components/landing/hero"
import LandingFeatures from "@/components/landing/features"
import LandingCTA from "@/components/landing/cta"

export default async function HomePage() {
  const supabase = createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If user is already logged in, redirect to dashboard
  if (session) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <LandingHero />
      <LandingFeatures />
      <LandingCTA />
    </div>
  )
}
