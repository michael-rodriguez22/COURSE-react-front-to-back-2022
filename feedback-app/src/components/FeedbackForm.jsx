import { useState } from "react"
import Card from "./shared/Card"
import Button from "./shared/Button"
import RatingSelect from "./RatingSelect"

const FeedbackForm = ({ handleAdd }) => {
  const [text, setText] = useState("")
  const [rating, setRating] = useState(10)
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [message, setMessage] = useState("")

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
      handleAdd(newFeedback)
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
          <h2>How would you rate your experience with us?</h2>
          <RatingSelect select={rating => setRating(rating)} />
          <div className="input-group">
            <input
              onChange={handleTextChange}
              type="text"
              placeholder="Write a review"
              value={text}
            />
            <Button type="submit" isDisabled={btnDisabled}>
              Send
            </Button>
          </div>
          {message && <div className="message">{message}</div>}
        </form>
      </Card>
    </>
  )
}

export default FeedbackForm
