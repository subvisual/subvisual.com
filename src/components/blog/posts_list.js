import React from "react"
import PropTypes from "prop-types"

import Entry from "./posts_list/entry"

import styles from "./posts_list.module.scss"

const renderItem = ({ author, date, intro, path, title }, index) => (
  <li key={index} className={styles.item}>
    <Entry {...{ author, date, intro, path, title }} />
  </li>
)

const BlogPostsList = ({ posts }) => (
  <ol className={styles.root}>{posts.map(renderItem)}</ol>
)

BlogPostsList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      author: PropTypes.object,
      date: PropTypes.instanceOf(Date).isRequired,
      intro: PropTypes.string,
      path: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export default BlogPostsList
