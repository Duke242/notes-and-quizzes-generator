"use server"
import BottomDivWithForm from "@/components/AddLesson"
import Lesson from "@/components/Lesson"
import { createSupabaseServerClient } from "@/libs/createSupabaseServerClient"
import { data } from "autoprefixer"

export default async function Feed({ user }) {
  const supabase = createSupabaseServerClient()

  let { data: notes, error } = await supabase
    .from("notes")
    .select("*")
    .eq("creator_id", user?.id)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching user notes:", error.message)
    return null
  }

  const currentDate = new Date()

  const needsReviewNotes = notes.filter((note) => {
    const noteDate = new Date(note.created_at)
    const hoursDifference = Math.abs(currentDate - noteDate) / 36e5
    const reviewHours = [6, 24, 72, 168]
    return reviewHours.includes(Math.floor(hoursDifference))
  })

  const generalNotes = notes.filter((note) => !needsReviewNotes.includes(note))

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <section className="mt-8">
        <div className="border-b border-gray-400 pb-1">
          <h2 className="text-2xl font-normal inline-block text-gray-500">
            Needs Review
          </h2>
        </div>
        {needsReviewNotes.length > 0 ? (
          <main className="flex flex-wrap mb-8">
            {needsReviewNotes.map((note) => (
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
          <p className="text-xl mt-4 text-warmGray">
            Nothing needs review at the moment.
          </p>
        )}
      </section>
      <section className="mt-8">
        <div className="border-b border-gray-400 pb-1">
          <h2 className="text-2xl font-normal inline-block text-gray-500">
            General
          </h2>
        </div>
        <main className="flex flex-wrap mb-8">
          {generalNotes.length > 0 ? (
            generalNotes.map((note) => (
              <Lesson
                key={note.id}
                title={note.title}
                content={note.content}
                date={formatDate(note.created_at)}
                postId={note.id}
              />
            ))
          ) : (
            <p className="text-xl mt-4 text-warmGray">No lessons to display.</p>
          )}
        </main>
      </section>
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
