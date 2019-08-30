import _ from "lodash"
import React from "react"

import SocialLink from "../../SocialLink"

import "./SocialLinks.module.css"

const socialDetails = {
  medium: "https://medium.com/subvisual",
  behance: "https://www.behance.net/subvisual",
  github: "https://github.com/subvisual",
  dribbble: "https://dribbble.com/subvisual",
  linkedin:
    "https://www.linkedin.com/company/subvisual---handcrafters-of-digital-experiences/",
  facebook: "https://www.facebook.com/subvisual.co",
  twitter: "https://www.twitter.com/subvisual",
  instagram: "https://www.instagram.com/wearesubvisual",
}

const SocialLinks = () => (
  <ul styleName="root">
    {_.map(socialDetails, (url, platform) => (
      <li key={platform} styleName="item">
        <SocialLink
          name="Subvisual"
          platform={platform}
          url={url}
          size="small"
        />
      </li>
    ))}
  </ul>
)

export default SocialLinks
