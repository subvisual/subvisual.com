import React from "react"
import { Link } from "gatsby"

import Hero from "../components/home/Hero"
import AboutSection from "../components/home/about_section"
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
    <AboutSection />
  </Layout>
)

export default IndexPage
