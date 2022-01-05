import { createContext, useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [feedback, setFeedback] = useState([])
  const [feedbackEdit, setFeedbackEdit] = useState({ item: {}, edit: false })

  useEffect(() => {
    fetchFeedback()
  }, [])

  // fetch feedback data
  const fetchFeedback = async () => {
    const response = await fetch("/feedback?_sort=id&_order=desc")
    const data = await response.json()

    setFeedback(data)
    setIsLoading(false)
  }

  const addFeedback = newFeedback => {
    newFeedback.id = uuidv4()
    setFeedback([newFeedback, ...feedback])
  }

  const deleteFeedback = id => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setFeedback(feedback.filter(item => item.id !== id))
      setFeedbackEdit({ item: {}, edit: false })
    }
  }

  // update feedback item
  const updateFeedback = (id, updItem) => {
    setFeedback(
      feedback.map(item => (item.id === id ? { ...item, ...updItem } : item))
    )
    setFeedbackEdit({ item: {}, edit: false })
  }

  // set edit state
  const editFeedback = item => {
    setFeedbackEdit({ item, edit: true })
  }

  return (
    <>
      <FeedbackContext.Provider
        value={{
          feedback,
          feedbackEdit,
          isLoading,
          setFeedbackEdit,
          deleteFeedback,
          addFeedback,
          editFeedback,
          updateFeedback,
        }}
      >
        {children}
      </FeedbackContext.Provider>
    </>
  )
}

export default FeedbackContext
