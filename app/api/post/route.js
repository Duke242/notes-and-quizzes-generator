import { NextResponse } from "next/server"
import { createSupabaseServerClient } from "@/libs/createSupabaseServerClient"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"

export const dynamic = "force-dynamic"

export async function POST(req) {
  const supabase = createSupabaseServerClient()
  const supabaseSession = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabaseSession.auth.getSession()

  console.log({ a: session.user.id })

  const payload = await req.json()

  try {
    const { data, error } = await supabase
      .from("notes")
      .insert([
        {
          creator_id: session.user.id,
          title: payload.title,
          content: payload.content,
        },
      ])
      .select()
    revalidatePath("/dashboard")

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
