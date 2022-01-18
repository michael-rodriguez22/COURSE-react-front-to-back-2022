// import { useLocation, useNavigate } from "react-router-dom"
// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
// import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore"
// import { db } from "../firebase.config"
// import { toast } from "react-toastify"
// import { googleIconSrc } from "../assets/svg"

// function OAuth() {
//   const location = useLocation()
//   const navigate = useNavigate()

//   const onGoogleClick = async () => {
//     try {
//       // sign in / sign up to firebase auth with google
//       const auth = getAuth()
//       const provider = new GoogleAuthProvider()
//       const result = await signInWithPopup(auth, provider)
//       console.log(result)
//       const user = result.user

//       // check if this user is already saved in firestore
//       const docRef = doc(db, "users", user.uid)
//       const docSnap = await getDoc(docRef)

//       // if not, create user doc in firestore
//       if (!docSnap.exists()) {
//         await setDoc(doc(db, "users", user.uid), {
//           name: user.displayName,
//           email: user.email,
//           timestamp: serverTimestamp(),
//         })
//       }

//       toast.success("Successfully signed in with Google")
//       navigate("/")
//     } catch (error) {
//       toast.error(`Error: ${error.code}`)
//     }
//   }

//   return (
//     <div className="socialLogin">
//       <p>Sign {location.pathname === "/sign-up" ? "up" : "in"} with </p>
//       <button className="socialIconDiv" onClick={onGoogleClick}>
//         <img src={googleIconSrc} alt="google" className="socialIconImg" />
//       </button>
//     </div>
//   )
// }

// export default OAuth
