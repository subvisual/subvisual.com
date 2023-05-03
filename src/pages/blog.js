import React, { useState, useMemo } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { slice } from "lodash"

import Button from "~/src/components/Button"
import MainLayout from "~/src/components/MainLayout"
import PageWideWrapper from "~/src/components/PageWideWrapper"
import PostsList from "~/src/components/PostList"
import SEO from "~/src/components/SEO"
import HighlightedPosts from "~/src/components/HighlightedPosts"

import "../common/base.scss"

import * as styles from "./blog.module.scss"

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
            initials
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
          highlight
          cover {
            childImageSharp {
              gatsbyImageData(width: 442)
            }
          }
        }
      }
    }
  }
`

function Posts({ posts }) {
  const [postsShown, setPostsShown] = useState(6)
  const currentPosts = useMemo(() => slice(posts, 0, postsShown), [postsShown])

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
        <PageWideWrapper padded>
          <HighlightedPosts posts={posts.filter((post) => post.highlight)} />
          <PostsList posts={currentPosts} />
          {posts.length >= postsShown && (
            <div className={styles.loadMore}>
              <Button onClick={() => setPostsShown(postsShown + 6)}>
                Load More Blog Posts
              </Button>
            </div>
          )}
        </PageWideWrapper>
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
    const { date, ...metadata } = frontmatter

    return { ...metadata, date: new Date(date), ...fields }
  })

  return <Posts posts={posts} />
}
