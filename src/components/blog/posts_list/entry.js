import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import dateFormat from "dateformat"

import styles from "./entry.module.scss"

const Entry = ({ author, date, intro, slug, title }) => {
  const formattedDate = dateFormat(date, "mmmm d, yyyy")

  return (
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
        <span className={styles.date}>On {formattedDate}</span>
      </div>
    </div>
  )
}

Entry.propTypes = {
  author: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  intro: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default Entry
