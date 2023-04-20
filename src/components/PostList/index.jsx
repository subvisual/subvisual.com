import React from "react"
import PropTypes from "prop-types"
import dateFormat from "dateformat"
import { Link } from "gatsby"
import Avatar from "../Avatar"

import * as styles from "./index.module.scss"
import Categories from "../Categories"

function Author({ author: { key, name }, ...props }) {
  return (
    <Link {...props} to={`/blog/author/${key}`}>
      {name}
    </Link>
  )
}

function Entry({ author, date, intro, path, title, categories }) {
  const formattedDate = dateFormat(date, "mmmm d, yyyy")

  return (
    <div>
      <div className={styles.title}>
        <Link to={path}>{title}</Link>
      </div>
      <p className={styles.intro}>
        <Link to={path}>
          <span>{intro}</span>
        </Link>
      </p>
      <div className={styles.info}>
        <Avatar author={author} />
        <div>
          {author && <Author className={styles.author} author={author} />}
          <span className={styles.date}>On {formattedDate}</span>
        </div>
      </div>
      {categories?.length && (
        <div className={styles.categories}>
          <Categories categories={categories || []} />
        </div>
      )}
    </div>
  )
}

function PostsList({ posts }) {
  return (
    <ol className={styles.posts}>
      {posts.map((post) => (
        <li key={post.path} className={styles.item}>
          <Entry {...post} />
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
        initials: PropTypes.string,
      }),
      date: PropTypes.instanceOf(Date).isRequired,
      intro: PropTypes.string,
      path: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export default PostsList
