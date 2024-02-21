import DashboardBody from "@/components/DashboardBody"
import Feed from "@/components/Feed"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

// export default async function TaggedDashedboard() {
export async function GET(req) {
  const requestUrl = new URL(req.url)
  const tagParam = req.url.replace(/^.*\//g, "")
  console.log({ tagParam })
  const code = requestUrl.searchParams.get("code")
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <DashboardBody>
      <Feed user={session.user} />
    </DashboardBody>
  )
}
