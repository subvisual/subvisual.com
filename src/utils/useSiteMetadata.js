import { graphql, useStaticQuery } from "gatsby"
import _get from "lodash/get"

function useSiteMetadata() {
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

export default useSiteMetadata
