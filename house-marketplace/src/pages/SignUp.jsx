import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ArrowRightIcon, VisibilityIconSrc } from "../assets/svg"

function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const { name, email, password } = formData

  const navigate = useNavigate()

  const onChange = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome back!</p>
        </header>

        <main>
          <form>
            <input
              className="nameInput"
              type="text"
              placeholder="Name"
              id="name"
              value={name}
              onChange={onChange}
            />

            <input
              className="emailInput"
              type="email"
              placeholder="Email"
              id="email"
              value={email}
              onChange={onChange}
            />

            <div className="passwordInputDiv">
              <input
                className="passwordInput"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                id="password"
                value={password}
                onChange={onChange}
              />

              <img
                className="showPassword"
                src={VisibilityIconSrc}
                alt="show password"
                onClick={() => setShowPassword(prevState => !prevState)}
              />
            </div>

            <Link className="forgotPasswordLink" to="/forgot-password">
              Forgot Password
            </Link>

            <div className="signUpBar">
              <p className="signUpText">Sign Up</p>
              <button className="signUpButton">
                <ArrowRightIcon fill="#fff" width="34px" height="34px" />
              </button>
            </div>
          </form>

          {/* @todo - Google OAuth */}

          <Link className="registerLink" to="/sign-in">
            Sign In Instead
          </Link>
        </main>
      </div>
    </>
  )
}

export default SignUp
