import React from "react"

import AboutSection from "../components/home/about_section"
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
        <AboutSection />
      </Layout>
    </>
  )
}

export default IndexPage
