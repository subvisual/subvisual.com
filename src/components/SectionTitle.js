import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

import styles from "./section_title.module.css"

const SectionTitle = ({ color, children }) => {
  const className = classNames(styles.root, styles[color])

  return <h2 className={className}>{children}</h2>
}

SectionTitle.propTypes = {
  color: PropTypes.string,
}

SectionTitle.defaultProps = {
  color: "blue",
}

export default SectionTitle
