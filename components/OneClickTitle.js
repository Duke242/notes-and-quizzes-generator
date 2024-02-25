import React, { useEffect, useState } from "react"
import toast from "react-hot-toast"

function OneClickTitle({ tag }) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [category, setCategory] = useState("")

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, category, tag }),
      })
      const ret = await response.json()
      if (ret.success) {
        toast.success(`Lesson posted. Thank you!`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: false,
        })

        setTimeout(() => {
          window.location.reload()
        }, 200)
      } else {
        toast.error(ret.error)
      }
    } catch (e) {
      toast.error(e.message)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchNotesAndSubmit = async (title) => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/openai/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      })
      if (response.ok) {
        const data = await response.json()
        setContent(data.content)
      } else {
        console.error("Failed to fetch notes")
      }
    } catch (error) {
      console.error("Error fetching notes", error)
    }
  }

  return (
    <div className="flex flex-col justify-center items-center w-full mt-16 mb-8">
      <div className="flex justify-center mb-8 md:mb-10 items-center text-3xl md:text-4xl text-glacierBlue font-bold">
        <h1 className="text-center">The best companion for learning.</h1>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          fetchNotesAndSubmit(title, category)
        }}
        className="flex flex-col items-center"
      >
        <div className="flex flex-col md:flex-row items-center mb-2 w-full md:w-auto">
          <input
            maxLength={50}
            minLength={3}
            type="text"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value)
            }}
            placeholder="Category"
            className="border border-ice rounded-md shadow mr-2 w-full md:w-auto p-3 text-lg outline-none focus:shadow-md"
            required
            id="categoryInput"
          />
          <input
            maxLength={50}
            minLength={3}
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
            }}
            placeholder="Please provide a title, and the AI will generate the notes."
            className="border border-ice rounded-md shadow w-full md:w-auto p-3 text-lg outline-none focus:shadow-md"
            required
            id="oneClickForm"
          />
        </div>
        <button
          type="submit"
          className={`bg-glacierBlue text-white px-3 py-2 mx-auto rounded-md mt-2 hover:bg-opacity-80 focus:bg-opacity-80 focus:outline-none shadow-md transition-colors duration-300 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          id="oneClickSubmit"
          disabled={isLoading}
          style={{ width: "200px" }}
        >
          {isLoading ? "Loading..." : "Generate Notes"}
        </button>
      </form>
    </div>
  )
}

export default OneClickTitle
