import { graphql } from "gatsby"
import React from "react"

import Title from "~/src/components/BlogTitle"
import MainLayout from "~/src/components/MainLayout"
import PostsList from "~/src/components/PostList"
import SEO from "~/src/components/SEO"

import * as styles from "./index.module.scss"

export const query = graphql`
  query ($authorKey: String!) {
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: {
        frontmatter: { author: { key: { eq: $authorKey } } }
        fileAbsolutePath: { regex: "/src.posts/" }
      }
    ) {
      nodes {
        fields {
          path
        }
        frontmatter {
          author {
            key
            name
            initials
            photo {
              avatar {
                childImageSharp {
                  gatsbyImageData(
                    width: 50
                    height: 50
                    transformOptions: { fit: COVER, cropFocus: ATTENTION }
                  )
                }
              }
            }
          }
          date
          title
          intro
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

function AuthorPostsList({ authorName, authorBio, posts }) {
  return (
    <>
      <SEO title={`${authorName} — Subvisual`} description={authorBio} />
      <MainLayout>
        <div className={styles.root}>
          <div className={styles.content}>
            <Title className={styles.title}>By {authorName}</Title>
            <PostsList posts={posts} />
          </div>
        </div>
      </MainLayout>
    </>
  )
}

export default function Template({ data }) {
  const {
    allMarkdownRemark: { nodes },
    blogContributorYaml,
    teamMemberYaml,
  } = data

  const authorYaml = teamMemberYaml || blogContributorYaml
  const { name: authorName, bio: authorBio } = authorYaml

  const posts = nodes.map(({ frontmatter, fields }) => ({
    ...frontmatter,
    path: fields.path,
    date: new Date(frontmatter.date),
  }))

  return <AuthorPostsList {...{ authorName, authorBio, posts }} />
}
