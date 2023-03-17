import React from "react"
import PropTypes from "prop-types"
import dateFormat from "dateformat"
import { Link } from "gatsby"

import * as styles from "./index.module.scss"

function Author({ author: { key, name } }) {
  return <Link to={`/blog/author/${key}`}>By {name}</Link>
}

function Entry({ author, date, intro, path, title }) {
  const formattedDate = dateFormat(date, "mmmm d, yyyy")

  return (
    <div className={styles.post}>
      <div className={styles.title}>
        <Link to={path}>{title}</Link>
      </div>
      <p className={styles.intro}>
        <Link to={path}>
          <span>{intro}</span>
        </Link>
      </p>
      <div className={styles.info}>
        {author && <Author className={styles.author} author={author} />}
        <span className={styles.date}>On {formattedDate}</span>
      </div>
    </div>
  )
}

function PostsList({ posts }) {
  return (
    <ol className={styles.posts}>
      {posts.map(({ author, date, intro, path, title }) => (
        <li key={path} className={styles.item}>
          <Entry {...{ author, date, intro, path, title }} />
        </li>
      ))}
    </ol>
  )
}

PostsList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      author: PropTypes.shape({
        key: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }),
      date: PropTypes.instanceOf(Date).isRequired,
      intro: PropTypes.string,
      path: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export default PostsList
