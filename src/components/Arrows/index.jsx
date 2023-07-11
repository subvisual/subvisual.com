import React from "react"

import * as styles from "./index.module.scss"

export function NextArrow({ onClick, label }) {
  return (
    <button
      aria-label={label}
      type="button"
      className={styles.nextArrow}
      onClick={onClick}
    >
      <svg
        width="18"
        height="14"
        viewBox="0 0 18 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.4176 7.00002H16.7685M16.7685 7.00002L11.0953 1.16669M16.7685 7.00002L11.0953 12.8334"
          stroke="var(--c-blue-1)"
          strokeLinecap="square"
        />
      </svg>
    </button>
  )
}

export function PrevArrow({ onClick, label }) {
  return (
    <button
      aria-label={label}
      type="button"
      className={styles.prevArrow}
      onClick={onClick}
    >
      <svg
        width="18"
        height="14"
        viewBox="0 0 18 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.5824 6.99998L1.23152 6.99998M1.23152 6.99998L6.90467 12.8333M1.23152 6.99998L6.90467 1.16665"
          stroke="var(--c-blue-1)"
          strokeLinecap="square"
        />
      </svg>
    </button>
  )
}
