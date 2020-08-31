import React from "react"
import PropTypes from "prop-types"
import Img from "gatsby-image"

import SocialLink from "~/src/components/SocialLink"
import Text from "~/src/components/text"

import styles from "./member.module.css"

const Member = ({ name, role, social, photo }) => {
  return (
    <div className={styles.root}>
      <Img
        className={styles.aspectRatioHack}
        fadeIn
        fluid={[
          {
            ...photo.horizontal.childImageSharp.fluid,
            media: "only screen and (max-width: 768px)",
          },
          {
            ...photo.vertical.childImageSharp.fluid,
            media: "only screen and (min-width: 768px)",
          },
        ]}
      />
      <div className={styles.info}>
        <div className={styles.name}>
          <Text bold>{name}</Text>
        </div>
        <div className={styles.role}>
          <Text>{role}</Text>
        </div>
      </div>
      <ul aria-label="Social Links" className={styles.links}>
        {Object.keys(social).map((platform) => {
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
}

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
