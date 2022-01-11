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

  const setLoading = () => dispatch({ type: "SET_LOADING" })

  return (
    <GitHubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        searchUsers,
      }}
    >
      {children}
    </GitHubContext.Provider>
  )
}

export default GitHubContext
