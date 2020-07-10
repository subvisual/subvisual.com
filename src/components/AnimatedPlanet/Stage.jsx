import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"

import Planet from "./Planet"
import useWindowSize from "../../utils/use_window_size"
import variants from "./variants"

const Stage = ({ render }) => {
  const [spikes, setSpikes] = useState([])
  const [variant, setVariant] = useState("splash")
  const windowSize = useWindowSize()

  useEffect(() => {
    setTimeout(() => setVariant("heroTittle"), 2000)
  })

  const [heroTittle] = spikes

  const spikeSetters = Array.from({ length: 1 }, (_, index) => (elem) => {
    if (!elem || elem === spikes[index]) return

    setSpikes([...spikes.slice(0, index), elem, ...spikes.slice(index + 1)])
  })

  return (
    <>
      {render({ spikes: spikeSetters })}
      <Planet
        initial={variants.splash.planet({ windowSize })}
        animate={variants[variant].planet({
          anchors: { heroTittle },
          windowSize,
        })}
        transition={variants.transition}
      >
        <Planet.Background
          initial={variants.splash.background}
          animate={variants[variant].background}
          transition={variants.transition}
        />
      </Planet>
    </>
  )
}

Stage.propTypes = {
  render: PropTypes.func.isRequired,
}

export default Stage
