import { IoIosCheckmarkCircle } from "react-icons/io"
import { FaBookReader } from "react-icons/fa"
import { FaClipboardCheck } from "react-icons/fa6"
import { MdQuiz } from "react-icons/md"

const Benefits = () => {
  return (
    <section class="mx-auto w-full h-fit bg-overcast">
      <main className="mx-auto w-2/3">
        <h2 className="text-center text-4xl pt-8 mb-10 text-gray-500">
          Main Benefits
        </h2>
        <div className="flex">
          <div className="flex flex-col items-center border-t border-b border-r border-gray-200 p-4">
            <FaBookReader size={100} color="#1995AD" />
            <p className="text-xl text-center mt-2">
              Understand lessons better with spaced repetition.
            </p>
          </div>
          <div className="flex flex-col items-center border-t border-b border-gray-200 p-4">
            <FaClipboardCheck size={100} color="#1995AD" />
            <p className="text-xl text-center mt-2">
              Enhance understanding with simple AI explanations.
            </p>
          </div>
          <div className="flex flex-col items-center border-t border-b border-l border-r-0 border-gray-200 p-4">
            <MdQuiz size={100} color="#1995AD" />
            <p className="text-xl text-center mt-2">
              Reinforce knowledge through AI-generated quizzes.
            </p>
          </div>
        </div>
      </main>
    </section>
  )
}

export default Benefits
