import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import Link from "../../Link"
import Text from "../../Text"

import "./Location.module.css"

const Location = ({ align, directions, image, name }) => (
  <address styleName="root">
    <div styleName="image">
      <Img fluid={image.childImageSharp.fluid} />
    </div>
    <div styleName={`info ${align}`}>
      <span styleName="name">
        <Text size="small" color="white">
          {name}
        </Text>
      </span>
      <Link to={directions} size="small" color="white" faded>
        Directions
      </Link>
    </div>
  </address>
)

Location.propTypes = {
  align: PropTypes.string,
  directions: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

Location.defaultProps = {
  align: "left",
}

export default ({ align, directions, image, name }) => (
  <StaticQuery
    query={query}
    render={data => (
      <Location
        align={align}
        directions={directions}
        image={data[image]}
        name={name}
      />
    )}
  />
)

const query = graphql`
  query {
    boston: file(relativePath: { regex: "/boston.jpg/" }) {
      childImageSharp {
        fluid(maxWidth: 578, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    braga: file(relativePath: { regex: "/braga.jpg/" }) {
      childImageSharp {
        fluid(maxWidth: 578, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`
