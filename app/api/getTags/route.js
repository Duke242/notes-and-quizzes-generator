import { NextResponse } from "next/server"
import { createSupabaseServerClient } from "@/libs/createSupabaseServerClient"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export async function GET() {
  const supabase = createSupabaseServerClient()
  const supabaseSession = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabaseSession.auth.getSession()

  try {
    const { data, error } = await supabase
      .from("tags")
      .select("*")
      .eq("creator_id", session.user.id)

    if (error) {
      throw error
    }

    return NextResponse.json({ data }, { status: 200 })
  } catch (error) {
    console.error("Error fetching tags:", error.message)
    return NextResponse.json({ error: "Failed to fetch tags" }, { status: 500 })
  }
}
