"use server"
import BottomDivWithForm from "@/components/AddLesson"
import Lesson from "@/components/Lesson"
import { createSupabaseServerClient } from "@/libs/createSupabaseServerClient"

// This is a private page: It's protected by the layout.js component which ensures the user is authenticated.
// It's a server compoment which means you can fetch data (like the user profile) before the page is rendered.
// See https://shipfa.st/docs/tutorials/private-page
export default async function Feed({ user }) {
  const supabase = createSupabaseServerClient()

  let { data: notes, error } = await supabase
    .from("notes")
    .select("*")
    .eq("user_id", user?.id)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching user notes:", error.message)
    return null
  }

  const currentDate = new Date()

  const needsReviewNotes = notes.filter((note) => {
    const noteDate = new Date(note.created_at)
    const hoursDifference = Math.abs(currentDate - noteDate) / 36e5 // Convert milliseconds to hours
    const reviewHours = [6, 24, 72, 168]
    return reviewHours.includes(Math.floor(hoursDifference))
  })

  const generalNotes = notes.filter((note) => !needsReviewNotes.includes(note))

  return (
    <div>
      {/* <div className="flex items-center ml-16 mt-5"> */}
      {/* <h5 className="mr-4 text-glacierBlue">Categories:</h5> */}
      {/* Add your category buttons here */}
      {/* </div> */}
      <section>
        <div className="border-b border-gray-400 pb-1 mt-8 ml-16 mr-16 text-gray-500">
          <h2 className="text-2xl font-normal inline-block">Needs Review</h2>
        </div>
        {needsReviewNotes.length > 0 ? (
          <main className="flex flex-wrap pr-2 mb-14 ml-10">
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
          <p className="text-xl ml-16 mt-4 text-warmGray">
            Nothing needs review at the moment.
          </p>
        )}
      </section>
      <section>
        <div className="border-b border-gray-400 pb-1 mt-8 ml-16 mr-16 text-gray-500">
          <h2 className="text-2xl font-normal inline-block">General</h2>
        </div>
        <main className="flex flex-wrap pr-2 mb-14 ml-10">
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
            <p className="text-xl ml-6 mt-4 text-warmGray">
              No lessons to display.
            </p>
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
