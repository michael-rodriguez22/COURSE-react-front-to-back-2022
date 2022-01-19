import { useState, useEffect, useRef } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from "../firebase.config"
import { v4 as uuidv4 } from "uuid"
import { useNavigate } from "react-router-dom"
import Spinner from "../components/Spinner"
import { toast } from "react-toastify"

function CreateListing() {
  // can set to false if not using Google Geocode API
  const geolocationEnabled = true
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: "",
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
    images: [],
    latitude: 0,
    longitude: 0,
  })

  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    address,
    offer,
    regularPrice,
    discountedPrice,
    images,
    latitude,
    longitude,
  } = formData

  const auth = getAuth()
  const navigate = useNavigate()
  const isMounted = useRef(true)

  // check if user is logged in and component is mounted
  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, user => {
        if (user) {
          setFormData({ ...formData, userRef: user.uid })
        } else {
          toast.warning("You must be signed in to create a listing")
          navigate("/sign-in")
        }
      })
    }

    return () => {
      isMounted.current = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted])

  const onMutate = e => {
    let boolean = null
    if (e.target.value === "true") boolean = true
    if (e.target.value === "false") boolean = false

    // Files
    if (e.target.files) {
      setFormData(prev => ({ ...prev, images: e.target.files }))
    }

    // Numbers
    if (e.target.type === "number" && e.target.value !== "") {
      setFormData(prev => ({
        ...prev,
        [e.target.id]: Number(e.target.value),
      }))
      // Text / Booleans
    } else if (!e.target.files) {
      setFormData(prev => ({
        ...prev,
        [e.target.id]: boolean ?? e.target.value,
      }))
    }

    // reset discounted price to zero if offer is set to false
    if (e.target.id === "offer" && e.target.value === "false") {
      setFormData(prev => ({ ...prev, discountedPrice: 0 }))
    }
  }

  const onSubmit = async e => {
    e.preventDefault()
    setLoading(true)

    if (discountedPrice >= regularPrice) {
      setLoading(false)
      return toast.warn(
        "Discounted price needs to be lower than the regular price"
      )
    }

    if (images.length > 6) {
      setLoading(false)
      return toast.warn("You may only submit up to 6 images")
    } else if (images.length === 0) {
      setLoading(false)
      return toast.warn(
        "You must add at least one image to create this listing"
      )
    }

    let geolocation = {}
    let location

    if (geolocationEnabled) {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GEOCODE_API_KEY}`
      )
      const data = await response.json()

      geolocation.lat = data.results[0]?.geometry.location.lat ?? 0
      geolocation.lng = data.results[0]?.geometry.location.lng ?? 0
      location =
        data.status === "ZERO_RESULTS"
          ? undefined
          : data.results[0].formatted_address

      if (location === undefined || location.includes("undefined")) {
        setLoading(false)
        return toast.error("Please enter a valid address")
      }
    } else {
      geolocation.lat = latitude
      geolocation.lng = longitude
    }

    // Store images in firebase storage
    const storeImage = async image => {
      return new Promise((resolve, reject) => {
        const storage = getStorage()
        const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`
        const storageRef = ref(storage, "images/" + fileName)
        const uploadTask = uploadBytesResumable(storageRef, image)
        const statusToast = toast.loading(`Uploading ${image.name}`)
        uploadTask.on(
          "state_changed",
          snapshot => {
            // Observe state change events such as progress, pause, and resume
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            toast.update(statusToast, {
              render: `${image.name} upload is ${progress}% done`,
            })
            switch (snapshot.state) {
              case "paused":
                toast.update(statusToast, {
                  render: `${image.name} upload is paused`,
                })
                break
              default:
                toast.update(statusToast, {
                  render: `${image.name} is uploading`,
                })
            }
          },
          error => {
            toast.dismiss(statusToast)
            toast.error(`Something went wrong while updloading ${image.name}`)
            return reject(error)
          },
          () => {
            return getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
              toast.dismiss(statusToast)
              toast.success(`${image.name} was successfully uploaded`)
              return resolve(downloadURL)
            })
          }
        )
      })
    }

    const imgUrls = await Promise.all(
      [...images].map(image => storeImage(image))
    ).catch(() => {
      setLoading(false)
      return toast.error("Something went wrong while uploading your image(s)")
    })

    const formDataCopy = {
      ...formData,
      imgUrls,
      geolocation,
      timestamp: serverTimestamp(),
    }

    delete formDataCopy.images
    delete formDataCopy.address
    formDataCopy.location = address
    !formDataCopy.offer && delete formDataCopy.discountedPrice

    const docRef = await addDoc(collection(db, "listings"), formDataCopy)
    setLoading(false)
    toast.success("Listing created!")
    navigate(`/category/${formDataCopy.type}/${docRef.id}`)
  }

  if (loading) return <Spinner />

  return (
    <div className="profile">
      <header>
        <p className="pageHeader">Create a Listing</p>
      </header>

      <main>
        <form onSubmit={onSubmit}>
          <label className="formLabel">Sell / Rent</label>
          <div className="formButtons">
            <button
              type="button"
              className={type === "sale" ? "formButtonActive" : "formButton"}
              id="type"
              value="sale"
              onClick={onMutate}
            >
              Sell
            </button>
            <button
              type="button"
              className={type === "rent" ? "formButtonActive" : "formButton"}
              id="type"
              value="rent"
              onClick={onMutate}
            >
              Rent
            </button>
          </div>

          <label className="formLabel">Name</label>
          <input
            className="formInputName"
            type="text"
            id="name"
            value={name}
            onChange={onMutate}
            maxLength="32"
            minLength="10"
            required
          />

          <div className="formRooms flex">
            <div>
              <label className="formLabel">Bedrooms</label>
              <input
                className="formInputSmall"
                type="number"
                id="bedrooms"
                value={bedrooms}
                onChange={onMutate}
                min="1"
                max="50"
                required
              />
            </div>
            <div>
              <label className="formLabel">Bathrooms</label>
              <input
                className="formInputSmall"
                type="number"
                id="bathrooms"
                value={bathrooms}
                onChange={onMutate}
                min="1"
                max="50"
                required
              />
            </div>
          </div>

          <label className="formLabel">Parking spot</label>
          <div className="formButtons">
            <button
              className={parking ? "formButtonActive" : "formButton"}
              type="button"
              id="parking"
              value={true}
              onClick={onMutate}
              min="1"
              max="50"
            >
              Yes
            </button>
            <button
              className={
                !parking && parking !== null ? "formButtonActive" : "formButton"
              }
              type="button"
              id="parking"
              value={false}
              onClick={onMutate}
            >
              No
            </button>
          </div>

          <label className="formLabel">Furnished</label>
          <div className="formButtons">
            <button
              className={furnished ? "formButtonActive" : "formButton"}
              type="button"
              id="furnished"
              value={true}
              onClick={onMutate}
            >
              Yes
            </button>
            <button
              className={
                !furnished && furnished !== null
                  ? "formButtonActive"
                  : "formButton"
              }
              type="button"
              id="furnished"
              value={false}
              onClick={onMutate}
            >
              No
            </button>
          </div>

          <label className="formLabel">Address</label>
          <textarea
            className="formInputAddress"
            type="text"
            id="address"
            value={address}
            onChange={onMutate}
            required
          />

          {!geolocationEnabled && (
            <div className="formLatLng flex">
              <div>
                <label className="formLabel">Latitude</label>
                <input
                  className="formInputSmall"
                  type="number"
                  id="latitude"
                  value={latitude}
                  onChange={onMutate}
                  required
                />
              </div>
              <div>
                <label className="formLabel">Longitude</label>
                <input
                  className="formInputSmall"
                  type="number"
                  id="longitude"
                  value={longitude}
                  onChange={onMutate}
                  required
                />
              </div>
            </div>
          )}

          <label className="formLabel">Offer</label>
          <div className="formButtons">
            <button
              className={offer ? "formButtonActive" : "formButton"}
              type="button"
              id="offer"
              value={true}
              onClick={onMutate}
            >
              Yes
            </button>
            <button
              className={
                !offer && offer !== null ? "formButtonActive" : "formButton"
              }
              type="button"
              id="offer"
              value={false}
              onClick={onMutate}
            >
              No
            </button>
          </div>

          <label className="formLabel">Regular Price</label>
          <div className="formPriceDiv">
            <input
              className="formInputSmall"
              type="number"
              id="regularPrice"
              value={regularPrice}
              onChange={onMutate}
              min="50"
              max="750000000"
              required
            />
            <p className="formPriceText">
              {type === "rent" ? "$ / Month" : "$"}
            </p>
          </div>

          {offer && (
            <>
              <label className="formLabel">Discounted Price</label>
              <div className="formPriceDiv">
                <input
                  className="formInputSmall"
                  type="number"
                  id="discountedPrice"
                  value={discountedPrice}
                  onChange={onMutate}
                  min="50"
                  max="750000000"
                  required={offer}
                />
                <p className="formPriceText">
                  {type === "rent" ? "$ / Month" : "$"}
                </p>
              </div>
            </>
          )}

          <label className="formLabel">Images</label>
          <p className="imagesInfo">
            The first image will be the cover (max 6).
          </p>
          <input
            className="formInputFile"
            type="file"
            id="images"
            onChange={onMutate}
            max="6"
            accept=".jpg,.png,.jpeg"
            multiple
            // required
          />
          <button type="submit" className="primaryButton createListingButton">
            Create Listing!
          </button>
        </form>
      </main>
    </div>
  )
}

export default CreateListing
