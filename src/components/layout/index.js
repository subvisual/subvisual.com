import "intersection-observer"
import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"

import Header from "./Header"
import Footer from "./Footer"

import "./index.module.css"

const Layout = ({ children }) => (
  <div styleName="root">
    <Helmet>
      <link rel="stylesheet" href="https://use.typekit.net/bcx8qfd.css" />
    </Helmet>
    <Header />
    <main>{children}</main>
    <Footer />
  </div>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
