import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

import Text from "src/components/text"
import ImageLoader from "src/components/image_loader"

import styles from "./venture.module.css"

const Venture = ({ delay, description, featured, image, name, url }) => {
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
          <ImageLoader
            {...image.childImageSharp}
            delay={delay}
            alt={name}
            darkOverlay
          />
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
  delay: PropTypes.number,
  description: PropTypes.string.isRequired,
  featured: PropTypes.bool,
  image: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
}

Venture.defaultProps = {
  delay: 0,
  featured: false,
}

export default Venture
