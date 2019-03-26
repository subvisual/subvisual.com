import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

import Header from "./header"
import Footer from "./footer"
import "./index.css"

const render = children => data => (
  <>
    <Header siteTitle={data.site.siteMetadata.title} />
    <main>{children}</main>
    <Footer />
  </>
)

const Layout = ({ children }) => (
  <StaticQuery query={siteTitleQuery} render={render(children)} />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

const siteTitleQuery = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
