import React from "react"
import { StaticQuery, graphql } from "gatsby"

import Member from "./Member"

import "./index.module.css"

const Team = ({ members }) => (
  <ul styleName="root">
    {members.map((data, index) => (
      <li key={index} styleName="member">
        <Member {...data} />
      </li>
    ))}
  </ul>
)

export default () => (
  <StaticQuery
    query={teamQuery}
    render={({ allTeamYaml: { edges: team } }) => (
      <Team members={team.map(m => m.node)} />
    )}
  />
)

const teamQuery = graphql`
  query TeamQuery {
    allTeamYaml {
      edges {
        node {
          name
          role
          photo {
            childImageSharp {
              fluid(maxWidth: 320, quality: 100) {
                ...GatsbyImageSharpFluid_noBase64
              }
            }
          }
          social {
            twitter
            github
            dribbble
          }
        }
      }
    }
  }
`
