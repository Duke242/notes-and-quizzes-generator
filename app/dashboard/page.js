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
    <div className="min-h-screen flex flex-col">
      <header className="bg-white p-8 flex h-1 justify-center items-center shadow-2xl mt-4">
        {/* <section className="max-w mx-auto text-center">
          <h1 className="text-3xl text-glacierBlue">SelfLearner</h1>
        </section> */}
        <div className="rounded-b-md mr-auto">
          {/* Content with shadow and rounded bottom corners */}
          {/* Example: <Sidebar /> */}
          <ButtonAccount />
        </div>
      </header>

      <main className="flex-grow bg-white rounded-b-md">
        <h1 className="text-2xl text-glacierBlue p-8 font-bold">Lessons</h1>
        <div className="bg-overcast h-fit pb-1 mx-4 rounded-lg">
          <Feed user={session.user} />
        </div>
      </main>
    </div>
  )
}
