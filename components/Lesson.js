"use client"
import React, { useState } from "react"
import { deleteLesson } from "@/libs/deleteLesson"
import { toast } from "react-hot-toast"

const Lesson = ({ title, content, date, postId }) => {
  const [lessonOpen, setLessonOpen] = useState(false)
  const [explanationOpen, setExplanationOpen] = useState(false)
  const [quizOpen, setQuizOpen] = useState(false)

  const handleLessonClick = () => {
    setLessonOpen(true)
  }

  const handleCloseClick = () => {
    setLessonOpen(false)
    setExplanationOpen(false)
    setQuizOpen(false)
  }

  const handleExplainClick = () => {
    setExplanationOpen(!explanationOpen)
  }

  const handleQuizMeClick = () => {
    setQuizOpen(!quizOpen)
  }

  const handleDeleteClick = async () => {
    deleteLesson(postId)
    toast.error("Lesson deleted")
    setLessonOpen(false)
    setExplanationOpen(false)
    setQuizOpen(false)
  }

  let truncatedContent = content.substring(0, 120)
  let truncatedTitle = title.substring(0, 18)

  return (
    <div>
      <div
        onClick={handleLessonClick}
        className="w-56 h-48 bg-white ml-8 p-3 py-6 pb-4 pt-1 relative rounded-md hover:cursor-pointer hover:bg-ice duration-300 transition group hover:drop-shadow-xl clickable-lesson mt-8"
      >
        <h1 className="font-bold text-lg transition group-hover:text-overcast">
          {truncatedTitle}
        </h1>
        <p className="text-gray-400 transition-opacity group-hover:text-glacierBlue text-clip">
          {truncatedContent}
        </p>
        <p className="text-gray-400 absolute text-sm bottom-0 right-0 mr-2">
          {date}
        </p>
      </div>

      {lessonOpen && (
        <div
          onClick={handleCloseClick}
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-10"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-2 rounded shadow-lg w-3/5 mx-auto relative"
          >
            <button
              onClick={handleCloseClick}
              className="bg-red-500 text-white px-4 py-2 rounded absolute top-0 right-0 mt-2 mr-2 flex items-center transition hover:bg-red-600"
            >
              <span className="text-lg font-bold">X</span>
            </button>

            <h2 className="text-2xl font-bold mt-4 p-6 text-glacierBlue">
              {title}
            </h2>
            <p className="ml-6 mb-6">{content}</p>

            {explanationOpen && (
              <div className="bg-gray-100 p-4 mt-4 rounded mb-2">
                <p className="text-lg font-bold text-glacierBlue">
                  This is the explanation.
                </p>
              </div>
            )}

            {quizOpen && (
              <div className="bg-yellow-200 p-4 mt-4 rounded mb-2">
                <p className="text-lg font-bold text-yellow-800">
                  This is the quiz.
                </p>
              </div>
            )}

            <div className="flex justify-between">
              <div className="flex gap-2">
                <button
                  onClick={handleQuizMeClick}
                  className={`${
                    quizOpen ? "bg-yellow-500" : "bg-blue-500"
                  } text-white px-4 py-2 rounded flex items-center transition ${
                    quizOpen ? "hover:bg-yellow-600" : "hover:bg-blue-600"
                  }`}
                >
                  <span className="text-lg font-bold">
                    {quizOpen ? "Hide Quiz" : "Quiz me"}
                  </span>
                </button>

                <button
                  onClick={handleExplainClick}
                  className="bg-green-500 text-white px-4 py-2 rounded flex items-center transition hover:bg-green-600"
                >
                  <span className="text-lg font-bold">
                    {explanationOpen ? "Hide Explanation" : "Explain"}
                  </span>
                </button>
              </div>

              <button
                onClick={handleDeleteClick}
                className="bg-red-500 text-white px-4 py-2 rounded flex items-center transition hover:bg-red-600"
              >
                <span className="text-lg font-bold">Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Lesson
