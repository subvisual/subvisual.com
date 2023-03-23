import React from "react"
import { graphql } from "gatsby"

import Title from "~/src/components/BlogTitle"
import MainLayout from "~/src/components/MainLayout"
import PostsList from "~/src/components/PostList"
import SEO from "~/src/components/SEO"

import * as styles from "./index.module.scss"

export const query = graphql`
  query ($tagKey: String!) {
    allMarkdownRemark(filter: { frontmatter: { tags: { in: [$tagKey] } } }) {
      nodes {
        fields {
          path
        }
        frontmatter {
          title
        }
      }
    }
  }
`

function TagsList({ tagName, posts }) {
  return (
    <>
      <SEO title={`${tagName} — Subvisual`} />
      <MainLayout>
        <div className={styles.root}>
          <div className={styles.content}>
            <Title className={styles.title}>{tagName}</Title>
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
  } = data

  const posts = nodes.map(({ frontmatter, fields }) => ({
    ...frontmatter,
    path: fields.path,
    date: new Date(frontmatter.date),
  }))

  return <TagsList {...{ posts }} />
}
