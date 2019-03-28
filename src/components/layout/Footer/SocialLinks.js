import _ from "lodash"
import React from "react"

import SocialLink from "../../SocialLink"

import "./SocialLinks.module.css"

const socialDetails = {
  medium: "subvisual",
  behance: "subvisual",
  github: "subvisual",
  dribbble: "subvisual",
  facebook: "subvisual.co",
  instagram: "wearesubvisual",
}

const SocialLinks = () => (
  <ul styleName="root">
    {_.map(socialDetails, (username, platform) => (
      <li key={platform} styleName="item">
        <SocialLink platform={platform} username={username} size="small" />
      </li>
    ))}
  </ul>
)

export default SocialLinks
