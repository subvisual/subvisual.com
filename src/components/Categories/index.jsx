import React from "react"
import PropTypes from "prop-types"

import Category from "../Category"

import * as styles from "./index.module.scss"

function Categories({ categories, color }) {
  return (
    <ul className={styles.root}>
      {categories.map((category, index) => (
        <Category
          color={color}
          index={index}
          key={category.key}
          el="li"
          {...category}
        />
      ))}
    </ul>
  )
}

Categories.propTypes = {
  color: PropTypes.string,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export default Categories
