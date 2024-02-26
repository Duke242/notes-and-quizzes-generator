import React, { useEffect, useState } from "react"
import toast from "react-hot-toast"

function OneClickTitle({ tag }) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [isLoading, setIsLoading] = useState(false) // State variable to track loading status

  useEffect(() => {
    if (content !== "") {
      handleSubmit()
    }
  }, [content]) // Run this effect whenever `content` or `isLoading` changes

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, tag }),
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
      setIsLoading(false) // Clear loading state when form submission finishes
    }
  }

  const fetchNotesAndSubmit = async (title) => {
    try {
      setIsLoading(true) // Set loading state when form is submitted
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
    <div className="flex flex-col justify-center">
      <div className="flex justify-center md:mb-10 items-center text-3xl md:text-4xl text-glacierBlue font-bold">
        {/* <h1 className="text-center">The best companion for learning.</h1> */}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          fetchNotesAndSubmit(title)
        }}
        className="flex flex-col items-center"
      >
        <input
          maxLength={50}
          minLength={3}
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
          }}
          placeholder="Please provide a title, and the AI will generate the notes."
          className="border border-1 mt-4 md:mt-0 md:text-normal text-sm rounded-md shadow w-full md:w-1/3 p-3 text-xlg border-ice outline-none focus:shadow-md"
          required
          id="oneClickForm"
        />
        <button
          type="submit"
          className={`bg-glacierBlue text-white mt-4 mb-4 md:mb-0 px-3 py-2 mx-auto rounded-md hover:bg-opacity-80 focus:bg-opacity-80 focus:outline-none shadow-md transition-colors duration-300 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          id="oneClickSubmit"
          disabled={isLoading}
          style={{ width: "200px" }} // Set width to 200px
        >
          {isLoading ? "Loading..." : "Generate Notes"}
        </button>
      </form>
    </div>
  )
}

export default OneClickTitle
