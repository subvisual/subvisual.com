import React, { useRef, useState } from "react"
import PropTypes from "prop-types"

import Planet from "./Planet"
import useWindowSize from "../../utils/use_window_size"
import variants from "./variants"

const Stage = ({ render }) => {
  const spikes = [undefined, useRef()] // one reference for each spike
  const [current, setCurrent] = useState(0) // index of the current spike
  const windowSize = useWindowSize()

  const actions = {
    play: (spike) => setCurrent(spikes.indexOf(spike)),
  }
  const currentSpike = spikes[current]
  const currentVariant = variants[current]

  return (
    <>
      {render({ actions, spikes: spikes.slice(1) })}
      <Planet
        initial={variants[0].planet({
          windowSize,
        })}
        animate={currentVariant.planet({
          spike: currentSpike?.current,
          windowSize,
        })}
        transition={currentVariant.transition}
      >
        <Planet.Background
          initial={variants[0].background}
          animate={currentVariant.background}
          transition={currentVariant.transition}
        />
      </Planet>
    </>
  )
}

Stage.propTypes = {
  render: PropTypes.func.isRequired,
}

export default Stage
