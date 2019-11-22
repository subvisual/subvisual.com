import React, { useState } from "react"
import PropTypes from "prop-types"
import { renderToStaticMarkup } from "react-dom/server"
import { useInView } from "react-intersection-observer"

import Placeholder from "./load_placeholder/placeholder"

import styles from "./load_placeholder.module.css"

const LoadPlaceholder = ({ delay = 0, dark, children }) => {
  const [loaded, setLoaded] = useState(false)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.35,
  })

  const onLoad = () => setLoaded(true)

  return (
    <>
      <noscript
        dangerouslySetInnerHTML={{
          __html: renderToStaticMarkup(children(onLoad)).replace(
            /noscript/g,
            "div"
          ),
        }}
      />

      <div ref={ref} className={styles.root}>
        <Placeholder dark={dark} delay={delay} visible={inView && loaded} />
        {children(onLoad)}
      </div>
    </>
  )
}

LoadPlaceholder.propTypes = {
  dark: PropTypes.bool,
  delay: PropTypes.number,
}

LoadPlaceholder.defaultProps = {
  dark: false,
  delay: 0,
}

export default LoadPlaceholder
