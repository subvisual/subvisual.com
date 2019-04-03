import React from "react"
import PropTypes from "prop-types"
import Img from "gatsby-image"

import Text from "../../../Text"

import "./Venture.module.css"

const Venture = ({ color, description, featured, grey, name, url }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    styleName={`root ${featured ? "featured" : ""}`}
  >
    <div styleName="wrapper">
      <div styleName="photo">
        <Img
          {...color.childImageSharp}
          style={{ height: "100%" }}
          imgStyle={{ display: "block" }}
          alt={name}
        />
      </div>
      <div styleName="grey">
        <Img
          {...grey.childImageSharp}
          style={{ height: "100%" }}
          imgStyle={{ display: "block" }}
          alt={name}
        />
      </div>
    </div>
    <div styleName="info">
      <Text>{name}</Text>
      <br />
      <Text>{description}</Text>
    </div>
  </a>
)

Venture.propTypes = {
  color: PropTypes.object.isRequired,
  featured: PropTypes.bool,
  description: PropTypes.string.isRequired,
  grey: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
}

Venture.defaultProps = {
  featured: false,
}

export default Venture
