import Footer from "@/components/Footer"
import Pricing from "@/components/Pricing"
import Header from "@/components/Header"
import "./styles/page.css"
import FAQ from "@/components/FAQ"
import Hero from "@/components/Hero"
import Benefits from "@/components/Benefits"
import WaysToLearn from "@/components/WaysToLearn"

export default function Page() {
  // return <h1>Under maintenance</h1>
  return (
    <div className="bg-overcast min-h-screen flex flex-col w-screen justify-center">
      <Header />
      <main className="mx-auto w-full h-screen bg-overcast">
        <div className="flex w-full h-3/4">
          <div className="flex-grow bg-overcast w-1/2">
            <Hero />
          </div>
        </div>
        <Benefits />
        {/* <WaysToLearn /> */}
        <Pricing />
        <FAQ />
        <Footer />
      </main>
    </div>
  )
}
