import React, { useState } from "react"
import PropTypes from "prop-types"

import Planet from "./Planet"

const Stage = ({ render }) => {
  const [heroTittle, setHeroTittle] = useState({})

  return (
    <>
      {render({ heroTittleRef: setHeroTittle })}
      <Planet heroTittle={heroTittle} />
    </>
  )
}

Stage.propTypes = {
  render: PropTypes.func.isRequired,
}

export default Stage
