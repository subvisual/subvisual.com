import React from "react"
import { StaticQuery, graphql } from "gatsby"

const renderTeamMember = ({ node: { name, role } }, index) => (
  <div key={index}>
    <p>{name}</p>
    <p>{role}</p>
  </div>
)

const Team = () => (
  <StaticQuery
    query={teamQuery}
    render={({ allTeamYaml: { edges: team } }) => team.map(renderTeamMember)}
  />
)

export default Team

const teamQuery = graphql`
  query TeamQuery {
    allTeamYaml {
      edges {
        node {
          name
          role
        }
      }
    }
  }
`
