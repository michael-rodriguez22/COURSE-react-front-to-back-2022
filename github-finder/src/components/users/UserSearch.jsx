import { useState, useContext } from "react"
import GitHubContext from "../../context/github/GitHubContext"
import AlertContext from "../../context/alert/AlertContext"

function UserSearch() {
  const [text, setText] = useState("")

  const { users, searchUsers, clearUsers } = useContext(GitHubContext)

  const { setAlert } = useContext(AlertContext)

  const handleChange = e => setText(e.target.value)

  const handleSubmit = e => {
    e.preventDefault()

    if (text.trim() === "") {
      setAlert("Field must not be empty", "error")
    } else {
      searchUsers(text)
      setText("")
    }
  }

  const handleClear = () => clearUsers()

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 mb-8 gap-2">
      <div className="md:col-span-3">
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <div className="relative">
              <input
                type="text"
                className="w-full pr-40 bg-gray-200 input input-lg text-black"
                placeholder="GitHub username"
                value={text}
                onChange={handleChange}
              />
              <button
                type="submit"
                className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg"
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
      {users.length > 0 && (
        <div>
          <button className="btn btn-ghost btn-lg" onClick={handleClear}>
            Clear
          </button>
        </div>
      )}
    </div>
  )
}

export default UserSearch
