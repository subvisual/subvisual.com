import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import AboutSection from "../components/home/about_section"
import HeroSection from "../components/home/hero_section"
import VenturesSection from "../components/home/ventures_section"

import "../common/normalize.css"

const IndexPage = () => {
  return (
    <>
      <Layout>
        <SEO
          title="Subvisual - We nurture ideas that empower people"
          keywords={[]}
        />
        <HeroSection />
        <VenturesSection />
        <AboutSection />
      </Layout>
    </>
  )
}

export default IndexPage
