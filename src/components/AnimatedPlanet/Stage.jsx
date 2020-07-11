import React, { useRef, useState } from "react"
import PropTypes from "prop-types"

import Planet from "./Planet"
import useWindowSize from "../../utils/use_window_size"
import variants, { transition } from "./variants"

const Stage = ({ render }) => {
  const spikes = [useRef()]
  const [current, setCurrent] = useState(0) // index of the current spike
  const windowSize = useWindowSize()

  const [heroTittle] = spikes

  const actions = {
    play: (spike) => setCurrent(spikes.indexOf(spike) + 1),
  }

  return (
    <>
      {render({ actions, spikes })}
      <Planet
        initial={variants[0].planet({ windowSize })}
        animate={variants[current].planet({
          anchors: { heroTittle },
          windowSize,
        })}
        transition={transition}
      >
        <Planet.Background
          initial={variants[0].background}
          animate={variants[current].background}
          transition={transition}
        />
      </Planet>
    </>
  )
}

Stage.propTypes = {
  render: PropTypes.func.isRequired,
}

export default Stage
