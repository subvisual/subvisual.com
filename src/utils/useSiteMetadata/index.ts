import { graphql, useStaticQuery } from "gatsby"
import _get from "lodash/get"

import { SiteMetadata } from "./types"

export default () : SiteMetadata => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          description
          image
          siteUrl
          title
          twitter {
            creator
          }
        }
      }
    }
  `)

  return _get(data, "site.siteMetadata")
}
