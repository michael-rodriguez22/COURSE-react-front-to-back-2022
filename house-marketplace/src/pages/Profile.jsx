import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  getAuth,
  updateProfile,
  updateEmail,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth"
import {
  updateDoc,
  doc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
} from "firebase/firestore"
import { db } from "../firebase.config"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { FaEdit } from "react-icons/fa"
import { ArrowRightIcon, HomeIcon } from "../assets/svg"
import Spinner from "../components/Spinner"
import ListingItem from "../components/ListingItem"

function Profile() {
  const auth = getAuth()

  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)

  const [nameEditState, setNameEditState] = useState(false)
  const [name, setName] = useState(auth.currentUser.displayName)

  const [emailEditState, setEmailEditState] = useState(false)
  const [email, setEmail] = useState(auth.currentUser.email)
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserListings = async () => {
      const listingsRef = collection(db, "listings")
      const q = query(
        listingsRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      )
      const querySnap = await getDocs(q)

      const listings = []
      querySnap.forEach(doc => listings.push({ id: doc.id, data: doc.data() }))

      console.log(listings)
      setListings(listings)
      setLoading(false)
    }

    fetchUserListings()
  }, [auth.currentUser.uid])

  const onLogout = () => {
    auth.signOut()
    navigate("/")
  }

  const onDelete = async listingId => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      try {
        await deleteDoc(doc(db, "listings", listingId))
        const updatedListings = listings.filter(
          listing => listing.id !== listingId
        )
        setListings(updatedListings)
        toast.success("Listing was successfully deleted")
      } catch (error) {
        toast.error("Something went wrong")
      }
    }
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
        .then(() => {
          toast.dismiss(statusToast)
          toast.success("Name was successfully updated")
        })
        .catch(() => {
          toast.dismiss(statusToast)
          toast.error("Something went wrong while updating your name")
        })
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
          toast.dismiss(statusToast)
          toast.success("Email address was successfully updated")
        })
        .catch(() => {
          toast.dismiss(statusToast)
          toast.error("Something went wrong while updating your email address")
          setEmail(auth.currentUser.email)
        })
      setPassword("")
    }
    setEmailEditState(!emailEditState)
  }

  if (loading) return <Spinner />

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

        <Link to="/create-listing" className="createListing">
          <HomeIcon className="createListingIcon" />
          <p>Sell or rent your home</p>
          <ArrowRightIcon className="createListingIcon" />
        </Link>

        {!loading && listings?.length > 0 && (
          <>
            <p className="listingText">Your Listings</p>
            <ul className="listingsList">
              {listings.map(listing => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                  onDelete={() => onDelete(listing.id)}
                />
              ))}
            </ul>
          </>
        )}
      </main>
    </div>
  )
}

export default Profile
