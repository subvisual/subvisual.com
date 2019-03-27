import React from 'react'
import Img from 'gatsby-image'
import { StaticQuery, graphql } from 'gatsby'

import PageTitle from '../../page_title'
import CallToAction from '../../call_to_action'

import './index.module.css'

const Hero = ({ data }) => (
  <div styleName="root">
    <div styleName="content">
      <div styleName="title">
        <PageTitle>We nurture ideas that empower people</PageTitle>
      </div>
      <div styleName="text">
        <p styleName="textParagraph">
          Building a company from the ground up is hard and stressful,
          particularly in heavy regulated fields such as fintech and digital
          healthcare.
        </p>
        <p styleName="textParagraph">
          Struggling with designing and developing that awesome idea you’ve had?
          We can help you succeed. <CallToAction>Together.</CallToAction>
        </p>
      </div>
      <div styleName="images">
        <Img fluid={data.hero1.childImageSharp.fluid} />
        <Img fluid={data.hero2.childImageSharp.fluid} />
        <Img fluid={data.hero3.childImageSharp.fluid} />
      </div>
    </div>
  </div>
)

export default () => (
  <StaticQuery query={query} render={data => <Hero data={data} />} />
)

const query = graphql`
  query {
    hero1: file(relativePath: { regex: "/hero-1@3x.png/" }) {
      childImageSharp {
        fluid(maxWidth: 3072, quality: 100, toFormat: JPG) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }

    hero2: file(relativePath: { regex: "/hero-2@3x.png/" }) {
      childImageSharp {
        fluid(maxWidth: 3072, quality: 100, toFormat: JPG) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }

    hero3: file(relativePath: { regex: "/hero-3@3x.png/" }) {
      childImageSharp {
        fluid(maxWidth: 3072, quality: 100, toFormat: JPG) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`
