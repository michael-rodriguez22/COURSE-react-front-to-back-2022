import { Navigate, Outlet } from "react-router-dom"
import useAuthStatus from "../hooks/useAuthStatus"
import Spinner from "./Spinner"

const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus()

  return checkingStatus ? (
    <Spinner />
  ) : loggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/sign-in" />
  )
}

export default PrivateRoute
