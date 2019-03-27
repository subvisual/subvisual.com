import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import PageTitle from "../components/page_title"
import SEO from "../components/seo"
import Team from "../components/team"

import "../common/normalize.css"

const IndexPage = () => (
  <Layout>
    <SEO
      title="Subvisual - We nurture ideas that empower people"
      keywords={[]}
    />
    <PageTitle>We nurture ideas that empower people</PageTitle>
    <p>
      Building a company from the ground up is hard and stressful, particularly
      in heavy regulated fields such as fintech and digital healthcare.
      Struggling with designing and developing that awesome idea you’ve had? We
      can help you succeed. Together.
    </p>
    <h2>Meaningful Ventures</h2>
    <h3>Looking for</h3>
    <dl>
      <dt>Product Vision</dt>
      <dd>Ideas that solve a clear problem for real users</dd>
      <dt>Business Strategy</dt>
      <dd>With clear goals, aiming for sustainable growth</dd>
      <dt>Founders & Culture</dt>
      <dd>Backed by committed people, with the right values</dd>
    </dl>
    <h3>Helping with</h3>
    <ul>
      <li>Seed investment & incubation</li>
      <li>Strong company culture</li>
      <li>Early stage product mentorship</li>
      <li>Strong international ecosystem</li>
    </ul>
    <h3>Portfolio</h3>
    <dl>
      <dt>UTRUST</dt>
      <dd>Crypto payments, simple as they should be</dd>
      <dt>Keyruptive</dt>
      <dd>Security matches convenience</dd>
      <dt>siosLIFE</dt>
      <dd>For younger spirits</dd>
      <dt>Crediflux</dt>
      <dd>Credit analysis: Simple, fase, and paperless</dd>
      <dt>Oncostats</dt>
      <dd>Defeating a common enemy, cancer</dd>
      <dt>SV Health</dt>
      <dd>Nurturing digital healthcare solutions</dd>
      <dt>Finiam</dt>
      <dd>Active digital finance</dd>
    </dl>
    <p>
      Join our venture universe.
      <br />
      Let's talk
    </p>
    <Link to="#">Join our universe</Link>
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
