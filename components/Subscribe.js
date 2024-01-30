import config from "@/config"
import ButtonAccount from "./ButtonAccount"
import ButtonCheckout from "./ButtonCheckout"

const Subscribe = () => {
  return (
    <main className="min-h-screen p-8 pb-24">
      <section className="max-w-xl mx-auto space-y-8">
        <ButtonAccount />

        <h1 className="text-3xl md:text-4xl font-extrabold">
          Subscribe to get access:
        </h1>

        <ButtonCheckout
          mode="subscription"
          priceId={config.stripe.plans[0].priceId}
        />
      </section>
    </main>
  )
}

export default Subscribe
