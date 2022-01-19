import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth"
import { setDoc, doc, serverTimestamp } from "firebase/firestore"
import { db } from "../firebase.config"
import { toast } from "react-toastify"
import { ArrowRightIcon, visibilityIconSrc } from "../assets/svg"

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

  const onSubmit = async e => {
    e.preventDefault()
    if (name && email && password) {
      const statusToast = toast.loading("Signing up...")
      try {
        const auth = getAuth()
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        )

        const user = userCredential.user

        updateProfile(auth.currentUser, {
          displayName: name,
        })

        const formDataCopy = { ...formData }
        delete formDataCopy.password
        formDataCopy.timestamp = serverTimestamp()

        await setDoc(doc(db, "users", user.uid), formDataCopy)

        toast.update(statusToast, {
          render: "Sign up successful! Welcome to the House Marketplace.",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        })

        navigate("/")
      } catch (error) {
        toast.update(statusToast, {
          render: error.message,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        })
      }
    } else toast.warn("Please fill in all fields")
  }

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Sign up with us today!</p>
        </header>
        <main>
          <form onSubmit={onSubmit}>
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
                src={visibilityIconSrc}
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
          <Link className="registerLink" to="/sign-in">
            Sign In Instead
          </Link>
        </main>
      </div>
    </>
  )
}

export default SignUp
