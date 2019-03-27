import React from "react"

import CallToAction from "../../call_to_action"
import Logo from "../../logo"
import SocialLinks from "./SocialLinks"
import Text from "../../Text"
import "./index.css"

const Footer = () => (
  <footer className="PageFooter">
    <div className="PageFooter-content">
      <div className="PageFooter-logo">
        <Logo white />
      </div>
      <div className="PageFooter-callToAction">
        <p>
          <Text white>Ready to bring your ideas to life?</Text>{" "}
          <CallToAction white>Let's talk.</CallToAction>
        </p>
      </div>
      <div className="PageFooter-locations">
        <address>
          <Text small white>
            Braga, Portugal
          </Text>
        </address>
        <address>
          <Text small white>
            Boston, USA
          </Text>
        </address>
      </div>
      <div className="PageFooter-social">
        <Text small white>
          Follow us
        </Text>
        <SocialLinks />
      </div>
      <div className="PageFooter-legal">
        <p>
          <Text darkBlue small>
            Handcrafted by Subvisual © {new Date().getFullYear()}
          </Text>
        </p>
      </div>
    </div>
  </footer>
)

export default Footer
