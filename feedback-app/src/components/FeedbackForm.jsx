import { useState, useContext, useEffect } from "react"
import { FaTimes } from "react-icons/fa"
import Card from "./shared/Card"
import Button from "./shared/Button"
import RatingSelect from "./RatingSelect"
import FeedbackContext from "../context/FeedbackContext"

const FeedbackForm = () => {
  const [text, setText] = useState("")
  const [rating, setRating] = useState(10)
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [message, setMessage] = useState("")

  const { addFeedback, feedbackEdit, setFeedbackEdit, updateFeedback } =
    useContext(FeedbackContext)

  useEffect(() => {
    if (feedbackEdit.edit === true) {
      setBtnDisabled(false)
      setText(feedbackEdit.item.text)
      setRating(feedbackEdit.item.rating)
    } else {
      setBtnDisabled(true)
      setText("")
      setRating(10)
    }
  }, [feedbackEdit])

  const handleTextChange = e => {
    const input = e.target.value
    if (input === "") {
      setBtnDisabled(true)
      setMessage("")
    } else if (input !== "" && input.trim().length <= 10) {
      setBtnDisabled(true)
      setMessage("text must be at least 10 characters")
    } else {
      setBtnDisabled(false)
      setMessage("")
    }
    setText(input)
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (text.trim().length > 10) {
      const newFeedback = { text, rating }
      // check if updating or adding
      feedbackEdit.edit
        ? updateFeedback(feedbackEdit.item.id, newFeedback)
        : addFeedback(newFeedback)

      setText("")
      setMessage("")
    } else {
      setMessage("text must be at least 10 characters")
    }
  }

  return (
    <>
      <Card>
        <form onSubmit={handleSubmit}>
          {feedbackEdit.edit && (
            <button
              className="cancel-update"
              onClick={() => setFeedbackEdit({ item: {}, edit: false })}
            >
              <span>Cancel Update</span>
              <FaTimes size={20} />
            </button>
          )}
          <h2>How would you rate your experience with us?</h2>
          <RatingSelect select={rating => setRating(rating)} />
          <div className="input-group">
            <input
              onChange={handleTextChange}
              type="text"
              placeholder="Write a review"
              value={text}
            />
            <Button
              type="submit"
              isDisabled={btnDisabled}
              version={feedbackEdit.edit ? "secondary" : "primary"}
            >
              {feedbackEdit.edit ? "Update" : "Send"}
            </Button>
          </div>
          {message && <div className="message">{message}</div>}
        </form>
      </Card>
    </>
  )
}

export default FeedbackForm
