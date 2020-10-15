import React from "react"
import PropTypes from "prop-types"

import Link from "./link"

const socialPlatforms = {
  behance: {
    name: "Behance",
    label: "Be",
  },
  dribbble: {
    name: "Dribble",
    label: "Dri",
  },
  facebook: {
    name: "Facebook",
    label: "Fb",
  },
  github: {
    name: "GitHub",
    label: "Gh",
  },
  instagram: {
    name: "Instagram",
    label: "Ins",
  },
  linkedin: {
    name: "LinkedIn",
    label: "In",
  },
  medium: {
    name: "Medium",
    label: "Md",
  },
  twitter: {
    name: "Twitter",
    label: "Tw",
  },
  web: {
    name: "Website",
    label: "Web",
  },
}

const SocialLink = ({ name: userName, platform, size, url }) => {
  const { label, name: platformName } = socialPlatforms[platform]

  return (
    <Link
      to={url}
      title={`${userName} on ${platformName}`}
      size={size}
      blank
      faded
    >
      <span aria-hidden="true">{label}</span>
    </Link>
  )
}

SocialLink.propTypes = {
  name: PropTypes.string.isRequired,
  platform: PropTypes.string.isRequired,
  size: PropTypes.string,
  url: PropTypes.string.isRequired,
}

SocialLink.defaultProps = {
  size: "regular",
}

export default SocialLink
