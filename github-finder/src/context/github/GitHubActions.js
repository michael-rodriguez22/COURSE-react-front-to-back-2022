import axios from "axios"
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const TOKEN = process.env.REACT_APP_TOKEN

const github = axios.create({
  baseURL: GITHUB_URL,
  headers: {
    Authorization: `token ${TOKEN}`,
  },
})

// get users search results
export const searchUsers = async text => {
  const params = new URLSearchParams({
    q: text,
  })

  const response = await github.get(`/search/users?${params}`)
  return response.data.items
}

// get user and repos
export const getUserAndRepos = async login => {
  const params = new URLSearchParams({
    sort: "pushed",
    order: "desc",
    per_page: 15,
  })
  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos?${params}`),
  ])

  return { user: user.data, repos: repos.data }
}
