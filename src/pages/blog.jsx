import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import PostsListPage from "~/src/components/blog/PostsListPage"

import "../common/base.scss"

const query = graphql`
  {
    allMarkdownRemark(
      sort: {
        fields: [frontmatter___date, frontmatter___title]
        order: [DESC, DESC]
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

export default () => {
  const {
    allMarkdownRemark: { nodes },
  } = useStaticQuery(query)
  const posts = nodes.map((node) => {
    const { frontmatter } = node
    const { author, date, intro, path, title } = frontmatter

    return { author, date: new Date(date), intro, path, title }
  })

  return (
    <PostsListPage
      {...{
        posts,
        seo: {
          description: `
            A blog written by people who learn from all of those around, and
            are eager to teach what they know. From team management to design
            and development, we try to give back by sharing.
          `,
          title: "Inside Subvisual",
        },
      }}
    />
  )
}
