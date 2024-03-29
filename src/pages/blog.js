import { graphql, useStaticQuery } from "gatsby"
import { intersection, isEmpty, map, slice, uniqBy, sortBy } from "lodash"
import React, { useState } from "react"

import HighlightedPosts from "~/src/components/HighlightedPosts"
import Button from "~/src/components/Button"
import MainLayout from "~/src/components/MainLayout"
import PageWideWrapper from "~/src/components/PageWideWrapper"
import PodcastList from "../components/PodcastList"
import PostsList from "~/src/components/PostList"
import SEO from "~/src/components/SEO"
import Filter from "../components/Filter"
import useURLParams from "../utils/useURLParams"
import useUpdateQueryParams from "../utils/useUpdateQueryParams"

import "../common/base.scss"

import * as styles from "./blog.module.scss"

const query = graphql`
  {
    feedCanIHaveItInBlueMeta {
      image {
        url
      }
    }

    feedProductRocksMeta {
      image {
        url
      }
    }

    feedTaGravarMeta {
      image {
        url
      }
    }

    allFeedTaGravar(limit: 3) {
      nodes {
        title
        link
        pubDate
      }
    }

    allFeedProductRocks(limit: 3) {
      nodes {
        title
        link
        pubDate
      }
    }

    allFeedCanIHaveItInBlue(limit: 3) {
      nodes {
        title
        link
        pubDate
      }
    }

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
              childImageSharp {
                gatsbyImageData(
                  width: 50
                  height: 50
                  transformOptions: { fit: COVER, cropFocus: ATTENTION }
                )
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

function filterByCategories(posts, categories) {
  if (isEmpty(categories)) return posts

  return posts.filter(
    (post) => !isEmpty(intersection(map(post.categories, "key"), categories))
  )
}

function getAllCategories(posts) {
  const allCategories = posts
    .map((post) => post.categories)
    .filter((postCategories) => !!postCategories)
    .flat()

  return uniqBy(allCategories, "key")
}

function transformPodcastNodes(nodes, meta) {
  return nodes.map(({ link, title, pubDate }) => ({
    date: new Date(pubDate),
    image: meta.image.url,
    title,
    url: link,
  }))
}

function Posts({ posts, podcasts }) {
  const { filter, loadedPosts } = useURLParams()

  const [postsShown, setPostsShown] = useState(loadedPosts || 6)
  const [selectedCategories, setSelectedCategories] = useState(
    filter?.split(",") || []
  )

  useUpdateQueryParams({ name: "filter", value: selectedCategories })
  useUpdateQueryParams({
    name: "loadedPosts",
    value: postsShown,
    disabled: postsShown <= 6,
  })

  const categories = getAllCategories(posts)
  const filteredPosts = filterByCategories(posts, selectedCategories)
  const visiblePosts = slice(filteredPosts, 0, postsShown)

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
          <Filter
            categories={categories}
            selected={selectedCategories}
            onChange={setSelectedCategories}
          />
          <PostsList posts={visiblePosts} />
          {filteredPosts.length > postsShown && (
            <div className={styles.loadMore}>
              <Button onClick={() => setPostsShown(postsShown + 6)}>
                Load More Blog Posts
              </Button>
            </div>
          )}
          <PodcastList podcasts={podcasts} />
        </PageWideWrapper>
      </MainLayout>
    </>
  )
}

export default function Page() {
  const {
    allMarkdownRemark: { nodes },
    allFeedCanIHaveItInBlue,
    allFeedTaGravar,
    feedTaGravarMeta,
    feedCanIHaveItInBlueMeta,
    feedProductRocksMeta,
    allFeedProductRocks,
  } = useStaticQuery(query)
  const posts = nodes.map((node) => {
    const { frontmatter, fields } = node
    const { date, ...metadata } = frontmatter

    return { ...metadata, date: new Date(date), ...fields }
  })

  const podcasts = sortBy(
    [
      ...transformPodcastNodes(
        allFeedCanIHaveItInBlue.nodes,
        feedCanIHaveItInBlueMeta
      ),
      ...transformPodcastNodes(allFeedTaGravar.nodes, feedTaGravarMeta),
      ...transformPodcastNodes(allFeedProductRocks.nodes, feedProductRocksMeta),
    ],
    "date"
  ).reverse()

  return <Posts posts={posts} podcasts={podcasts} />
}
