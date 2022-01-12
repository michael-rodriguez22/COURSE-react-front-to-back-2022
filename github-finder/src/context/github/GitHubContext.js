import { createContext, useReducer } from "react"
import githubReducer from "./GitHubReducer"

const GitHubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const TOKEN = process.env.REACT_APP_TOKEN

export const GitHubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
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

  // get single user
  const getUser = async login => {
    setLoading()

    const response = await fetch(`${GITHUB_URL}/users/${login}`, {
      headers: {
        Authorization: `token ${TOKEN}`,
      },
    })

    if (response.status === 404) {
      window.location = "/notfound"
    } else {
      const data = await response.json()

      dispatch({
        type: "GET_USER",
        payload: data,
      })
    }
  }

  // get user repos
  const getUserRepos = async login => {
    setLoading()

    const params = new URLSearchParams({
      sort: "pushed",
      per_page: 10,
      direction: "descending",
    })

    const response = await fetch(
      `${GITHUB_URL}/users/${login}/repos?${params}`,
      {
        headers: {
          Authorization: `token ${TOKEN}`,
        },
      }
    )

    const data = await response.json()

    dispatch({
      type: "GET_REPOS",
      payload: data,
    })
  }

  return (
    <GitHubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {children}
    </GitHubContext.Provider>
  )
}

export default GitHubContext
