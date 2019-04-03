import React, { Component } from "react"
import { StaticQuery, graphql } from "gatsby"

import Planet from "../../../Planet"
import Venture from "./Venture"

import "./index.module.css"

const planets = [
  { color: "blue", size: { mobile: 56, desktop: 80 } },
  { color: "purple", size: { mobile: 112, desktop: 224 } },
  { color: "purple", size: { mobile: 56, desktop: 84 } },
  { color: "purple", size: { mobile: 168, desktop: 112 } },
  { color: "purple", size: { mobile: 112, desktop: 168 } },
]

class Portfolio extends Component {
  constructor() {
    super()
    this.state = { isDesktop: false }
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

  renderPlanet = ({ color, size }, index) => {
    const { isDesktop } = this.state
    const planetSize = isDesktop ? size.desktop : size.mobile

    return (
      <div key={index} styleName="planet">
        <Planet color={color} size={planetSize} hovering />
      </div>
    )
  }

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
        <div>{planets.map(this.renderPlanet)}</div>
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
