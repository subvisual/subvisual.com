import React from "react"

import SocialLinks from "~/src/components/Footer/social_links"
import Text from "~/src/components/Text"
import Link from "~/src/components/Link"

import * as styles from "./index.module.scss"

function FooterGrid() {
  return (
    <div className={styles.root}>
      <div className={styles.item}>
        <div className={styles.label}>
          <Text size="large">Go to</Text>
        </div>
        <div className={styles.links}>
          <Link to="https://subvisual.com/people">People</Link>
          <Link to="https://jobs.subvisual.com/">Work</Link>
          <Link to="https://subvisual.com/blog">Blog</Link>
          <Link to="https://subvisual.com/ventures">Ventures</Link>
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles.label}>
          <Text size="large">We&apos;re social</Text>
        </div>
        <SocialLinks />
      </div>
      <div className={styles.item}>
        <div className={styles.label}>
          <Text size="large">Contact us</Text>
        </div>
        <Link to="mailto:contact@subvisual.com">contact@subvisual.com</Link>
      </div>
      <div className={styles.item}>
        <div className={styles.label}>
          <Text size="large">Offices</Text>
        </div>
        <Text size="regular">
          Remote. Work anywhere in the world. <br />
          Or join our motherships, landed in Braga and Boston.
        </Text>
      </div>
    </div>
  )
}

export default FooterGrid
