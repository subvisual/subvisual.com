import React from "react"
import Img from "gatsby-image"
import { StaticQuery, graphql } from "gatsby"

import "./index.module.css"

const TeamPhotos = props => {
  console.log(props)
  return (
    <ul styleName="root">
      {props.ventures.map(({ name, description, cover }) => (
        <li styleName="item" key={name}>
          <Img
            {...cover.childImageSharp}
            imgStyle={{ display: "block" }}
            alt={name}
          />
          <div styleName="details">
            {name}
            <br /> {description}
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
    render={data => {
      console.log(data)
      return (
        <TeamPhotos ventures={data.allVenturesYaml.edges.map(e => e.node)} />
      )
    }}
  />
)
