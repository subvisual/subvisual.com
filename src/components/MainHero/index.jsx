import React from "react"
import { useLocation } from "@reach/router"

import HomeBackground from "../../images/header-home.png"
import PostBackground from "../../images/header-post.png"

import * as styles from "./index.module.scss"

function MainHero({ children }) {
  const location = useLocation()

  return (
    <div
      className={styles.root}
      style={{
        backgroundImage: `url(${
          location.pathname === "/blog/" ? HomeBackground : PostBackground
        })`,
      }}
    >
      <div className={styles.content}>{children}</div>
    </div>
  )
}

export default MainHero
