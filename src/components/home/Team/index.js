import _ from "lodash"
import Img from "gatsby-image"
import React from "react"

import { StaticQuery, graphql } from "gatsby"

import "./index.module.css"

const socialLink = (platform, username) => {
  switch (platform) {
    case "twitter":
      return `https://twitter.com/${username}`
    default:
      return "https://subvisual.co"
  }
}

const Team = props => {
  return (
    <ul styleName="root">
      {props.members.map(({ name, role, social, photo }) => (
        <li styleName="member" key={name}>
          <Img styleName="photo" fluid={photo.childImageSharp.fluid} />
          <div styleName="name">
            <span styleName="bold">{name}</span> <br />
            {role}
          </div>
          <ul styleName="links">
            {_.map(social, (name, platform) => (
              <li styleName="link" key={platform}>
                <a target="_blank" href={socialLink(platform, name)}>
                  link
                </a>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  )
}

export default () => (
  <StaticQuery
    query={teamQuery}
    render={({ allTeamYaml: { edges: team } }) => {
      return <Team members={team.map(m => m.node)} />
    }}
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
