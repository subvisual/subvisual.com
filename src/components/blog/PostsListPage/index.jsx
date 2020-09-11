import React from "react"

import Layout from "~/src/components/layout"
import PostsTagFilter from "~/src/components/blog/PostsTagFilter"
import PostsList from "~/src/components/blog/PostsList"
import SEO from "~/src/components/SEO"
import Title from "~/src/components/blog/title"

import styles from "./index.module.scss"

function renderPostsTagFilter({ showTagFilter }) {
  if (!showTagFilter) return null

  return <PostsTagFilter className={styles.filters} />
}

function renderTitle({ title }) {
  if (!title) return null

  return <Title className={styles.title}>{title}</Title>
}

export default ({ seo, showTagFilter = true, title, ...rest }) => (
  <>
    <SEO {...seo} />
    <Layout currentPath="/blog/">
      <div className={styles.root}>
        {renderPostsTagFilter({ showTagFilter })}
        <div className={styles.posts}>
          {renderTitle({ title })}
          <PostsList {...rest} />
        </div>
      </div>
    </Layout>
  </>
)
