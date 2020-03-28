import React from "react"
import PropTypes from "prop-types"

import Body from "../../components/blog/post/body"
import Header from "../../components/blog/post/header"
import Layout from "../../components/layout"
import Logo from "../../components/blog/logo"

import "../../common/base.scss"
import styles from "./post.module.scss"

const renderHeaderLogo = () => <Logo color="blue" />

const BlogPostTemplate = ({ author, date, html, retinaCover, title }) => (
  <Layout renderHeaderLogo={renderHeaderLogo}>
    <div className={styles.root}>
      <article className={styles.article}>
        <header className={styles.header}>
          <Header {...{ author, date, retinaCover, title }} />
        </header>
        <section className={styles.body}>
          <Body html={html} />
        </section>
      </article>
    </div>
  </Layout>
)

BlogPostTemplate.propTypes = {
  author: PropTypes.object.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  html: PropTypes.string.isRequired,
  retinaCover: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default BlogPostTemplate
