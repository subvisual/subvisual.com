import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import styles from "./entry.module.scss"

const Entry = ({ author, intro, slug, title }) => (
  <div className={styles.root}>
    <Link to={`/blog/${slug}`} className={styles.title}>
      {title}
    </Link>
    <p className={styles.intro}>
      <Link to={`/blog/${slug}`}>
        {/* eslint-disable-next-line react/no-danger */}
        <span dangerouslySetInnerHTML={{ __html: intro }} />
      </Link>
    </p>
    <div className={styles.info}>
      <span className={styles.author}>By {author}</span>
    </div>
  </div>
)

Entry.propTypes = {
  author: PropTypes.string.isRequired,
  intro: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default Entry
