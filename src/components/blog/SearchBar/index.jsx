import React, { useEffect, useState } from "react"
import classNames from "classnames"

import styles from "./SearchBar.module.scss"

function Search({ className, onChange }) {
  const [ready, setReady] = useState(false)
  const rootClassName = classNames(styles.root, className)

  useEffect(() => {
    setReady(true)
  }, [])

  if (!ready) return <form className={rootClassName} />

  return (
    <form className={rootClassName}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={styles.icon}
        viewBox="0 0 24 24"
      >
        <path d="M0 0h24v24H0z" />
        <circle cx="10" cy="10" r="7" />
        <line x1="21" y1="21" x2="15" y2="15" />
      </svg>
      <input
        className={styles.input}
        type="text"
        onChange={(evt) => onChange(evt.target.value)}
      />
    </form>
  )
}

export default Search
