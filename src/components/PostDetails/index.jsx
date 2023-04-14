import React from "react"

import Author from "../Author"
import Categories from "../Categories"

import * as styles from "./index.module.scss"

function PostDetails({ author, date, categories }) {
  return (
    <div className={styles.root}>
      <Author author={author} date={date} />
      <Categories categories={categories || []} />
    </div>
  )
}

export default PostDetails
