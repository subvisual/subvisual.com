import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import dateFormat from "dateformat"

import Cover from "../PostCover"
import Title from "../BlogTitle"
import PageWideWrapper from "../PageWideWrapper"

import * as styles from "./index.module.css"

const renderAuthor = ({ key, name }) => (
  <>
    By <Link to={`/blog/author/${key}`}>{name}</Link>
  </>
)

const renderCover = ({ cover, coverFile }) => {
  if (!coverFile && !cover) return null

  return <Cover {...{ className: styles.cover, cover, coverFile }} />
}

function PostHeader({ author, cover, coverFile, date, title }) {
  const formattedDate = dateFormat(date, "mmmm d, yyyy")

  return (
    <>
      <PageWideWrapper padded>
        <div className={styles.wrapper}>
          <div className={styles.title}>
            <Title>{title}</Title>
          </div>
        </div>
      </PageWideWrapper>
      <PageWideWrapper>
        <div className={styles.wrapper}>
          {renderCover({ cover, coverFile })}
        </div>
      </PageWideWrapper>
      <PageWideWrapper padded>
        <div className={styles.wrapper}>
          <div className={styles.info}>
            <span className={styles.author}>{renderAuthor(author)}</span>
            <span className={styles.date}>On {formattedDate}</span>
          </div>
        </div>
      </PageWideWrapper>
    </>
  )
}

PostHeader.propTypes = {
  author: PropTypes.shape({
    key: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  cover: PropTypes.string,
  coverFile: PropTypes.object,
  date: PropTypes.instanceOf(Date).isRequired,
  title: PropTypes.string.isRequired,
}

export default PostHeader
