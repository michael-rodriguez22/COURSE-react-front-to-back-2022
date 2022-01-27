import { useState, useEffect, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase.config"
import { toast } from "react-toastify"
import emailjs from "@emailjs/browser"
import Spinner from "../components/Spinner"

function Contact() {
  const [formData, setFormData] = useState({
    owner_name: "",
    owner_email: "",
    subject: "",
    from_name: "",
    from_email: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const isMounted = useRef(true)

  const auth = getAuth()

  useEffect(() => {
    isMounted.current &&
      onAuthStateChanged(
        auth,
        user =>
          user &&
          setFormData(prev => ({
            ...prev,
            from_name: auth.currentUser.displayName,
            from_email: auth.currentUser.email,
          }))
      )

    return () => (isMounted.current = false)
  }, [isMounted, auth])

  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const getOwner = async () => {
      const docRef = doc(db, "users", params.ownerId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setFormData(prev => ({
          ...prev,
          owner_name: docSnap.data().name,
          owner_email: docSnap.data().email,
        }))
      } else {
        toast.error(
          "Something went wrong while finding the owner of that listing",
          { autoClose: 2000 }
        )
        navigate("/")
      }
    }

    const getListing = async () => {
      const docRef = doc(db, "listings", params.listingId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setFormData(prev => ({
          ...prev,
          subject: "House Marketplace - " + docSnap.data().name,
        }))
      } else {
        toast.error("Something went wrong while finding that listing", {
          autoClose: 2000,
        })
        navigate("/")
      }
    }

    getOwner()
    getListing()
  }, [params.ownerId, params.listingId, navigate])

  const onChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value,
    }))
  }

  const onSubmit = async e => {
    e.preventDefault()
    const templateParams = formData
    try {
      setLoading(true)
      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        templateParams,
        process.env.REACT_APP_EMAILJS_USER_ID
      )

      setLoading(false)
      navigate("/")
      toast.success("Your message has been successfully sent")
    } catch (error) {
      setLoading(false)
      toast.error("Something went wrong while sending your message")
    }
  }

  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Contact Owner</p>
        {formData.owner_name && formData.owner_email && (
          <main>
            <p className="contactLabel">To</p>
            <input
              type="text"
              className="contactValue"
              value={`${formData.owner_name} <${formData.owner_email}>`}
              readOnly={true}
            />
            <p className="contactLabel">Subject</p>
            <input
              type="text"
              className="contactValue"
              value={formData.subject}
              readOnly={true}
            />
            <form onSubmit={onSubmit}>
              {loading ? (
                <Spinner />
              ) : (
                <div className="contactFormWrapper">
                  <label htmlFor="from_name" className="contactLabel">
                    Name
                  </label>
                  <input
                    type="text"
                    name="from_name"
                    id="from_name"
                    className="contactValue"
                    value={formData.from_name}
                    onChange={onChange}
                    placeholder="Your Name"
                  />
                  <label htmlFor="from_email" className="contactLabel">
                    Email
                  </label>
                  <input
                    type="email"
                    name="from_email"
                    id="from_email"
                    className="contactValue"
                    value={formData.from_email}
                    onChange={onChange}
                    placeholder="Your Email Address"
                  />
                  <label htmlFor="message" className="contactLabel">
                    Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    className="textarea"
                    value={formData.message}
                    onChange={onChange}
                    placeholder="Your Message"
                    maxLength={840}
                    required
                  ></textarea>
                </div>
              )}
              <button className="primaryButton contactButton" type="submit">
                Send Message
              </button>
            </form>
          </main>
        )}
      </header>
    </div>
  )
}

export default Contact
