"use client"
import React, { useEffect, useState } from "react"
import AddLesson from "./AddLesson"
import ButtonAccount from "./ButtonAccount"
import OneClickTitle from "./OneClickTitle"
import { useSupabaseBrowserClient } from "@/libs/createSupabaseBrowserClient"
import { useCookies } from "react-cookie"

const DashboardBody = ({ children }) => {
  const [showAdd, setShowAdd] = useState(false)
  const [tags, setTags] = useState([])
  const [loading, setLoading] = useState(true) // Add loading state
  const supabase = useSupabaseBrowserClient()

  const submitCreateTag = async (evt) => {
    evt.preventDefault()
    await supabase.from("tags").insert({
      title: evt.currentTarget.title.value,
    })
  }
  useEffect(() => {
    const load = async () => {
      try {
        let { data: tags, error } = await supabase.from("tags").select("*")
        if (error) {
          throw error // Throw an error if there's an error response from Supabase
        }
        console.log({ tags })
        setTags(tags)
        setLoading(false) // Set loading to false when data fetching is complete
      } catch (error) {
        console.error("Error fetching data:", error.message)
        // Handle the error appropriately, such as displaying an error message to the user
      }
    }
    load()
  }, [])

  return (
    <div
      onClick={function (evt) {
        console.log({ id: evt.target.id })
        if (evt.target.id === "main") {
          setShowAdd(false)
        }
        if (evt.target.id === "oneClickSubmit" || "oneClickForm") return
        setShowAdd(
          evt.target.id === "addLessonButton" || !!evt.target.closest("form")
        )
      }}
      className="min-h-screen flex flex-col"
    >
      <main className="flex-grow bg-white rounded-b-md">
        <OneClickTitle />
        <form onSubmit={submitCreateTag}>
          <input id="title" placeholder="Title" />
          <button>Create Tag</button>
        </form>
        {loading ? ( // Render loading state if data is still being fetched
          <p>Loading...</p>
        ) : (
          <ul className="flex gap-3">
            {tags.map((tag) => (
              <li key={tag.id}>
                <a href={`/dashboard/${tag.title}`}>{tag.title}</a>
              </li>
            ))}
          </ul>
        )}
        <h1 className="text-3xl font-normal text-glacierBlue p-8">Learnings</h1>
        <button
          onClick={() => setShowAdd((v) => !v)}
          id="addLessonButton"
          className={`mx-auto ml-16 bg-glacierBlue text-white px-6 text-base py-2 text-lg rounded hover:bg-opacity-80 focus:bg-opacity-80 focus:outline-none shadow-2xl transition-colors duration-300 `}
        >
          + Note
        </button>

        <div className="h-fit pb-1 rounded-lg">{children}</div>
        <AddLesson show={showAdd} setShow={setShowAdd} />
      </main>
    </div>
  )
}

export default DashboardBody
