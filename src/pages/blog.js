import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "~/src/components/layout"
import SEO from "~/src/components/SEO"
import PostsList from "~/src/components/blog/PostsList"

import "../common/base.scss"
import * as styles from "./blog.module.scss"

const query = graphql`
  {
    allMarkdownRemark(
      sort: [{ frontmatter: { date: DESC } }, { frontmatter: { title: DESC } }]
    ) {
      nodes {
        frontmatter {
          author {
            key
            name
          }
          date
          path
          title
          intro
        }
      }
    }
  }
`

const BlogPage = ({ posts }) => (
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

const Page = () => {
  const {
    allMarkdownRemark: { nodes },
  } = useStaticQuery(query)
  const posts = nodes.map((node) => {
    const { frontmatter } = node
    const { author, date, intro, path, title } = frontmatter

    return { author, date: new Date(date), intro, path, title }
  })

  return <BlogPage posts={posts} />
}

export default Page
