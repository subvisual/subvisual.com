import React from "react"
import PropTypes from "prop-types"

import "./index.module.css"

const Subtitle = ({ children, color }) => (
  <h3 styleName={`root ${color}`}>{children}</h3>
)

Subtitle.propTypes = {
  color: PropTypes.string,
}

Subtitle.defaultProps = {
  color: "black",
}

export default Subtitle
