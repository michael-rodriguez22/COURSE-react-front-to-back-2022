import { createContext, useState, useEffect } from "react"

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

  const addFeedback = async newFeedback => {
    const response = await fetch("/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFeedback),
    })

    const data = await response.json()

    setFeedback([data, ...feedback])
  }

  const deleteFeedback = async id => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      await fetch(`/feedback/${id}`, { method: "DELETE" })

      setFeedback(feedback.filter(item => item.id !== id))
      setFeedbackEdit({ item: {}, edit: false })
    }
  }

  // update feedback item
  const updateFeedback = async (id, updItem) => {
    const response = await fetch(`/feedback/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updItem),
    })

    const data = await response.json()

    setFeedback(
      feedback.map(item => (item.id === id ? { ...item, ...data } : item))
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
