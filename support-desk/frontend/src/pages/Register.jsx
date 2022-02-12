import { useState } from "react"
import { FaUser } from "react-icons/fa"
import { toast } from "react-toastify"

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  })

  const { name, email, password, password2 } = formData

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
  }

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
