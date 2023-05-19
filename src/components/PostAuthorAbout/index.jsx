import React from "react"

import Author from "../Author"

import * as styles from "./index.module.scss"

function PostAuthorAbout({ author, date }) {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Author author={author} date={date} />
      </div>
      <p className={styles.heading}>About the author</p>
      <p>{author.bio}</p>
    </div>
  )
}

export default PostAuthorAbout
