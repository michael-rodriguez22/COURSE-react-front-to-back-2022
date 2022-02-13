import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getTickets, reset } from "../features/tickets/ticket-slice"
import { BackButton, Spinner, TicketItem } from "../Components"

function Tickets() {
  const { tickets, isLoading, isSuccess } = useSelector(state => state.tickets)

  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset())
      }
    }
  }, [dispatch, isSuccess])

  useEffect(() => {
    dispatch(getTickets())
  }, [dispatch])

  if (isLoading) return <Spinner />

  return (
    <>
      <BackButton url="/" />
      <h1>Tickets</h1>
      {!tickets.length ? (
        <p>You do not have any tickets</p>
      ) : (
        <>
          <div className="tickets">
            <div className="ticket-headings">
              <div>Date</div>
              <div>Product</div>
              <div>Status</div>
              <div></div>
            </div>
            {tickets.map(ticket => (
              <TicketItem key={ticket._id.toString()} ticket={ticket} />
            ))}
          </div>
        </>
      )}
    </>
  )
}
export default Tickets
