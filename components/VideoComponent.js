import React from "react"

const VideoComponent = () => {
  return (
    <div className="w-full h-fit bg-overcast pt-16">
      <div className="flex flex-col justify-center items-center w-2/3 h-2/3 mx-auto bg-overcast">
        <h1 className="text-3xl mb-4 text-glacierBlue">How it works</h1>
        <video className="w-2/3 h-2/3 mx-auto" controls>
          <source src="WebPreview.mp4" type="video/mp4" />
          <p>Your browser does not support the video format.</p>
        </video>
      </div>
    </div>
  )
}

export default VideoComponent
