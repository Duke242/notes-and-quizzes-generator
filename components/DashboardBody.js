"use client"
import React, { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import AddLesson from "./AddLesson"
import OneClickTitle from "./OneClickTitle"
import toast from "react-hot-toast"
import { deleteFolder } from "@/libs/deleteFolder"

const DashboardBody = ({ children, tag, user }) => {
  const router = useRouter()
  const pathname = usePathname()
  const [showAdd, setShowAdd] = useState(false)
  const [tags, setTags] = useState([])
  const [loading, setLoading] = useState(true)
  const [noTagsAvailable, setNoTagsAvailable] = useState(false)
  const [folderToDelete, setFolderToDelete] = useState(null)
  const [showHelpModal, setShowHelpModal] = useState(false)

  useEffect(() => {
    const fetchCachedTags = () => {
      const cachedTags = localStorage.getItem("cachedTags")
      if (cachedTags) {
        setTags(JSON.parse(cachedTags))
      }
    }

    fetchCachedTags()
  }, [])

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch(`/api/getTags`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user.id }),
        })
        if (!response.ok) {
          throw new Error("Failed to fetch tags")
        }
        const { data } = await response.json()
        if (data.length === 0) {
          setNoTagsAvailable(true)
        } else {
          setTags(data)
          localStorage.setItem("cachedTags", JSON.stringify(data))
        }
      } catch (error) {
        console.error("Error fetching tags:", error.message)
      } finally {
        setLoading(false)
      }
    }

    if (tags.length === 0) {
      fetchTags()
    }
  }, [tags.length, user.id])

  const submitCreateTag = async (evt) => {
    evt.preventDefault()

    const payload = { title: evt.target.title.value, userId: user.id }

    try {
      const response = await fetch("/api/createTag", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error("Failed to create tag")
      }

      toast.success("Folder created successfully!")
      evt.target.title.value = ""

      setTags([])
      window.location.reload()
    } catch (error) {
      console.error("Error creating tag:", error.message)
      toast.error("Failed to create tag. Please try again.")
    }
  }

  const handleDeleteConfirmation = (e, folderId) => {
    e.preventDefault()
    setFolderToDelete(folderId)
  }

  const confirmDelete = async () => {
    if (folderToDelete) {
      await deleteFolder(folderToDelete)
      setFolderToDelete(null)
      toast.error("Folder deleted successfully")
      router.push("/dashboard")
    }
  }

  return (
    <div
      onClick={(evt) => {
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
      <button
        onClick={() => setShowHelpModal(true)}
        // className="bg-glacierBlue ml-8 text-white px-4 py-2 rounded-md mt-4 w-fit"
        className="text-glacierBlue underline ml-8 mt-4 w-fit md:bg-glacierBlue md:px-4 md:text-white md:py-2 md:rounded-md md:no-underline"
      >
        How do I use this website?
      </button>
      {showHelpModal && <HelpModal setShowHelpModal={setShowHelpModal} />}
      <main className="flex-grow bg-white mt-0 rounded-b-md">
        <div>
          <OneClickTitle {...{ tag }} />

          <section>
            {pathname.startsWith("/dashboard/") &&
              pathname !== "/dashboard" && (
                <a
                  href="/dashboard"
                  className="text-glacierBlue px-4 py-2 ml-2 md:ml-14 rounded-md md:bg-glacierBlue md:text-white hover:bg-glacierBlue hover:border-transparent hover:text-overcast hover:brightness-110 transition-all duration-300 underline md:no-underline"
                >
                  All Notes
                </a>
              )}
            <form onSubmit={submitCreateTag} className="mt-4 mx-2">
              <div className="flex items-center mb-2 md:w-1/4 md:ml-12">
                <input
                  id="title"
                  placeholder="New Folder"
                  required
                  pattern="^\S+$"
                  title="Spaces are not allowed"
                  className="border border-gray-300 rounded-md px-3 py-2 mr-2 flex-grow focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="bg-overcast text-glacierBlue whitespace-nowrap px-4 py-2 rounded-md hover:bg-glacierBlue focus:outline-none hover:text-overcast hover:scale-105 transform hover:shadow-lg duration-300"
                >
                  Create Folder
                </button>
              </div>
            </form>

            {loading ? (
              <p className="text-glacierBlue ml-2 md:ml-12 mt-2">Loading...</p>
            ) : (
              <>
                {noTagsAvailable ? (
                  <p className="text-glacierBlue mt-2 ml-14 pl-1">
                    No folders found.
                  </p>
                ) : (
                  <ul className="ml-2 mt-2 md:flex gap-2">
                    <span className="font-bold text-glacierBlue md:ml-12 md:mt-4">
                      Folders:
                    </span>
                    {tags.map((tag) => (
                      <li key={tag.id} className="mt-2">
                        <a
                          href={`/dashboard/${tag.title}`}
                          className={`block w-fit px-4 py-2 rounded-md text-md transition-all duration-300 ${
                            pathname.trim() === `/dashboard/${tag.title}`.trim()
                              ? "bg-glacierBlue text-white hover:shadow-md transform hover:scale-105"
                              : "bg-overcast text-glacierBlue hover:shadow-lg transform hover:scale-105"
                          }`}
                        >
                          <span className="flex items-center">
                            {tag.title}
                            {pathname.trim() ===
                              `/dashboard/${tag.title}`.trim() && (
                              <div
                                className="ml-2 text-red-600 hover:text-red-800 focus:outline-none cursor-pointer font-bold"
                                onClick={(e) =>
                                  handleDeleteConfirmation(e, tag.id)
                                }
                              >
                                X
                              </div>
                            )}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </section>
        </div>
        <h1 className="text-3xl font-normal text-glacierBlue p-8">Learnings</h1>
        <button
          onClick={() => setShowAdd((v) => !v)}
          id="addLessonButton"
          className={`mx-auto ml-16 bg-glacierBlue text-white px-6 text-base py-2 text-lg rounded hover:bg-opacity-80 focus:bg-opacity-80 focus:outline-none shadow-2xl transition-colors duration-300 `}
        >
          + Note
        </button>

        <div className="h-fit pb-1 rounded-lg">{children}</div>
        {folderToDelete && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-10">
            <div className="bg-white p-8 rounded shadow-lg">
              <p className="text-lg text-gray-900 mb-4">
                Are you sure you want to delete this folder?
              </p>
              <div className="flex justify-end">
                <button
                  onClick={() => setFolderToDelete(null)}
                  className="text-gray-600 hover:text-gray-900 mr-4"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
        <AddLesson show={showAdd} setShow={setShowAdd} {...{ tag }} />
      </main>
    </div>
  )
}

const HelpModal = ({ setShowHelpModal }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-10">
      <div className="bg-white p-8 rounded shadow-lg mx-auto w-1/2">
        <h2 className="text-lg font-bold mb-4">How do I use this?</h2>
        <p className="text-gray-700">
          - Effortlessly create your own notes or let our AI generate them for
          you. <br /> - Our AI ensures notes are simple and easy to understand,
          aiding better retention.
          <br /> - When inputting the topic for AI-generated notes, provide a
          descriptive topic for better note quality.
          <br /> - Clear explanations facilitate easier revisiting and
          reinforcement of knowledge.
          <br /> - Organize your notes by subject using folders for easy access
          and management.
          <br /> - Notes created 6, 24, 72, and 168 hours ago are sorted into
          the "Needs Review" section for further learning.
          <br />- Press on a note to access the option to take a quiz, testing
          your understanding.
        </p>
        <button
          onClick={() => setShowHelpModal(false)}
          className="text-blue-600 hover:text-blue-800 mt-4"
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default DashboardBody
