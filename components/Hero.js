import Benefits from "./Benefits"
import ButtonAccount from "./ButtonAccount"
import ButtonSignin from "./ButtonSignin"
import VideoComponent from "./VideoComponent"

const Hero = () => {
  return (
    <section className="h-fit">
      <h1 className="font-bold text-5xl text-center text-glacierBlue mt-12">
        Let AI make life simple by creating easy notes and
        <br />
        quizzes that enhance your understanding.
      </h1>
      <p className="text-center text-gray-500 mt-8 text-2xl">
        Enjoy learning what you love, and let AI handle the rest.
      </p>
      <div className="w-full text-center mt-10">
        <ButtonSignin
          text="Get Started"
          extraStyle={
            "mx-auto w-fit bg-glacierBlue text-overcast p-4 h-fit text-xl hover:text-glacierBlue"
          }
        />
      </div>
    </section>
  )
}

export default Hero
