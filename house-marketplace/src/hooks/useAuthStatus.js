import { useEffect, useState, useRef } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"

// check if user is currently logged in

const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [checkingStatus, setCheckingStatus] = useState(true)
  const isMounted = useRef(true)

  useEffect(() => {
    // only perform state change if component is mounted
    if (isMounted) {
      const auth = getAuth()
      onAuthStateChanged(auth, user => {
        user && setLoggedIn(true)
        setCheckingStatus(false)
      })
    }
    return () => {
      isMounted.current = false
    }
  }, [isMounted])

  return { loggedIn, checkingStatus }
}

export default useAuthStatus
