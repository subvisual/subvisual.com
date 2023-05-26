import { Link, graphql, useStaticQuery } from "gatsby"
import { intersection, isEmpty, map } from "lodash"
import React from "react"

import * as styles from "./index.module.scss"

export const query = graphql`
  {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/src.posts/" } }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        fields {
          path
        }
        frontmatter {
          categories {
            key
            label
          }
          title
        }
      }
    }
  }
`

function PostRelatedPosts({ categories, title }) {
  const data = useStaticQuery(query)
  const posts = data.allMarkdownRemark.nodes

  const relatedPosts = posts.filter((post) => {
    const isNotParentPost = post.frontmatter.title !== title
    const parentCategories = map(categories, "key")
    const postCategories = map(post.frontmatter.categories, "key")
    const commonCategories = intersection(postCategories, parentCategories)

    return isNotParentPost && !isEmpty(commonCategories)
  })

  return (
    !isEmpty(relatedPosts) && (
      <>
        <p className={styles.heading}>Related Articles</p>
        <div className={styles.container}>
          {relatedPosts?.slice(0, 3).map((post) => (
            <Link
              key={post.fields.path}
              href={post.fields.path}
              className={styles.card}
            >
              <p className={styles.title}>{post.frontmatter.title}</p>
              <p className={styles.cta}>Read more</p>
            </Link>
          ))}
        </div>
      </>
    )
  )
}

export default PostRelatedPosts
