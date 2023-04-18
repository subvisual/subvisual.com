import React, { useState } from "react"
import PropTypes from "prop-types"
import dateFormat from "dateformat"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import * as styles from "./index.module.scss"

function renderAuthor({ key, name }) {
  return <Link to={`/blog/author/${key}`}>{name}</Link>
}

function getRandomColor() {
  return `#${`${Math.random().toString(16)}000000`.substring(2, 8)}`
}

function Author({ date, author }) {
  const formattedDate = dateFormat(date, "mmmm d, yyyy")
  const randomColor = useState(getRandomColor())[0]

  return (
    <div className={styles.root}>
      {author.photo ? (
        <GatsbyImage
          alt=""
          className={styles.avatar}
          image={getImage(author.photo.vertical)}
        />
      ) : (
        <div className={styles.avatar} style={{ backgroundColor: randomColor }}>
          <p>{author.initials}</p>
        </div>
      )}

      <div>
        <p>{renderAuthor(author)}</p>
        <p>{formattedDate}</p>
      </div>
    </div>
  )
}

Author.propTypes = {
  author: PropTypes.shape({
    key: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    initials: PropTypes.string,
    photo: PropTypes.any.isRequired,
  }),
  date: PropTypes.instanceOf(Date).isRequired,
}

export default Author
