import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"

import Logo from "./Logo"
import Header from "./Layout/Header"
import Footer from "./Layout/Footer"

import styles from "./Layout.module.css"

const Layout = ({ children, currentPath, renderHeaderLogo }) => (
  <div className={styles.root}>
    <Helmet>
      <link rel="stylesheet" href="https://use.typekit.net/dpm7mos.css" />
    </Helmet>
    <Header currentPath={currentPath} renderLogo={renderHeaderLogo} />
    <main>{children}</main>
    <Footer />
  </div>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  currentPath: PropTypes.string,
  renderHeaderLogo: PropTypes.func,
}

Layout.defaultProps = {
  currentPath: "",
  renderHeaderLogo: () => <Logo color="blue" />,
}

export default Layout
