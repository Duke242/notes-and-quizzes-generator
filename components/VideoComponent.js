import React from "react"

const VideoComponent = () => {
  return (
    <div className="flex justify-center items-center h-full w-full mx-auto">
      <video className="w-2/3 h-2/3 mx-auto" controls>
        <source src="WebPreview.mp4" type="video/mp4" />
        <p>Your browser does not support the video format.</p>
      </video>
    </div>
  )
}

export default VideoComponent
