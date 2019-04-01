import React from "react"
import Img from "gatsby-image"
import { StaticQuery, graphql } from "gatsby"

import CallToAction from "../../CallToAction"
import Text from "../../Text"
import Title from "./Title"

import "./index.module.css"

const Hero = ({ data }) => (
  <div styleName="root">
    <div styleName="content">
      <div styleName="title">
        <Title />
      </div>
      <div styleName="text">
        <p>
          <Text>
            Building a company from the ground up is hard and stressful,
            particularly in heavy regulated fields such as fintech and digital
            healthcare.
          </Text>
        </p>
        <p>
          <Text>
            Struggling with designing and developing that awesome idea you’ve
            had? We can help you succeed. <CallToAction>Together.</CallToAction>
          </Text>
        </p>
      </div>
      <div styleName="images">
        <div styleName="image">
          <div styleName="horizontal">
            <Img
              fluid={data.hero1_h.childImageSharp.fluid}
              imgStyle={{ display: "block" }}
              style={{ height: "100%" }}
            />
          </div>
          <div styleName="vertical">
            <Img
              fluid={data.hero1_v.childImageSharp.fluid}
              imgStyle={{ display: "block" }}
              style={{ height: "100%" }}
            />
          </div>
        </div>
        <div styleName="image">
          <div styleName="horizontal">
            <Img
              fluid={data.hero2_h.childImageSharp.fluid}
              imgStyle={{ display: "block" }}
              style={{ height: "100%" }}
            />
          </div>
          <div styleName="vertical">
            <Img
              fluid={data.hero2_v.childImageSharp.fluid}
              imgStyle={{ display: "block" }}
              style={{ height: "100%" }}
            />
          </div>
        </div>
        <div styleName="image">
          <div styleName="horizontal">
            <Img
              fluid={data.hero3_h.childImageSharp.fluid}
              imgStyle={{ display: "block" }}
              style={{ height: "100%" }}
            />
          </div>
          <div styleName="vertical">
            <Img
              fluid={data.hero3_v.childImageSharp.fluid}
              imgStyle={{ display: "block" }}
              style={{ height: "100%" }}
            />
          </div>
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
    hero1_v: file(relativePath: { regex: "/hero-1-vertical.jpg/" }) {
      childImageSharp {
        fluid(maxHeight: 452, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    hero1_h: file(relativePath: { regex: "/hero-1-horizontal.jpg/" }) {
      childImageSharp {
        fluid(maxHeight: 224, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }

    hero2_v: file(relativePath: { regex: "/hero-2-vertical.jpg/" }) {
      childImageSharp {
        fluid(maxHeight: 452, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    hero2_h: file(relativePath: { regex: "/hero-2-horizontal.jpg/" }) {
      childImageSharp {
        fluid(maxHeight: 224, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }

    hero3_v: file(relativePath: { regex: "/hero-3-vertical.jpg/" }) {
      childImageSharp {
        fluid(maxHeight: 452, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    hero3_h: file(relativePath: { regex: "/hero-3-horizontal.jpg/" }) {
      childImageSharp {
        fluid(maxHeight: 320, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`
