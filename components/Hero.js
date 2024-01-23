import Image from "next/image"
import TestimonialsAvatars from "./TestimonialsAvatars"
import config from "@/config"

const Hero = () => {
  return (
    <section>
      <h1 className="font-bold text-6xl text-center text-glacierBlue mt-6">
        A new way to take notes <br /> with the help of AI.
      </h1>
      <p className="text-center text-gray-500 mt-4 text-2xl">
        Record important lessons you learn to remember later and memorize.
      </p>
    </section>
  )
}

export default Hero
