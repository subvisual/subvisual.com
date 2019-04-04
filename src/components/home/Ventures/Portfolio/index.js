import React, { Component } from "react"
import { StaticQuery, graphql } from "gatsby"

import Planet from "../../../Planet"
import Venture from "./Venture"

import "./index.module.css"

class Portfolio extends Component {
  renderVenture = (props, index) => {
    const { name } = props
    const baseDelay = 0.3
    const featured = index === 0

    return (
      <li key={name} styleName="item">
        <Venture
          delay={baseDelay + index * 0.2}
          featured={featured}
          {...props}
        />
      </li>
    )
  }

  render() {
    const { ventures } = this.props

    return (
      <div styleName="root">
        <ul styleName="ventures">{ventures.map(this.renderVenture)}</ul>
        <div>
          <div styleName="planet">
            <Planet codeName="venturesSubvisualPlanet" color="blue" hovering />
          </div>
          <div styleName="planet">
            <Planet codeName="venturesPlanet1" color="purple" hovering />
          </div>
          <div styleName="planet">
            <Planet codeName="venturesPlanet2" color="purple" hovering />
          </div>
          <div styleName="planet">
            <Planet codeName="venturesPlanet3" color="purple" hovering />
          </div>
          <div styleName="planet">
            <Planet codeName="venturesPlanet4" color="purple" hovering />
          </div>
        </div>
      </div>
    )
  }
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
              fluid(maxHeight: 452, quality: 100) {
                ...GatsbyImageSharpFluid_noBase64
              }
            }
          }
          color {
            childImageSharp {
              fluid(maxHeight: 452, quality: 100) {
                ...GatsbyImageSharpFluid_noBase64
              }
            }
          }
        }
      }
    }
  }
`

export default () => (
  <StaticQuery
    query={query}
    render={data => (
      <Portfolio ventures={data.allVenturesYaml.edges.map(e => e.node)} />
    )}
  />
)
