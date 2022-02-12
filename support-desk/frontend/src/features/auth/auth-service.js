import axios from "axios"

const API_URL = "/api/users"

const register = async userData => {
  const response = await axios.post(API_URL, userData)
  if (response.data) {
    localStorage.setItem("support-ticket/user", JSON.stringify(response.data))
  }
  return response.data
}

const login = async credentials => {
  const response = await axios.post(`${API_URL}/login`, credentials)
  if (response.data) {
    localStorage.setItem("support-ticket/user", JSON.stringify(response.data))
  }
  return response.data
}

const logout = () => localStorage.removeItem("support-ticket/user")

const authService = {
  register,
  login,
  logout,
}

export default authService
