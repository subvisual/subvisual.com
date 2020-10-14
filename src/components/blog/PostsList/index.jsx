import React from "react"
import PropTypes from "prop-types"

import Entry from "./Entry"

import styles from "./PostsList.module.scss"

const renderItem = ({ author, date, intro, path, title }, index) => (
  <li key={index} className={styles.item}>
    <Entry {...{ author, date, intro, path, title }} />
  </li>
)

const PostsList = ({ posts }) => (
  <ol className={styles.root}>{posts.map(renderItem)}</ol>
)

PostsList.propTypes = {
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

export default PostsList
