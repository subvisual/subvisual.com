import React from "react"

import CallToAction from "../../CallToAction"
import Location from "./Location"
import Logo from "../../logo"
import SocialLinks from "./SocialLinks"
import Text from "../../Text"
import "./index.module.css"

const Footer = () => (
  <footer styleName="root">
    <div styleName="content">
      <div styleName="logo">
        <Logo white />
      </div>
      <div styleName="callToAction">
        <p>
          <Text white>Ready to bring your ideas to life?</Text>{" "}
          <CallToAction color="white">Let's talk.</CallToAction>
        </p>
      </div>
      <div styleName="locations">
        <div styleName="location">
          <Location
            align="left"
            name="Braga, Portugal"
            image="braga"
            directions="#"
          />
        </div>
        <div styleName="location">
          <Location
            align="right"
            name="Boston, USA"
            image="boston"
            directions="#"
          />
        </div>
      </div>
      <div styleName="social">
        <Text small white>
          Follow us
        </Text>
        <SocialLinks />
      </div>
      <p>
        <Text darkBlue small>
          Handcrafted by Subvisual © {new Date().getFullYear()}
        </Text>
      </p>
    </div>
  </footer>
)

export default Footer
