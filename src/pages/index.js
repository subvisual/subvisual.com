import React from "react"

import Hero from "../components/home/Hero"
import Intro from "../components/home/Intro"
import About from "../components/home/About"
import Ventures from "../components/home/Ventures"
import Layout from "../components/layout"
import SEO from "../components/seo"

import "../common/normalize.css"

const IndexPage = () => (
  <>
    <Intro />
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

export default IndexPage
