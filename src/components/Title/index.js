import React from "react"
import PropTypes from "prop-types"

import "./index.module.css"

const Title = ({ color, children }) => (
  <h2 styleName={`root ${color}`}>{children}</h2>
)

Title.propTypes = {
  color: PropTypes.string,
}

Title.defaultProps = {
  color: "blue",
}

export default Title
