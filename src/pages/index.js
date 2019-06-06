import React, { useState, useEffect } from "react"
import { useMorph } from "react-morph"
import { cubicBezier } from "@popmotion/easing"

import About from "../components/home/About"
import Hero from "../components/home/Hero"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Ventures from "../components/home/Ventures"
import Splash from "../components/SplashScreen"

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
    setTimeout(() => requestAnimationFrame(() => setRenderSplash(false)), 500)
  })

  return (
    <>
      <Layout>
        <SEO
          title="Subvisual - We nurture ideas that empower people"
          keywords={[]}
        />
        <Splash show={renderSplash} morph={morph} />
        <Hero planetMorph={morph} hidePlanet={renderSplash} />
        <Ventures morph={morph} />
        <About morph={morph} />
      </Layout>
    </>
  )
}

export default IndexPage
