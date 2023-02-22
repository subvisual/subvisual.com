import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import Link from "~/src/components/link"

import * as styles from "./index.module.scss"

export default () => {
  const { logo, feder020919, fse000130 } = useStaticQuery(query)

  return (
    <div>
      <div className={styles.image}>
        <GatsbyImage alt="" image={logo.childImageSharp.gatsbyImageData} />
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
}

const query = graphql`
  {
    logo: file(relativePath: { regex: "/norte-2020-logos.jpg/" }) {
      childImageSharp {
        gatsbyImageData(
          width: 650
          quality: 100
          placeholder: NONE
          layout: CONSTRAINED
        )
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

// const Norte2020 = () => <StaticQuery query={query} render={render} />

// export default Norte2020
