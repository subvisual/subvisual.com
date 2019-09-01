import React from "react"
import PropTypes from "prop-types"
import Img from "gatsby-image"

import LoadPlaceholder from "../../../load_placeholder"
import Text from "../../../text"

import "./venture.module.css"

const Venture = ({ color, delay, description, featured, grey, name, url }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    styleName={`root ${featured ? "featured" : ""}`}
  >
    <div styleName="wrapper">
      <div styleName="photo">
        <LoadPlaceholder delay={delay} dark>
          {onLoad => (
            <Img
              fadeIn={false}
              onLoad={onLoad}
              {...color.childImageSharp}
              style={{ height: "100%" }}
              imgStyle={{ display: "block" }}
              alt={name}
            />
          )}
        </LoadPlaceholder>
      </div>
      <div styleName="grey">
        <LoadPlaceholder delay={delay} dark>
          {onLoad => (
            <Img
              {...grey.childImageSharp}
              fadeIn={false}
              onLoad={onLoad}
              style={{ height: "100%" }}
              imgStyle={{ display: "block" }}
              alt={name}
            />
          )}
        </LoadPlaceholder>
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
  delay: PropTypes.number,
  featured: PropTypes.bool,
  description: PropTypes.string.isRequired,
  grey: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
}

Venture.defaultProps = {
  delay: 0,
  featured: false,
}

export default Venture
