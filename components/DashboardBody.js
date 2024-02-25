"use client"
import React, { useEffect, useState } from "react"
import AddLesson from "./AddLesson"
import OneClickTitle from "./OneClickTitle"
import { useSupabaseBrowserClient } from "@/libs/createSupabaseBrowserClient"
import toast from "react-hot-toast"
import { revalidatePath } from "next/cache"

const DashboardBody = ({ children, tag, user, allRows }) => {
  const [showAdd, setShowAdd] = useState(false)

  // const uniqueCategories = new Set(allRows.map((item) => item.category))

  // Convert set to array if needed
  // const uniqueCategoriesArray = Array.from(uniqueCategories)

  const data = [
    {
      category: "Category12",
      content: "Content1",
      created_at: "2024-02-25T04:14:07.388297+00:00",
      creator_id: "eeca8a62-d48e-481b-8b90-6afff6319010",
      id: 1,
      title: "Title1",
    },
    {
      category: "Category2",
      content: "Content2",
      created_at: "2024-02-25T04:14:07.388297+00:00",
      creator_id: "eeca8a62-d48e-481b-8b90-6afff6319010",
      id: 2,
      title: "Title2",
    },
    // Add more objects as needed
  ]

  const uniqueCategories = new Set(data.map((item) => item.category))
  const uniqueCategoriesArray = Array.from(uniqueCategories)

  console.log({ uniqueCategoriesArray })

  return (
    <div
      onClick={function (evt) {
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
      <main className="flex-grow bg-white mt-0 rounded-b-md">
        <OneClickTitle {...{ tag }} />
        <div className="ml-12">
          {uniqueCategoriesArray.map((uniqueCategory) => (
            <button className="text-glacierBlue hover:underline mr-2 bg-red-200">
              {uniqueCategory}
            </button>
          ))}
        </div>

        {/* <> */}
        {/* <ul className="flex gap-3 ml-12 overflow-x-scroll overflow-y-hidden no-scrollbar">
            {allRows.map((tag) => (
              <li key={tag.id}>{tag.title}</li>
            ))}
          </ul> */}
        {/* </> */}
        <h1 className="text-3xl font-normal text-glacierBlue p-8">Learnings</h1>
        <button
          onClick={() => setShowAdd((v) => !v)}
          id="addLessonButton"
          className={`mx-auto ml-16 bg-glacierBlue text-white px-6 text-base py-2 text-lg rounded hover:bg-opacity-80 focus:bg-opacity-80 focus:outline-none shadow-2xl transition-colors duration-300 `}
        >
          + Note
        </button>
        <div className="h-fit pb-1 rounded-lg">{children}</div>
        <AddLesson show={showAdd} setShow={setShowAdd} />
      </main>
    </div>
  )
}

export default DashboardBody
