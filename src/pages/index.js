import React, { useState } from "react"

import AnimatedPlanet from "../components/AnimatedPlanet"
import Layout from "../components/layout"
import SEO from "../components/seo"
import AboutSection from "../components/home/about_section"
import HeroSection from "../components/home/hero_section"
import VenturesSection from "../components/home/ventures_section"

import "./index.scss"

const IndexPage = () => {
  const [heroTittle, setHeroTittle] = useState()
  const renderPageContent = () => (
    <Layout>
      <SEO />
      <HeroSection tittleRef={setHeroTittle} />
      <VenturesSection />
      <AboutSection />
    </Layout>
  )

  return (
    <AnimatedPlanet.Stage heroTittle={heroTittle} render={renderPageContent} />
  )
}

export default IndexPage
