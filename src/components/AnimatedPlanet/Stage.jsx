import React, { useRef, useState } from "react"
import PropTypes from "prop-types"

import Planet from "./Planet"
import useWindowSize from "../../utils/use_window_size"
import variants from "./variants"

const Stage = ({ render }) => {
  const spikes = [useRef()] // one reference for each spike
  const [current, setCurrent] = useState() // index of the current spike
  const windowSize = useWindowSize()

  const [heroTittle] = spikes

  const actions = {
    play: (spike) => setCurrent(spikes.indexOf(spike) + 1),
  }

  return (
    <>
      {render({ actions, spikes })}
      <Planet
        initial={variants[0].planet({
          windowSize,
        })}
        animate={variants[current || 0].planet({
          anchors: {
            heroTittle: heroTittle.current,
          },
          windowSize,
        })}
        transition={variants[current || 0].transition}
      >
        <Planet.Background
          initial={variants[0].background}
          animate={variants[current || 0].background}
          transition={variants[current || 0].transition}
        />
      </Planet>
    </>
  )
}

Stage.propTypes = {
  render: PropTypes.func.isRequired,
}

export default Stage
