import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import Body from "../../components/blog/post/body"
import Header from "../../components/blog/post/header"
import Layout from "../../components/layout"
import SEO from "../../components/seo"

import "../../common/base.scss"
import styles from "./post.module.scss"

export const query = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { path: { eq: $slug } }) {
      html
      frontmatter {
        author {
          key
          name
        }
        date
        cover
        title
      }
    }
  }
`

const BlogPostTemplate = ({ author, date, html, cover, title }) => (
  <Layout>
    <SEO title={title} />
    <div className={styles.root}>
      <article className={styles.article}>
        <header className={styles.header}>
          <Header {...{ author, date, cover, title }} />
        </header>
        <section className={styles.body}>
          <Body html={html} />
        </section>
      </article>
    </div>
  </Layout>
)

BlogPostTemplate.propTypes = {
  author: PropTypes.object.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  html: PropTypes.string.isRequired,
  cover: PropTypes.string,
  title: PropTypes.string.isRequired,
}

export default ({ data }) => {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  const { author, date, cover, title } = frontmatter

  return (
    <BlogPostTemplate
      {...{ author, date: new Date(date), html, cover, title }}
    />
  )
}
