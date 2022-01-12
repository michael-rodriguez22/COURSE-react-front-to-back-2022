import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { toast } from "react-toastify"
import { ArrowRightIcon, VisibilityIconSrc } from "../assets/svg"

function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const { email, password } = formData

  const navigate = useNavigate()

  const onChange = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onSubmit = async e => {
    e.preventDefault()

    const auth = getAuth()

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )

      userCredential.user && navigate("/")
    } catch (error) {
      toast.error("Invalid User Credentials")
    }
  }

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome back!</p>
        </header>

        <main>
          <form onSubmit={onSubmit}>
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

            <div className="signInBar">
              <p className="signInText">Sign In</p>
              <button className="signInButton">
                <ArrowRightIcon fill="#fff" width="34px" height="34px" />
              </button>
            </div>
          </form>

          {/* @todo - Google OAuth */}

          <Link className="registerLink" to="/sign-up">
            Sign Up Instead
          </Link>
        </main>
      </div>
    </>
  )
}

export default SignIn
