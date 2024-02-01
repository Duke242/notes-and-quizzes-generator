import { IoIosCheckmarkCircle } from "react-icons/io"
import { FaBookReader, FaClipboardCheck } from "react-icons/fa"
import { MdQuiz } from "react-icons/md"

const Benefits = () => {
  //
  return (
    <section className="mx-auto w-full p-4 md:p-8 bg-overcast">
      <main className="mx-auto w-full md:w-2/3">
        <h2 className="text-center text-3xl md:text-4xl pt-4 md:pt-8 mb-6 md:mb-10 text-gray-500">
          Main Benefits
        </h2>
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-col items-center border-t border-b border-r border-l-0 md:border-l border-gray-200 p-4 md:w-1/3">
            <FaBookReader size={80} color="#1995AD" />
            <p className="text-lg text-center mt-2">
              Understand lessons better with spaced repetition.
            </p>
          </div>
          <div className="flex flex-col items-center border-t border-b border-r border-l-0 md:border-l md:border-r-0 border-gray-200 p-4 md:w-1/3">
            <FaClipboardCheck size={80} color="#1995AD" />
            <p className="text-lg text-center mt-2">
              Enhance understanding with simple AI explanations.
            </p>
          </div>
          <div className="flex flex-col items-center border-t border-b border-l-0 md:border-l border-gray-200 p-4 md:w-1/3">
            <MdQuiz size={80} color="#1995AD" />
            <p className="text-lg text-center mt-2">
              Reinforce knowledge through AI-generated quizzes.
            </p>
          </div>
        </div>
      </main>
    </section>
  )
}

export default Benefits
