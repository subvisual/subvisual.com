import React, { Component } from "react"
import { StaticQuery, graphql } from "gatsby"

import Planet from "../../../Planet"
import Venture from "./Venture"

import "./index.module.css"

const planetSizes = [
  { mobile: 112, desktop: 224 },
  { mobile: 56, desktop: 84 },
  { mobile: 168, desktop: 112 },
  { mobile: 112, desktop: 168 },
]

class Portfolio extends Component {
  constructor() {
    super()
    this.state = { isDesktop: false }
  }

  getPlanetSize(index) {
    const { isDesktop } = this.state
    const size = planetSizes[index]

    if (!size) return

    return isDesktop ? size.desktop : size.mobile
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

  renderPlanet = ({ name }, index) => {
    const planetSize = this.getPlanetSize(index)

    if (!planetSize) return null

    return (
      <div key={name} styleName="planet">
        <Planet color="purple" size={planetSize} />
      </div>
    )
  }

  renderVenture = (props, index) => {
    const { name } = props
    const featured = index === 0

    return (
      <li key={name} styleName="item">
        <Venture featured={featured} {...props} />
      </li>
    )
  }

  render() {
    const { ventures } = this.props

    return (
      <div styleName="root">
        <ul styleName="ventures">{ventures.map(this.renderVenture)}</ul>
        <div>{ventures.map(this.renderPlanet)}</div>
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
