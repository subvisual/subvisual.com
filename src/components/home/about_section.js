import React from "react"

import Team from "./team"
import "./about_section.css"

const AboutSection = () => (
  <section className="AboutSection">
    <div className="AboutSection-content">
      <header className="AboutSection-header">
        <h2>About</h2>
      </header>
      <div className="AboutSection-story">
        <section className="AboutSection-section">
          <h3>It started out of friendship</h3>
          <p>
            Subvisual was born out of friendship, with the ambition to become a
            company we'd love to work in.
          </p>
          <p>
            By putting people first and never compromising on quality, we were
            able to shape a team culture that will embrace you and nurture your
            ideas to fruition.
          </p>
        </section>
        <section className="AboutSection-section">
          <h3>And grew with craft</h3>
          <p>
            We're a small, but powerful team, that can help you make informed
            decisions throughout the process of building a digital product.
          </p>
          <p>
            We'll challenge you to think further and help you do the heavy
            lifting of shaping your product's development.
          </p>
        </section>
      </div>
      <section className="AboutSection-team">
        <h3>Team</h3>
        <Team />
      </section>
    </div>
  </section>
)

export default AboutSection
