const getBoundingBox = (elem, reference) => {
  if (!elem || !elem.getBoundingClientRect) return {}

  if (!reference || !reference.getBoundingClientRect) return {}

  const elemBB = elem.getBoundingClientRect()
  const refBB = reference.getBoundingClientRect()

  return {
    x: elemBB.x - refBB.x,
    y: elemBB.y - refBB.y,
    width: elemBB.width,
    height: elemBB.height,
  }
}

const splashScreen = {
  background: { opacity: 1 },
  planet: ({ windowSize }) => {
    const { width, height } = windowSize
    const diameter = Math.max(width, height) * 1.5

    return {
      x: width / 2 - diameter / 2,
      y: height / 2 - diameter / 2,
      width: diameter,
      height: diameter,
    }
  },
}

const heroTittle = {
  background: { opacity: 0 },
  planet: ({ spike, stage }) => {
    const boundingBox = getBoundingBox(spike, stage)
    const { x, y, width, height } = boundingBox

    return {
      x,
      y,
      width,
      height,
    }
  },
  transition: {
    type: "spring",
    damping: 26,
    mass: 1,
    stiffness: 8,
    ease: [1, -0.05, 0.45, 0.8],
  },
}

export default [splashScreen, heroTittle]
