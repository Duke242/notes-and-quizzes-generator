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

  const payload = await req.json()

  try {
    const { data: note, error } = await supabase
      .from("notes")
      .insert([
        {
          creator_id: session.user.id,
          title: payload.title,
          content: payload.content,
          category: payload.category,
        },
      ])
      .select()
      .single()
    // let tag_id = null // Default tag_id to null
    // if (payload.tag) {
    //   const { data: tag } = await supabase
    //     .from("tags")
    //     .select("id")
    //     .eq("title", payload.tag)
    //     .single()
    //   tag_id = tag ? tag.id : null // If tag is found, use its id, otherwise set to null
    // }

    // await supabase.from("notes_tags").insert({ tag_id, note_id: note.id })

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
