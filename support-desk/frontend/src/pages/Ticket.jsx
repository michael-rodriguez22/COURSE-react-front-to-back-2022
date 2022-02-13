import { useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getTicket, closeTicket } from "../features/tickets/ticket-slice"
import { getNotes, reset as notesReset } from "../features/notes/note-slice"
import { Spinner, BackButton, NoteItem } from "../Components"
import { toast } from "react-toastify"

function Ticket() {
  const { ticket, isLoading, isSuccess, isError, message } = useSelector(
    state => state.tickets
  )

  const { notes, isLoading: notesIsLoading } = useSelector(state => state.notes)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { ticketId } = useParams()

  useEffect(() => {
    if (isError) toast.error(message, { autoClose: 3000 })

    dispatch(getTicket(ticketId))
    dispatch(getNotes(ticketId))
  }, [isError, message, ticketId, dispatch])

  const onTicketClose = () => {
    dispatch(closeTicket(ticketId))
    toast.info("Ticket closed")
    navigate("/tickets")
  }

  if (isLoading || notesIsLoading) return <Spinner />

  if (isError) return <h2>Something went wrong...</h2>
  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url="/tickets" />

        <h3>
          Ticket ID: {ticket._id}{" "}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h3>

        <h3>Submitted: {new Date(ticket.createdAt).toLocaleString()}</h3>

        <h3>Product: {ticket.product}</h3>

        <hr />

        <div className="ticket-desc">
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>
        </div>
      </header>
      {notes && (
        <>
          <h2>Notes</h2>
          {notes.map(note => (
            <NoteItem key={note._id} note={note} />
          ))}
        </>
      )}

      {ticket.status !== "closed" && (
        <button onClick={onTicketClose} className="btn btn-block btn-danger">
          Close Ticket
        </button>
      )}
    </div>
  )
}

export default Ticket
