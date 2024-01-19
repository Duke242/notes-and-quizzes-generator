"use server"
import BottomDivWithForm from "@/components/BottomDivWithForm"
import Lesson from "@/components/Lesson"
import { createSupabaseServerClient } from "@/libs/createSupabaseServerClient"
// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

// import OpenAI from "openai"

// This is a private page: It's protected by the layout.js component which ensures the user is authenticated.
// It's a server compoment which means you can fetch data (like the user profile) before the page is rendered.
// See https://shipfa.st/docs/tutorials/private-page
export default async function Feed({ user }) {
  const supabase = createSupabaseServerClient()

  let { data: notes, error } = await supabase
    .from("notes")
    .select("*")
    .eq("user_id", user?.id)

  if (error) {
    console.error("Error fetching user notes:", error.message)
    return null
  }
  return (
    <div>
      {notes.length > 0 ? (
        <main className="flex flex-wrap overflow-visible pr-2 mb-14 ml-10">
          {notes.map((note) => (
            <Lesson
              key={note.id}
              title={note.title}
              content={note.content}
              date={formatDate(note.created_at)}
              postId={note.id}
            />
          ))}
        </main>
      ) : (
        <p className="text-xl text-center">
          Add something you&apos;re learning.
        </p>
      )}
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
