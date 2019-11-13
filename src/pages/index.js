import React, { useState, useEffect } from "react"
import { useMorph } from "react-morph"
import { cubicBezier } from "@popmotion/easing"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Splash from "../components/splash_screen"
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
  const [renderSplash, setRenderSplash] = useState(true)

  useEffect(() => {
    setTimeout(() => setRenderSplash(false), 750)
  })

  return (
    <Layout>
      <noscript>
        <style>
          {`
            #splash-screen{
              display: none
            }
          `}
        </style>
      </noscript>

      <SEO
        title="Subvisual - We nurture ideas that empower people"
        keywords={[]}
      />
      <Splash show={renderSplash} morph={morph} />
      <HeroSection planetMorph={morph} hidePlanet={renderSplash} />
      <VenturesSection />
      <AboutSection />
    </Layout>
  )
}

export default IndexPage
