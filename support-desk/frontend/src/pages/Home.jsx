import { Link } from "react-router-dom"
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa"

function Home() {
  return (
    <>
      <section className="heading">
        <h1>How can we help?</h1>
        <p>Select from the options below</p>
      </section>

      <Link to="/new-ticket" className="btn btn-reverse btn-block">
        <FaTicketAlt />
        View My Tickets
      </Link>

      <Link to="/new-ticket" className="btn btn-block">
        <FaQuestionCircle />
        Create New Ticket
      </Link>
    </>
  )
}

export default Home
