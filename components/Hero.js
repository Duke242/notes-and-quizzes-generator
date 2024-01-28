import Benefits from "./Benefits"
import ButtonAccount from "./ButtonAccount"
import ButtonSignin from "./ButtonSignin"
import VideoComponent from "./VideoComponent"

const Hero = () => {
  return (
    <section className="p-4 md:p-8 lg:p-12">
      <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl text-center text-glacierBlue mt-4 md:mt-8 lg:mt-12">
        Let AI assist you by providing simple notes and quizzes, creating a more
        organized learning structure for you.
      </h1>
      <p className="text-center text-gray-500 mt-4 md:mt-6 lg:mt-8 text-lg md:text-2xl">
        Enjoy learning what you love, and let AI handle the rest.
      </p>
      <div className="w-full text-center mt-6 md:mt-8 lg:mt-10">
        <ButtonSignin
          text="Get Started"
          extraStyle="mx-auto w-fit bg-glacierBlue text-overcast p-3 md:p-4 lg:p-5 text-lg hover:text-glacierBlue"
        />
      </div>
    </section>
  )
}

export default Hero
