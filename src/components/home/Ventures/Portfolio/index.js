import React from "react"
import Img from "gatsby-image"
import { StaticQuery, graphql } from "gatsby"

import Text from "../../../Text"

import "./index.module.css"

const Portfolio = props => {
  return (
    <ul styleName="root">
      {props.ventures.map(({ name, description, cover }) => (
        <li styleName="item" key={name}>
          <div styleName="photo">
            <Img
              {...cover.childImageSharp}
              imgStyle={{ display: "block" }}
              alt={name}
            />
          </div>
          <div styleName="name">
            <Text>{name}</Text>
          </div>
          <div styleName="description">
            <Text>{description}</Text>
          </div>
        </li>
      ))}
    </ul>
  )
}

const query = graphql`
  query {
    allVenturesYaml {
      edges {
        node {
          name
          description
          cover {
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
