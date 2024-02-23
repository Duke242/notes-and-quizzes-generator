"use client"
import React, { useEffect, useState } from "react"
import AddLesson from "./AddLesson"
import OneClickTitle from "./OneClickTitle"
import { useSupabaseBrowserClient } from "@/libs/createSupabaseBrowserClient"
import toast from "react-hot-toast"

const DashboardBody = ({ children, tag, user }) => {
  const [showAdd, setShowAdd] = useState(false)
  const [tags, setTags] = useState([])
  const [loading, setLoading] = useState(true)
  const supabase = useSupabaseBrowserClient()

  const submitCreateTag = async (evt) => {
    evt.preventDefault()
    try {
      await supabase.from("tags").insert({
        title: evt.target.title.value,
      })
      toast.success("Tag created successfully!")
      evt.target.title.value = ""
    } catch (error) {
      console.error("Error creating tag:", error.message)
      toast.error("Failed to create tag. Please try again.")
    }
  }

  useEffect(() => {
    const load = async () => {
      try {
        let { data: tags, error } = await supabase
          .from("tags")
          .select("*")
          .eq("creator_id", user.id)
        if (error) {
          throw error
        }
        setTags(tags)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error.message)
      }
    }
    load()
  }, [])

  return (
    <div
      onClick={function (evt) {
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
        <OneClickTitle {...{ tag }} />
        <form onSubmit={submitCreateTag}>
          <input id="title" placeholder="Title" />
          <button>Create Tag</button>
        </form>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {tags.length === 0 ? (
              <p>No tags found.</p>
            ) : (
              <ul className="flex gap-3">
                {tags.map((tag) => (
                  <li key={tag.id}>
                    <a href={`/dashboard/${tag.title}`}>{tag.title}</a>
                  </li>
                ))}
              </ul>
            )}
          </>
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
