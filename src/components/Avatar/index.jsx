import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React, { useState } from "react"

import * as styles from "./index.module.scss"

function getRandomColor() {
  return `#${`${Math.random().toString(16)}000000`.substring(2, 8)}`
}
// Will change to use hash of author name and get a color from a palette

function Avatar({ author }) {
  const [randomColor] = useState(getRandomColor())

  return (
    <div>
      {author.photo ? (
        <GatsbyImage
          alt=""
          className={styles.avatar}
          image={getImage(author.photo.avatar)}
        />
      ) : (
        <div className={styles.avatar} style={{ backgroundColor: randomColor }}>
          <p>{author.initials}</p>
        </div>
      )}
    </div>
  )
}

export default Avatar
