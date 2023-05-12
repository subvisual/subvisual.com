import React from "react"
import { useLocation } from "@reach/router"
import { StaticImage } from "gatsby-plugin-image"

import * as styles from "./index.module.scss"

function MainHero({ children }) {
  const location = useLocation()

  return (
    <div className={styles.root}>
      {location.pathname === "/blog/" ? (
        <StaticImage
          src="../../images/header-home.jpg"
          className={styles.imageWrapper}
          imgClassName={styles.image}
          layout="fullWidth"
          height={816}
          quality={90}
        />
      ) : (
        <StaticImage
          src="../../images/header-post.jpg"
          className={styles.imageWrapper}
          imgClassName={styles.image}
          layout="fullWidth"
          height={816}
          quality={90}
        />
      )}
      <div className={styles.content}>{children}</div>
    </div>
  )
}

export default MainHero
