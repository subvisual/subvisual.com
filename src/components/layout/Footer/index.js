import React from "react"

import CallToAction from "../../CallToAction"
import Location from "./Location"
import Logo from "../../Logo"
import SocialLinks from "./SocialLinks"
import Text from "../../Text"
import "./index.module.css"

const Footer = () => (
  <footer styleName="root">
    <div styleName="content">
      <div styleName="logo">
        <Logo color="white" />
      </div>
      <div styleName="callToAction">
        <p>
          <Text color="white">Ready to bring your ideas to life?</Text>{" "}
          <CallToAction color="white">Let's talk.</CallToAction>
        </p>
      </div>
      <div styleName="locations">
        <div styleName="location">
          <Location
            align="left"
            name="Braga, Portugal"
            image="braga"
            directions="geo:41.543243,-8.399365"
          />
        </div>
        <div styleName="location">
          <Location
            align="right"
            name="Boston, USA"
            image="boston"
            directions="geo:42.356742,-71.057583"
          />
        </div>
      </div>
      <div styleName="social">
        <div styleName="socialLabel">
          <Text size="small" color="white">
            Follow us
          </Text>
        </div>
        <SocialLinks />
      </div>
      <p>
        <Text size="small" color="darkBlue">
          Handcrafted by Subvisual © {new Date().getFullYear()}
        </Text>
      </p>
    </div>
  </footer>
)

export default Footer
