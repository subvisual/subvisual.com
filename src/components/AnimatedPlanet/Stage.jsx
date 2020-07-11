import React, { useRef, useState } from "react"
import PropTypes from "prop-types"
import _get from "lodash/get"

import Planet from "./Planet"
import useWindowSize from "../../utils/use_window_size"
import variants from "./variants"

const Stage = ({ render }) => {
  // List of references of the spikes to follow.
  //
  // This list is later passed on to the wrapped component, with the exception
  // of the splash screen. The splash screen depends only of the window, it is
  // not placed by a spike, because spikes can only be followed after loading
  // the content. However we keep its place in the spikes list to make its
  // cardinality match the variants, makind `current` able to follow both.
  const spikes = [undefined, useRef()]

  // Index of the spike where the animation will start.
  //
  // By default, the first spike will be the splash screen, which is the first
  // variant of the list. However, by being able to change the initial spike,
  // we get to change where the animation will start.
  const initial = 0

  // Index of the current spike being followed.
  const [current, setCurrent] = useState(initial)

  // Gather the window dimensions and automatically react to its resize.
  const windowSize = useWindowSize()

  // Actions passed to the wrapped component to control the animation
  const actions = {
    // Play the animation into a spike by changing the current spike index.
    play: (spike) => setCurrent(spikes.indexOf(spike)),
  }

  const initialVariant = variants[initial]
  const currentVariant = variants[current]

  return (
    <>
      {render({ actions, spikes: spikes.slice(1) })}
      <Planet
        initial={initialVariant.planet({ windowSize })}
        animate={currentVariant.planet({
          spike: _get(spikes, `${current}.current`),
          windowSize,
        })}
        transition={currentVariant.transition}
      >
        <Planet.Background
          initial={initialVariant.background}
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
