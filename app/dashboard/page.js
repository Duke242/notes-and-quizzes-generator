"use server"
import ButtonAccount from "@/components/ButtonAccount"
import Feed from "@/components/Feed"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

// This is a private page: It's protected by the layout.js component which ensures the user is authenticated.
// It's a server compoment which means you can fetch data (like the user profile) before the page is rendered.
// See https://shipfa.st/docs/tutorials/private-page
export default async function Dashboard() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <div>
      <header className="p-8">
        {/* <Sidebar /> */}
        <ButtonAccount />
        <section className="max-w ml-auto flex">
          <h1 className="mx-auto text-5xl font-bold text-glacierBlue">
            SelfLearner
          </h1>
        </section>
        <h1 className="text-xl md:text-4xl font-normal mt-4 text-glacierBlue">
          Lessons
        </h1>
      </header>
      <Feed user={session.user} />
    </div>
  )
}
