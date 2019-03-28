import _ from "lodash"
import Img from "gatsby-image"
import React from "react"

import { StaticQuery, graphql } from "gatsby"

import "./index.module.css"

const socialDetails = (platform, username) => {
  switch (platform) {
    case "twitter":
      return {
        linkName: "Twitter",
        linkShortname: "Tw",
        url: `https://twitter.com/${username}`,
      }
    case "dribbble":
      return {
        linkName: "Dribble",
        linkShortname: "Dri",
        url: `https://dribbble.com/${username}`,
      }
    case "github":
      return {
        linkName: "Github",
        linkShortname: "Git",
        url: `https://github.com/${username}`,
      }
    default:
      return {
        linkName: "Other",
        linkShortname: "Other",
        url: "https://subvisual.co",
      }
  }
}

const Team = props => {
  return (
    <ul styleName="root">
      {props.members.map(({ name, role, social, photo }, index) => (
        <li styleName="member" key={index}>
          <Img styleName="photo" fluid={photo.childImageSharp.fluid} />
          <div styleName="name">
            <span styleName="bold">{name}</span> <br />
            {role}
          </div>
          <ul aria-label="Social Links" styleName="links">
            {_.map(social, (name, platform) => {
              const { linkName, linkShortname, url } = socialDetails(
                platform,
                name
              )

              return (
                <li styleName="link" key={platform}>
                  <a target="_blank" href={url}>
                    <span className="visuallyHidden">{linkName}</span>
                    <span aria-hidden="true">{linkShortname}</span>
                  </a>
                </li>
              )
            })}
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
