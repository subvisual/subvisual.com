import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import Author from "../Author"
import Categories from "../Categories"
import * as styles from "./index.module.scss"

function Entry({ author, date, intro, path, title, categories }) {
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
        <Author author={author} date={date} />
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
