import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "~/src/components/layout"
import SEO from "~/src/components/SEO"
import Search from "~/src/components/blog/Search"
import PostsList from "~/src/components/blog/posts_list"
import useSearch from "~/src/utils/useSearch"

import "../common/base.scss"
import styles from "./blog.module.scss"

const query = graphql`
  {
    allMarkdownRemark(
      sort: {
        fields: [frontmatter___date, frontmatter___title]
        order: [DESC, DESC]
      }
    ) {
      nodes {
        id
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

const BlogPage = ({ posts }) => {
  const [results, searchQuery, setSearchQuery] = useSearch()

  console.log("results", results)

  // Filter posts data from search results by path
  const matchingPosts = searchQuery
    ? results.map(({ id }) => posts.find((post) => post.id === id))
    : posts

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
            <Search onChange={setSearchQuery} />
            <PostsList posts={matchingPosts} />
          </div>
        </div>
      </Layout>
    </>
  )
}

export default () => {
  const {
    allMarkdownRemark: { nodes },
  } = useStaticQuery(query)
  const posts = nodes.map((node) => {
    const { frontmatter, id } = node
    const { author, date, intro, path, title } = frontmatter

    return { author, date: new Date(date), id, intro, path, title }
  })

  return <BlogPage posts={posts} />
}
