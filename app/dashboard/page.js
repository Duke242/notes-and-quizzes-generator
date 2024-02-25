import DashboardBody from "@/components/DashboardBody"
import Feed from "@/components/Feed"
import Subscribe from "@/components/Subscribe"
import TopDashboard from "@/components/TopDashboard"
import config from "@/config"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export default async function Dashboard() {
  try {
    const supabase = createServerComponentClient({ cookies })

    const {
      data: { session },
    } = await supabase.auth.getSession()

    const { data: stripe, error } = await supabase
      .from("profiles")
      .select("has_access")
      .eq("id", session.user.id)

    if (error) {
      throw new Error(error.message)
    }

    const userAccess = stripe

    let { data: allRows, e } = await supabase.from("notes").select("*")
    console.log({ allRows })
    if (userAccess) {
      return (
        <>
          <TopDashboard />
          <DashboardBody user={session.user} allRows={allRows}>
            <Feed user={session.user} />
          </DashboardBody>
        </>
      )
    } else {
      return <Subscribe />
    }
  } catch (error) {
    console.error("Error in Dashboard:", error.message)
    return null
  }
}
