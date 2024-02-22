import DashboardBody from "@/components/DashboardBody"
import Feed from "@/components/Feed"
import TopDashboard from "@/components/TopDashboard"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export default async function TaggedDashedboard({ params }) {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const { tag } = params

  return (
    <>
      <TopDashboard />
      <DashboardBody {...{ tag }} user={session.user}>
        <a href="/dashboard">Home</a>
        <Feed user={session.user} {...{ tag }} />
      </DashboardBody>
    </>
  )
}
