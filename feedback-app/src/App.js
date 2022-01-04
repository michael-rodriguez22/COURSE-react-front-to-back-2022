import { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"
import feedbackData from "./data/feedbackData"
import Header from "./components/Header"
import FeedbackForm from "./components/FeedbackForm"
import FeedbackStats from "./components/FeedbackStats"
import FeedbackList from "./components/FeedbackList"
import AboutIconLink from "./components/AboutIconLink"
import AboutPage from "./pages/AboutPage"
import { FeedbackProvider } from "./context/FeedbackContext"

function App() {
  const [feedback, setFeedback] = useState(feedbackData)

  const addFeedback = newFeedback => {
    newFeedback.id = uuidv4()
    setFeedback([newFeedback, ...feedback])
  }

  const deleteFeedback = id => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setFeedback(feedback.filter(item => item.id !== id))
    }
  }

  return (
    <>
      <FeedbackProvider>
        <Router>
          <Header />
          <div className="container">
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <>
                    <FeedbackForm handleAdd={addFeedback} />
                    <FeedbackStats />
                    <FeedbackList handleDelete={deleteFeedback} />
                  </>
                }
              ></Route>
              <Route path="/about" element={<AboutPage />} />
            </Routes>
            <AboutIconLink />
          </div>
        </Router>
      </FeedbackProvider>
    </>
  )
}

export default App
