import React from "react"
import { StaticQuery, graphql } from "gatsby"

import Member from "./team_subsection/member"

import styles from "./team_subsection.module.css"

const teamQuery = graphql`
  query TeamQuery {
    allTeamYaml {
      edges {
        node {
          id
          name
          role
          photo {
            horizontal {
              childImageSharp {
                fluid(maxWidth: 320, quality: 85) {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
            vertical {
              childImageSharp {
                fluid(maxWidth: 320, quality: 85) {
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
    render={({ allTeamYaml: { edges } }) => (
      <TeamSubsection members={edges.map(edge => edge.node)} />
    )}
  />
)
