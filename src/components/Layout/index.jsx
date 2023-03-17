import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"

import AnnouncementBanner from "../AnnouncementBanner"
import Footer from "../Footer"
import Logo from "../Logo"
import Header from "../Header"

import * as styles from "./index.module.css"

function Layout({ children, currentPath, renderHeaderLogo }) {
  return (
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
}

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
