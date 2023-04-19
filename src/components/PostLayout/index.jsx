import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"

import AnnouncementBanner from "../AnnouncementBanner"
import MainHero from "../MainHero"
import Header from "../Header"
import PostTitle from "../PostTitle"
import PostDetails from "../PostDetails"
import Footer from "../Footer"

import * as styles from "./index.module.scss"

function PostLayout({ title, author, date, categories, children }) {
  return (
    <div className={styles.root}>
      <Helmet>
        <link rel="stylesheet" href="https://use.typekit.net/dpm7mos.css" />
      </Helmet>
      <AnnouncementBanner />
      <Header />
      <MainHero>
        <div className={styles.inner}>
          <div className={styles.title}>
            <PostTitle>{title}</PostTitle>
          </div>
          <PostDetails author={author} date={date} categories={categories} />
        </div>
      </MainHero>
      <main>{children}</main>
      <Footer />
    </div>
  )
}

PostLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default PostLayout
