import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import Link from "../../link"
import Text from "../../text"

import styles from "./location.module.css"

const query = graphql`
  query {
    boston: file(relativePath: { regex: "/boston.jpg/" }) {
      childImageSharp {
        fluid(maxWidth: 725, quality: 85) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    braga: file(relativePath: { regex: "/braga.jpg/" }) {
      childImageSharp {
        fluid(maxWidth: 725, quality: 85) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`

const Location = ({ align, geoUrl, image, mapsUrl, name }) => (
  <address className={styles.root}>
    <div className={styles.image}>
      <Img fluid={image.childImageSharp.fluid} />
    </div>
    <div className={[styles.info, styles[align]].join(" ")}>
      <span className={styles.name}>
        <Text size="small">{name}</Text>
      </span>
      <span className={styles.mobile}>
        <Link to={geoUrl} size="small" blank faded>
          Directions
        </Link>
      </span>
      <span className={styles.desktop}>
        <Link to={mapsUrl} size="small" blank faded>
          Directions
        </Link>
      </span>
    </div>
  </address>
)

Location.propTypes = {
  align: PropTypes.string.isRequired,
  geoUrl: PropTypes.string.isRequired,
  image: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  mapsUrl: PropTypes.string.isRequired,
}

export default ({ align, geoUrl, image, mapsUrl, name }) => (
  <StaticQuery
    query={query}
    render={(data) => (
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
