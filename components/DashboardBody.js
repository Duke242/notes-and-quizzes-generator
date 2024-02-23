"use client"
import React, { useEffect, useState } from "react"
import AddLesson from "./AddLesson"
import OneClickTitle from "./OneClickTitle"
import { useSupabaseBrowserClient } from "@/libs/createSupabaseBrowserClient"
import toast from "react-hot-toast"
import { revalidatePath } from "next/cache"

const DashboardBody = ({ children, tag, user }) => {
  const [showAdd, setShowAdd] = useState(false)
  const [tags, setTags] = useState([])
  const [loading, setLoading] = useState(true)
  const [shouldFetchTags, setShouldFetchTags] = useState(true) // State variable to trigger effect

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch(`/api/getTags`)

        if (!response.ok) {
          throw new Error("Failed to fetch tags")
        }

        const { data } = await response.json()
        setTags(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching tags:", error.message)
      }
    }

    if (shouldFetchTags) {
      fetchTags()
      setShouldFetchTags(false)
    }
  }, [shouldFetchTags])

  const submitCreateTag = async (evt) => {
    evt.preventDefault()

    const title = evt.target.title.value

    try {
      const response = await fetch("/api/createTag", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      })

      if (!response.ok) {
        throw new Error("Failed to create tag")
      }

      toast.success("Tag created successfully!")
      evt.target.title.value = ""
      setShouldFetchTags(true) // Set shouldFetchTags to true to trigger the effect
    } catch (error) {
      console.error("Error creating tag:", error.message)
      toast.error("Failed to create tag. Please try again.")
    }
  }

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
          <input id="title" placeholder="Title" required />
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
