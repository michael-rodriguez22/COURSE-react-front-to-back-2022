import { Link } from "react-router-dom"
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa"

function Home() {
  return (
    <>
      <section className="heading">
        <h1>What would you like to do?</h1>
        <p>Select from the options below</p>
      </section>

      <Link to="/tickets" className="btn btn-reverse btn-block">
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
