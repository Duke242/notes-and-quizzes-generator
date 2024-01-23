"use client"
import React, { useState } from "react"
import { toast } from "react-hot-toast"

const BottomDivWithForm = () => {
  const [showForm, setShowForm] = useState(false)
  const [showQuiz, setShowQuiz] = useState(false)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const toggleForm = () => {
    setShowForm((prevShowForm) => !prevShowForm)
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    console.log({ e: evt.target[0].value, evt: evt.target[1].value })
    const payload = {
      title: evt.target[0].value,
      content: evt.target[1].value,
    }
    console.log({ payload })
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

      toggleForm()
    }
  }

  return (
    <div
      className={`bg-gray-100 rounded-xl p-4 border border-ice border-2 shadow-full fixed bottom-0 w-full text-center transition-all duration-500 ease-in-out ${
        showForm || showQuiz ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="relative">
        <button
          onClick={toggleForm}
          className={`text-white px-4 py-2 ml-2 rounded-full transform absolute left-1/2 -translate-x-1/2 hover:opacity-60 transition ${
            showForm
              ? "-translate-y-16 bg-red-500 font-bold"
              : "-translate-y-16 bg-glacierBlue font-bold"
          }`}
        >
          {showForm ? "Cancel" : "+ Add Lesson"}
        </button>
        {/* <button
          onClick={handleQuizButtonClick}
          className="text-white px-4 py-2 rounded-full transform absolute right-1/2 -translate-x-1/2 -translate-y-16 bg-green-500 font-bold"
        >
          Random Quiz
        </button> */}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="flex flex-col">
          {/* Display title input only for adding a lesson */}
          {showForm && (
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

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md w-fit mx-auto hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  )
}

export default BottomDivWithForm
