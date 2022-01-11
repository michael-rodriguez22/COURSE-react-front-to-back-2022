import { createContext, useReducer } from "react"
import githubReducer from "./GitHubReducer"

const GitHubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const TOKEN = process.env.REACT_APP_TOKEN

export const GitHubProvider = ({ children }) => {
  const initialState = {
    users: [],
    loading: true,
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)

  const fetchUsers = async () => {
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
