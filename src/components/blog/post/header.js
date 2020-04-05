import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import dateFormat from "dateformat"

import Title from "../title"
import Wrapper from "./wrapper"

import styles from "./header.module.css"

const renderAuthor = ({ key, name }) => (
  <>
    By <Link to={`/blog/author/${key}`}>{name}</Link>
  </>
)

const BlogPostHeader = ({ author, date, retinaCover, title }) => {
  const formattedDate = dateFormat(date, "mmmm d, yyyy")

  const renderCover = () => {
    if (!retinaCover) return null

    return (
      <Wrapper>
        <div
          className={styles.cover}
          style={{ backgroundImage: `url(${retinaCover})` }}
        />
      </Wrapper>
    )
  }

  return (
    <>
      <Wrapper padded>
        <div className={styles.title}>
          <Title>{title}</Title>
        </div>
      </Wrapper>
      {renderCover()}
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
  date: PropTypes.instanceOf(Date).isRequired,
  retinaCover: PropTypes.string,
  title: PropTypes.string.isRequired,
}

export default BlogPostHeader
