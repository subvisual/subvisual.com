import React from "react"
import { motion } from "framer-motion"

const Background = ({ animate, initial, transition }) => (
  <motion.circle
    cx="50"
    cy="50"
    r="50"
    fill="#fcfcfc"
    initial={initial}
    animate={animate}
    transition={transition}
  />
)

export default Background
