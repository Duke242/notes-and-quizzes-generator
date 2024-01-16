import { NextResponse } from "next/server"
import { createSupabaseServerClient } from "@/libs/createSupabaseServerClient"

export const dynamic = "force-dynamic"

export async function POST(req) {
  const supabase = createSupabaseServerClient()

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser()
  const user = "7459d28b-fffd-4edc-b463-5a9b8bcb85a8"

  const payload = await req.json()

  console.log({ payload })

  try {
    const { data, error } = await supabase
      .from("notes")
      .insert([
        { user_id: user, title: payload.title, content: payload.content },
      ])
      .select()

    if (error) {
      throw error
    }
    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
