import React from "react"

import Logo from "../components/blog/logo"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PostsList from "../components/blog/posts_list"

import "../common/base.scss"

const renderHeaderLogo = () => <Logo />

const BlogPage = () => (
  <Layout color="blue" currentPath="/blog/" renderHeaderLogo={renderHeaderLogo}>
    <SEO
      title="Inside Subvisual"
      description={`
            A blog written by people who learn from all of those around, and
            are eager to teach what they know. From team management to design
            and development, we try to give back by sharing.
          `}
    />
    <PostsList />
  </Layout>
)

export default BlogPage
