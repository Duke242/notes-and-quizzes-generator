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
        <a
          href="/dashboard"
          className="bg-overcast text-glacierBlue px-4 py-2 ml-12 mt-6 rounded-md border border-glacierBlue hover:bg-glacierBlue hover:border-transparent hover:text-overcast transition-colors duration-300"
        >
          All Tags
        </a>
        <div className="ml-12 mt-4">
          <input
            id="title"
            placeholder="New Tag"
            required
            className="border border-gray-300 rounded-md mb-6 mt-2 px-4 py-2 mr-2 focus:outline-none focus:border-blue-500 flex-grow"
          />
          <button className="bg-overcast text-glacierBlue px-4 py-2 rounded-md hover:bg-glacierBlue focus:outline-none focus:bg-blue-600 hover:text-overcast transition-colors duration-300">
            Create Tag
          </button>
        </div>
        {loading ? (
          <p className="text-glacierBlue ml-12">Loading...</p>
        ) : (
          <>
            {tags.length === 0 ? (
              <p>No tags found.</p>
            ) : (
              <ul className="flex gap-3 ml-12">
                {tags.map((tag) => (
                  <li key={tag.id}>
                    <a
                      href={
                        location.pathname === `/dashboard/${tag.title}`
                          ? null
                          : `/dashboard/${tag.title}`
                      }
                      className={`px-3 py-1 rounded-md ${
                        location.pathname === `/dashboard/${tag.title}`
                          ? "text-overcast font-semibold bg-glacierBlue"
                          : "hover:bg-glacierBlue hover:text-overcast bg-overcast text-glacierBlue"
                      } transition-colors duration-300`}
                    >
                      {tag.title}
                    </a>
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
