import React from "react"
import { useInView } from "react-intersection-observer"
import Img from "gatsby-image"

import Placeholder from "../load_placeholder/placeholder"
import styles from "./index.module.css"

export default props => {
  const { delay, darkOverlay, ...imgProps } = props
  const [loaded, setLoaded] = React.useState(false)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })

  return (
    <div ref={ref} className={styles.root}>
      <Placeholder
        visible={inView && loaded}
        delay={delay}
        dark={darkOverlay}
      />
      <Img
        {...imgProps}
        fadeIn={false}
        className={darkOverlay ? styles.darkImg : styles.img}
        imgStyle={{ display: "block" }}
        onLoad={() => setLoaded(true)}
      />
    </div>
  )
}
