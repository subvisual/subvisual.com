import _ from "lodash"
import React from "react"
import PropTypes from "prop-types"
import Img from "gatsby-image"

import SocialLink from "../../SocialLink"
import Text from "../../Text"

import "./Member.module.css"

const Member = ({ name, role, social, photo }) => (
  <div styleName="root">
    <Img styleName="photo" fluid={photo.childImageSharp.fluid} />
    <div styleName="info">
      <div styleName="name">
        <Text color="white" bold>
          {name}
        </Text>
      </div>
      <div styleName="role">
        <Text color="white">{role}</Text>
      </div>
    </div>
    <ul aria-label="Social Links" styleName="links">
      {_.map(social, (username, platform) => {
        if (!username) return null

        return (
          <li key={platform} styleName="link">
            <SocialLink
              username={username}
              platform={platform}
              key={platform}
            />
          </li>
        )
      })}
    </ul>
  </div>
)

Member.propTypes = {
  name: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  social: PropTypes.object.isRequired,
}

export default Member
