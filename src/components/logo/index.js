import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import Blue from "./subvisual-logo-blue.inline.svg"
import White from "./subvisual-logo-white.inline.svg"

import "./index.module.css"

const Logo = ({ white, className }) => (
  <Link to="/" styleName="root">
    {white ? <White /> : <Blue />}
  </Link>
)

Logo.propTypes = {
  white: PropTypes.bool,
}

Logo.defaultProps = {
  white: false,
}

export default Logo
