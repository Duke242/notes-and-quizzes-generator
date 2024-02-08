"use client"
import React, { useState } from "react"
import { toast } from "react-hot-toast"
import { MdCancel } from "react-icons/md"

const AddLesson = ({ show = false, setShow }) => {
  const [showQuiz, setShowQuiz] = useState(false)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    const payload = {
      title,
      content,
    }
    try {
      const response = await fetch("/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
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

        setShow(false)
      } else {
        console.log("Something")
        toast.error(ret.error)
      }
    } catch (e) {
      console.log("Something happened")
      toast.error(e.message)
    }
  }

  return (
    <div
      className={`bg-gray-100 rounded-xl p-4 border border-ice border-2 shadow-full fixed bottom-0 w-full text-center transition-all duration-500 ease-in-out ${
        show || showQuiz ? "translate-y-0" : "translate-y-full"
      }`}
    >
      {show && (
        <form onSubmit={handleSubmit} className="flex flex-col">
          {show && (
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="border rounded-md px-2 py-1 mb-2 mx-6 focus:outline-none"
              required
              maxLength="50"
            />
          )}

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Notes"
            className="border rounded-md px-2 py-1 mb-2 h-64 mx-6 resize-none focus:outline-none"
            maxLength="1500"
          />
          <div className="flex mx-auto gap-8">
            <button
              type="submit"
              className="bg-glacierBlue text-white px-4 py-2 rounded-md hover:bg-ice transition"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={(evt) => {
                evt.stopPropagation()
                setShow(false)
              }}
              className="hover:opacity-70 text-red-600"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default AddLesson
