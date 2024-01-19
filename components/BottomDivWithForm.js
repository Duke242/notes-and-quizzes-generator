"use client"
import React, { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
const BottomDivWithForm = () => {
  const [showForm, setShowForm] = useState(false)
  const [showQuiz, setShowQuiz] = useState(false)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const toggleForm = () => {
    setShowForm((prevShowForm) => !prevShowForm)
    setShowQuiz(false) // Close the quiz form when toggling to lesson form
  }

  // const handleQuizButtonClick = () => {
  //   setShowQuiz((prevShowQuiz) => !prevShowQuiz)
  //   setShowForm(false) // Close the lesson form when toggling to quiz form
  // }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Add your form submission logic here
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
          className={`text-white px-4 py-2 ml-2 rounded-full transform absolute left-1/2 -translate-x-1/2 ${
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

          {/* Display either lesson or quiz header based on the active form */}
          {/* {showQuiz && <p className="text-xl font-bold mb-4">Quiz Title</p>} */}

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
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
