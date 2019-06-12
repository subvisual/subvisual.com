import React from "react"
import PropTypes from "prop-types"
import Img from "gatsby-image"
import { StaticQuery, graphql } from "gatsby"
import { ParallaxProvider, ParallaxBanner } from "react-scroll-parallax"

import CallToAction from "../../CallToAction"
import LoadPlaceholder from "../../LoadPlaceholder"
import Text from "../../Text"
import Title from "./Title"

import "./index.module.css"

const renderParallaxImage = ({ baseDelay, image, parallaxAmount }) => (
  <ParallaxBanner
    layers={[
      {
        children: (
          <LoadPlaceholder delay={baseDelay}>
            {onLoad => (
              <Img
                fadeIn={false}
                onLoad={onLoad}
                fluid={image}
                imgStyle={{ display: "block" }}
                style={{ height: "100%" }}
              />
            )}
          </LoadPlaceholder>
        ),
        amount: parallaxAmount,
      },
    ]}
  />
)

const Hero = ({ data, planetMorph, hidePlanet }) => {
  const baseDelay = 0.3

  return (
    <div styleName="root">
      <div styleName="content">
        <div styleName="title">
          <Title planetMorph={planetMorph} hide={hidePlanet} />
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
              had? We can help you succeed.{" "}
              <CallToAction>Together.</CallToAction>
            </Text>
          </p>
        </div>
      </div>
    </div>
  )
}

Hero.propTypes = {
  hidePlanet: PropTypes.bool,
  planetMorph: PropTypes.func,
}

Hero.defaultTypes = {
  planetMorph: () => {},
}

export default props => (
  <StaticQuery query={query} render={data => <Hero data={data} {...props} />} />
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
