import React from "react"

import Link from "../../Link"
import "./SocialLinks.module.css"

const SocialLinks = () => (
  <ul styleName="root">
    <li styleName="item">
      <Link to="#" size="small" title="Medium">
        Md
      </Link>
    </li>
    <li styleName="item">
      <Link to="#" size="small" title="Behance">
        Be
      </Link>
    </li>
    <li styleName="item">
      <Link to="#" size="small" title="GitHub">
        Git
      </Link>
    </li>
    <li styleName="item">
      <Link to="#" size="small" title="Dribbble">
        Dri
      </Link>
    </li>
    <li styleName="item">
      <Link to="#" size="small" title="Facebook">
        Fb
      </Link>
    </li>
    <li styleName="item">
      <Link to="#" size="small" title="Twitter">
        Tw
      </Link>
    </li>
    <li styleName="item">
      <Link to="#" size="small" title="Instagram">
        In
      </Link>
    </li>
  </ul>
)

export default SocialLinks
