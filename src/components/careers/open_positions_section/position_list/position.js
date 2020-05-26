import React from "react"
import PropTypes from "prop-types"

import Text from "src/components/text"

import styles from "./position.module.css"

const Position = ({ company, logo, about, role, location }) => {
  return (
    <div className={styles.root}>
      <div className={styles.positionLayer} />
      <div className={styles.content}>
        <div className={styles.company}>
          <img src={logo.publicURL} alt={company} />
        </div>
        <div className={styles.about}>
          <Text as="p" size="small">
            {about}
          </Text>
        </div>
        <div className={styles.line} />
        <div className={styles.role}>
          <Text as="p" color="purple" size="regular">
            {role}
          </Text>
        </div>
        <div className={styles.line} style={{ "--top": "203px" }} />
        <div className={styles.location}>
          <Text as="p" size="regular">
            {location}
          </Text>
        </div>
      </div>
    </div>
  )
}

Position.propTypes = {
  company: PropTypes.string.isRequired,
  logo: PropTypes.object.isRequired,
  about: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
}

export default Position
