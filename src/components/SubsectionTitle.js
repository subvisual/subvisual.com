import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

import styles from "./SubsectionTitle.module.css"

const SubsectionTitle = ({ children, color }) => {
  const className = classNames(styles.root, styles[color])

  return <h3 className={className}>{children}</h3>
}

SubsectionTitle.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
}

SubsectionTitle.defaultProps = {
  color: "black",
}

export default SubsectionTitle
