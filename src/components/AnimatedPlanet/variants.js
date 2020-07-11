const getBoundingBox = (elem) => {
  if (!elem || !elem.getBoundingClientRect) return {}

  return elem.getBoundingClientRect()
}

const splash = {
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
  planet: ({ spike }) => {
    const boundingBox = getBoundingBox(spike)
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

export default [splash, heroTittle]
