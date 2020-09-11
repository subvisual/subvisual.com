import React from "react"
import { graphql } from "gatsby"

import PostsListPage from "~/src/components/blog/PostsListPage"

export const query = graphql`
  query($authorKey: String!, $blogPostsPathRegex: String!) {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: {
        fileAbsolutePath: { regex: $blogPostsPathRegex }
        frontmatter: { author: { key: { eq: $authorKey } } }
      }
    ) {
      nodes {
        frontmatter {
          date
          intro
          path
          title
        }
      }
    }
    blogContributorYaml(key: { eq: $authorKey }) {
      name
      bio
    }
    teamMemberYaml(key: { eq: $authorKey }) {
      name
      bio
    }
  }
`

export default ({ data }) => {
  const {
    allMarkdownRemark: { nodes },
    blogContributorYaml,
    teamMemberYaml,
  } = data
  const authorYaml = teamMemberYaml || blogContributorYaml
  const { name: authorName, bio: authorBio } = authorYaml
  const posts = nodes.map((node) => {
    const { frontmatter } = node
    const { date, intro, path, title } = frontmatter

    return { date: new Date(date), intro, path, title }
  })
  const title = `Posts by ${authorName}`

  return (
    <PostsListPage
      {...{
        posts,
        seo: {
          description: authorBio,
          title,
        },
        showTagFilter: false,
        title,
      }}
    />
  )
}
