import React from "react"
import PropTypes from "prop-types"
import Img from "gatsby-image"

import SocialLink from "../../../SocialLink"
import Text from "../../../text"

import styles from "./member.module.css"

const Member = ({ name, role, social, photo }) => (
  <div className={styles.root}>
    <Img
      fadeIn
      fluid={[
        {
          ...photo.horizontal.childImageSharp.fluid,
          aspectRatio: 1.6666666667,
          media: "(max-width: 767px)",
        },
        {
          ...photo.vertical.childImageSharp.fluid,
          aspectRatio: 0.85625,
          media: "(min-width: 768px)",
        },
      ]}
    />
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
      {Object.keys(social).map(platform => {
        if (!social[platform]) return null

        return (
          <li key={platform} className={styles.link}>
            <SocialLink
              name={name}
              platform={platform}
              url={social[platform]}
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
