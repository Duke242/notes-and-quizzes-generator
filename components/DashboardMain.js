"use client"
import React, { useState } from "react"

const Lesson = ({ title, content }) => {
  const [lessonOpen, setLessonOpen] = useState(false)

  const handleLessonClick = () => {
    setLessonOpen(true)
  }

  return (
    <div>
      <div
        onClick={handleLessonClick}
        className="w-64 h-48 bg-overcast ml-8 p-3 py-6 pb-4 rounded-md hover:cursor-pointer hover:bg-ice duration-300 transition group hover:drop-shadow-xl clickable-lesson"
      >
        <h1 className="font-bold text-lg transition group-hover:text-overcast">
          {title}
        </h1>
        <p className="text-black transition-opacity group-hover:text-glacierBlue text-clip">
          {content}
        </p>
      </div>
    </div>
  )
}

export default Lesson
