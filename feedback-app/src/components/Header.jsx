import PropTypes from "prop-types"
import { Link } from "react-router-dom"

const Header = ({ text, bgColor, textColor }) => {
  const headerStyles = {
    backgroundColor: bgColor,
    color: textColor,
  }

  return (
    <>
      <header style={headerStyles}>
        <div className="container">
          <h2>
            <Link to="/" className="header-link">
              {text}
            </Link>
          </h2>
        </div>
      </header>
    </>
  )
}

Header.defaultProps = {
  text: "Feedback App",
  bgColor: "rgba(0,0,0,0.4)",
  textColor: "#fff",
}

Header.propTypes = {
  text: PropTypes.string,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
}

export default Header
