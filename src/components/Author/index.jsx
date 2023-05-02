import React from "react"
import PropTypes from "prop-types"
import dateFormat from "dateformat"
import { Link } from "gatsby"
import Avatar from "../Avatar"

import * as styles from "./index.module.scss"

function Author({ date, author }) {
  const formattedDate = dateFormat(date, "mmmm d, yyyy")
  const { key, name } = author

  return (
    <Link to={`/blog/author/${key}`} className={styles.root}>
      <Avatar author={author} />

      <div>
        <p>{name}</p>
        <p>{formattedDate}</p>
      </div>
    </Link>
  )
}

Author.propTypes = {
  author: PropTypes.shape({
    key: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    initials: PropTypes.string,
    photo: PropTypes.any.isRequired,
  }),
  date: PropTypes.instanceOf(Date).isRequired,
}

export default Author
