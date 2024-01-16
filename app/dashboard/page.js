import BottomDivWithForm from "@/components/BottomDivWithForm"
import ButtonAccount from "@/components/ButtonAccount"
import Lesson from "@/components/Lesson"
import { createSupabaseServerClient } from "@/libs/createSupabaseServerClient"
// import OpenAI from "openai"

export const dynamic = "force-dynamic"

// This is a private page: It's protected by the layout.js component which ensures the user is authenticated.
// It's a server compoment which means you can fetch data (like the user profile) before the page is rendered.
// See https://shipfa.st/docs/tutorials/private-page
export default async function Dashboard() {
  const supabase = createSupabaseServerClient()

  // const {
  //   data: { session },
  // } = await supabase.auth.getUser()
  // console.log({ s: supabase.auth.getUser() })

  let { data: notes, error } = await supabase.from("notes").select("*")

  if (error) {
    console.error("Error fetching user notes:", error.message)
    return null
  }
  // console.log({ notes })

  // console.log("User Notes:", userNotes)

  return (
    <div>
      <header className="p-8">
        {/* <Sidebar /> */}
        <section className="max-w ml-auto space-y-8 flex">
          <ButtonAccount />
          <h1 className="mx-auto text-3xl font-bold text-glacierBlue">
            SelfLearner
          </h1>
        </section>
        <h1 className="text-xl md:text-4xl font-normal mt-4 text-glacierBlue">
          Lessons
        </h1>
      </header>
      <main className="flex flex-wrap overflow-visible pr-2 mb-14 ml-10">
        {notes.map((note) => (
          <Lesson
            key={note.id}
            title={note.title}
            content={note.content}
            date={formatDate(note.created_at)}
          />
        ))}
      </main>
      <BottomDivWithForm />
    </div>
  )
}
function formatDate(originalDateString) {
  const dateObject = new Date(originalDateString)
  return dateObject
    .toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    })
    .replace(/-/g, "/")
}
