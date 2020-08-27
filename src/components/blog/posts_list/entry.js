import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import dateFormat from "dateformat"

import styles from "./entry.module.scss"

const renderAuthor = ({ className, key, name }) => {
  if (!key || !name) return null

  return (
    <Link to={`/blog/author/${key}`} className={className}>
      By {name}
    </Link>
  )
}

const Entry = ({ author, date, intro, path, title }) => {
  const formattedDate = dateFormat(date, "mmmm d, yyyy")
  const to = path.startsWith("/") ? `/blog${path}` : `/blog/${path}`

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <Link to={to}>{title}</Link>
      </div>
      <p className={styles.intro}>
        <Link to={to}>
          {/* eslint-disable-next-line react/no-danger */}
          <span dangerouslySetInnerHTML={{ __html: intro }} />
        </Link>
      </p>
      <div className={styles.info}>
        {renderAuthor({ className: styles.author, ...author })}
        <span className={styles.date}>On {formattedDate}</span>
      </div>
    </div>
  )
}

Entry.propTypes = {
  author: PropTypes.shape({
    key: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  date: PropTypes.instanceOf(Date).isRequired,
  intro: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default Entry
