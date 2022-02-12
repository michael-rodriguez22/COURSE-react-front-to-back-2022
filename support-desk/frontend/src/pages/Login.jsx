import { useState, useEffect } from "react"
import { FaSignInAlt } from "react-icons/fa"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { login, reset } from "../features/auth/auth-slice"
import { useNavigate } from "react-router-dom"
import Spinner from "../Components/Spinner"

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const { email, password } = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    state => state.auth
  )

  useEffect(() => {
    if (isError) toast.error(message, { autoClose: 3000 })

    if (isSuccess || user) {
      toast.success(`Welcome back, ${user.name}!`)
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

    for (const field in formData) {
      if (!formData[field]) return toast.warn(`${field} field is required`)
    }

    dispatch(login(formData))
  }

  if (isLoading) return <Spinner />

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt />
        </h1>
        <p>Login to get support</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
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
            <button type="submit" className="btn btn-block">
              Login
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login
