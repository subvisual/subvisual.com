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
  query($cover: String, $slug: String!) {
    markdownRemark(frontmatter: { path: { eq: $slug } }) {
      fields {
        cover
      }
      frontmatter {
        author {
          key
          name
        }
        date
        title
      }
      html
    }
    coverFile: file(absolutePath: { eq: $cover }) {
      childImageSharp {
        fluid(maxWidth: 980) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

const BlogPostTemplate = ({ author, cover, coverFile, date, html, title }) => (
  <Layout>
    <SEO title={title} />
    <div className={styles.root}>
      <article className={styles.article}>
        <header className={styles.header}>
          <Header {...{ author, cover, coverFile, date, title }} />
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
  coverFile: PropTypes.object,
  title: PropTypes.string.isRequired,
}

export default ({ data }) => {
  const { markdownRemark, coverFile } = data
  const { fields, frontmatter, html } = markdownRemark
  const { cover } = fields
  const { author, date, title } = frontmatter

  return (
    <BlogPostTemplate
      {...{
        author,
        date: new Date(date),
        html,
        cover,
        coverFile,
        title,
      }}
    />
  )
}
