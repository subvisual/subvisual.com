import React from "react"
import Img from "gatsby-image"
import { StaticQuery, graphql } from "gatsby"

import PageTitle from "../../PageTitle"
import CallToAction from "../../CallToAction"
import Text from "../../Text"

import "./index.module.css"

const Hero = ({ data }) => (
  <div styleName="root">
    <div styleName="content">
      <div styleName="title">
        <PageTitle>We nurture ideas that empower people</PageTitle>
      </div>
      <div styleName="text">
        <p styleName="textParagraph">
          <Text>
            Building a company from the ground up is hard and stressful,
            particularly in heavy regulated fields such as fintech and digital
            healthcare.
          </Text>
        </p>
        <p styleName="textParagraph">
          <Text>
            Struggling with designing and developing that awesome idea you’ve
            had? We can help you succeed. <CallToAction>Together.</CallToAction>
          </Text>
        </p>
      </div>
      <div styleName="images">
        <div styleName="image">
          <Img
            fluid={data.hero1.childImageSharp.fluid}
            imgStyle={{ display: "block" }}
            style={{ height: "100%" }}
          />
        </div>
        <div styleName="image">
          <Img
            fluid={data.hero2.childImageSharp.fluid}
            imgStyle={{ display: "block" }}
            style={{ height: "100%" }}
          />
        </div>
        <div styleName="image">
          <Img
            fluid={data.hero3.childImageSharp.fluid}
            imgStyle={{ display: "block" }}
            style={{ height: "100%" }}
          />
        </div>
      </div>
    </div>
  </div>
)

export default () => (
  <StaticQuery query={query} render={data => <Hero data={data} />} />
)

const query = graphql`
  query {
    hero1: file(relativePath: { regex: "/hero-1.jpg/" }) {
      childImageSharp {
        fluid(maxHeight: 452, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }

    hero2: file(relativePath: { regex: "/hero-2.jpg/" }) {
      childImageSharp {
        fluid(maxHeight: 452, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }

    hero3: file(relativePath: { regex: "/hero-3.jpg/" }) {
      childImageSharp {
        fluid(maxHeight: 452, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`
