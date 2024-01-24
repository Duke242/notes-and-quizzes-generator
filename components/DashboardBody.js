"use client"

import { useState } from "react"
import AddLesson from "./AddLesson"
import ButtonAccount from "./ButtonAccount"
import Feed from "./Feed"

const DashboardBody = ({ user, children }) => {
  const [showAdd, setShowAdd] = useState(false)
  return (
    <div
      onClick={function (evt) {
        setShowAdd(
          evt.target.id === "addLessonButton" || !!evt.target.closest("form")
        )
      }}
      className="min-h-screen flex flex-col"
    >
      <header className="bg-white p-8 flex h-1 justify-center items-center shadow-2xl mt-4">
        <div className="rounded-b-md mr-auto">
          <ButtonAccount />
        </div>
      </header>

      <main className="flex-grow bg-white rounded-b-md">
        <h1 className="text-2xl text-glacierBlue p-8">Lessons</h1>
        <button
          onClick={() => setShowAdd((v) => !v)}
          id="addLessonButton"
          className="bg-overcast p-3 ml-16 rounded transition hover:shadow text-glacierBlue hover:bg-ice hover:text-white border border-warmGray"
        >
          + Add Lesson
        </button>
        <div className="h-fit pb-1 rounded-lg">{children}</div>
        <AddLesson show={showAdd} setShow={setShowAdd} />
      </main>
    </div>
  )
}

export default DashboardBody
