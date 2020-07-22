import React from "react"
import { StaticQuery, graphql } from "gatsby"

import Member from "./TeamSubsection/Member"

import styles from "./TeamSubsection.module.css"

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
    {members.map((data) => (
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
      <TeamSubsection members={edges.map((edge) => edge.node)} />
    )}
  />
)
