import React, { useState } from "react"
import PropTypes from "prop-types"

import Planet from "./Planet"
import useWindowSize from "../../utils/use_window_size"
import variants, { transition } from "./variants"

const Stage = ({ render }) => {
  const [spikes, setSpikes] = useState([])
  const [current, setCurrent] = useState(0) // index of the current spike
  const windowSize = useWindowSize()

  const [heroTittle] = spikes

  const spikeSetters = Array.from({ length: 1 }, (_, index) => (elem) => {
    if (!elem || elem === spikes[index]) return

    setSpikes([...spikes.slice(0, index), elem, ...spikes.slice(index + 1)])
  })
  const actions = {
    play: (spikeSetter) => setCurrent(spikeSetters.indexOf(spikeSetter) + 1)
  }

  return (
    <>
      {render({ actions, spikes: spikeSetters })}
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
