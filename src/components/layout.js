import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"

import AnnouncementBanner from "~/src/components/AnnouncementBanner"
import Logo from "./logo"
import Header from "./layout/header"
import Footer from "./layout/footer"

import styles from "./layout.module.css"

const Layout = ({ children, currentPath, renderHeaderLogo }) => (
  <div className={styles.root}>
    <Helmet>
      <link rel="stylesheet" href="https://use.typekit.net/dpm7mos.css" />
    </Helmet>
    <AnnouncementBanner />
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
