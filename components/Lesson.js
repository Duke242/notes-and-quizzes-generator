"use client"
import React, { useState } from "react"

const Lesson = ({ title, content, date }) => {
  const [lessonOpen, setLessonOpen] = useState(false)

  const handleLessonClick = () => {
    setLessonOpen(true)
  }

  const handleCloseClick = () => {
    setLessonOpen(false)
  }

  let truncatedContent = content.substring(0, 120)

  return (
    <div>
      <div
        onClick={handleLessonClick}
        className="w-56 h-48 bg-overcast ml-8 p-3 py-6 pb-4 pt-1 relative rounded-md hover:cursor-pointer hover:bg-ice duration-300 transition group hover:drop-shadow-xl clickable-lesson mt-4"
      >
        <h1 className="font-bold text-lg transition group-hover:text-overcast">
          {title}
        </h1>
        <p className="text-black transition-opacity group-hover:text-glacierBlue text-clip">
          {truncatedContent}
        </p>
        <p className="text-gray-400 absolute text-sm bottom-0 right-0 mr-2">
          {date}
        </p>
      </div>

      {lessonOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded shadow-lg w-3/5 mx-auto relative">
            <button
              onClick={handleCloseClick}
              className="bg-red-500 text-white px-4 py-2 rounded absolute top-0 right-0 mt-2 mr-2 flex items-center  transition hover:bg-red-600"
            >
              <span className="text-lg font-bold">X</span>
            </button>
            <h2 className="text-2xl font-bold mt-4 text-glacierBlue">
              {title}
            </h2>
            <p className="mt-2">{content}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Lesson
