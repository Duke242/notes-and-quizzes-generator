"use server"
import { createClient } from "@supabase/supabase-js"

export async function deleteFolder(folderId) {
  "use server"
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const supabase = createClient(supabaseUrl, supabaseKey)

  try {
    const { error } = await supabase.from("tags").delete().eq("id", folderId)

    if (error) {
      throw error
    }
  } catch (error) {
    return { success: false, error: error.message }
  }
}
