import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Entry from "./posts_list/entry"

import styles from "./posts_list.module.scss"

const query = graphql`
  {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      nodes {
        frontmatter {
          author {
            name
          }
          date
          id
          path
          title
          intro
        }
      }
    }
  }
`

const renderItem = ({ frontmatter }) => {
  const { author, date, id, path, ...entry } = frontmatter
  const { name: authorName } = author

  const entryProps = {
    author: authorName,
    path,
    date: new Date(date),
    slug,
    ...entry,
  }

  return (
    <li key={id} className={styles.postsListItem}>
      <Entry {...entryProps} />
    </li>
  )
}

const BlogPostsList = () => {
  const {
    allMarkdownRemark: { nodes: postsNodes },
  } = useStaticQuery(query)

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <ol className={styles.postsList}>{postsNodes.map(renderItem)}</ol>
      </div>
    </div>
  )
}

export default BlogPostsList
