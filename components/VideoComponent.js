import Link from "next/link"

const VideoComponent = () => {
  return (
    <div className="flex flex-col h-screen bg-overcast">
      <div className="flex-shrink-0 p-4 mt-8 ml-8">
        <Link
          className="bg-blue-500 text-white py-2 px-4 mt-8 rounded-md"
          href="/"
        >
          Go Back
        </Link>
      </div>
      <div className="flex-grow flex flex-col items-center justify-center">
        <div className="w-full h-3/4 mb-8 lg:w-2/3 lg:h-2/3 lg:mb-12">
          <h1 className="text-3xl mb-4 text-glacierBlue text-center">
            How It Works
          </h1>
          <div className="h-full w-full">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/z7J6PzZWF3s"
              title="YouTube video player"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoComponent
