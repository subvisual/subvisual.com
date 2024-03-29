import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"

import AnnouncementBanner from "../AnnouncementBanner"
import MainHero from "../MainHero"
import Header from "../Header"
import Title from "../Title"
import Footer from "../Footer"

import * as styles from "./index.module.scss"

function MainLayout({ children }) {
  return (
    <div className={styles.root}>
      <Helmet>
        <link rel="stylesheet" href="https://use.typekit.net/dpm7mos.css" />
      </Helmet>
      <AnnouncementBanner />
      <Header />
      <MainHero>
        <div className={styles.title}>
          <Title>
            Not visible without <br /> the aid of special <br /> instruments:
            subvisible
          </Title>
        </div>
      </MainHero>
      <main>{children}</main>
      <Footer />
    </div>
  )
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default MainLayout
