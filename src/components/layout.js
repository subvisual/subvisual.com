import React from "react"
import PropTypes from "prop-types"
import { Link, StaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Header siteTitle={data.site.siteMetadata.title} />
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `0px 1.0875rem 1.45rem`,
            paddingTop: 0,
          }}
        >
          <main>{children}</main>
          <footer>
            <strong>Braga, Portugal</strong>
            <strong>Boston, USA</strong>
            <Link to="#">Let's work together</Link>
            <h3>Follow us</h3>
            <ul>
              <li>
                <Link to="#">Medium</Link>
              </li>
              <li>
                <Link to="#">GitHub</Link>
              </li>
              <li>
                <Link to="#">Dribbble</Link>
              </li>
              <li>
                <Link to="#">Behance</Link>
              </li>
              <li>
                <Link to="#">Twitter</Link>
              </li>
              <li>
                <Link to="#">Facebook</Link>
              </li>
              <li>
                <Link to="#">Instagram</Link>
              </li>
            </ul>
            © {new Date().getFullYear()}
          </footer>
        </div>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
