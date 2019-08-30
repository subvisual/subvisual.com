import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import Link from "../../Link"
import Text from "../../Text"

import "./Location.module.css"

const Location = ({ align, geoUrl, image, mapsUrl, name }) => (
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
      <span styleName="mobile">
        <Link to={geoUrl} size="small" color="white" blank faded>
          Directions
        </Link>
      </span>
      <span styleName="desktop">
        <Link to={mapsUrl} size="small" color="white" blank faded>
          Directions
        </Link>
      </span>
    </div>
  </address>
)

Location.propTypes = {
  align: PropTypes.string,
  geoUrl: PropTypes.string.isRequired,
  image: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  mapsUrl: PropTypes.string.isRequired,
}

Location.defaultProps = {
  align: "left",
}

export default ({ align, geoUrl, image, mapsUrl, name }) => (
  <StaticQuery
    query={query}
    render={data => (
      <Location
        align={align}
        geoUrl={geoUrl}
        image={data[image]}
        mapsUrl={mapsUrl}
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
