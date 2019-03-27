import React from "react"
import { Link } from "gatsby"

import "./SocialLinks.css"

const SocialLinks = () => (
  <ul className="SocialLinks">
    <li className="SocialLinks-item">
      <Link to="#">Medium</Link>
    </li>
    <li className="SocialLinks-item">
      <Link to="#">GitHub</Link>
    </li>
    <li className="SocialLinks-item">
      <Link to="#">Dribbble</Link>
    </li>
    <li className="SocialLinks-item">
      <Link to="#">Behance</Link>
    </li>
    <li className="SocialLinks-item">
      <Link to="#">Twitter</Link>
    </li>
    <li className="SocialLinks-item">
      <Link to="#">Facebook</Link>
    </li>
    <li className="SocialLinks-item">
      <Link to="#">Instagram</Link>
    </li>
  </ul>
)

export default SocialLinks
