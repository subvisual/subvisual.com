import { graphql } from "gatsby"
import _get from "lodash/get"
import React from "react"

import PageWideWrapper from "../../components/PageWideWrapper"
import PostBody from "../../components/PostBody"
import PostLayout from "../../components/PostLayout"
import PostShareLinks from "../../components/PostShareLinks"
import SEO from "../../components/SEO"

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
          initials
          bio
          photo {
            vertical {
              childImageSharp {
                gatsbyImageData(
                  width: 50
                  height: 50
                  transformOptions: { fit: COVER, cropFocus: ATTENTION }
                )
              }
            }
          }
        }
        categories {
          key
          label
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
  title,
  author,
  categories,
  date,
  html,
  intro,
  seoDescription,
  seoImage,
  url,
}) {
  return (
    <PostLayout
      title={title}
      author={author}
      date={date}
      categories={categories}
    >
      <SEO
        description={seoDescription || intro}
        image={seoImage}
        title={title}
        url={url}
      />
      <div className={styles.root}>
        <article className={styles.article}>
          <section>
            <PageWideWrapper>
              <div className={styles.outerWrapper}>
                <PostBody className={styles.innerWrapper} html={html} />
                <PostShareLinks className={styles.shareLinks} url={url} />
              </div>
            </PageWideWrapper>
          </section>
        </article>
      </div>
    </PostLayout>
  )
}

function Template({ data, pageContext }) {
  const { seoImage, cover } = pageContext
  const { markdownRemark, coverFile, seoImageFile } = data
  const { fields, frontmatter, html } = markdownRemark
  const { url } = fields
  const { author, date, categories, title, intro, seoDescription } = frontmatter

  return (
    <BlogPostTemplate
      {...{
        author,
        date: new Date(date),
        categories,
        cover,
        coverFile,
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
