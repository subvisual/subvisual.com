import React from "react"

import * as styles from "./index.module.scss"

function Article({ title, link }) {
  return (
    <div className={styles.article}>
      <p className={styles.articleTitle}>{title}</p>
      <p className={styles.articleLink}>
        <a href={link}>Read more</a>
      </p>
    </div>
  )
}

function PostRelatedArticles({ related }) {
  return (
    related.length > 0 && (
      <div className={styles.root}>
        <p className={styles.title}>Related articles</p>
        <div className={styles.articles}>
          {related.map((article) => (
            <Article {...article} />
          ))}
        </div>
      </div>
    )
  )
}

export default PostRelatedArticles
