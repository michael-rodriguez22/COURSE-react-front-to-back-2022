import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { createTicket, reset } from "../features/tickets/ticket-slice"
import { Spinner } from "../Components"

function NewTicket() {
  const { user } = useSelector(state => state.auth)
  const { isLoading, isError, isSuccess, message } = useSelector(
    state => state.ticket
  )

  const [name] = useState(user.name)
  const [email] = useState(user.email)
  const [product, setProduct] = useState("iPhone")
  const [description, setDescription] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isError) toast.error(message, { autoClose: 3000 })

    if (isSuccess) {
      toast.success("Ticket successfully created")
      navigate("/tickets")
    }

    dispatch(reset())
  }, [isError, isSuccess, message, navigate, dispatch])

  const onSubmit = e => {
    e.preventDefault()
    dispatch(createTicket({ product, description }))
  }

  if (isLoading) return <Spinner />

  return (
    <>
      <section className="heading">
        <h1>Create New Ticket</h1>
        <p>What do you need help with?</p>
      </section>

      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input type="text" className="form-control" value={name} disabled />
        </div>

        <div className="form-group">
          <label htmlFor="name">Customer Email</label>
          <input type="email" className="form-control" value={email} disabled />
        </div>

        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="product">Product</label>
            <select
              name="product"
              id="product"
              value={product}
              onChange={e => setProduct(e.target.value)}
            >
              <option value="iPhone">iPhone</option>
              <option value="iPad">iPad</option>
              <option value="Samsung Galaxy">Samsung Galaxy</option>
              <option value="Google Pixel">Google Pixel</option>
              <option value="iPad">iPad</option>
              <option value="Macbook">Macbook</option>
              <option value="Windows Laptop">Windows Laptop</option>
              <option value="Windows Desktop">Windows Desktop</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description of your issue</label>
            <textarea
              name="description"
              id="description"
              className="form-control"
              placeholder="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="form-control">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
}
export default NewTicket
