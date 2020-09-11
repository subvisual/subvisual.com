import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import _capitalize from "lodash/capitalize"

import styles from "./index.module.scss"

function renderFilter(tag) {
  return (
    <li key={tag} className={styles.filter}>
      <Link to={`/blog/tag/${tag}/`}>{_capitalize(tag)}</Link>
    </li>
  )
}

export default ({ className }) => {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark {
        distinct(field: frontmatter___tags)
      }
    }
  `)

  return (
    <div className={className}>
      <div className={styles.title}>
        <span className={styles.titleText}>Filter by:</span>
      </div>
      <ul className={styles.filters}>
        <li className={styles.filter}>
          <Link to="/blog/">All</Link>
        </li>
        {data.allMarkdownRemark.distinct.map(renderFilter)}
      </ul>
    </div>
  )
}
