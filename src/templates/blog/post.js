import React from "react"
import { graphql } from "gatsby"
import _get from "lodash/get"

import Layout from "~/src/components/layout"
import SEO from "~/src/components/SEO"
import Header from "~/src/components/blog/post/header"
import Body from "~/src/components/blog/post/body"
import BodyWrapper from "~/src/components/blog/post/body_wrapper"
import ShareLinks from "~/src/components/blog/post/body/share_links"
import Wrapper from "~/src/components/blog/post/wrapper"

import "~/src/common/base.scss"
import * as styles from "./post.module.scss"

export const query = graphql`
  query ($cover: String, $seoImage: String, $slug: String!) {
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
        gatsbyImageData(
          width: 980
          transformOptions: { grayscale: true }
          layout: CONSTRAINED
        )
      }
    }
    seoImageFile: file(absolutePath: { eq: $seoImage }) {
      childImageSharp {
        gatsbyImageData(
          width: 2160
          height: 1080
          placeholder: NONE
          layout: FIXED
        )
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
  intro,
  seoDescription,
  seoImage,
  url,
}) => {
  return (
    <Layout>
      <SEO
        description={seoDescription || intro}
        image={seoImage}
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
}

const Template = ({ data, pageContext }) => {
  const { seoImage, cover } = pageContext
  const { markdownRemark, coverFile, seoImageFile } = data
  const { fields, frontmatter, html } = markdownRemark
  const { url } = fields
  const { author, date, title, intro, seoDescription } = frontmatter

  console.log(data, pageContext)

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
        seoImage: _get(
          seoImageFile,
          "childImageSharp.gatsbyImageData.images.fallback.src",
          seoImage
        ),
        title,
        url,
      }}
    />
  )
}

export default Template
