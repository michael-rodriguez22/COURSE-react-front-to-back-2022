import { createContext, useReducer } from "react"
import githubReducer from "./GitHubReducer"

const GitHubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const TOKEN = process.env.REACT_APP_TOKEN

export const GitHubProvider = ({ children }) => {
  const initialState = {
    users: [],
    loading: false,
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)

  // get initial users (testing purposes)
  const fetchUsers = async () => {
    setLoading()

    const response = await fetch(`${GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${TOKEN}`,
      },
    })

    const data = await response.json()

    dispatch({
      type: "GET_USERS",
      payload: data,
    })
  }

  const setLoading = () => dispatch({ type: "SET_LOADING" })

  return (
    <GitHubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        fetchUsers,
      }}
    >
      {children}
    </GitHubContext.Provider>
  )
}

export default GitHubContext
