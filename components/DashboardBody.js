"use client"
import { useState } from "react"
import AddLesson from "./AddLesson"
import ButtonAccount from "./ButtonAccount"
import OneClickTitle from "./OneClickTitle"

const DashboardBody = ({ children }) => {
  const [showAdd, setShowAdd] = useState(false)

  return (
    <div
      onClick={function (evt) {
        console.log({ id: evt.target.id })
        if (evt.target.id === "main") {
          setShowAdd(false)
        }
        if (evt.target.id === "oneClickSubmit" || "oneClickForm") return
        setShowAdd(
          evt.target.id === "addLessonButton" || !!evt.target.closest("form")
        )
      }}
      className="min-h-screen flex flex-col"
    >
      <header className="bg-white m-8 mt-8 flex h-1 justify-center items-center shadow-2xl mt-4">
        <div className="rounded-b-md mr-auto">
          <ButtonAccount />
        </div>
      </header>

      <main className="flex-grow bg-white rounded-b-md">
        <OneClickTitle />
        <h1 className="text-2xl font-bold text-glacierBlue p-8">Learnings</h1>
        <button
          onClick={() => setShowAdd((v) => !v)}
          id="addLessonButton"
          className="ml-16 hover:before:bg-ice rounded-full relative h-[50px] w-40 overflow-hidden border border-ice bg-white px-3 text-glacierBlue shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-ice before:transition-all before:duration-500 hover:text-white hover:shadow-ice hover:before:left-0 hover:before:w-full"
        >
          <span
            onClick={(e) => {
              e.stopPropagation()
              setShowAdd((v) => !v)
            }}
            className="relative z-2 text-xl"
          >
            + Lesson
          </span>
        </button>
        <div className="h-fit pb-1 rounded-lg">{children}</div>
        <AddLesson show={showAdd} setShow={setShowAdd} />
      </main>
    </div>
  )
}

export default DashboardBody
