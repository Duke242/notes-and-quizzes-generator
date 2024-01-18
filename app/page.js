import Link from "next/link"
import ButtonSignin from "@/components/ButtonSignin"
import Footer from "@/components/Footer"
import Pricing from "@/components/Pricing"
import Header from "@/components/Header"

export default function Page() {
  return (
    <div className="bg-overcast min-h-screen">
      <Header />
      <main className="mx-auto w-max min-h-screen">
        <div>
          <h1 className="font-bold text-6xl text-center text-glacierBlue mt-6">
            Jot down lessons for learning
            <br /> and improvement.
          </h1>
          <p className="text-center text-gray-500 mt-4 text-2xl">
            Record important lessons you learn to remember later and memorize.
          </p>
        </div>
        <ButtonSignin
          text="Sign-In"
          extraStyle={
            "bg-ice w-48 text-lg hover:text-glacierBlue mx-auto flex justify-center mt-6"
          }
        />
        {/* <Pricing /> */}
      </main>
      <Footer />
    </div>
  )
}
