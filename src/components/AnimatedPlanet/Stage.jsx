import React, { useState } from "react"
import PropTypes from "prop-types"

import Planet from "./Planet"

const Stage = ({ acts, render }) => {
  const [spikes, setSpikes] = useState([])
  const [heroTittle] = spikes

  const spikeSetters = Array.from({ length: acts }, (_, index) => (elem) => {
    if (!elem || elem === spikes[index]) return

    console.log("Setting spike", index, elem)

    setSpikes([...spikes.slice(0, index), elem, ...spikes.slice(index + 1)])
  })

  console.log("SPIKE SETTERS", spikeSetters)

  return (
    <>
      {render({ spikes: spikeSetters })}
      <Planet heroTittle={heroTittle} />
    </>
  )
}

Stage.propTypes = {
  acts: PropTypes.number,
  render: PropTypes.func.isRequired,
}

Stage.defaultProps = {
  acts: 0,
}

export default Stage
