import React from "react"

import About from "../components/home/About"
import Hero from "../components/home/hero"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Ventures from "../components/home/Ventures"

import "../common/normalize.css"

const IndexPage = () => {
  return (
    <>
      <Layout>
        <SEO
          title="Subvisual - We nurture ideas that empower people"
          keywords={[]}
        />
        <Hero />
        <Ventures />
        <About />
      </Layout>
    </>
  )
}

export default IndexPage
