import { useState } from "react"
import { Header, FeedbackList } from "./components"
import feedbackData from "./data/feedbackData"

function App() {
  const [feedback, setFeedback] = useState(feedbackData)

  return (
    <>
      <Header />
      <div className="container">
        <FeedbackList feedback={feedback} />
      </div>
    </>
  )
}

export default App
