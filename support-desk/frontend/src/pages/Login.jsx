import { useState } from "react"
import { FaSignInAlt } from "react-icons/fa"
import { toast } from "react-toastify"

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const { email, password } = formData

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
  }

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
