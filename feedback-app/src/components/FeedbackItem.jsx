import { useContext } from "react"
import { FaTimes, FaEdit } from "react-icons/fa"
import PropTypes from "prop-types"
import Card from "./shared/Card"
import FeedbackContext from "../context/FeedbackContext"

const FeedbackItem = ({ item }) => {
  const { feedbackEdit, deleteFeedback, editFeedback } =
    useContext(FeedbackContext)

  return (
    <Card>
      <div
        className="num-display"
        style={feedbackEdit.item === item ? { transform: "scale(1.25)" } : {}}
      >
        {item.rating}
      </div>
      <button
        className="close"
        onClick={() => deleteFeedback(item.id)}
        title="delete item"
      >
        <FaTimes color="#202142" />
      </button>
      <button
        className="edit"
        onClick={() => editFeedback(item)}
        title="update item"
      >
        <FaEdit color={feedbackEdit.item === item ? "#ff6a95" : "#202142"} />
      </button>
      <div className="text-display">{item.text}</div>
    </Card>
  )
}

FeedbackItem.propTypes = {
  item: PropTypes.object.isRequired,
}

export default FeedbackItem
