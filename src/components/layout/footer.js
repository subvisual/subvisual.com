import React from "react"
import { Link } from "gatsby"

import Logo from "../logo"
import "./footer.css"

const Footer = () => (
  <footer className="PageFooter">
    <div className="PageFooter-content">
      <div className="PageFooter-logo">
        <Logo white />
      </div>
      <div className="PageFooter-callToAction">
        <p>
          Ready to bring your ideas to life? <Link to="#">Let's talk.</Link>
        </p>
      </div>
      <div className="PageFooter-locations">
        <address>Braga, Portugal</address>
        <address>Boston, USA</address>
      </div>
      <div className="PageFooter-social">
        <h3>Follow us</h3>
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
        <p>Handcrafted by Subvisual © {new Date().getFullYear()}</p>
      </div>
    </div>
  </footer>
)

export default Footer
