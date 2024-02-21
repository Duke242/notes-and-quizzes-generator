import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import { createSupabaseServerClient } from "@/libs/createSupabaseServerClient"
import { NextResponse } from "next/server"

export async function POST(req) {
  const supabase = createSupabaseServerClient()
  const supabaseSession = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabaseSession.auth.getSession()

  const payload = await req.json()
  console.log({ payload })

  try {
    const { data, error } = await supabase
      .from("notes")
      .update({ content: payload.explanation })
      .eq("id", payload.postId)
      .eq("creator_id", session.user.id)
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
