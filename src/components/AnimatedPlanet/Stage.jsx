import React, { useState } from "react"
import PropTypes from "prop-types"

import Planet from "./Planet"

const Stage = ({ render }) => {
  const [spikes, setSpikes] = useState([])
  const [heroTittle] = spikes

  const spikeSetters = Array.from({ length: 1 }, (_, index) => (elem) => {
    if (!elem || elem === spikes[index]) return

    setSpikes([...spikes.slice(0, index), elem, ...spikes.slice(index + 1)])
  })

  return (
    <>
      {render({ spikes: spikeSetters })}
      <Planet heroTittle={heroTittle} />
    </>
  )
}

Stage.propTypes = {
  render: PropTypes.func.isRequired,
}

export default Stage
