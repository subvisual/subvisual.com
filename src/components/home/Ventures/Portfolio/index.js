import React, { Component } from "react"
import Img from "gatsby-image"
import { StaticQuery, graphql } from "gatsby"

import Planet from "../../../Planet"
import Text from "../../../Text"

import underscore from "../../../../utilities/underscore"
import "./index.module.css"

const planetSizes = {
  sioslife: 55,
  utrust: 112,
}

class Portfolio extends Component {
  constructor() {
    super()
    this.state = { isDesktop: false }
  }

  getPlanetSize(name) {
    const size = planetSizes[name]

    return this.state.isDesktop ? size * 2 : size
  }

  handleWindowResize = () => {
    const isDesktop = window.innerWidth >= 950

    this.setState({ isDesktop })
  }

  componentDidMount() {
    setTimeout(this.handleWindowResize, 200)
    window.addEventListener("resize", this.handleWindowResize)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowResize)
  }

  renderPlanet = ({ name }) => {
    const planetName = underscore(name)
    const planetSize = this.getPlanetSize(planetName)

    if (!planetSize) return null

    return (
      <div key={name} styleName={`planet ${planetName}`}>
        <Planet color="purple" size={planetSize} />
      </div>
    )
  }

  renderVenture = ({ name, description, color, grey }) => (
    <li styleName="item" key={name}>
      <div styleName="wrapper">
        <div styleName="photo">
          <Img
            {...color.childImageSharp}
            style={{ height: "100%" }}
            imgStyle={{ display: "block" }}
            alt={name}
          />
        </div>
        <div styleName="grey">
          <Img
            {...grey.childImageSharp}
            style={{ height: "100%" }}
            imgStyle={{ display: "block" }}
            alt={name}
          />
        </div>
      </div>
      <div styleName="name">
        <Text>{name}</Text>
      </div>
      <div styleName="description">
        <Text>{description}</Text>
      </div>
    </li>
  )

  render() {
    const { ventures } = this.props

    return (
      <div styleName="root">
        <ul styleName="ventures">{ventures.map(this.renderVenture)}</ul>
        {ventures.map(this.renderPlanet)}
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
