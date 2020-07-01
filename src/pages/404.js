import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Helmet from "react-helmet"
import Logo from "../components/logo"

import styles from "./404.module.css"

const renderWhiteLogo = () => <Logo color="white" />

const NotFoundPage = () => (
  <>
    <Helmet>
      <body className={styles.bodyBackground} />
    </Helmet>
    <Layout footer={false} renderHeaderLogo={renderWhiteLogo}>
      <div className={styles.container}>
        <SEO title="404: Not found" />
        <h1 className={styles.title}>404</h1>
        <p className={styles.text}>The page you are looking for isn't here.</p>
        <a href="/" className={styles.link}>
          Let's go home.
        </a>
      </div>
    </Layout>
  </>
)

export default NotFoundPage
