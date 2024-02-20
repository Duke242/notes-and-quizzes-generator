"use server"
import DashboardBody from "@/components/DashboardBody"
import Feed from "@/components/Feed"
import Subscribe from "@/components/Subscribe"
import TopDashboard from "@/components/TopDashboard"
import config from "@/config"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

// This is a private page: It's protected by the layout.js component which ensures the user is authenticated.
// It's a server compoment which means you can fetch data (like the user profile) before the page is rendered.
// See https://shipfa.st/docs/tutorials/private-page
export default async function Dashboard() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  let { data: stripe, error } = await supabase
    .from("stripe")
    .select("has_access")
    .eq("id", session.user.id)

  const userAccess = stripe[0].has_access

  if (userAccess) {
    return (
      <>
        <TopDashboard />
        <DashboardBody>
          <Feed user={session.user} />
        </DashboardBody>
      </>
    )
  } else {
    return <Subscribe />
  }
}
