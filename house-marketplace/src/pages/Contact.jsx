import { useState, useEffect } from "react"
import { useParams, useSearchParams } from "react-router-dom"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase.config"
import { toast } from "react-toastify"

// @todo - add emailjs to handle email
// @todo? - possibly add messaging system to communicate within the app

function Contact() {
  const [message, setMessage] = useState("")
  const [owner, setOwner] = useState(null)
  const [searchParams] = useSearchParams()

  const params = useParams()

  useEffect(() => {
    const getOwner = async () => {
      const docRef = doc(db, "users", params.ownerId)
      const docSnap = await getDoc(docRef)

      docSnap.exists()
        ? setOwner(docSnap.data())
        : toast.error("Could not get owner data...")
    }

    getOwner()
  }, [params.ownerId])

  const onChange = e => setMessage(e.target.value)

  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Contact Owner</p>
        {owner !== null && (
          <main>
            <div className="contactOwner">
              <p className="ownerName">Contact {owner.name}</p>
            </div>

            <form className="messageForm">
              <div className="messageDiv">
                <label htmlFor="message" className="messageLabel">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  className="textarea"
                  value={message}
                  onChange={onChange}
                ></textarea>
              </div>
              <a
                href={`mailto:${owner.email}?Subject=${searchParams.get(
                  "listingName"
                )}&body=${message}`}
                target="_blank"
                rel="noreferrer"
              >
                <button className="primaryButton" type="button">
                  Send Message
                </button>
              </a>
            </form>
          </main>
        )}
      </header>
    </div>
  )
}

export default Contact
