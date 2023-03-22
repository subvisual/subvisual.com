import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "~/src/components/Layout"
import SEO from "~/src/components/SEO"
import PostsList from "~/src/components/PostList"

import "../common/base.scss"
import * as styles from "./blog.module.scss"

const query = graphql`
  {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/src.posts/" } }
      sort: [{ frontmatter: { date: DESC } }, { frontmatter: { title: DESC } }]
    ) {
      nodes {
        fields {
          path
        }
        frontmatter {
          author {
            key
            name
          }
          date
          title
          intro
        }
      }
    }
  }
`

function Posts({ posts }) {
  return (
    <>
      <SEO
        title="Inside Subvisual"
        description={`
            A blog written by people who learn from all of those around, and
            are eager to teach what they know. From team management to design
            and development, we try to give back by sharing.
          `}
      />
      <Layout currentPath="/blog/">
        <div className={styles.root}>
          <div className={styles.content}>
            <PostsList posts={posts} />
          </div>
        </div>
      </Layout>
    </>
  )
}

export default function Page() {
  const {
    allMarkdownRemark: { nodes },
  } = useStaticQuery(query)
  const posts = nodes.map((node) => {
    const { frontmatter, fields } = node
    const { path } = fields
    const { author, date, intro, title } = frontmatter

    return { author, date: new Date(date), intro, path, title }
  })

  return <Posts posts={posts} />
}
