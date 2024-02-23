import Benefits from "./Benefits"
import ButtonAccount from "./ButtonAccount"
import ButtonSignin from "./ButtonSignin"
import VideoComponent from "./VideoComponent"

const Hero = () => {
  return (
    <section className="p-4 md:p-8 lg:p-12">
      <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl text-center text-glacierBlue mt-4 md:mt-8 lg:mt-12">
        A learning tool that fits your brain's way of learning.
      </h1>
      <p className="text-center text-gray-500 mt-4 md:mt-6 lg:mt-8 text-lg md:text-2xl">
        Learn better by absorbing, not forcing.
      </p>
      <div className="w-full text-center mt-6 md:mt-8 lg:mt-10">
        <ButtonSignin
          text="Get Started"
          extraStyle="mx-auto w-fit bg-glacierBlue text-overcast p-4 h-fit text-xl hover:text-glacierBlue shadow"
        />
      </div>
    </section>
  )
}

export default Hero
