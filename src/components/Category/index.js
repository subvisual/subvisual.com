import React, { useMemo } from "react"
import PropTypes from "prop-types"
import seedrandom from "seedrandom"

import * as styles from "./index.module.scss"

function isSquareCorner(label) {
  return seedrandom(label)() < 0.5
}

function Category({ selected, color, key, label, el, index, ...other }) {
  const { topRightSquare, topLeftSquare, bottomRightSquare, bottomLeftSquare } =
    useMemo(
      () => ({
        topLeftSquare: isSquareCorner(`topLeft-${label}`),
        topRightSquare: isSquareCorner(`topRight-${label}`),
        bottomLeftSquare: isSquareCorner(`bottomLeft-${label}`),
        bottomRightSquare: isSquareCorner(`bottomRight-${label}`),
      }),
      []
    )

  const indexColor = index % 2 === 0 ? "var(--c-blue-1)" : "var(--c-purple-1)"
  const El = el

  return (
    <El
      {...other}
      className={styles.root}
      style={{
        borderTopLeftRadius: topLeftSquare && 0,
        borderTopRightRadius: topRightSquare && 0,
        borderBottomLeftRadius: bottomLeftSquare && 0,
        borderBottomRightRadius: bottomRightSquare && 0,
        borderColor: color || indexColor,
        ...(selected
          ? {
              color: "white",
              backgroundColor: color || indexColor,
            }
          : {
              color: color || indexColor,
            }),
      }}
      key={key}
    >
      {label}
    </El>
  )
}

Category.propTypes = {
  selected: PropTypes.bool,
  color: PropTypes.string,
  el: PropTypes.string,
  index: PropTypes.number,
  key: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
}

Category.defaultProps = {
  selected: false,
  el: "div",
  index: 0,
}

export default Category
