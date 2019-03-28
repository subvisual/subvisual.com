import React from "react"

import Link from "../../Link"

import "./SocialLinks.module.css"

const socialDetails = [
  {
    name: "Medium",
    label: "Md",
    url: "#",
  },
  {
    name: "Behance",
    label: "Be",
    url: "#",
  },
  {
    name: "GitHub",
    label: "Git",
    url: "#",
  },
  {
    name: "Dribbble",
    label: "Dri",
    url: "#",
  },
  {
    name: "Facebook",
    label: "Fb",
    url: "#",
  },
  {
    name: "Twitter",
    label: "Tw",
    url: "#",
  },
  {
    name: "Instagram",
    label: "In",
    url: "#",
  },
]

const SocialLink = ({ name, label, url }) => (
  <li key={name} styleName="item">
    <Link to={url} title={name} size="small" color="white" faded>
      {label}
    </Link>
  </li>
)

const SocialLinks = () => (
  <ul styleName="root">{socialDetails.map(SocialLink)}</ul>
)

export default SocialLinks
