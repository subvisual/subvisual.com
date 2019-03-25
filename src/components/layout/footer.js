import React from "react"
import { Link } from "gatsby"

const Footer = () => (
  <footer>
    <address>Braga, Portugal</address>
    <address>Boston, USA</address>
    <Link to="#">Let's work together</Link>
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
    © {new Date().getFullYear()}
  </footer>
)

export default Footer
