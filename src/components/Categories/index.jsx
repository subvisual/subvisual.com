import React, { useMemo } from "react"
import PropTypes from "prop-types"
import { random } from "lodash"

import * as styles from "./index.module.scss"

function isSquareCorner() {
  return random(100) < 30
}

function Categories({ categories }) {
  const { topRightSquare, topLeftSquare, bottomRightSquare, bottomLeftSquare } =
    useMemo(
      () => ({
        topLeftSquare: isSquareCorner(),
        topRightSquare: isSquareCorner(),
        bottomLeftSquare: isSquareCorner(),
        bottomRightSquare: isSquareCorner(),
      }),
      []
    )

  return (
    <ul className={styles.root}>
      {categories.map((category) => (
        <li
          style={{
            borderTopLeftRadius: topLeftSquare && 0,
            borderTopRightRadius: topRightSquare && 0,
            borderBottomLeftRadius: bottomLeftSquare && 0,
            borderBottomRightRadius: bottomRightSquare && 0,
          }}
          key={category.key}
          className={styles.category}
        >
          {category.label}
        </li>
      ))}
    </ul>
  )
}

Categories.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export default Categories
