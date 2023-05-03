import React from "react"
import { useLocation } from "@reach/router"
import { StaticImage } from "gatsby-plugin-image"

// import HomeBackground from "../../images/header-home.jpg"
// import PostBackground from "../../images/header-post.jpg"

import * as styles from "./index.module.scss"

function MainHero({ children }) {
  const location = useLocation()

  console.log(location.pathname)

  return (
    <div
      className={styles.root}
      style={
        {
          // backgroundImage: `url(${
          //   location.pathname === "/blog/" ? HomeBackground : PostBackground
          // })`,
        }
      }
    >
      {location.pathname === "/blog/" ? (
        <StaticImage
          src="../../images/header-home.jpg"
          className={styles.imageWrapper}
          imgClassName={styles.image}
          layout="fixed"
          height={816}
          quality={90}
        />
      ) : (
        <StaticImage
          src="../../images/header-post.jpg"
          className={styles.imageWrapper}
          imgClassName={styles.image}
          layout="fixed"
          height={816}
          quality={90}
        />
      )}
      <div className={styles.content}>{children}</div>
    </div>
  )
}

export default MainHero
