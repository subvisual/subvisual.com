import React from "react"

import Entry from "./posts_list/entry"

import styles from "./posts_list.module.scss"

const PostsList = () => (
  <div className={styles.root}>
    <div className={styles.content}>
      <ol className={styles.postsList}>
        <li className={styles.postsListItem}>
          <Entry
            author="Subvisual"
            title="Coming soon..."
            intro="Our blog is making its return. In style."
          />
        </li>
      </ol>
    </div>
  </div>
)

export default PostsList
