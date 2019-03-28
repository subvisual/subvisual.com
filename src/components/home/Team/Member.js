import _ from "lodash"
import React from "react"
import Img from "gatsby-image"

import SocialLink from "../../SocialLink"

import "./Member.module.css"

const Member = ({ name, role, social, photo }) => (
  <li styleName="root">
    <Img styleName="photo" fluid={photo.childImageSharp.fluid} />
    <div styleName="name">
      <span styleName="bold">{name}</span>
      <br />
      {role}
    </div>
    <ul aria-label="Social Links" styleName="links">
      {_.map(social, (username, platform) => (
        <li key={platform} styleName="link">
          <SocialLink username={username} platform={platform} key={platform} />
        </li>
      ))}
    </ul>
  </li>
)

export default Member
