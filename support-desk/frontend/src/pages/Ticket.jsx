import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getTicket, closeTicket } from "../features/tickets/ticket-slice"
import { getNotes, addNote } from "../features/notes/note-slice"
import { Spinner, BackButton, NoteItem } from "../Components"
import { toast } from "react-toastify"
import Modal from "react-modal"
import { FaPlus } from "react-icons/fa"

const modalStyles = {
  content: {
    width: "80%",
    maxWidth: "600px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    position: "relative",
  },
}

Modal.setAppElement("#root")

function Ticket() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [noteText, setNoteText] = useState("")

  const { ticket, isLoading, isError, message } = useSelector(
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

  const openModal = () => setModalIsOpen(true)
  const closeModal = () => setModalIsOpen(false)

  const onNoteSubmit = e => {
    e.preventDefault()
    dispatch(addNote({ noteText, ticketId }))
    closeModal()
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

      {ticket.status !== "closed" && (
        <button className="btn" onClick={openModal}>
          <FaPlus /> Add Note
        </button>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="Add Note"
      >
        <h2>Add Note</h2>

        <button className="btn-close" onClick={closeModal}>
          X
        </button>

        <form onSubmit={onNoteSubmit}>
          <div className="form-group">
            <textarea
              name="noteText"
              id="noteText"
              className="form-control"
              placeholder="Note Text"
              value={noteText}
              onChange={e => setNoteText(e.target.value)}
            ></textarea>
          </div>

          <div className="form-group">
            <button className="btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </Modal>

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
