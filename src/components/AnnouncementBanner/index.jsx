import React from "react"
import Announcement from "react-announcement"

import Symbol from "~/src/images/subvisual-symbol-blue.svg"

import styles from "./index.module.scss"

export default () => (
  <div className={styles.root}>
    <Announcement
      title="We're hiring!"
      subtitle="Would you like to join our team? Head down to our blog and read on our front-end developer opening."
      link="https://jobs.subvisual.com"
      daysToLive={0}
      secondsBeforeBannerShows={10}
      imageSource={Symbol}
    />
  </div>
)
