import React from "react"
import ButtonAccount from "./ButtonAccount"

function TopDashboard() {
  return (
    <div className="w-full bg-white overflow-visible">
      <header className="pl-8 pt-12 flex justify-center items-center rounded-b-md">
        <div className="mr-auto">
          <ButtonAccount />
        </div>
      </header>
      {/* <div className="flex justify-center items-center mt-4 text-4xl text-glacierBlue font-bold">
        <h1 className="text-center">The best companion for learning.</h1>
      </div> */}
    </div>
  )
}

export default TopDashboard
