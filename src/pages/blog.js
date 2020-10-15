import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "~/src/components/layout"
import SEO from "~/src/components/SEO"
import SearchBar from "~/src/components/blog/SearchBar"
import PostsList from "~/src/components/blog/PostsList"
import usePostsSearch from "~/src/utils/usePostsSearch"

import "../common/base.scss"
import styles from "./blog.module.scss"

export default () => {
  const data = useStaticQuery(graphql`
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
  `)
  const [searchQuery, setSearchQuery] = useState("")

  const allPosts = data.allMarkdownRemark.nodes.map((node) => {
    const { frontmatter, id } = node
    const { author, date, intro, path, title } = frontmatter

    return { author, date: new Date(date), id, intro, path, title }
  })
  const posts = usePostsSearch(allPosts, searchQuery)

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
            <SearchBar onChange={setSearchQuery} />
            <PostsList posts={posts} />
          </div>
        </div>
      </Layout>
    </>
  )
}
