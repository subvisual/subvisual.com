import React from "react"
import PropTypes from "prop-types"
import dateFormat from "dateformat"
import { Link } from "gatsby"
import Avatar from "../Avatar"

import * as styles from "./index.module.scss"

function renderAuthor({ key, name }) {
  return <Link to={`/blog/author/${key}`}>{name}</Link>
}

function Author({ date, author }) {
  const formattedDate = dateFormat(date, "mmmm d, yyyy")

  return (
    <div className={styles.root}>
      <Avatar author={author} />

      <div>
        <p>{renderAuthor(author)}</p>
        <p>{formattedDate}</p>
      </div>
    </div>
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
