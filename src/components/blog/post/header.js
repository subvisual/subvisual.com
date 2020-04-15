import React from "react"
import PropTypes from "prop-types"
import dateFormat from "dateformat"

import Title from "./title"
import Wrapper from "./wrapper"

import styles from "./header.module.css"

const BlogPostHeader = ({ author, date, retinaCover, title }) => {
  const { name: authorName } = author
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
          <span className={styles.author}>By {authorName}</span>
          <span className={styles.date}>On {formattedDate}</span>
        </div>
      </Wrapper>
    </>
  )
}

BlogPostHeader.propTypes = {
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  date: PropTypes.string.isRequired,
  retinaCover: PropTypes.string,
  title: PropTypes.string.isRequired,
}

export default BlogPostHeader
