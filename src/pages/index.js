import React, { useEffect } from "react"

import { WithAnimatedPlanet } from "../components/AnimatedPlanet"
import Layout from "../components/layout"
import SEO from "../components/seo"
import AboutSection from "../components/home/about_section"
import HeroSection from "../components/home/hero_section"
import SplashScreen from "../components/SplashScreen"
import VenturesSection from "../components/home/ventures_section"

import "./index.scss"

const IndexPageContent = ({ animatedPlanet }) => {
  const { actions, spikes } = animatedPlanet
  const { play } = actions
  const [heroTittle] = spikes

  useEffect(() => {
    setTimeout(() => play(heroTittle), 2000)
  })

  return (
    <>
      <Layout>
        <SEO />
        <HeroSection tittleRef={heroTittle} />
        <VenturesSection />
        <AboutSection />
      </Layout>
      <SplashScreen />
    </>
  )
}

const IndexPage = WithAnimatedPlanet(IndexPageContent)

export default IndexPage
