import { NextResponse } from "next/server"
import { createSupabaseServerClient } from "@/libs/createSupabaseServerClient"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"

export async function POST(req) {
  const supabase = createSupabaseServerClient()
  const supabaseSession = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabaseSession.auth.getSession()

  try {
    const { title } = await req.json()

    const { data, error } = await supabase
      .from("tags")
      .insert({ title, creator_id: session.user.id })
      .select()
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("Error creating tag:", error.message)
    return NextResponse.json({ error: "Failed to create tag" }, { status: 500 })
  }
}
