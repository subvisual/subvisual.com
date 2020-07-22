import React, { useState } from "react"
import { useMorph } from "react-morph"
import { cubicBezier } from "@popmotion/easing"

import Layout from "../components/Layout"
import SEO from "../components/Seo"
import SplashScreen from "../components/SplashScreen"
import AboutSection from "../components/Home/AboutSection"
import HeroSection from "../components/Home/HeroSection"
import VenturesSection from "../components/Home/VenturesSection"

import "./index.scss"

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
