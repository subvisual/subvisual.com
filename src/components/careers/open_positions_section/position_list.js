import React from "react"
import { StaticQuery, graphql } from "gatsby"

import Position from "./position_list/position"

import styles from "./position_list.module.css"
import Text from "../../text"

const teamQuery = graphql`
  query PositionQuery {
    allPositionYaml {
      edges {
        node {
          id
          company
          logo {
            publicURL
          }
          about
          role
          location
        }
      }
    }
  }
`

const PositionList = ({ members }) => {
  if (members.length) {
    return (
      <ul className={styles.root}>
        {members.map((data) => (
          <li key={data.id}>
            <Position {...data} />
          </li>
        ))}
      </ul>
    )
  }

  return <Text as="p">No open positions at the moment.</Text>
}

export default () => (
  <StaticQuery
    query={teamQuery}
    render={({ allPositionYaml: { edges } }) => (
      <PositionList members={edges.map((edge) => edge.node)} />
    )}
  />
)
