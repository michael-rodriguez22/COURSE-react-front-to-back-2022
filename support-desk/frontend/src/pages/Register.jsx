import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { FaUser } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { register, reset } from "../features/auth/auth-slice"
import { Spinner } from "../Components"

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  })

  const { name, email, password, password2 } = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    state => state.auth
  )

  useEffect(() => {
    if (isError) toast.error(message, { autoClose: 3000 })

    if (isSuccess || user) {
      toast.success(
        `Account created! Welcome to the support desk, ${user.name}.`
      )
      navigate("/")
    }

    dispatch(reset())
  }, [isError, isSuccess, user, message, navigate, dispatch])

  const onChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value,
    }))
  }

  const onSubmit = e => {
    e.preventDefault()

    if (password !== password2) return toast.warn("Passwords do not match")

    for (const field in formData) {
      if (!formData[field]) return toast.warn(`${field} field is required`)
    }

    const userData = { name, email, password }
    dispatch(register(userData))
  }

  if (isLoading) return <Spinner />

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser />
        </h1>
        <p>Create your account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              id="name"
              type="text"
              className="form-control"
              value={name}
              onChange={onChange}
              placeholder="Your Name"
            />
          </div>

          <div className="form-group">
            <input
              id="email"
              type="email"
              className="form-control"
              value={email}
              onChange={onChange}
              placeholder="Your Email Address"
            />
          </div>

          <div className="form-group">
            <input
              id="password"
              type="password"
              className="form-control"
              value={password}
              onChange={onChange}
              placeholder="Password"
            />
          </div>

          <div className="form-group">
            <input
              id="password2"
              type="password"
              className="form-control"
              value={password2}
              onChange={onChange}
              placeholder="Confirm Password"
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Register
