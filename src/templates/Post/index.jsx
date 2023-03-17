import React from "react"
import { graphql } from "gatsby"
import _get from "lodash/get"

import Header from "../../components/PostHeader"
import ShareLinks from "../../components/PostShareLinks"
import PostBody from "../../components/PostBody"
import Layout from "../../components/Layout"
import SEO from "../../components/SEO"
import PageWideWrapper from "../../components/PageWideWrapper"

import "~/src/common/base.scss"
import * as styles from "./index.module.scss"

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

function BlogPostTemplate({
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
}) {
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
            <PageWideWrapper>
              <div className={styles.outerWrapper}>
                <PostBody className={styles.innerWrapper} html={html} />
                <ShareLinks className={styles.shareLinks} url={url} />
              </div>
            </PageWideWrapper>
          </section>
        </article>
      </div>
    </Layout>
  )
}

function Template({ data, pageContext }) {
  const { seoImage, cover } = pageContext
  const { markdownRemark, coverFile, seoImageFile } = data
  const { fields, frontmatter, html } = markdownRemark
  const { url } = fields
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
