import React from "react"
import { useMorph } from "react-morph"
import { easeOutSin, easeInSin } from "react-morph/lib/easings"

import About from "../components/home/About"
import Hero from "../components/home/Hero"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Ventures from "../components/home/Ventures"

import "../common/normalize.css"

const easings = {
  translateX: easeOutSin,
  translateY: easeInSin,
}

const spring = {
  damping: 10,
  mass: 1,
  stiffness: 40,
}

const config = { easings, spring, getMargins: true }

const IndexPage = () => {
  const morph = useMorph(config)

  return (
    <>
      <Layout>
        <SEO
          title="Subvisual - We nurture ideas that empower people"
          keywords={[]}
        />
        <Hero planetMorph={morph} />
        <Ventures planetMorph={morph} />
        <About planetMorph={morph} />
      </Layout>
    </>
  )
}

export default IndexPage
