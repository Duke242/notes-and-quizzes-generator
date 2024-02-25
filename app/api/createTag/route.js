import { NextResponse } from "next/server"
import { createSupabaseServerClient } from "@/libs/createSupabaseServerClient"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"

export async function POST(req) {
  const supabase = createSupabaseServerClient()

  try {
    const payload = await req.json()
    console.log({ payload })
    const { data, error } = await supabase
      .from("tags")
      .insert({ title: payload.title, creator_id: payload.userId })
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
