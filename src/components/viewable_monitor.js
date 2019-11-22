import React, { useState } from "react"
import Observer from "@researchgate/react-intersection-observer"

const ViewableMonitor = ({ children, ...rest }) => {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const handleChange = ({ isIntersecting }) => setIsIntersecting(isIntersecting)

  return (
    <Observer {...rest} onChange={handleChange}>
      {children(isIntersecting)}
    </Observer>
  )
}

export default ViewableMonitor
