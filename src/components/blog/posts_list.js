import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

import Entry from "./posts_list/entry"

import styles from "./posts_list.module.scss"

const renderItem = ({ id, ...entry }) => (
  <li key={id} className={styles.postsListItem}>
    <Entry {...entry} />
  </li>
)

const BlogPostsList = ({ items }) => (
  <div className={styles.root}>
    <div className={styles.content}>
      <ol className={styles.postsList}>{items.map(renderItem)}</ol>
    </div>
  </div>
)

BlogPostsList.propTypes = {
  items: PropTypes.array.isRequired,
}

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

export default () => (
  <StaticQuery
    query={query}
    render={data => {
      const {
        allMarkdownRemark: { nodes: postsNodes },
      } = data

      const items = postsNodes.map(({ fields, frontmatter }) => {
        const { slug } = fields
        const { author, ...entry } = frontmatter
        const { name: authorName } = author

        return {
          author: authorName,
          slug,
          ...entry,
        }
      })

      return <BlogPostsList items={items} />
    }}
  />
)
