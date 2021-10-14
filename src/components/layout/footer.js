import React from "react"

import CallToAction from "~/src/components/call_to_action"
import Location from "./footer/location"
import Logo from "~/src/components/logo"
import Norte2020 from "./footer/Norte2020"
import SocialLinks from "./footer/social_links"
import Text from "~/src/components/text"

import * as styles from "./footer.module.css"

const Footer = () => (
  <footer>
    <div className={styles.blue}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={styles.callToAction}>
          <p>
            <Text>Ready to bring your ideas to life?</Text>{" "}
            <CallToAction color="white">Let&apos;s talk.</CallToAction>
          </p>
        </div>
        <div className={styles.locations}>
          <div>
            <Location
              align="left"
              name="Braga, Portugal"
              image="braga"
              geoUrl="geo:41.543243,-8.399365"
              mapsUrl="https://goo.gl/maps/ddvtn1Ez8N72"
            />
          </div>
          <div>
            <Location
              align="right"
              name="Boston, USA"
              image="boston"
              geoUrl="geo:42.356742,-71.057583"
              mapsUrl="https://goo.gl/maps/zouxb7phyLz"
            />
          </div>
        </div>
        <div className={styles.social}>
          <div className={styles.socialLabel}>
            <Text size="small">Follow us</Text>
          </div>
          <SocialLinks />
        </div>
        <p>
          <Text size="small" color="purple">
            Handcrafted by Subvisual © {new Date().getFullYear()}
          </Text>
        </p>
      </div>
    </div>
    <div className={styles.white}>
      <div className={styles.content}>
        <Norte2020 />
      </div>
    </div>
  </footer>
)

export default Footer
