import React from "react"
import PropTypes from "prop-types"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import Link from "~/src/components/link"
import Text from "~/src/components/text"

import * as styles from "./location.module.css"

const query = graphql`
  {
    boston: file(relativePath: { regex: "/boston.jpg/" }) {
      childImageSharp {
        gatsbyImageData(
          width: 725
          quality: 85
          placeholder: NONE
          layout: CONSTRAINED
        )
      }
    }
    braga: file(relativePath: { regex: "/braga.jpg/" }) {
      childImageSharp {
        gatsbyImageData(
          width: 725
          quality: 85
          placeholder: NONE
          layout: CONSTRAINED
        )
      }
    }
  }
`

export default ({ align, geoUrl, image, mapsUrl, name }) => {
  const data = useStaticQuery(query)

  return (
    <address>
      <div className={styles.image}>
        <GatsbyImage
          alt=""
          image={data[image].childImageSharp.gatsbyImageData}
        />
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
}

Location.propTypes = {
  align: PropTypes.string.isRequired,
  geoUrl: PropTypes.string.isRequired,
  image: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  mapsUrl: PropTypes.string.isRequired,
}

// export default ({ align, geoUrl, image, mapsUrl, name }) => (
//   <StaticQuery
//     query={query}
//     render={(data) => (
//       <Location
//         align={align}
//         geoUrl={geoUrl}
//         image={data[image]}
//         mapsUrl={mapsUrl}
//         name={name}
//       />
//     )}
//   />
// )
