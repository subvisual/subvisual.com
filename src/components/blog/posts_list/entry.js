import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import dateFormat from "dateformat"

import styles from "./entry.module.scss"

const Entry = ({ author, date, intro, path, title }) => {
  const formattedDate = dateFormat(date, "mmmm d, yyyy")

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <Link to={`/blog/${path}`}>{title}</Link>
      </div>
      <p className={styles.intro}>
        <Link to={`/blog/${path}`}>
          {/* eslint-disable-next-line react/no-danger */}
          <span dangerouslySetInnerHTML={{ __html: intro }} />
        </Link>
      </p>
      <div className={styles.info}>
        <span className={styles.author}>By {author}</span>
        <span className={styles.date}>On {formattedDate}</span>
      </div>
    </div>
  )
}

Entry.propTypes = {
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  intro: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default Entry
