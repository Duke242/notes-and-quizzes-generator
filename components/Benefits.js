import { IoIosCheckmarkCircle } from "react-icons/io"

const Benefits = () => {
  return (
    <section class="mx-auto w-full h-fit bg-overcast">
      <main className="mx-auto w-2/3">
        <h2 className="text-center text-5xl pt-8 mb-10">Main Benefits</h2>
        <ul class="flex flex-col gap-8 list-none text-center">
          <li class="flex items-center text-2xl">
            <span className="mr-2">
              <IoIosCheckmarkCircle size={30} color="#1995AD" />
            </span>
            Understand lessons with the assistance of AI and spaced repition.
          </li>
          <li class="flex items-center text-2xl">
            <span className="mr-2">
              <IoIosCheckmarkCircle size={30} color="#1995AD" />
            </span>
            Enhance understanding with simple AI explanations.
          </li>
          <li class="flex items-center text-2xl">
            <span className="mr-2">
              <IoIosCheckmarkCircle size={30} color="#1995AD" />
            </span>
            Reinforce knowledge through AI-generated quizzes.
          </li>
        </ul>
      </main>
    </section>
  )
}

export default Benefits
