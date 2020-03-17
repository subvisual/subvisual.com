import React, { useState } from "react"
import { useMorph } from "react-morph"
import { cubicBezier } from "@popmotion/easing"

import Layout from "../components/layout"
import SEO from "../components/seo"
import SplashScreen from "../components/splash_screen"
import AboutSection from "../components/home/about_section"
import HeroSection from "../components/home/hero_section"
import VenturesSection from "../components/home/ventures_section"

import "../common/normalize.css"

const curve = cubicBezier(1, -0.05, 0.45, 0.8)

const easings = {
  translateX: curve,
  translateY: curve,
  scaleX: curve,
  scaleY: curve,
}

const spring = {
  damping: 26,
  mass: 1,
  stiffness: 8,
}

const config = { spring, easings, getMargins: true }

const IndexPage = () => {
  const morph = useMorph(config)
  const [hidingTittlePlanet, setHidingTittlePlanet] = useState(true)
  const showTittlePlanet = () => setHidingTittlePlanet(false)

  return (
    <>
      <SplashScreen
        lockScrollFor={1000}
        morph={morph}
        onHide={showTittlePlanet}
        showFor={750}
      />
      <Layout>
        <SEO />
        <HeroSection planetMorph={morph} hidePlanet={hidingTittlePlanet} />
        <VenturesSection />
        <AboutSection />
      </Layout>
    </>
  )
}

export default IndexPage
