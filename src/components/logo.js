import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import logoBlue from "../images/subvisual-logo-blue.svg"
import logoWhite from "../images/subvisual-logo-white.svg"

const Logo = ({ white }) => (
  <Link to="/">
    <img
      src={white ? logoWhite : logoBlue}
      alt="Subvisual"
      className="Header-logo"
    />
  </Link>
)

Logo.propTypes = {
  white: PropTypes.bool,
}

Logo.defaultProps = {
  white: false,
}

export default Logo
