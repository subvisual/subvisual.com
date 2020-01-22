import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

import Text from "../../../text"
import ImageLoader from "../../../image_loader"

import styles from "./venture.module.css"

const Venture = ({ color, delay, description, featured, grey, name, url }) => {
  const className = classNames(styles.root, {
    [styles.featured]: featured,
  })

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      <div className={styles.wrapper}>
        <div className={styles.photo}>
          <ImageLoader {...color.childImageSharp} delay={delay} alt={name} />
        </div>
      </div>
      <div className={styles.info}>
        <Text>{name}</Text>
        <br />
        <Text>{description}</Text>
      </div>
    </a>
  )
}

Venture.propTypes = {
  color: PropTypes.object.isRequired,
  delay: PropTypes.number,
  featured: PropTypes.bool,
  description: PropTypes.string.isRequired,
  grey: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
}

Venture.defaultProps = {
  delay: 0,
  featured: false,
}

export default Venture
