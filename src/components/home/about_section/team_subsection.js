import React from "react"
import { StaticQuery, graphql } from "gatsby"

import Member from "./team_subsection/member"

import styles from "./team_subsection.module.css"

const teamQuery = graphql`
  query TeamQuery {
    allTeamMemberYaml {
      edges {
        node {
          id
          name
          role
          photo {
            horizontal {
              childImageSharp {
                fluid(maxWidth: 340, quality: 80) {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
            vertical {
              childImageSharp {
                fluid(maxWidth: 275, quality: 80) {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
          }
          social {
            behance
            dribbble
            linkedin
            medium
            github
            twitter
            web
          }
        }
      }
    }
  }
`

const TeamSubsection = ({ members }) => (
  <ul className={styles.root}>
    {members.map(data => (
      <li key={data.id}>
        <Member {...data} />
      </li>
    ))}
  </ul>
)

export default () => (
  <StaticQuery
    query={teamQuery}
    render={({ allTeamMemberYaml: { edges } }) => (
      <TeamSubsection members={edges.map(edge => edge.node)} />
    )}
  />
)
