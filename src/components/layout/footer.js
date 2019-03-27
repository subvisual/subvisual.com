import React from "react"
import { Link } from "gatsby"

import CallToAction from "../call_to_action"
import Logo from "../logo"
import Text from "../Text"
import "./footer.css"

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
        <ul>
          <li>
            <Link to="#">Medium</Link>
          </li>
          <li>
            <Link to="#">GitHub</Link>
          </li>
          <li>
            <Link to="#">Dribbble</Link>
          </li>
          <li>
            <Link to="#">Behance</Link>
          </li>
          <li>
            <Link to="#">Twitter</Link>
          </li>
          <li>
            <Link to="#">Facebook</Link>
          </li>
          <li>
            <Link to="#">Instagram</Link>
          </li>
        </ul>
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
