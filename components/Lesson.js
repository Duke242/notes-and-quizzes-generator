"use client"
import React, { useState } from "react"
import { deleteLesson } from "@/libs/deleteLesson"
import { toast } from "react-hot-toast"

const Lesson = ({ title, content, date, postId }) => {
  const [lessonOpen, setLessonOpen] = useState(false)

  const handleLessonClick = () => {
    setLessonOpen(true)
  }

  const handleCloseClick = () => {
    setLessonOpen(false)
  }

  let truncatedContent = content.substring(0, 120)
  let truncatedTitle = title.substring(0, 18)
  const handleDeleteClick = () => {
    deleteLesson(postId)
    toast.error("Lesson deleted")
    setLessonOpen(false)
  }

  return (
    <div>
      <div
        onClick={handleLessonClick}
        className="w-56 h-48 bg-overcast ml-8 p-3 py-6 pb-4 pt-1 relative rounded-md hover:cursor-pointer hover:bg-ice duration-300 transition group hover:drop-shadow-xl clickable-lesson mt-4"
      >
        <h1 className="font-bold text-lg transition group-hover:text-overcast">
          {truncatedTitle}
        </h1>
        <p className="text-black transition-opacity group-hover:text-glacierBlue text-clip">
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
            <button
              onClick={handleDeleteClick}
              className="bg-red-500 text-white px-4 py-2 rounded bottom-0 left-0 flex items-center transition hover:bg-red-600"
            >
              <span className="text-lg font-bold">Delete</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Lesson
