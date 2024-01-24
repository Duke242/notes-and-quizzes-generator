import Link from "next/link"
import ButtonSignin from "@/components/ButtonSignin"
import Footer from "@/components/Footer"
import Pricing from "@/components/Pricing"
import Header from "@/components/Header"
import "./styles/page.css"
import FAQ from "@/components/FAQ"
import Hero from "@/components/Hero"
import Benefits from "@/components/Benefits"
import VideoComponent from "@/components/VideoComponent"

export default function Page() {
  return (
    <div className="bg-overcast min-h-screen">
      <Header />
      <main className="mx-auto w-max min-h-screen">
        <Hero />
        {/* <ButtonSignin
          text="Sign-In"
          extraStyle={
            "bg-ice w-fit text-lg hover:text-glacierBlue mx-auto flex justify-center mt-6"
          }
        /> */}
        <Benefits />
        {/* <Pricing /> */}
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}
