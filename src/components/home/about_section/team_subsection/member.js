import React from "react"
import PropTypes from "prop-types"
import Img from "gatsby-image"
import _ from "lodash"
import classNames from "classnames"

import SocialLink from "../../../SocialLink"
import Text from "../../../text"

import styles from "./member.module.css"

const Member = ({ name, role, social, photo }) => (
  <div className={styles.root}>
    <div className={classNames(styles.photo, styles.horizontal)}>
      <Img fadeIn fluid={photo.horizontal.childImageSharp.fluid} />
    </div>
    <div className={classNames(styles.photo, styles.vertical)}>
      <Img fadeIn fluid={photo.vertical.childImageSharp.fluid} />
    </div>
    <div className={styles.info}>
      <div className={styles.name}>
        <Text color="white" bold>
          {name}
        </Text>
      </div>
      <div className={styles.role}>
        <Text color="white">{role}</Text>
      </div>
    </div>
    <ul aria-label="Social Links" className={styles.links}>
      {_.map(social, (url, platform) => {
        if (!url) return null

        return (
          <li key={platform} className={styles.link}>
            <SocialLink name={name} platform={platform} url={url} />
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
