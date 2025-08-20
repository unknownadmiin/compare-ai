import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import ChatDashboard from "@/components/chat/chat-dashboard"

export default async function DashboardPage() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  return <ChatDashboard user={user} />
}
