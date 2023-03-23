import React from "react"
import PropTypes from "prop-types"
import dateFormat from "dateformat"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import * as styles from "./index.module.scss"

function renderAuthor({ key, name }) {
  return <Link to={`/blog/author/${key}`}>{name}</Link>
}

function Author({ date, author }) {
  const formattedDate = dateFormat(date, "mmmm d, yyyy")

  return (
    <div className={styles.root}>
      {author?.photo && (
        <GatsbyImage
          alt=""
          image={getImage(author.photo.vertical)}
          style={{
            marginRight: 16,
            height: 40,
            width: 40,
            borderRadius: "50%",
          }}
        />
      )}

      <div>
        <p>{renderAuthor(author)}</p>
        <p>{formattedDate}</p>
      </div>
    </div>
  )
}

Author.propTypes = {
  author: PropTypes.string,
  date: PropTypes.instanceOf(Date).isRequired,
}

export default Author
