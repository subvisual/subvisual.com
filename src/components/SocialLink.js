import React from "react"
import PropTypes from "prop-types"

import Link from "./Link"

const socialPlatforms = {
  behance: {
    name: "Behance",
    label: "Be",
    url: "https://www.behance.net/%s",
  },
  dribbble: {
    name: "Dribble",
    label: "Dri",
    url: "https://dribbble.com/%s",
  },
  facebook: {
    name: "Facebook",
    label: "Fb",
    url: "https://www.facebook.com/%s",
  },
  github: {
    name: "Github",
    label: "Git",
    url: "https://github.com/%s",
  },
  instagram: {
    name: "Instagram",
    label: "In",
    url: "https://www.instagram.com/%s/",
  },
  medium: {
    name: "Medium",
    label: "Md",
    url: "https://medium.com/%s",
  },
  twitter: {
    name: "Twitter",
    label: "Tw",
    url: "https://twitter.com/%s",
  },
}

const SocialLink = ({ platform, size, username }) => {
  const info = socialPlatforms[platform]

  if (!username || !info) return null

  const { label, name, url } = info

  return (
    <Link
      to={url.replace("%s", username)}
      title={`${username} on ${name}`}
      size={size}
      color="white"
      blank
      faded
    >
      <span aria-hidden="true">{label}</span>
    </Link>
  )
}

SocialLink.propTypes = {
  platform: PropTypes.string.isRequired,
  size: PropTypes.string,
  username: PropTypes.string,
}

SocialLink.defaultProps = {
  size: "regular",
}

export default SocialLink
