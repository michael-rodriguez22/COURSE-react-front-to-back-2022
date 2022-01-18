import { useState } from "react"
import {
  getAuth,
  updateProfile,
  updateEmail,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth"
import { updateDoc, doc } from "firebase/firestore"
import { db } from "../firebase.config"
import { useNavigate } from "react-router-dom"
import { FaEdit } from "react-icons/fa"
import { toast } from "react-toastify"

function Profile() {
  const auth = getAuth()

  const [nameEditState, setNameEditState] = useState(false)
  const [name, setName] = useState(auth.currentUser.displayName)

  const [emailEditState, setEmailEditState] = useState(false)
  const [email, setEmail] = useState(auth.currentUser.email)
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const onLogout = () => {
    auth.signOut()
    navigate("/")
  }

  const submitNameFirebase = async () => {
    return Promise.all([
      // update auth displayName
      updateProfile(auth.currentUser, { displayName: name })
        .then(data => data)
        .catch(error => error),

      // update name field in firestore user doc
      updateDoc(doc(db, "users", auth.currentUser.uid), { name })
        .then(data => data)
        .catch(error => error),
    ])
  }

  const handleUpdateName = () => {
    if (name !== auth.currentUser.displayName) {
      const statusToast = toast.loading("Updating name...")
      submitNameFirebase()
        .then(() =>
          toast.update(statusToast, {
            render: "Name was successfully updated",
            type: "success",
            isLoading: false,
            autoClose: 3000,
          })
        )
        .catch(() =>
          toast.update(statusToast, {
            render: "Something went wrong...",
            type: "error",
            isLoading: false,
            autoClose: 3000,
          })
        )
    }
    setNameEditState(!nameEditState)
  }

  const submitEmailFirebase = async () => {
    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      password
    )
    setPassword("")
    return Promise.all([
      // reauthenticate with provided password
      await reauthenticateWithCredential(auth.currentUser, credential).catch(
        error => {
          throw new Error(error)
        }
      ),

      // update email in firebase auth
      await updateEmail(auth.currentUser, email).catch(error => {
        throw new Error(error)
      }),

      // update email field in firestore user doc
      await updateDoc(doc(db, "users", auth.currentUser.uid), { email }).catch(
        error => {
          throw new Error(error)
        }
      ),
    ])
  }

  const handleUpdateEmail = () => {
    if (email !== auth.currentUser.email && password === "") {
      return toast.warn("Password is required to update email address")
    } else if (email !== auth.currentUserEmail && password) {
      const statusToast = toast.loading("Updating email...")
      submitEmailFirebase()
        .then(() => {
          toast.update(statusToast, {
            render: "Email address was successfully updated",
            type: "success",
            isLoading: false,
            autoClose: 3000,
          })
        })
        .catch(() => {
          toast.update(statusToast, {
            render: "Something went wrong...",
            type: "error",
            isLoading: false,
            autoClose: 3000,
          })
          setEmail(auth.currentUser.email)
        })
      setPassword("")
    }
    setEmailEditState(!emailEditState)
  }

  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">My Profile</p>
        <button type="button" className="logOut" onClick={onLogout}>
          Logout
        </button>
      </header>
      <main>
        <div className="profileDetailsHeader">
          <p className="profileDetailsText">Personal Details</p>
        </div>
        <div className="profileCard">
          <form onSubmit={e => e.preventDefault()} autoComplete="off">
            <div className="profileCardRow">
              <FaEdit
                className="changePersonalDetails"
                onClick={handleUpdateName}
                title="edit name"
              />
              <input
                type="text"
                id="name"
                className={!nameEditState ? "profileName" : "profileNameActive"}
                disabled={!nameEditState}
                value={name}
                onChange={e => setName(e.target.value)}
                onKeyDown={e => e.code === "Enter" && handleUpdateName()}
              />
            </div>

            <div className="profileCardRow">
              <FaEdit
                className="changePersonalDetails"
                onClick={handleUpdateEmail}
                title="edit email"
              />
              <input
                type="email"
                id="email"
                className={
                  !emailEditState ? "profileEmail" : "profileEmailActive"
                }
                disabled={!emailEditState}
                value={email}
                onChange={e => setEmail(e.target.value.trim())}
              />
            </div>
            {emailEditState && email !== auth.currentUser.email && (
              <div className="profileCardRow">
                <input
                  type="password"
                  id="password"
                  className="profilePassword"
                  placeholder="current password (required)"
                  value={password}
                  onChange={e => setPassword(e.target.value.trim())}
                  onKeyDown={e => e.code === "Enter" && handleUpdateEmail()}
                />
              </div>
            )}
          </form>
        </div>
      </main>
    </div>
  )
}

export default Profile
