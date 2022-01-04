import { useState } from "react"
import feedbackData from "./data/feedbackData"
import Header from "./components/Header"
import FeedbackForm from "./components/FeedbackForm"
import FeedbackStats from "./components/FeedbackStats"
import FeedbackList from "./components/FeedbackList"

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
        <FeedbackForm />
        <FeedbackStats feedback={feedback} />
        <FeedbackList feedback={feedback} handleDelete={deleteFeedback} />
      </div>
    </>
  )
}

export default App
