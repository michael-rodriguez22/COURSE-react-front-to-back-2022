import { useContext } from "react"
import { FaTimes } from "react-icons/fa"
import PropTypes from "prop-types"
import Card from "./shared/Card"
import FeedbackContext from "../context/FeedbackContext"

const FeedbackItem = ({ item }) => {
  const { deleteFeedback } = useContext(FeedbackContext)
  return (
    <Card>
      <div className="num-display">{item.rating}</div>
      <button className="close" onClick={() => deleteFeedback(item.id)}>
        <FaTimes color="#202142" />
      </button>
      <div className="text-display">{item.text}</div>
    </Card>
  )
}

FeedbackItem.propTypes = {
  item: PropTypes.object.isRequired,
}

export default FeedbackItem
