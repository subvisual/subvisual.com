import React, { useState } from "react"
import { useMorph } from "react-morph"
import { cubicBezier } from "@popmotion/easing"

import AnimatedPlanet from "../components/AnimatedPlanet"
import Layout from "../components/layout"
import SEO from "../components/seo"
import SplashScreen from "../components/splash_screen"
import AboutSection from "../components/home/about_section"
import HeroSection from "../components/home/hero_section"
import VenturesSection from "../components/home/ventures_section"

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
  const [heroTittle, setHeroTittle] = useState()

  return (
    <>
      {/*
        <SplashScreen
          lockScrollFor={1000}
          morph={morph}
          onHide={showTittlePlanet}
          showFor={750}
        />
      */}
      <Layout>
        <SEO />
        <HeroSection tittleRef={setHeroTittle} />
        <VenturesSection />
        <AboutSection />
      </Layout>
      <AnimatedPlanet heroTittle={heroTittle} />
    </>
  )
}

export default IndexPage
