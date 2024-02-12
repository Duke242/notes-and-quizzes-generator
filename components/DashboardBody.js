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
      <main className="flex-grow bg-white rounded-b-md">
        <OneClickTitle />
        {/* Category selector */}
        {/* <div className="bg-ice ml-8 border border-glacierBlue rounded-lg p-2 w-fit mt-12"> */}
        {/* Dropdown menu */}
        {/* <select className="py-2 px-4 rounded-lg bg-ice text-white focus:outline-none focus:border-transparent"> */}
        {/* Options */}
        {/* <option value="all">All Categories</option>
            <option value="category1">Category 1</option>
            <option value="category2">Category 2</option> */}
        {/* Add more options as needed */}
        {/* </select> */}
        {/* </div> */}
        <h1 className="text-3xl font-normal text-glacierBlue p-8">Learnings</h1>
        <button
          onClick={() => setShowAdd((v) => !v)}
          id="addLessonButton"
          className={`mx-auto ml-16 bg-glacierBlue text-white px-6 text-base py-2 text-lg rounded hover:bg-opacity-80 focus:bg-opacity-80 focus:outline-none shadow-2xl transition-colors duration-300 `}
        >
          + Lesson
        </button>

        <div className="h-fit pb-1 rounded-lg">{children}</div>
        <AddLesson show={showAdd} setShow={setShowAdd} />
      </main>
    </div>
  )
}

export default DashboardBody
