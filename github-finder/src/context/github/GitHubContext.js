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

  // set loading state to true
  const setLoading = () => dispatch({ type: "SET_LOADING" })

  // get users search results
  const searchUsers = async text => {
    setLoading()

    const params = new URLSearchParams({
      q: text,
    })

    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${TOKEN}`,
      },
    })

    const { items } = await response.json()

    dispatch({
      type: "GET_USERS",
      payload: items,
    })
  }

  // clear user search results
  const clearUsers = () => dispatch({ type: "CLEAR_USERS" })

  return (
    <GitHubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        searchUsers,
        clearUsers,
      }}
    >
      {children}
    </GitHubContext.Provider>
  )
}

export default GitHubContext
