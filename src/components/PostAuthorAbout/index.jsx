import React from "react"

import Author from "../Author"

import * as styles from "./index.module.scss"

function PostAuthorAbout({ author, date }) {
  return (
    <div className={styles.root}>
      <div className={styles.author}>
        <Author author={author} date={date} />
      </div>
      <p className={styles.about}>About the author</p>
      <p className={styles.bio}>{author.bio}</p>
    </div>
  )
}

export default PostAuthorAbout
