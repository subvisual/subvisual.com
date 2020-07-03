import React from "react"
import PropTypes from "prop-types"

const Stage = ({ children }) => children

Stage.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Stage
