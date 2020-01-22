import React from "react"
import { useInView } from "react-intersection-observer"
import Img from "gatsby-image"

import Placeholder from "../load_placeholder/placeholder"
import styles from "./index.module.css"

import useHover from "../../utils/use_hover"

export default props => {
  const { delay, ...imgProps } = props
  const ref = React.useRef(null)
  const [loaded, setLoaded] = React.useState(false)
  const [setRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.95,
  })
  const [setHoverRef, isHovered] = useHover()

  React.useEffect(() => {
    if (!ref.current) return

    setRef(ref.current)
    setHoverRef(ref.current)
  }, [ref.current])

  return (
    <div ref={ref} className={styles.root}>
      <Placeholder visible={inView && loaded} delay={delay} dark />
      <Img
        {...imgProps}
        fadeIn={false}
        imgStyle={{ display: "block" }}
        style={{
          transition: "all 0.2s ease-in-out",
          height: "100%",
          filter: isHovered ? null : "grayscale(100%)",
        }}
        onLoad={() => setLoaded(true)}
      />
    </div>
  )
}
