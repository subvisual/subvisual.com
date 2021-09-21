import React from "react"
import Announcement from "react-announcement"

import Symbol from "~/src/images/subvisual-symbol-blue.svg"

import styles from "./index.module.scss"

export default () => (
  <div className={styles.root}>
    {process.env.NODE_ENV === 'production' && <Announcement
      title="We're hiring!"
      subtitle="Would you like to join our team? Head over to our jobs page and read on our current openings."
      link="https://jobs.subvisual.com"
      daysToLive={0}
      secondsBeforeBannerShows={10}
      imageSource={Symbol}
    />}
  </div>
)
