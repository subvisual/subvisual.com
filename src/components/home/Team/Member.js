import _ from "lodash"
import React from "react"
import PropTypes from "prop-types"
import Img from "gatsby-image"

import SocialLink from "../../SocialLink"
import Text from "../../Text"

import "./Member.module.css"

const Member = ({ name, role, social, photo }) => (
  <div styleName="root">
    <div styleName="photo horizontal">
      <Img fluid={photo.horizontal.childImageSharp.fluid} />
    </div>
    <div styleName="photo vertical">
      <Img fluid={photo.vertical.childImageSharp.fluid} />
    </div>
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
  photo: PropTypes.shape({
    horizontal: PropTypes.object.isRequired,
    vertical: PropTypes.object.isRequired,
  }).isRequired,
  role: PropTypes.string.isRequired,
  social: PropTypes.object,
}

export default Member
