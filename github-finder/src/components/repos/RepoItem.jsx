import PropTypes from "prop-types"
import { FaEye, FaInfo, FaLink, FaStar, FaUtensils } from "react-icons/fa"

function RepoItem({ repo }) {
  const {
    name,
    description,
    html_url,
    forks,
    open_issues,
    watchers_count,
    stargazers_count,
  } = repo

  return (
    <div className="mb-2 rounded-md card bg-gray-800 hover:bg-gray-900">
      <div className="card-body">
        <h3 className="mb-2 text-2xl font-bold">
          <a href={html_url}>
            <FaLink className="inline mr-2" />
            {name}
          </a>
        </h3>
        <p className="my-3">{description}</p>
        <div className="flex flex-nowrap justify-evenly md:justify-start">
          <div className="mr-2 badge badge-info badge-lg" title="watchers">
            <FaEye className="mr-2" />
            {watchers_count}
          </div>
          <div className="mr-2 badge badge-success badge-lg" title="stars">
            <FaStar className="mr-2" />
            {stargazers_count}
          </div>
          <div className="mr-2 badge badge-error badge-lg" title="open issues">
            <FaInfo className="mr-2" />
            {open_issues}
          </div>
          <div className="mr-2 badge badge-warning badge-lg" title="forks">
            <FaUtensils className="mr-2" />
            {forks}
          </div>
        </div>
      </div>
    </div>
  )
}

RepoItem.propTypes = {
  repo: PropTypes.object.isRequired,
}

export default RepoItem
