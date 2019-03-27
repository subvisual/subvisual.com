import React from "react"
import { Link } from "gatsby"

import Hero from "../components/home/hero"
import VenturesSection from "../components/home/ventures_section"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Team from "../components/team"

import "../common/normalize.css"

const IndexPage = () => (
  <Layout>
    <SEO
      title="Subvisual - We nurture ideas that empower people"
      keywords={[]}
    />
    <Hero />
    <VenturesSection />
    <h2>About</h2>
    <h3>It started out of friendship</h3>
    <p>
      Subvisual was born out of friendship, with the ambition to become a
      company we'd love to work in.
    </p>
    <p>
      By putting people first and never compromising on quality, we were able to
      shape a team culture that will embrace you and nurture your ideas to
      fruition.
    </p>
    <h3>And grew with craft</h3>
    <p>
      We're a small, but powerful team, that can help you make informed
      decisions throughout the process of building a digital product.
    </p>
    <p>
      We'll challenge you to think further and help you do the heavy lifting of
      shaping your product's development.
    </p>
    <h3>Team</h3>
    <Team />
  </Layout>
)

export default IndexPage
