import React from "react"
import PropTypes from "prop-types"
import { includes, sortBy } from "lodash"

import Category from "../Category"

import * as styles from "./index.module.scss"

function Filter({ categories, selected, onChange }) {
  function toggleSelectedCategory({ key }) {
    if (includes(selected, key)) {
      onChange(selected.filter((selectedKey) => selectedKey !== key))
    } else {
      onChange([...selected, key])
    }
  }

  return (
    <div className={styles.root}>
      <p className={styles.title}>Filter by</p>
      <ul className={styles.list}>
        {sortBy(categories, "label").map((category, index) => (
          <li>
            <Category
              onClick={() => toggleSelectedCategory(category)}
              selected={includes(selected, category.key)}
              index={index}
              el="button"
              key={category.id}
              {...category}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

Filter.propTypes = {
  selected: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onChange: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
}

export default Filter
