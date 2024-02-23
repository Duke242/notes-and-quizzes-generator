import { createClient } from "@supabase/supabase-js"
import { useCookies } from "react-cookie"

let cachedSupabaseClient = null
let lastToken = null

export const useSupabaseBrowserClient = () => {
  const [{ supabase_user_jwt }] = useCookies(["supabase_user_jwt"])

  if (supabase_user_jwt === lastToken && cachedSupabaseClient !== null) {
    return cachedSupabaseClient
  }

  lastToken = supabase_user_jwt

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      global: { headers: { Authorization: `Bearer ${supabase_user_jwt}` } },
    }
  )

  cachedSupabaseClient = supabase

  return supabase
}

export default useSupabaseBrowserClient
