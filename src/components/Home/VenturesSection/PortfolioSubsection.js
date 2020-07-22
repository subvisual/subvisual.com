import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

import Planet from "src/components/planet"
import Venture from "./PortfolioSubsection/Venture"

import styles from "./PortfolioSubsection.module.css"

const baseDelay = 0.3

const PortfolioSubsection = ({ planetMorph, ventures }) => {
  const renderVenture = (props, index) => {
    const { name } = props
    const featured = index === 0

    return (
      <li key={name} className={styles.item}>
        <Venture
          delay={baseDelay + index * 0.2}
          featured={featured}
          {...props}
        />
      </li>
    )
  }

  return (
    <div className={styles.root}>
      <ul className={styles.ventures}>{ventures.map(renderVenture)}</ul>
      <div>
        <div className={styles.planet}>
          <Planet morph={planetMorph} color="blue" hovering />
        </div>
        <div className={styles.planet}>
          <Planet color="purple" hovering />
        </div>
        <div className={styles.planet}>
          <Planet color="purple" hovering />
        </div>
        <div className={styles.planet}>
          <Planet color="purple" hovering />
        </div>
        <div className={styles.planet}>
          <Planet color="purple" hovering />
        </div>
      </div>
    </div>
  )
}

PortfolioSubsection.propTypes = {
  planetMorph: PropTypes.func,
}

PortfolioSubsection.defaultProps = {
  planetMorph: () => {},
}

const query = graphql`
  query {
    allVentureYaml {
      edges {
        node {
          name
          description
          url
          image {
            childImageSharp {
              fluid(maxHeight: 720, quality: 85) {
                ...GatsbyImageSharpFluid_noBase64
              }
            }
          }
        }
      }
    }
  }
`

export default ({ planetMorph }) => (
  <StaticQuery
    query={query}
    render={(data) => (
      <PortfolioSubsection
        planetMorph={planetMorph}
        ventures={data.allVentureYaml.edges.map((edge) => edge.node)}
      />
    )}
  />
)
