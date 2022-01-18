import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { toast } from "react-toastify"
import { ArrowRightIcon, visibilityIconSrc } from "../assets/svg"

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
    const statusToast = toast.loading("Signing in...")
    try {
      const auth = getAuth()
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      toast.update(statusToast, {
        render: "You have successfully signed in",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      })
      userCredential.user && navigate("/")
    } catch (error) {
      toast.update(statusToast, {
        render: "Invalid user credentials",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      })
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
                src={visibilityIconSrc}
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
          <Link className="registerLink" to="/sign-up">
            Sign Up Instead
          </Link>
        </main>
      </div>
    </>
  )
}

export default SignIn
