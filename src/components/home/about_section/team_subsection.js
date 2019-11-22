import React from "react"
import { StaticQuery, graphql } from "gatsby"

import Member from "./team_subsection/member"

import styles from "./team_subsection.module.css"

const TeamSubsection = ({ members }) => (
  <ul className={styles.root}>
    {members.map((data, index) => (
      <li key={index}>
        <Member {...data} />
      </li>
    ))}
  </ul>
)

export default () => (
  <StaticQuery
    query={teamQuery}
    render={({ allTeamYaml: { edges: team } }) => (
      <TeamSubsection members={team.map(m => m.node)} />
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
            horizontal {
              childImageSharp {
                fluid(maxWidth: 320, quality: 100) {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
            vertical {
              childImageSharp {
                fluid(maxWidth: 320, quality: 100) {
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
