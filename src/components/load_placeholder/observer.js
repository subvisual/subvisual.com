import React from "react"
import PropTypes from "prop-types"
import Observer from "@researchgate/react-intersection-observer"

import useDetectJavascript from "../../utils/use_detect_javascript"

const LoadPlaceholderObserver = ({ children, onChange }) => {
  const hasJavascript = useDetectJavascript()

  if (!hasJavascript) return null

  return <Observer onChange={onChange}>{children}</Observer>
}

LoadPlaceholderObserver.propTypes = {
  children: PropTypes.node.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default LoadPlaceholderObserver
