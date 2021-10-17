import React from "react"
import { graphql } from "gatsby"

import Layout from "~/src/components/layout"
import PostsList from "~/src/components/blog/PostsList"
import SEO from "~/src/components/SEO"
import Title from "~/src/components/blog/title"

import * as styles from "./author.module.scss"

export const query = graphql`
  query ($authorKey: String!, $blogPostsPathRegex: String!) {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: {
        fileAbsolutePath: { regex: $blogPostsPathRegex }
        frontmatter: { author: { key: { eq: $authorKey } } }
      }
    ) {
      edges {
        node {
          frontmatter {
            date
            intro
            path
            title
          }
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

const BlogAuthorTemplate = ({ authorName, authorBio, posts }) => (
  <>
    <SEO title={`${authorName} — Subvisual`} description={authorBio} />
    <Layout>
      <div className={styles.root}>
        <div className={styles.content}>
          <Title className={styles.title}>By {authorName}</Title>
          <PostsList posts={posts} />
        </div>
      </div>
    </Layout>
  </>
)

const Template = ({ data }) => {
  const {
    allMarkdownRemark: { edges },
    blogContributorYaml,
    teamMemberYaml,
  } = data
  const authorYaml = teamMemberYaml || blogContributorYaml
  const { name: authorName, bio: authorBio } = authorYaml
  const posts = edges.map(({ node }) => {
    const { frontmatter } = node
    const { date, intro, path, title } = frontmatter

    return { date: new Date(date), intro, path, title }
  })

  return <BlogAuthorTemplate {...{ authorName, authorBio, posts }} />
}

export default Template
