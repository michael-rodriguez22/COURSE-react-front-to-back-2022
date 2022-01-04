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
    window.confirm("Are you sure you want to delete this item?") &&
      setFeedback(feedback.filter(item => item.id !== id))
  }

  const editFeedback = item => {
    setFeedbackEdit({ item, edit: true })
  }

  return (
    <>
      <FeedbackContext.Provider
        value={{
          feedback,
          deleteFeedback,
          addFeedback,
          editFeedback,
          feedbackEdit,
        }}
      >
        {children}
      </FeedbackContext.Provider>
    </>
  )
}

export default FeedbackContext
