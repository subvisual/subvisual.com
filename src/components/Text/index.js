import React from "react"
import PropTypes from "prop-types"

import styles from "./index.module.css"

const Text = ({ color, children, size }) => (
  <span styleName={`root ${size} ${color}`}>{children}</span>
)

Text.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
}

Text.defaultProps = {
  color: "black",
  size: "regular",
}

export default Text
