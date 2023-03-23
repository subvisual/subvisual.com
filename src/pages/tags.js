import React from "react"
import PropTypes from "prop-types"

import { Link, graphql } from "gatsby"

import SEO from "~/src/components/SEO"
import MainLayout from "~/src/components/MainLayout"

import * as styles from "./index.module.scss"

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 2000) {
      group(field: { frontmatter: { tags: SELECT } }) {
        fieldValue
        totalCount
      }
    }
  }
`

function TagsPage({
  data: {
    allMarkdownRemark: { group },
  },
}) {
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
            <ul className={styles.list}>
              {group.map((tag) => (
                <li className={styles.tag} key={tag.fieldValue}>
                  <Link to={`/tags/${tag.fieldValue}/`}>
                    {tag.fieldValue} - ({tag.totalCount})
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </MainLayout>
    </>
  )
}

TagsPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired
      ),
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
  }),
}

export default TagsPage
