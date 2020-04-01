import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Entry from "./posts_list/entry"

import styles from "./posts_list.module.scss"

const query = graphql`
  {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          author {
            name
          }
          date
          id
          title
          intro
        }
      }
    }
  }
`

const renderItem = ({ fields, frontmatter }) => {
  const { slug } = fields
  const { author, id, ...entry } = frontmatter
  const { name: authorName } = author
  const entryProps = {
    author: authorName,
    slug,
    ...entry,
  }

  return (
    <li key={id} className={styles.postsListItem}>
      <Entry {...entryProps} />
    </li>
  )
}

const BlogPostList = () => {
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

export default BlogPostList
