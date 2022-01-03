import { useState } from "react"
import Header from "./components/Header"
import FeedbackList from "./components/FeedbackList"
import feedbackData from "./data/feedbackData"
import FeedbackStats from "./components/FeedbackStats"

function App() {
  const [feedback, setFeedback] = useState(feedbackData)
  const deleteFeedback = id => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setFeedback(feedback.filter(item => item.id !== id))
    }
  }

  return (
    <>
      <Header />
      <div className="container">
        <FeedbackStats feedback={feedback} />
        <FeedbackList feedback={feedback} handleDelete={deleteFeedback} />
      </div>
    </>
  )
}

export default App
