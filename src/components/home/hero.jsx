import React from "react"

import PageTitle from "../page_title"
import hero1_1x from "../../images/hero-1.png"
import hero2_1x from "../../images/hero-2.png"
import hero3_1x from "../../images/hero-3.png"
import "./hero.css"

const Hero = () => (
  <div className="Hero">
    <div className="Hero-content">
      <div className="Hero-title">
        <PageTitle>We nurture ideas that empower people</PageTitle>
      </div>
      <div className="Hero-text">
        <p>
          Building a company from the ground up is hard and stressful, particularly
          in heavy regulated fields such as fintech and digital healthcare.
          Struggling with designing and developing that awesome idea you’ve had? We
          can help you succeed. Together.
        </p>
      </div>
      <div className="Hero-images">
        <img src={hero1_1x} className="Hero-quarterImage" />
        <img src={hero2_1x} className="Hero-quarterImage" />
        <img src={hero3_1x} className="Hero-halfImage" />
      </div>
    </div>
  </div>
)

export default Hero