import { createContext, useState } from "react"
import { v4 as uuidv4 } from "uuid"

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([
    {
      id: uuidv4(),
      text: "mon Dieu... c'est sans undertale",
      rating: 7,
    },
    {
      id: uuidv4(),
      text: "mio Dio... è sans from undertale",
      rating: 10,
    },
    {
      id: uuidv4(),
      text: "mein Gott... es ist sans from undertale",
      rating: 9,
    },
  ])

  const [feedbackEdit, setFeedbackEdit] = useState({ item: {}, edit: false })

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
