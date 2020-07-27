import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import Body from "src/components/blog/post/body"
import BodyWrapper from "src/components/blog/post/body_wrapper"
import Header from "src/components/blog/post/header"
import Layout from "src/components/layout"
import SEO from "src/components/seo"
import ShareLinks from "src/components/blog/post/body/share_links"
import Wrapper from "src/components/blog/post/wrapper"

import "src/common/base.scss"
import styles from "./post.module.scss"

export const query = graphql`
  query($cover: String, $slug: String!) {
    markdownRemark(frontmatter: { path: { eq: $slug } }) {
      fields {
        cover
        seoImage
        url
      }
      frontmatter {
        author {
          key
          name
        }
        date
        intro
        seoDescription
        title
      }
      html
    }
    coverFile: file(absolutePath: { eq: $cover }) {
      childImageSharp {
        fluid(grayscale: true, maxWidth: 980) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

const BlogPostTemplate = ({
  author,
  cover,
  coverFile,
  date,
  html,
  title,
  url,
  intro,
  seoDescription,
  seoImage,
}) => (
  <Layout>
    <SEO
      description={seoDescription || intro}
      image={seoImage || cover}
      title={title}
      url={url}
    />
    <div className={styles.root}>
      <article className={styles.article}>
        <header className={styles.header}>
          <Header {...{ author, cover, coverFile, date, title }} />
        </header>
        <section>
          <Wrapper className={styles.outerWrapper}>
            <BodyWrapper className={styles.innerWrapper}>
              <Body html={html} />
            </BodyWrapper>
            <ShareLinks className={styles.shareLinks} url={url} />
          </Wrapper>
        </section>
      </article>
    </div>
  </Layout>
)

BlogPostTemplate.propTypes = {
  author: PropTypes.object.isRequired,
  cover: PropTypes.string,
  seoImage: PropTypes.string,
  coverFile: PropTypes.object,
  date: PropTypes.instanceOf(Date).isRequired,
  html: PropTypes.string.isRequired,
  intro: PropTypes.string.isRequired,
  seoDescription: PropTypes.string,
  title: PropTypes.string.isRequired,
}

export default ({ data }) => {
  const { markdownRemark, coverFile } = data
  const { fields, frontmatter, html } = markdownRemark
  const { seoImage, cover, url } = fields
  const { author, date, title, intro, seoDescription } = frontmatter

  return (
    <BlogPostTemplate
      {...{
        author,
        cover,
        coverFile,
        date: new Date(date),
        html,
        intro,
        seoDescription,
        seoImage,
        title,
        url,
      }}
    />
  )
}
