import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

import Planet from "../../planet"
import Venture from "./portfolio_subsection/venture"

import styles from "./portfolio_subsection.module.css"

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
          <Planet
            morph={planetMorph}
            codeName="venturesSubvisualPlanet"
            color="blue"
            hovering
          />
        </div>
        <div className={styles.planet}>
          <Planet codeName="venturesPlanet1" color="purple" hovering />
        </div>
        <div className={styles.planet}>
          <Planet codeName="venturesPlanet2" color="purple" hovering />
        </div>
        <div className={styles.planet}>
          <Planet codeName="venturesPlanet3" color="purple" hovering />
        </div>
        <div className={styles.planet}>
          <Planet codeName="venturesPlanet4" color="purple" hovering />
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
    allVenturesYaml {
      edges {
        node {
          name
          description
          url
          grey {
            childImageSharp {
              fluid(maxHeight: 452, quality: 95) {
                ...GatsbyImageSharpFluid_noBase64
              }
            }
          }
          color {
            childImageSharp {
              fluid(maxHeight: 452, quality: 95) {
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
    render={data => (
      <PortfolioSubsection
        planetMorph={planetMorph}
        ventures={data.allVenturesYaml.edges.map(edge => edge.node)}
      />
    )}
  />
)
