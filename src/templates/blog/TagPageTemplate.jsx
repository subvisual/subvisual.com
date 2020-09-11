import React from "react"
import { graphql } from "gatsby"

import PostsListPage from "~/src/components/blog/PostsListPage"

export const query = graphql`
  query($blogPostsPathRegex: String!, $tag: String!) {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: {
        fileAbsolutePath: { regex: $blogPostsPathRegex }
        frontmatter: { tags: { eq: $tag } }
      }
    ) {
      nodes {
        frontmatter {
          author {
            key
            name
          }
          date
          intro
          path
          title
        }
      }
    }
  }
`

export default ({ data, pageContext }) => {
  const {
    allMarkdownRemark: { nodes },
  } = data
  const { tag } = pageContext
  const posts = nodes.map((node) => {
    const { frontmatter } = node
    const { author, date, intro, path, title } = frontmatter

    return { author, date: new Date(date), intro, path, title }
  })
  const title = `Posts about ${tag}`

  return (
    <PostsListPage
      {...{
        posts,
        seo: {
          description: `
        Blog posts about ${tag}, written by people who are continuously
        learning, and who try to give back by sharing.
      `,
          title,
        },
        title,
      }}
    />
  )
}
