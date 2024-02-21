import { createClient } from "@supabase/supabase-js"
import { useCookies } from "react-cookie"

export const useSupabaseBrowserClient = () => {
  console.log("Use browser")
  const [{ supabase_user_jwt }] = useCookies(["supabase_user_jwt"])
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      global: {
        headers: { Authorization: `Bearer ${supabase_user_jwt}` },
      },
    }
  )
}
