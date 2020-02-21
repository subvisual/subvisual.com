import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"

import Logo from "./logo"
import Header from "./layout/header"
import Footer from "./layout/footer"

import styles from "./layout.module.css"

const Layout = ({ children, renderHeaderLogo }) => (
  <div className={styles.root}>
    <Helmet>
      <link rel="stylesheet" href="https://use.typekit.net/bcx8qfd.css" />
    </Helmet>
    <Header renderLogo={renderHeaderLogo} />
    <main>{children}</main>
    <Footer />
  </div>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  renderHeaderLogo: PropTypes.func,
}

Layout.defaultProps = {
  renderHeaderLogo: () => <Logo />,
}

export default Layout
