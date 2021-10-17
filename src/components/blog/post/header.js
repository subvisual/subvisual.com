import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import dateFormat from "dateformat"

import Cover from "./header/cover"
import Title from "~/src/components/blog/title"
import Wrapper from "./wrapper"

import * as styles from "./header.module.css"

const renderAuthor = ({ key, name }) => (
  <>
    By <Link to={`/blog/author/${key}`}>{name}</Link>
  </>
)

const renderCover = ({ cover, coverFile }) => {
  if (!coverFile && !cover) return null

  return (
    <Wrapper>
      <Cover {...{ className: styles.cover, cover, coverFile }} />
    </Wrapper>
  )
}

const BlogPostHeader = ({ author, cover, coverFile, date, title }) => {
  const formattedDate = dateFormat(date, "mmmm d, yyyy")

  return (
    <>
      <Wrapper padded>
        <div className={styles.title}>
          <Title>{title}</Title>
        </div>
      </Wrapper>
      {renderCover({ cover, coverFile })}
      <Wrapper padded>
        <div className={styles.info}>
          <span className={styles.author}>{renderAuthor(author)}</span>
          <span className={styles.date}>On {formattedDate}</span>
        </div>
      </Wrapper>
    </>
  )
}

BlogPostHeader.propTypes = {
  author: PropTypes.shape({
    key: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  cover: PropTypes.string,
  coverFile: PropTypes.object,
  date: PropTypes.instanceOf(Date).isRequired,
  title: PropTypes.string.isRequired,
}

export default BlogPostHeader
