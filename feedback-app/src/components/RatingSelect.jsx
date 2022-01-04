import { useState, useContext, useEffect } from "react"
import FeedbackContext from "../context/FeedbackContext"

const RatingSelect = ({ select }) => {
  const [selected, setSelected] = useState(10)

  const { feedbackEdit } = useContext(FeedbackContext)

  useEffect(() => {
    setSelected(feedbackEdit.item.rating)
  }, [feedbackEdit])

  const handleChange = e => {
    setSelected(+e.currentTarget.value)
    select(+e.currentTarget.value)
  }

  const ratings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  return (
    <>
      <ul className="rating">
        {ratings.map(number => (
          <li key={number}>
            <input
              type="radio"
              id={`num${number}`}
              name="rating"
              value={number}
              onChange={handleChange}
              checked={selected === number}
            />
            <label htmlFor={`num${number}`}>{number}</label>
          </li>
        ))}
      </ul>
    </>
  )
}

export default RatingSelect
