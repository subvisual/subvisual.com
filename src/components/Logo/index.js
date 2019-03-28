import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import Blue from "./subvisual-logo-blue.inline.svg"
import White from "./subvisual-logo-white.inline.svg"

import "./index.module.css"

const renderers = {
  blue: () => <Blue />,
  white: () => <White />,
}

const Logo = ({ color }) => (
  <Link to="/" styleName="root">
    {renderers[color]()}
  </Link>
)

Logo.propTypes = {
  color: PropTypes.bool,
}

Logo.defaultProps = {
  color: "blue",
}

export default Logo
