import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"

import Planet from "./Planet"
import useWindowSize from "../../utils/use_window_size"
import { transition } from "./variants"

const getBackgroundInitial = () => ({ opacity: 1 })

const getBackgroundAnimate = ({ initial, variant }) => {
  if (variant === "splash") return initial

  return { opacity: 0 }
}

const getBoundingBox = (elem) => {
  if (!elem || !elem.getBoundingClientRect) return {}

  return elem.getBoundingClientRect()
}

const getRootInitial = ({ windowSize }) => {
  const { width, height } = windowSize
  const diameter = Math.max(width, height) * 1.5

  return {
    x: width / 2 - diameter / 2,
    y: height / 2 - diameter / 2,
    width: diameter,
    height: diameter,
  }
}

const getRootAnimate = ({ anchors, initial, transition, variant }) => {
  if (variant === "splash") return initial

  const anchor = anchors[variant]
  const boundingBox = getBoundingBox(anchor)
  const { x, y, width, height } = boundingBox

  return {
    x,
    y,
    width,
    height,
    transition,
  }
}

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

  const backgroundInitial = getBackgroundInitial()
  const backgroundAnimate = getBackgroundAnimate({ variant })
  const rootInitial = getRootInitial({ windowSize })
  const rootAnimate = getRootAnimate({
    anchors: { heroTittle },
    initial: rootInitial,
    variant,
  })

  return (
    <>
      {render({ spikes: spikeSetters })}
      <Planet
        initial={rootInitial}
        animate={rootAnimate}
        transition={transition}
      >
        <Planet.Background
          initial={backgroundInitial}
          animate={backgroundAnimate}
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
