import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import Link from "~/src/components/link"

import * as styles from "./index.module.scss"

const render = ({ logo, feder020919, fse000130 }) => (
  <div>
    <div className={styles.image}>
      <Img fadeIn fluid={logo.childImageSharp.fluid} />
    </div>
    <ol className={styles.links}>
      <li className={styles.link}>
        <Link
          to={feder020919.publicURL}
          download={feder020919.base}
          size="small"
          blank
        >
          NORTE-02-0752-FEDER-020919
        </Link>
      </li>
      <li className={styles.link}>
        <Link
          to={fse000130.publicURL}
          download={fse000130.base}
          size="small"
          blank
        >
          NORTE-06-3559-FSE-000130
        </Link>
      </li>
    </ol>
  </div>
)

const query = graphql`
  {
    logo: file(relativePath: { regex: "/norte-2020-logos.jpg/" }) {
      childImageSharp {
        fluid(maxWidth: 650, quality: 100) {
          ...GatsbyImageSharpFluid_withWebp_noBase64
        }
      }
    }
    feder020919: file(
      relativePath: { regex: "/NORTE-02-0752-FEDER-020919.pdf$/" }
    ) {
      base
      publicURL
    }
    fse000130: file(
      relativePath: { regex: "/NORTE-06-3559-FSE-000130.pdf$/" }
    ) {
      base
      publicURL
    }
  }
`

const Norte2020 = () => <StaticQuery query={query} render={render} />

export default Norte2020
