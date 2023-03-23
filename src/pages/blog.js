import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import MainLayout from "~/src/components/MainLayout"
import SEO from "~/src/components/SEO"
import PostsList from "~/src/components/PostList"

import "../common/base.scss"
import * as styles from "./index.module.scss"

const query = graphql`
  {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/src.posts/" } }
      sort: [{ frontmatter: { date: DESC } }, { frontmatter: { title: DESC } }]
    ) {
      nodes {
        fields {
          path
        }
        frontmatter {
          author {
            key
            name
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
          title
          intro
        }
      }
    }
  }
`

function Posts({ posts }) {
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
      <MainLayout>
        <div className={styles.root}>
          <div className={styles.content}>
            <PostsList posts={posts} />
          </div>
        </div>
      </MainLayout>
    </>
  )
}

export default function Page() {
  const {
    allMarkdownRemark: { nodes },
  } = useStaticQuery(query)
  const posts = nodes.map((node) => {
    const { frontmatter, fields } = node
    const { path } = fields
    const { date, ...metadata } = frontmatter

    return { ...metadata, date: new Date(date), path }
  })

  return <Posts posts={posts} />
}
