import React from "react"

function WaysToLearn() {
  return (
    <div className="bg-overcast p-8">
      <h1 className="text-center text-3xl text-glacierBlue uppercase font-bold mb-8">
        Effective Ways Of Learning
      </h1>
      <ul className="text-center mx-auto max-w-xl text-lg">
        <li className="my-4">
          By Rote: Repetition of information without meaningful connection to
          existing knowledge, resulting in inefficient memory retention. It's
          like brute force memorization.
        </li>
        <li className="my-4">
          By Assimilation: Integrating new information into existing knowledge
          structures, making it easier to understand and remember. This method
          relies on comprehension and connection to prior experience.
        </li>
        <li className="my-4">
          By Using a Mnemonic Device: Employing techniques like acronyms or
          visual aids to organize information for easier recall. Mnemonic
          devices help encode information in a memorable way.
        </li>
      </ul>
      <p className="text-center max-w-xl mx-auto mt-8 bg-gradient-to-r from-ice to-glacierBlue text-white py-4 px-6 text-lg rounded-lg shadow-lg">
        Discover SimpleNote's power! With AI-generated explanations on any topic
        you choose, you build a mental structure that helps you learn faster.
        See how this process works for you, or stick to old ways and fall behind
        those using SimpleNotes to learn better and quicker.
      </p>
    </div>
  )
}

export default WaysToLearn
