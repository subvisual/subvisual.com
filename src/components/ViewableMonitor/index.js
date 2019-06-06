import React, { useState } from "react"
import Observer from "@researchgate/react-intersection-observer"

const range = [0, 0.25, 0.5, 0.75, 1]

const getPrintableThreshold = (ratio, range) =>
  range.reduce((prev, curr) =>
    Math.abs(curr - ratio) < Math.abs(prev - ratio) ? curr : prev
  )

export default function ViewableMonitor({ children, ...rest }) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [intersectionThreshold, setIntersectionThreshold] = useState(0)

  const handleChange = ({ isIntersecting, intersectionRatio }) => {
    setIsIntersecting(isIntersecting)
    setIntersectionThreshold(
      getPrintableThreshold(intersectionRatio.toFixed(2), range)
    )
  }

  return (
    <Observer {...rest} onChange={handleChange} threshold={range}>
      {children(isIntersecting, intersectionThreshold)}
    </Observer>
  )
}
