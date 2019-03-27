import React from "react"
import { Link } from "gatsby"

import Title from "../title"
import "./ventures_section.css"

const VenturesSection = () => (
  <section className="VenturesSection">
    <div className="VenturesSection-content">
      <header className="VenturesSection-header">
        <Title>Meaningful Ventures</Title>
      </header>
      <section className="VenturesSection-section">
        <h3>Looking for</h3>
        <dl>
          <dt>Product Vision</dt>
          <dd>Ideas that solve a clear problem for real users</dd>
          <dt>Business Strategy</dt>
          <dd>With clear goals, aiming for sustainable growth</dd>
          <dt>Founders & Culture</dt>
          <dd>Backed by committed people, with the right values</dd>
        </dl>
      </section>
      <section className="VenturesSection-section">
        <h3>Helping with</h3>
        <ul>
          <li>Seed investment & incubation</li>
          <li>Strong company culture</li>
          <li>Early stage product mentorship</li>
          <li>Strong international ecosystem</li>
        </ul>
      </section>
      <section className="VenturesSection-section">
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
      </section>
      <footer className="VenturesSection-footer">
        <p>
          Join our venture universe.
          <br />
          Let's talk
        </p>
        <Link to="#">Join our universe</Link>
      </footer>
    </div>
  </section>
)

export default VenturesSection
