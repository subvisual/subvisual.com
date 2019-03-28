import React from "react"

import Hero from "../components/home/Hero"
import About from "../components/home/About"
import VenturesSection from "../components/home/ventures_section"
import Layout from "../components/layout"
import SEO from "../components/seo"

import "../common/normalize.css"

const IndexPage = () => (
  <Layout>
    <SEO
      title="Subvisual - We nurture ideas that empower people"
      keywords={[]}
    />
    <Hero />
    <VenturesSection />
    <About />
  </Layout>
)

export default IndexPage
