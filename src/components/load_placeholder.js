import React, { useState } from "react"
import PropTypes from "prop-types"
import { renderToStaticMarkup } from "react-dom/server"

import Observer from "./load_placeholder/observer"
import Placeholder from "./load_placeholder/placeholder"

import styles from "./load_placeholder.module.css"

const LoadPlaceholder = ({ delay = 0, dark, children }) => {
  const [loaded, setLoaded] = useState(false)
  const [visible, setVisible] = useState(false)

  const onLoad = () => setLoaded(true)

  const handleChange = ({ isIntersecting }, unobserve) => {
    if (!isIntersecting) return

    unobserve()
    setVisible(true)
  }

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
      <Observer onChange={handleChange}>
        <div className={styles.root}>
          <Placeholder dark={dark} delay={delay} visible={visible && loaded} />
          {children(onLoad)}
        </div>
      </Observer>
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
