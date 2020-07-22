import React from "react"
import { useInView } from "react-intersection-observer"
import Img from "gatsby-image"
import _uniqueId from "lodash/uniqueId"

import Placeholder from "../LoadPlaceholder/Placeholder"
import styles from "./index.module.css"

export default (props) => {
  const { delay, darkOverlay, imgStyle, ...imgProps } = props
  const [loaded, setLoaded] = React.useState(false)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })
  const placeholderId = _uniqueId("image-loader-placeholder-")

  return (
    <div ref={ref} className={styles.root}>
      <noscript>
        <style>
          {`
            #${placeholderId} {
              display: none
            }
          `}
        </style>
      </noscript>
      <Placeholder
        id={placeholderId}
        visible={inView && loaded}
        delay={delay}
        dark={darkOverlay}
      />
      <Img
        {...imgProps}
        fadeIn={false}
        className={darkOverlay ? styles.darkImg : styles.img}
        imgStyle={{ display: "block", ...imgStyle }}
        onLoad={() => setLoaded(true)}
      />
    </div>
  )
}
