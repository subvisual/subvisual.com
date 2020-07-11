import React from "react"

import Stage from "./Stage"

const WithAnimatedPlanet = (Component) => (props) => {
  const render = (animatedPlanet) => (
    <Component {...props} animatedPlanet={animatedPlanet} />
  )

  return <Stage render={render} />
}

export default WithAnimatedPlanet
