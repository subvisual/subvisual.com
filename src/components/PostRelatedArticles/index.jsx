import { graphql, useStaticQuery } from "gatsby"
import React from "react"

import * as styles from "./index.module.scss"

export const query = graphql`
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
          categories {
            key
            label
          }
          title
        }
      }
    }
  }
`

function Article({ article }) {
  return (
    <div className={styles.article} key={article.fields.path}>
      <p className={styles.articleTitle}>{article.frontmatter.title}</p>
      <p className={styles.articleLink}>
        <a href={article.fields.path}>Read more</a>
      </p>
    </div>
  )
}

function PostRelatedArticles({ currentArticleTitle }) {
  const data = useStaticQuery(query)

  const currentArticleCategories = data.allMarkdownRemark.nodes
    .filter((article) => article.frontmatter.title === currentArticleTitle)
    .map((article) =>
      article.frontmatter.categories?.map((category) => category.label)
    )[0]

  const relatedArticles = data.allMarkdownRemark.nodes
    .filter((article) => article.frontmatter.title !== currentArticleTitle)
    .filter((article) =>
      article.frontmatter.categories
        ?.map((category) => category.label)
        .some((label) => currentArticleCategories?.includes(label))
    )
    .slice(0, 3)

  return (
    <div className={styles.root}>
      {relatedArticles.length > 0 && (
        <p className={styles.title}>Related Articles</p>
      )}
      <div className={styles.articles}>
        {relatedArticles.map((article) => (
          <Article article={article} />
        ))}
      </div>
    </div>
  )
}

export default PostRelatedArticles
